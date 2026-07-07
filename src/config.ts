/**
 * Single source of truth for the site's SEO + NAP (Name, Address, Phone) data.
 *
 * Search engines cross-check this against directory listings (Google Business
 * Profile, Yelp, Healthgrades, ...). Inconsistent NAP hurts local ranking, so
 * anything used for SEO — the meta tags in Layout.astro, the JSON-LD in
 * index.astro, and robots.txt — reads from here. Keep it accurate.
 */

export const SITE_URL = "https://www.southhillsinternalmedicine.com";

export const SITE_TITLE =
  "South Hills Medicine | Primary Care Clinic in Helena, MT";
export const SITE_DESCRIPTION =
  "Compassionate, thorough primary care for adults 18 and older in Helena, Montana. Preventive care, chronic condition management, women's & men's health, and same-day visits.";

/** Absolute URL of the social-share / Open Graph image. Must be a real file at
 *  the site root — add public/og-image.jpg (1200x630) to the deploy. */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const BUSINESS = {
  /** Primary customer-facing brand name. Use this verbatim everywhere. */
  name: "South Hills Medicine",
  /** Registered / legacy names, kept so search engines resolve them to one entity. */
  legalName: "South Hills Internal Medicine Associates, PLLP",
  alternateNames: ["South Hills Family Medicine", "South Hills Internal Medicine"],

  phone: "+14064422205",
  phoneDisplay: "(406) 442-2205",
  email: "info@south-hills-medicine.com",

  address: {
    street: "301 Saddle Dr Suite D",
    city: "Helena",
    region: "MT",
    postalCode: "59601",
    country: "US",
  },

  /** Office hours. Open Monday–Friday 8:00 AM–5:00 PM; closed weekends. */
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],

  priceRange: "$$",
  insuranceNote: "We do not accept Medicare, Medicaid, or Tricare.",

  mapUrl:
    "https://maps.google.com/?q=South+Hills+Medicine+301+Saddle+Dr+Helena+MT+59601",

  /** Profiles that reference this business, for schema.org `sameAs`. */
  sameAs: ["https://www.facebook.com/profile.php?id=100064733118312"],
} as const;
