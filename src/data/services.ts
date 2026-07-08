// Single source of truth for the service cards. Consumed by Services.astro for
// rendering and by index.astro to emit `availableService` structured data, so
// the visible services and the schema stay in sync (medical E-E-A-T).

/** Long-form content for a dedicated /services/<slug> page. A page is generated
 *  ONLY when a service has a `detail`, so services without real content never
 *  ship a thin page. Author this from the practice's own knowledge — it's YMYL
 *  medical content held to a high E-E-A-T bar; don't pad with generic filler. */
export interface ServiceDetail {
  /** Optional overrides for the page's <title> / meta description. Falls back
   *  to a generated title and the card `description` if omitted. */
  metaTitle?: string;
  metaDescription?: string;
  /** Lead paragraph(s) at the top of the page. */
  intro: string[];
  /** Body sections, each a heading + paragraphs. Flexible — e.g.
   *  "Conditions we treat", "What to expect", "Who it's for". */
  sections?: { heading: string; body: string[] }[];
}

export interface ServiceCard {
  /** Key into `iconPaths` below. */
  icon: string;
  /** URL segment for the detail page: /services/<slug>. */
  slug: string;
  title: string;
  description: string;
  /** Present ⇒ a /services/<slug> page is generated and the card links to it. */
  detail?: ServiceDetail;
}

// NOTE: the `detail` blocks below are STARTER content — accurate, general copy
// that elaborates on each card blurb and the provider bios, written to be safe
// to publish but intended for the practice to review and replace with its own
// voice and specifics. Keep it accurate; don't add claims the practice can't stand behind.
export const services: ServiceCard[] = [
  {
    icon: "users",
    slug: "primary-care",
    title: "Primary Care",
    description:
      "Annual wellness exams, preventive screenings, and routine physicals designed to keep you healthy year-round. We focus on early detection, lifestyle support, and personalized health planning.",
    detail: {
      intro: [
        "Primary care is the foundation of lifelong health. At South Hills Medicine in Helena, Montana, our nurse practitioners provide comprehensive primary care for adults 18 and older — the routine checkups, preventive screenings, and everyday guidance that help you stay well and catch problems early.",
        "We take the time to understand your history and your goals so your care is personalized, coordinated, and centered on you.",
      ],
      sections: [
        {
          heading: "What's included",
          body: [
            "Your primary care visits cover annual wellness exams and routine physicals, preventive screenings appropriate for your age and risk factors, immunizations, and counseling on nutrition, activity, and other lifestyle factors that shape long-term health.",
            "When a concern falls outside our scope, we help coordinate referrals and follow-up with trusted specialists so nothing falls through the cracks.",
          ],
        },
        {
          heading: "What to expect at your visit",
          body: [
            "We review your health history, current medications, and any concerns, then work with you on a clear, realistic plan. We welcome your questions and want you to leave understanding your health and your next steps.",
          ],
        },
        {
          heading: "Who it's for",
          body: [
            "We care for adults 18 and older. Whether you're establishing care, due for a checkup, or managing several health needs at once, we're here to be your medical home.",
          ],
        },
      ],
    },
  },
  {
    icon: "trending",
    slug: "chronic-condition-management",
    title: "Chronic Condition Management",
    description:
      "Expert management of diabetes, hypertension, heart disease, and other ongoing health conditions with regular monitoring and personalized treatment plans.",
    detail: {
      intro: [
        "Living well with an ongoing health condition takes steady, attentive care. At South Hills Medicine in Helena, our nurse practitioners help adults manage chronic conditions with regular monitoring, personalized treatment plans, and support between visits.",
        "Our goal is to help you keep your condition well-controlled, prevent complications, and feel your best day to day.",
      ],
      sections: [
        {
          heading: "Conditions we help manage",
          body: [
            "We provide ongoing care for common chronic conditions including diabetes, high blood pressure (hypertension), heart disease, high cholesterol, and thyroid disorders. If you're managing more than one condition, we coordinate your care so your treatments work together.",
          ],
        },
        {
          heading: "How ongoing care works",
          body: [
            "Chronic care is a partnership. We track your numbers over time, adjust medications as needed, order appropriate lab work and screenings, and check in on how treatment fits your life. We'll help you understand your condition and the small, sustainable changes that make the biggest difference.",
          ],
        },
        {
          heading: "When to reach out",
          body: [
            "Between scheduled visits, call us if your symptoms change, your readings move outside your usual range, or you have questions about your medications. Staying in touch helps us catch issues early.",
          ],
        },
      ],
    },
  },
  {
    icon: "checkmark",
    slug: "acute-care-same-day-visits",
    title: "Acute Care & Same-Day Visits",
    description:
      "Prompt attention for urgent health concerns, including infections, injuries, and sudden illness. We prioritize getting you seen quickly when you need care.",
    detail: {
      intro: [
        "When you're suddenly unwell, you shouldn't have to wait days to be seen. South Hills Medicine offers acute care and same-day visits for adults in Helena, so you can get prompt attention for new or urgent health concerns.",
        "Being seen by a provider who knows you — and has your history — often means faster, more personalized care than an urgent care or emergency room visit for non-emergencies.",
      ],
      sections: [
        {
          heading: "What we treat same-day",
          body: [
            "Same-day and acute visits are a good fit for concerns like colds and flu, sore throats, sinus and respiratory infections, urinary tract infections, minor injuries, rashes, and other sudden illnesses. If you're not sure whether we can help, give us a call.",
          ],
        },
        {
          heading: "How to be seen quickly",
          body: [
            "Call us as early in the day as you can. We prioritize getting you in when you need care, and we'll let you know the soonest available option.",
          ],
        },
        {
          heading: "When to seek emergency care instead",
          body: [
            "For life-threatening symptoms — such as chest pain, difficulty breathing, signs of a stroke, severe bleeding, or a serious injury — call 911 or go to the nearest emergency room. Same-day visits are for urgent but non-emergency concerns.",
          ],
        },
      ],
    },
  },
  {
    icon: "pills",
    slug: "medication-management",
    title: "Medication Management",
    description:
      "Safe, thoughtful prescribing and regular review of all your medications, including refills, dose adjustments, and monitoring for interactions or side effects.",
    detail: {
      intro: [
        "The right medications, at the right doses, reviewed regularly — that's the heart of safe, effective treatment. At South Hills Medicine in Helena, our nurse practitioners provide thoughtful medication management for adults 18 and older.",
        "Whether you take one prescription or several, we help make sure your medications are working together and working for you.",
      ],
      sections: [
        {
          heading: "What's included",
          body: [
            "We handle prescribing and refills, review your full medication list at your visits, adjust doses when needed, and monitor for interactions and side effects. If you see other providers, we work to keep your medication list accurate and up to date.",
          ],
        },
        {
          heading: "Why regular review matters",
          body: [
            "Medications and health needs change over time. Periodic review helps us simplify your regimen where possible, catch potential interactions, and make sure every prescription still has a clear purpose.",
          ],
        },
        {
          heading: "Questions about your medications",
          body: [
            "If you have concerns about cost, side effects, or how to take something correctly, bring them to your visit or call us — these conversations are an important part of your care.",
          ],
        },
      ],
    },
  },
  {
    icon: "heart",
    slug: "womens-health",
    title: "Women's Health",
    description:
      "Comprehensive care including well-woman exams, contraception counseling, hormone-focused care, perimenopause and menopause management, and preventive screening tailored to every stage of life.",
    detail: {
      intro: [
        "Women's health needs change through every stage of life. South Hills Medicine in Helena provides comprehensive women's health care for adults — from routine well-woman visits to hormone-focused and menopause care.",
        "Our nurse practitioners offer attentive, personalized care in a comfortable setting, taking time to listen and to explain your options clearly.",
      ],
      sections: [
        {
          heading: "Services we offer",
          body: [
            "Our women's health care includes well-woman exams, contraception counseling, hormone-focused care, and preventive screenings tailored to your age and history.",
          ],
        },
        {
          heading: "Perimenopause & menopause",
          body: [
            "Perimenopause and menopause can bring a wide range of changes. We help you understand what's happening and discuss evidence-based options to manage symptoms and protect your long-term health.",
          ],
        },
        {
          heading: "Fertility & hormonal health (FEMM)",
          body: [
            "Megan Macke, DNP, FNP, has pursued advanced training in Fertility Education and Medical Management (FEMM), offering guidance on hormonal health, menstrual cycles, and evidence-based care that supports ovulation and fertility.",
          ],
        },
      ],
    },
  },
  {
    icon: "shield",
    slug: "mens-health",
    title: "Men's Health",
    description:
      "Focused care for men's unique health needs, including prostate screening, cardiovascular risk assessment, and preventive health counseling.",
    detail: {
      intro: [
        "Men are less likely to see a provider regularly — and more likely to put off care. South Hills Medicine in Helena offers focused men's health care for adults 18 and older, built around prevention and staying ahead of problems.",
        "A relationship with a provider who knows your history makes it easier to keep up with the screenings and habits that protect your health.",
      ],
      sections: [
        {
          heading: "What we focus on",
          body: [
            "Men's health visits include preventive screenings, prostate health discussion and screening as appropriate, cardiovascular risk assessment, and counseling on the lifestyle factors — activity, nutrition, sleep, and stress — that most affect long-term health.",
          ],
        },
        {
          heading: "Prevention that pays off",
          body: [
            "Many of the most serious men's health concerns are more manageable when caught early. Routine checkups let us track key numbers over time and act before small issues become big ones.",
          ],
        },
        {
          heading: "Who it's for",
          body: [
            "We care for men 18 and older, whether you're establishing care, overdue for a checkup, or want to get proactive about your health.",
          ],
        },
      ],
    },
  },
];

export const iconPaths: Record<string, string> = {
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 7a4 4 0 1 1 0-8 4 4 0 0 1 0 8z",
  trending: "M22 12h-4l-3 9L9 3l-3 9H2",
  checkmark: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4l-10 10.01-3-3.01",
  pills: "M22 12h-4l-3 9L9 3l-3 9H2M15 9l-3 9-3-9m0 0h6",
  heart:
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};
