
import { readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { pageMap, fileRouteMap } from './pageMap';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveFileName(pathname = '/') {
  const withoutQuery = String(pathname).split('?')[0].split('#')[0];
  let cleanPath = decodeURIComponent(withoutQuery).replace(/\/$/, '') || '/';

  if (pageMap[cleanPath]) return pageMap[cleanPath];

  // Legacy Claude export URLs, e.g. /CaseStudy-firmate.dc.html or /WebDesign.dc.html.
  const legacyFile = basename(cleanPath);
  if (fileRouteMap[legacyFile]) return legacyFile;

  // Safety aliases for dynamically generated old links.
  const caseMatch = legacyFile.match(/^CaseStudy-(.+)\.dc\.html$/i);
  if (caseMatch) {
    const candidate = `CaseStudy-${caseMatch[1]}.dc.html`;
    if (fileRouteMap[candidate]) return candidate;
  }

  const blogMatch = legacyFile.match(/^BlogPost-(.+)\.dc\.html$/i);
  if (blogMatch) {
    const candidate = `BlogPost-${blogMatch[1]}.dc.html`;
    if (fileRouteMap[candidate]) return candidate;
  }

  return null;
}

function buildClientFixScript() {
  return `
<script>
(function () {
  var routeMap = ${JSON.stringify(fileRouteMap)};

  function toCleanRoute(rawHref) {
    if (!rawHref || rawHref.charAt(0) === '#' || rawHref.indexOf('mailto:') === 0 || rawHref.indexOf('tel:') === 0) return null;
    if (/^https?:\/\//i.test(rawHref) && rawHref.indexOf('relicsol.com') === -1) return null;

    var href = rawHref.replace(/^https?:\/\/(www\.)?relicsol\.com\/?/i, '');
    href = href.split('?')[0].split('#')[0].replace(/^\.\//, '').replace(/^\//, '');

    if (routeMap[href]) return routeMap[href];

    var caseMatch = href.match(/^CaseStudy-(.+)\.dc\.html$/i);
    if (caseMatch) return '/portfolio/' + caseMatch[1];

    var blogMatch = href.match(/^BlogPost-(.+)\.dc\.html$/i);
    if (blogMatch) return '/blog-' + blogMatch[1];

    return null;
  }

  function fixLinks() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var raw = a.getAttribute('href');
      var clean = toCleanRoute(raw);
      if (clean) a.setAttribute('href', clean);
    });
  }

  function setupServiceDropdowns() {
    document.querySelectorAll('.rl-svc-dd').forEach(function (dd) {
      if (dd.dataset.relicsolDropdownFixed === '1') return;
      dd.dataset.relicsolDropdownFixed = '1';
      var panel = dd.querySelector('.rl-svc-panel');
      if (!panel) return;
      var trigger = dd.querySelector('span,button,a') || dd;
      var open = false;
      function show() {
        open = true;
        panel.style.opacity = '1';
        panel.style.pointerEvents = 'auto';
        panel.style.transform = 'translateY(0)';
        panel.style.zIndex = '9999';
      }
      function hide() {
        open = false;
        panel.style.opacity = '0';
        panel.style.pointerEvents = 'none';
        panel.style.transform = 'translateY(-4px)';
      }
      dd.addEventListener('mouseenter', show);
      dd.addEventListener('mouseleave', hide);
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        open ? hide() : show();
      });
      document.addEventListener('click', function (event) {
        if (!dd.contains(event.target)) hide();
      });
    });
  }

  function runFixes() {
    fixLinks();
    setupServiceDropdowns();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFixes);
  } else {
    runFixes();
  }

  // Claude Design renders some links from JavaScript data after the first paint.
  setTimeout(runFixes, 250);
  setTimeout(runFixes, 1000);
  setTimeout(runFixes, 2500);

  var observer = new MutationObserver(function () { runFixes(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
</script>`;
}

export function getDcHtml(pathname = '/') {
  const fileName = resolveFileName(pathname);
  if (!fileName) return null;

  const filePath = join(process.cwd(), 'public', 'dc', fileName);
  let html = readFileSync(filePath, 'utf8');

  // Make the Design Component runtime and local assets resolve correctly from clean Next.js URLs.
  html = html.replace(/<script\s+src=["']\.\/support\.js["']><\/script>/i, '<script src="/support.js"></script>');
  html = html.replace(/<head>/i, '<head>\n<base href="/">');

  // Convert static internal Claude-export .dc.html links to clean Next.js routes.
  for (const [dcFile, route] of Object.entries(fileRouteMap)) {
    const target = route === '/' ? '/' : route;
    const pattern = new RegExp(`(href=["'])\\.?/?${escapeRegExp(dcFile)}(["'])`, 'g');
    html = html.replace(pattern, `$1${target}$2`);
  }

  // Convert dynamic Portfolio/Blog generated route patterns before the Design Component runtime evaluates them.
  html = html.replace(/href:\s*`CaseStudy-\$\{p\.slug\}\.dc\.html`/g, 'href: `/portfolio/${p.slug}`');
  html = html.replace(/href:\s*`BlogPost-\$\{p\.slug\}\.dc\.html`/g, 'href: `/blog-${p.slug}`');

  // Convert absolute same-domain page links to local routes without touching image URLs under /wp-content/.
  html = html.replace(/(href=["'])https:\/\/relicsol\.com(\/(?!wp-content\/)[^"']*)?(["'])/g, (_m, a, path, b) => `${a}${path || '/'}${b}`);
  html = html.replace(/(href=["'])https:\/\/www\.relicsol\.com(\/(?!wp-content\/)[^"']*)?(["'])/g, (_m, a, path, b) => `${a}${path || '/'}${b}`);

  const fixScript = buildClientFixScript();
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${fixScript}\n</body>`);
  } else if (html.includes('</html>')) {
    html = html.replace('</html>', `${fixScript}\n</html>`);
  } else {
    html += fixScript;
  }

  return html;
}
