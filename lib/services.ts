export type ServiceBuildItem = { num: string; title: string; body: string; idealFor: string };
export type ServiceProcessStep = { num: string; title: string; body: string; duration: string };
export type ServiceTechRow = { cat: string; tools: string };
export type ServiceWhyItem = { num: string; title: string; body: string };
export type ServiceFAQ = { q: string; a: string };

export type Service = {
  slug: string;
  serviceNumber: string;
  name: string;
  navLabel: string;
  heroLabel: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  whatWeBuild: ServiceBuildItem[];
  processSteps: ServiceProcessStep[];
  techStack: ServiceTechRow[];
  whyUs: ServiceWhyItem[];
  faqs: ServiceFAQ[];
};

export const services: Service[] = [
  {
    slug: 'web-design-development',
    serviceNumber: '01',
    name: 'Web Design & Development',
    navLabel: 'Web Design & Development',
    heroLabel: 'Service 01 / Web Design & Development',
    heroTitle: 'Websites that work as hard as you do.',
    heroAccent: 'you do.',
    heroDescription:
      'Custom-built websites designed for performance, credibility, and conversion. Not templates. Not page builders. Built specifically for your business.',
    metaTitle: 'Web Design & Development Services · USA · UK · Europe',
    metaDescription:
      'Custom web design and development for businesses in the USA, UK, and Europe. Fast, SEO-ready, conversion-focused sites on WordPress, Shopify, Next.js.',
    keywords: [
      'web design',
      'web development',
      'custom websites',
      'WordPress development',
      'Shopify development',
      'Next.js websites',
      'website redesign',
      'UI/UX design',
    ],
    whatWeBuild: [
      {
        num: '01',
        title: 'Business Websites & Landing Pages',
        body: 'Custom business websites that position your brand, communicate your value clearly, and guide visitors toward contacting you.',
        idealFor: 'Services, consultancies, local businesses',
      },
      {
        num: '02',
        title: 'E-Commerce Stores',
        body: 'Full e-commerce development on WooCommerce or Shopify. Product pages built for conversion, fast checkout, inventory that does not slow you down.',
        idealFor: 'Product brands, DTC, retail',
      },
      {
        num: '03',
        title: 'WordPress Development',
        body: 'Custom WordPress themes and plugins built from scratch. No bloated page builders. Clean, fast, fully editable by your team.',
        idealFor: 'Content-heavy sites, CMS needs',
      },
      {
        num: '04',
        title: 'Next.js / Headless Builds',
        body: 'Performance-first web apps on Next.js with headless CMS or Supabase backends. Sub-second loads, full SEO control.',
        idealFor: 'SaaS platforms, tech-forward businesses',
      },
      {
        num: '05',
        title: 'Website Redesigns',
        body: 'We take underperforming sites and rebuild them. Better structure, faster loading, stronger SEO, a visual identity that matches your business.',
        idealFor: 'Established businesses with dated sites',
      },
      {
        num: '06',
        title: 'UI/UX Design',
        body: 'Figma-first design process. Wireframes, prototypes, and final designs reviewed and approved before any code is written.',
        idealFor: 'Any UX-critical project',
      },
    ],
    processSteps: [
      {
        num: 'STEP 01',
        title: 'Discovery Call',
        body: '30 minutes understanding your business, goals, target audience, and what success looks like. Free, no obligation.',
        duration: 'Day 1',
      },
      {
        num: 'STEP 02',
        title: 'Strategy & Proposal',
        body: 'Written project brief, sitemap, and fixed-price proposal within 48 hours. No vague "contact us for a quote" — real numbers.',
        duration: 'Days 2–3',
      },
      {
        num: 'STEP 03',
        title: 'Design in Figma',
        body: 'Full page designs in Figma before development. You review, request changes, and approve. Nothing moves forward without sign-off.',
        duration: 'Week 1',
      },
      {
        num: 'STEP 04',
        title: 'Development',
        body: 'Clean, semantic code. Mobile-first. Optimised for Core Web Vitals. No frameworks that lock you into expensive monthly tools.',
        duration: 'Weeks 2–3',
      },
      {
        num: 'STEP 05',
        title: 'Testing & Launch',
        body: 'Cross-browser testing, mobile testing, speed optimisation, SEO setup, security hardening. Then a clean, controlled launch.',
        duration: 'Week 4',
      },
      {
        num: 'STEP 06',
        title: 'Handover & Support',
        body: 'Full ownership of your site. Training to update content yourself. Ongoing maintenance available if needed.',
        duration: 'Ongoing',
      },
    ],
    techStack: [
      { cat: 'Design', tools: 'Figma' },
      { cat: 'CMS', tools: 'WordPress · Shopify · Sanity · Contentful' },
      { cat: 'Frontend', tools: 'Next.js · React · Tailwind CSS · HTML/CSS' },
      { cat: 'Backend', tools: 'PHP · Laravel · Node.js · Supabase' },
      { cat: 'E-Commerce', tools: 'WooCommerce · Shopify · Stripe' },
      { cat: 'Hosting', tools: 'Cloudflare · Vercel · WP Engine' },
    ],
    whyUs: [
      {
        num: '01',
        title: 'Fixed pricing. No surprises.',
        body: 'Every project is scoped and quoted upfront. You know the price before we start. No hourly billing, no scope creep invoices.',
      },
      {
        num: '02',
        title: 'SEO built in from day one.',
        body: 'Not an afterthought. Every site has correct heading structure, metadata, schema markup, sitemap, and Core Web Vitals targets set before launch.',
      },
      {
        num: '03',
        title: 'You own everything.',
        body: 'All code, design files, and content belong to you. No proprietary platforms, no monthly licence fees, no lock-in.',
      },
    ],
    faqs: [
      {
        q: 'How long does a website take to build?',
        a: 'A standard 5-page business website takes 2–3 weeks from design approval. E-commerce and custom builds typically take 4–8 weeks depending on scope.',
      },
      {
        q: 'Do you work with businesses outside the UK and USA?',
        a: 'Yes. We work with businesses across Europe and beyond. All communication is in English and we work across time zones.',
      },
      {
        q: 'Will my website rank on Google?',
        a: 'We build every site with on-page SEO fundamentals in place — correct structure, fast loading, schema markup, clean code. For ongoing ranking improvement, we offer a separate SEO service.',
      },
      {
        q: 'Can I update the website myself after launch?',
        a: 'Yes. WordPress and Shopify sites are fully editable by non-technical users. We provide a handover session and documentation so you can manage content without a developer.',
      },
      {
        q: 'Do you offer website maintenance?',
        a: 'Yes. Monthly maintenance packages cover security updates, plugin updates, backups, uptime monitoring, and small content changes.',
      },
    ],
  },
  {
    slug: 'software-development',
    serviceNumber: '02',
    name: 'Software Development',
    navLabel: 'Software Development',
    heroLabel: 'Service 02 / Software Development',
    heroTitle: 'Software built around your business.',
    heroAccent: 'business.',
    heroDescription:
      'Custom CRMs, client portals, dashboards, and business tools that replace the pile of SaaS subscriptions slowing you down.',
    metaTitle: 'Custom Software Development Services | USA · UK · Europe',
    metaDescription:
      'Custom CRMs, client portals, dashboards, and business tools built to replace the SaaS stack. Serving businesses in the USA, UK, and Europe.',
    keywords: [
      'custom software development',
      'CRM development',
      'client portals',
      'business dashboards',
      'booking systems',
      'API integrations',
      'SaaS alternatives',
      'business automation',
    ],
    whatWeBuild: [
      {
        num: '01',
        title: 'Custom CRM Systems',
        body: 'Built to match your exact sales process, pipeline stages, and reporting needs. Integrated with your email, calendar, and communication tools.',
        idealFor: 'Sales teams, agencies, service businesses',
      },
      {
        num: '02',
        title: 'Client & Partner Portals',
        body: 'Secure online portals where clients log in, view project status, submit documents, make payments, and communicate — all under your brand.',
        idealFor: 'Agencies, consultancies, service firms',
      },
      {
        num: '03',
        title: 'Business Dashboards',
        body: 'Real-time dashboards pulling data from Google Analytics, your CRM, e-commerce, and accounting into one place your team can actually use.',
        idealFor: 'Ops teams, leadership reporting',
      },
      {
        num: '04',
        title: 'Booking & Scheduling Systems',
        body: 'Custom booking platforms for service businesses. Multi-location, multi-staff, automated reminders, payment collection, calendar integrations.',
        idealFor: 'Clinics, studios, service providers',
      },
      {
        num: '05',
        title: 'Inventory & Operations Tools',
        body: 'Workflow management, inventory tracking, order processing, and operational platforms built around your specific business process.',
        idealFor: 'E-commerce, manufacturing, retail ops',
      },
      {
        num: '06',
        title: 'API Integrations & Middleware',
        body: 'Connect existing tools. Build custom APIs. Migrate data between platforms. Make systems talk that were never designed to.',
        idealFor: 'Complex tooling, legacy integration',
      },
    ],
    processSteps: [
      {
        num: 'STEP 01',
        title: 'Workflow Audit',
        body: 'We map your current workflow, identify the points of friction, and define exactly what the software needs to do — and what it does not need to do.',
        duration: 'Week 1',
      },
      {
        num: 'STEP 02',
        title: 'Technical Architecture',
        body: 'Database design, API structure, authentication model. We document the system before writing it so you know what you are getting.',
        duration: 'Week 2',
      },
      {
        num: 'STEP 03',
        title: 'UI Design in Figma',
        body: 'Every screen designed and reviewed before development. We design for daily use — your team has to live in this for years.',
        duration: 'Weeks 2–3',
      },
      {
        num: 'STEP 04',
        title: 'Build & Integration',
        body: 'Backend, frontend, integrations. Built in working iterations so you see progress every week and can give feedback while changes are cheap.',
        duration: 'Weeks 4–10',
      },
      {
        num: 'STEP 05',
        title: 'Testing & Migration',
        body: 'QA across browsers and devices. Data migration from existing systems. Staff training and rollout plan.',
        duration: 'Week 11',
      },
      {
        num: 'STEP 06',
        title: 'Launch & Ongoing Support',
        body: 'Go-live, monitoring, bug fixes. Optional ongoing support contract for new features and improvements.',
        duration: 'Ongoing',
      },
    ],
    techStack: [
      { cat: 'Backend', tools: 'PHP · Laravel · Node.js · Python' },
      { cat: 'Frontend', tools: 'React · Next.js · Tailwind CSS' },
      { cat: 'Database', tools: 'MySQL · PostgreSQL · Supabase · SQLite' },
      { cat: 'Auth', tools: 'Supabase Auth · NextAuth · Laravel Sanctum' },
      { cat: 'APIs', tools: 'REST · GraphQL · Stripe · Twilio · SendGrid' },
      { cat: 'Hosting', tools: 'AWS · DigitalOcean · Vercel · Cloudflare' },
    ],
    whyUs: [
      {
        num: '01',
        title: 'We replace tools, not add them.',
        body: 'Most agencies build software that adds to your stack. We build software that lets you cancel three or four other tools — that is the win.',
      },
      {
        num: '02',
        title: 'Designed for daily use.',
        body: 'Your team will live in this software for years. We design it as if we were the ones using it eight hours a day. UX is a feature, not an afterthought.',
      },
      {
        num: '03',
        title: 'No proprietary lock-in.',
        body: 'You own the source code. Hosted on infrastructure you control. No monthly SaaS fees creeping up year after year.',
      },
    ],
    faqs: [
      {
        q: 'How long does custom software take to build?',
        a: 'Most projects take 8–14 weeks from kickoff. Simpler tools (CRM customisations, dashboards) can ship in 4–6 weeks. Larger platforms with multiple integrations may take 4–6 months.',
      },
      {
        q: 'Do you handle data migration from our existing system?',
        a: 'Yes. Migrating data from spreadsheets, legacy CRMs, or other tools is part of the build. We map fields, clean data, and validate the migration before go-live.',
      },
      {
        q: 'Can you integrate with our existing CRM / ERP / accounting tool?',
        a: 'Most likely yes. We integrate with the major platforms (HubSpot, Salesforce, QuickBooks, Xero, etc.) and can build custom integrations for niche tools.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do. We deliver the source code, design files, and full documentation at the end of every project. Hosted on your own infrastructure.',
      },
      {
        q: 'Do you offer ongoing support after launch?',
        a: 'Yes. Optional monthly retainers cover bug fixes, small feature additions, security updates, and on-call support. You are never locked in.',
      },
    ],
  },
  {
    slug: 'ai-automation',
    serviceNumber: '03',
    name: 'AI Automation Solutions',
    navLabel: 'AI Automation',
    heroLabel: 'Service 03 / AI Automation',
    heroTitle: 'Your business, running on autopilot.',
    heroAccent: 'autopilot.',
    heroDescription:
      'AI-powered automation systems that handle the repetitive work so your team can focus on what actually drives growth. Average client saves 20+ hours per week.',
    metaTitle: 'AI Automation Solutions for Business · USA · UK · Europe',
    metaDescription:
      'AI-powered automation for CRMs, lead follow-up, onboarding, and content workflows. Save 20+ hours per week. Serving the USA, UK, and Europe.',
    keywords: [
      'AI automation',
      'workflow automation',
      'n8n development',
      'Make.com automation',
      'AI integrations',
      'business process automation',
      'OpenAI integration',
      'lead automation',
    ],
    whatWeBuild: [
      {
        num: '01',
        title: 'Lead Generation & Follow-Up',
        body: 'Automated lead capture, instant qualification, personalised follow-up emails, CRM entry. Response time: under 2 minutes.',
        idealFor: 'B2B sales teams, agencies',
      },
      {
        num: '02',
        title: 'CRM & Sales Automation',
        body: 'Auto-populate your CRM from any source. Automated pipeline movement, deal reminders, task creation, reporting — no manual entry.',
        idealFor: 'Sales-heavy businesses',
      },
      {
        num: '03',
        title: 'Content & Marketing Workflows',
        body: 'AI-generated first drafts for blog posts, social content, and email sequences. Integrated with your CMS, email platform, and scheduler.',
        idealFor: 'Content-driven brands',
      },
      {
        num: '04',
        title: 'Client Onboarding',
        body: 'Automated onboarding triggered the moment a client signs. Contracts, welcome emails, intake forms, project setup, team notifications.',
        idealFor: 'Service businesses, agencies',
      },
      {
        num: '05',
        title: 'Document Processing',
        body: 'AI that reads incoming emails, PDFs, and forms, extracts key data, routes documents correctly, and notifies the right person.',
        idealFor: 'Legal, finance, admin-heavy ops',
      },
      {
        num: '06',
        title: 'Custom AI Integrations',
        body: 'OpenAI and Claude API integrations built into your existing tools. Chatbots, knowledge bases, AI-assisted writing, intelligent data processing.',
        idealFor: 'Tech-forward teams',
      },
    ],
    processSteps: [
      {
        num: 'STEP 01',
        title: 'Free Automation Audit',
        body: 'We spend 60 minutes mapping your workflows, identifying which tasks are eating the most time, and which are the best candidates for automation.',
        duration: 'Week 1',
      },
      {
        num: 'STEP 02',
        title: 'ROI Modeling',
        body: 'Before building, we model the time-saved and cost-saved for each automation. You see the ROI on paper before you commit a dollar.',
        duration: 'Week 1',
      },
      {
        num: 'STEP 03',
        title: 'Workflow Design',
        body: 'We design the automation flows in n8n or Make. Every decision branch, trigger, and AI call is documented before we build it.',
        duration: 'Week 2',
      },
      {
        num: 'STEP 04',
        title: 'Build & Test',
        body: 'Workflows built in your environment with your real data. Tested against edge cases. AI prompts refined for accuracy.',
        duration: 'Weeks 2–4',
      },
      {
        num: 'STEP 05',
        title: 'Rollout & Training',
        body: 'Go-live with monitoring. Team training on how the automations work, when they fire, and what to do when something needs human review.',
        duration: 'Week 5',
      },
      {
        num: 'STEP 06',
        title: 'Optimisation',
        body: 'First month of post-launch tuning. We watch how the automations perform, refine prompts, and add edge-case handling as needed.',
        duration: 'Month 2',
      },
    ],
    techStack: [
      { cat: 'Automation', tools: 'n8n · Make.com · Zapier' },
      { cat: 'AI APIs', tools: 'OpenAI (GPT-4o) · Anthropic Claude · Gemini' },
      { cat: 'Databases', tools: 'Airtable · Supabase · Notion · Google Sheets' },
      { cat: 'Comms', tools: 'Slack · WhatsApp Business · Twilio · SendGrid' },
      { cat: 'CRMs', tools: 'HubSpot · Salesforce · GoHighLevel · Custom' },
      { cat: 'Hosting', tools: 'Self-hosted n8n · Make Cloud · AWS' },
    ],
    whyUs: [
      {
        num: '01',
        title: 'ROI before code.',
        body: 'We model the time-saved and cost-saved before building. If the math does not work, we tell you. We will not build an automation just because we can.',
      },
      {
        num: '02',
        title: 'AI where it earns its place.',
        body: 'We use AI where it actually adds value — not as a marketing buzzword. Some automations use no AI at all. The result matters, not the label.',
      },
      {
        num: '03',
        title: 'Built in your environment.',
        body: 'Self-hosted n8n on your infrastructure or your Make.com account. You own and control the workflows. No black-box vendor dependency.',
      },
    ],
    faqs: [
      {
        q: 'How much can AI automation actually save us?',
        a: 'Most clients save 15–25 hours per week within the first 60 days. Typical investment is $2,000–$5,000 once, recovered in 6–8 weeks of saved labor.',
      },
      {
        q: 'Do we need technical staff to maintain this?',
        a: 'No. We build automations that run themselves and only require human attention when something genuinely needs review. We provide a dashboard that shows status at a glance.',
      },
      {
        q: 'What if OpenAI / Claude pricing changes?',
        a: 'Most automations use a small number of tokens per run. AI API costs are typically under $50/month even for high-volume use. We monitor and alert on cost spikes.',
      },
      {
        q: 'Can the automations be edited after launch?',
        a: 'Yes. We use n8n and Make.com because they are visual and editable by non-developers. You can pause, edit, or extend workflows yourself if you want.',
      },
      {
        q: 'What about data privacy?',
        a: 'We default to self-hosted n8n and use enterprise APIs (OpenAI / Anthropic enterprise) where sensitive data is involved. We never send PII to AI APIs without explicit configuration.',
      },
    ],
  },
  {
    slug: 'seo-services',
    serviceNumber: '04',
    name: 'SEO & Digital Marketing',
    navLabel: 'SEO & Digital Marketing',
    heroLabel: 'Service 04 / SEO & Digital Marketing',
    heroTitle: 'Rank higher. Get found. Convert more.',
    heroAccent: 'Convert more.',
    heroDescription:
      'SEO strategies built for measurable results, not vanity metrics. We help businesses in the USA and UK get found by the right people at the right time.',
    metaTitle: 'SEO & Digital Marketing Services · USA · UK · Europe',
    metaDescription:
      'White-hat SEO and digital marketing for businesses in the USA, UK, and Europe. Technical SEO, on-page, local SEO, content, link building, real reporting.',
    keywords: [
      'SEO services',
      'digital marketing',
      'technical SEO',
      'local SEO',
      'on-page SEO',
      'link building',
      'content SEO',
      'SEO audit',
    ],
    whatWeBuild: [
      {
        num: '01',
        title: 'On-Page SEO',
        body: 'Title tags, meta descriptions, heading structure, internal linking, content optimisation, image alt text, schema markup. The fundamentals, done right.',
        idealFor: 'Any site needing visibility',
      },
      {
        num: '02',
        title: 'Technical SEO',
        body: 'Core Web Vitals, crawlability, indexation, sitemaps, robots.txt, structured data, canonicals, mobile optimisation, page speed.',
        idealFor: 'Sites with hidden technical debt',
      },
      {
        num: '03',
        title: 'Local SEO',
        body: 'Google Business Profile optimisation, local citation building, review strategy, local landing pages, map pack ranking.',
        idealFor: 'Service businesses, clinics, retail',
      },
      {
        num: '04',
        title: 'Content SEO',
        body: 'Keyword research, content strategy, blog writing, topic cluster architecture, pillar page development.',
        idealFor: 'Brands competing on expertise',
      },
      {
        num: '05',
        title: 'Link Building',
        body: 'Digital PR, editorial outreach, guest posting, resource page links. White-hat only. No sketchy networks, no spam.',
        idealFor: 'Established sites ready to scale',
      },
      {
        num: '06',
        title: 'SEO Audits',
        body: 'Full technical and content audit with prioritised action plan. Delivered within 5 business days. Free for qualifying projects.',
        idealFor: 'Anyone wanting to know where they stand',
      },
    ],
    processSteps: [
      {
        num: 'STEP 01',
        title: 'Free SEO Audit',
        body: 'Full technical, content, and backlink audit. We deliver a written report with prioritised actions within 5 business days. Free for qualifying sites.',
        duration: 'Week 1',
      },
      {
        num: 'STEP 02',
        title: 'Strategy & Roadmap',
        body: 'Based on audit findings, target keywords, and competitive landscape, we build a 90-day SEO roadmap with measurable KPIs.',
        duration: 'Week 2',
      },
      {
        num: 'STEP 03',
        title: 'Technical Foundation',
        body: 'Fix the technical issues that are holding everything else back. Page speed, schema, crawlability, indexation.',
        duration: 'Weeks 3–5',
      },
      {
        num: 'STEP 04',
        title: 'Content & On-Page',
        body: 'Optimise existing pages. Create new content targeting priority keywords. Build internal linking architecture.',
        duration: 'Weeks 6–12',
      },
      {
        num: 'STEP 05',
        title: 'Authority Building',
        body: 'Editorial outreach, digital PR, and resource links to earn high-quality backlinks. White-hat only.',
        duration: 'Months 3–6',
      },
      {
        num: 'STEP 06',
        title: 'Monthly Reporting',
        body: 'Real reports on rankings, organic traffic, and leads generated. Not "impressions" and "awareness."',
        duration: 'Ongoing',
      },
    ],
    techStack: [
      { cat: 'Research', tools: 'Ahrefs · SEMrush · Google Search Console' },
      { cat: 'Technical', tools: 'Screaming Frog · Sitebulb · PageSpeed Insights' },
      { cat: 'Analytics', tools: 'GA4 · Looker Studio · Hotjar · Microsoft Clarity' },
      { cat: 'Schema', tools: 'JSON-LD · Schema.org · Rich Results Test' },
      { cat: 'Content', tools: 'Surfer SEO · Clearscope · ChatGPT · Claude' },
      { cat: 'Local SEO', tools: 'GBP · BrightLocal · Whitespark · Moz Local' },
    ],
    whyUs: [
      {
        num: '01',
        title: 'Foundation first.',
        body: 'Most agencies start with content and backlinks. We start with technical health, because a fast, crawlable, well-structured site amplifies everything else.',
      },
      {
        num: '02',
        title: 'Real reporting.',
        body: 'We report on rankings, organic traffic, and leads — not "impressions" and "brand awareness." You know exactly what your investment is producing.',
      },
      {
        num: '03',
        title: 'SEO + Web in one team.',
        body: 'When your site needs a technical fix, our development team handles it immediately. No waiting on a separate agency to communicate with your developer.',
      },
    ],
    faqs: [
      {
        q: 'How long until I see ranking improvements?',
        a: 'Technical fixes and on-page work show movement in 4–8 weeks. Content and link-driven ranking improvements typically take 3–6 months for competitive terms.',
      },
      {
        q: 'Do you guarantee #1 rankings?',
        a: 'No, and run from anyone who does. Google rankings depend on factors we cannot control. What we guarantee is the work: audit, strategy, execution, and transparent reporting.',
      },
      {
        q: 'Are you white-hat?',
        a: 'Always. We do not use PBNs, link farms, or any tactics that risk a Google penalty. Every link we build is editorial, contextual, and earned.',
      },
      {
        q: 'Do we need to keep paying you forever?',
        a: 'No. SEO benefits compound, so most clients work with us for 6–18 months and then move to a lighter quarterly review. We are not a retainer trap.',
      },
      {
        q: 'Can you work with my current site or do I need a new one?',
        a: 'Most sites can be improved without a full rebuild. We audit first. Only if the existing site has fundamental issues (page builder bloat, poor architecture) do we recommend a rebuild.',
      },
    ],
  },
];

export const serviceBySlug: Record<string, Service> = Object.fromEntries(
  services.map((s) => [s.slug, s] as const)
);
