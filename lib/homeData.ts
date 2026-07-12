import { yearsInBusiness } from './siteConfig';

const yrs = yearsInBusiness();

/* ============================================================ */
/* HOMEPAGE STATS                                                */
/* ============================================================ */
export type HomeStat = { value: string; label: string; target?: number; suffix?: string };

export const homeStats: HomeStat[] = [
  { value: `${yrs}+`, label: 'Years building digital systems', target: yrs, suffix: '+' },
  { value: '200+', label: 'Projects delivered', target: 200, suffix: '+' },
  { value: '18', label: 'Portfolio case studies', target: 18, suffix: '' },
  { value: '4.9', label: 'Client satisfaction rating', target: 4.9, suffix: '' },
  { value: '1hr', label: 'Average response time' }
];

/* ============================================================ */
/* HOMEPAGE SERVICES (4 cards)                                   */
/* ============================================================ */
export type HomeServiceCard = {
  num: string;
  title: string;
  tags: string[];
  body: string;
  icon: string;   // SVG path
  slug: string;
};

const iconSvg = (path: string) =>
  `<svg width="22" height="22" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

export const homeServices: HomeServiceCard[] = [
  {
    num: '{01}',
    title: 'Web Design & Development',
    tags: ['UI/UX Design', 'Landing Pages', 'WordPress', 'Shopify', 'Responsive'],
    body: 'Custom websites and web applications built for speed, conversion, and long-term scalability. From brochure sites to complex platforms.',
    icon: iconSvg('<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V88H40V56ZM40,200V104H216v96Z"/>'),
    slug: 'web-design-development'
  },
  {
    num: '{02}',
    title: 'Software Development',
    tags: ['CRM', 'Custom Portals', 'Dashboards', 'APIs', 'Systems'],
    body: 'Custom software built around your workflow. CRMs, portals, automation tools, and business platforms that replace 3+ separate tools.',
    icon: iconSvg('<path d="M117.31,134l-72,64a8,8,0,1,1-10.63-12L100,128,34.69,70A8,8,0,1,1,45.32,58l72,64a8,8,0,0,1,0,12ZM216,184H120a8,8,0,0,0,0,16h96a8,8,0,0,0,0-16Z"/>'),
    slug: 'software-development'
  },
  {
    num: '{03}',
    title: 'AI Automation Solutions',
    tags: ['n8n', 'Make.com', 'OpenAI', 'Claude API', 'Workflows'],
    body: 'AI-powered automation systems that save 20+ hours per week. CRM automation, lead pipelines, content workflows, and custom GPT integrations.',
    icon: iconSvg('<path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Z"/>'),
    slug: 'ai-automation'
  },
  {
    num: '{04}',
    title: 'SEO & Digital Marketing',
    tags: ['On-Page SEO', 'Technical SEO', 'Local SEO', 'Lead Gen'],
    body: 'SEO and marketing strategies built to improve visibility and generate qualified leads. From technical audits to content-led growth.',
    icon: iconSvg('<path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V172.69l50.34-50.35a8,8,0,0,1,11.32,0L128,156.69,180.69,104H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V115.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,139.31l-56,56V200H224A8,8,0,0,1,232,208Z"/>'),
    slug: 'seo-services'
  }
];

/* ============================================================ */
/* HOMEPAGE DIFFERENTIATORS (3)                                  */
/* ============================================================ */
export type Differentiator = { num: string; title: string; body: string };

export const differentiators: Differentiator[] = [
  {
    num: '01 /',
    title: 'Creative, Conversion-Focused Design',
    body: 'We create premium websites and interfaces that look modern, build trust, and guide users toward taking action.'
  },
  {
    num: '02 /',
    title: 'Results-Driven Growth',
    body: 'Our SEO, marketing, and automation strategies are built to improve visibility, efficiency, and lead generation, measurably.'
  },
  {
    num: '03 /',
    title: 'Custom-Built, Always',
    body: 'No templates. No page builders on client work. Everything built specifically for your business, your market, your goals.'
  }
];

/* ============================================================ */
/* HOMEPAGE PROCESS (3 steps)                                    */
/* ============================================================ */
export type HomeProcessStep = { num: string; title: string; body: string; iconPath: string };

export const homeProcessSteps: HomeProcessStep[] = [
  {
    num: '01',
    title: 'Strategy & Discovery',
    body: 'We understand your business, objectives, audience, and technical needs to define the right digital direction.',
    iconPath: 'M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Z'
  },
  {
    num: '02',
    title: 'Design & Development',
    body: 'We design and build your website, software, or automation solution with a focus on usability, performance, and quality.',
    iconPath: 'M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l64-64h0l59.32-59.32A16,16,0,0,0,227.32,73.37Z'
  },
  {
    num: '03',
    title: 'Optimization & Launch',
    body: 'We refine details, improve speed and SEO, test functionality, and prepare for a confident, clean launch.',
    iconPath: 'M232.66,27.34a8,8,0,0,0-3-3C229.59,24.27,178.84-2.62,128,40.1c-21.74,17.78-40,57.92-50.6,86.79-7.16,19.46-14.5,42.78-13.31,53.33A47.72,47.72,0,0,0,55,196.7c-15.66,17-22.2,46.59-22.46,47.79a8,8,0,0,0,9.32,9.32c1.2-.27,30.83-6.81,47.79-22.46A47.72,47.72,0,0,0,106.09,222.16c10.55,1.18,33.87-6.16,53.33-13.31,28.87-10.62,69-28.86,86.79-50.6C295.66,87.16,232.66,27.34,232.66,27.34Z'
  }
];

/* ============================================================ */
/* TESTIMONIALS + VIDEO                                          */
/* ============================================================ */
export type Testimonial = { quote: string; name: string; role: string; initials: string };
export type VideoTestimonial = { src: string; tag: string; title: string; poster?: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      'Relicsol built our website from scratch in under 3 weeks. It loads fast, looks premium, and has already brought in leads we would never have got with our old site.',
    name: 'Sarah L.',
    role: 'CEO, GreenLeaf',
    initials: 'SL'
  },
  {
    quote:
      'The combination of design quality and technical execution was impressive. They understood our brand immediately and delivered exactly what we needed, on time and on budget.',
    name: 'Robert',
    role: 'CEO, New You Spa',
    initials: 'R'
  },
  {
    quote:
      'From the first call to the final delivery, the process was clear and professional. Our new site ranks on Google and converts visitors into enquiries every week.',
    name: 'Priya K.',
    role: 'Founder, StyleMart',
    initials: 'PK'
  },
  {
    quote:
      'We needed a reliable agency that could handle both design and the technical backend. Relicsol delivered both without compromise. We have been with them for two projects now.',
    name: 'David M.',
    role: 'CEO, TechNova',
    initials: 'DM'
  }
];

export const videoTestimonials: VideoTestimonial[] = [
  {
    src: '/videos/relicsol_review.mp4',
    tag: 'CLIENT REVIEW',
    title: 'A client shares their experience'
  },
  {
    src: '/videos/relicsol_review.mp4',
    tag: 'CASE STUDY · UK',
    title: 'Web design and development walkthrough'
  }
];

/* ============================================================ */
/* PRICING PLANS                                                 */
/* ============================================================ */
export type PricingPlan = {
  label: string;
  title: string;
  best: string;
  price: string;
  featured: boolean;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    label: 'Starter',
    title: 'Starter Website Package',
    best: 'For startups and small businesses',
    price: '$999',
    featured: false,
    features: [
      'Custom website design',
      'Up to 5 pages',
      'Responsive development',
      'WordPress or Shopify setup',
      'Basic on-page SEO',
      'Contact form integration',
      'Speed optimization',
      'Security setup'
    ]
  },
  {
    label: 'Growth',
    title: 'Growth Business Package',
    best: 'For growing businesses',
    price: '$1,499',
    featured: true,
    features: [
      'Custom design and development',
      'Up to 10 pages',
      'Advanced responsive layout',
      'On-page SEO optimization',
      'Technical SEO basics',
      'Blog setup',
      'Lead generation forms',
      'Analytics integration',
      'Speed optimization',
      'Launch support'
    ]
  },
  {
    label: 'Custom',
    title: 'Custom Software & Automation',
    best: 'For advanced digital needs',
    price: '$2,000',
    featured: false,
    features: [
      'Everything in Growth Package',
      'Custom software development',
      'Dashboard / portal / CRM features',
      'AI automation integration',
      'API and third-party integrations',
      'Workflow automation',
      'Testing and deployment',
      'Post-launch support'
    ]
  }
];

/* ============================================================ */
/* MARQUEE LOGOS (tools + tech stack)                            */
/* ============================================================ */
export const marqueeLogos: { name: string; svg: string | null }[] = [
  { name: 'WordPress', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.539.82-2.771.82-3.864 0-.397-.026-.766-.07-1.109zm-7.981.105c.647-.034 1.233-.1 1.233-.1.58-.068.512-.921-.068-.889 0 0-1.744.137-2.867.137-1.055 0-2.834-.137-2.834-.137-.58-.032-.648.855-.068.889 0 0 .551.066 1.13.1l1.68 4.605-2.36 7.08L6.844 6.93c.649-.034 1.233-.1 1.233-.1.581-.068.513-.921-.067-.889 0 0-1.745.137-2.868.137C6.005 3.625 8.828 2 12 2c2.358 0 4.506.905 6.109 2.378zM12 22C6.486 22 2 17.514 2 12c0-1.476.32-2.878.893-4.14L7.06 20.3A10.022 10.022 0 0 0 12 22z"/></svg>' },
  { name: 'React', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.852.2-1.56.793-1.28 4.024.712 7.466-3.212 1.426-5.13 3.382-5.13 5.016 0 2.728 4.58 4.382 9.127 4.382s9.128-1.654 9.128-4.382c0-1.634-1.918-3.59-5.13-5.016 1.992-3.442 2.272-6.673.712-7.466a1.126 1.126 0 0 0-.852-.2z"/></svg>' },
  { name: 'Next.js', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727z"/></svg>' },
  { name: 'Supabase', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M11.9 23.1c-.5.6-1.5.2-1.5-.6V9.6h9.5c1.2 0 1.8 1.4.9 2.3L11.9 23.1zM12.1.9c.5-.6 1.5-.2 1.5.6v12.9H4.1c-1.2 0-1.8-1.4-.9-2.3L12.1.9z"/></svg>' },
  { name: 'n8n', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12.69 10.32L7.33 7.35V5.04l6.37 3.54v4.24l-1.01-.5zm7.71-3.34l-5.7 3.1v6.54l-1.01.56v-7.7l5.7-3.11V5.2L12 1.34 4.59 5.2v7.72L12 16.78l2.7-1.47 1.01.56L12 18.06l-8.41-4.6V4.65L12 .04l8.41 4.6v2.34h-.01z"/></svg>' },
  { name: 'Make.com', svg: null },
  { name: 'OpenAI', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"/></svg>' },
  { name: 'Claude', svg: null },
  { name: 'Figma', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 8.981H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zM12.735 16.49H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zM15.852 16.49h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49z"/></svg>' },
  { name: 'GitHub', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' },
  { name: 'Cloudflare', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M16.51 15.87l.56-1.95c.11-.39.07-.75-.12-1.03-.18-.26-.47-.42-.82-.46l-9.27-.13a.17.17 0 0 1-.14-.07.18.18 0 0 1-.02-.16c.02-.06.07-.1.13-.11l9.36-.13c.81-.04 1.69-.7 2.03-1.53l.42-1.06a.28.28 0 0 0 .01-.2C17.76 5.55 14.57 2.82 10.85 3.01 7.73 3.17 5.16 5.6 4.84 8.71c-.92-.55-2.03-.65-3.03-.18-1.51.74-2.18 2.56-1.35 4.03.12.21.26.41.42.59-.1.01-.2.01-.3.03-1.24.14-2.21 1.18-2.16 2.44.04 1.17.98 2.13 2.16 2.23h15.63c.08 0 .14-.05.17-.12l.09-.31c.11-.41.19-.76.09-1.55z"/></svg>' },
  { name: 'Laravel', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934c0 .135-.073.26-.189.326l-9.032 5.206L.533 18.562a.376.376 0 0 1-.189-.326V2.974L4.89.368a.367.367 0 0 1 .376 0L9.624 2.65z"/></svg>' },
  { name: 'Tailwind CSS', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>' },
  { name: 'Node.js', svg: '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.15-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.282.282 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745z"/></svg>' }
];
