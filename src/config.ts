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

  /** Office hours. Open Monday–Thursday 8:00 AM–5:00 PM; closed Friday–Sunday. */
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],

  priceRange: "$$",
  /** Insurance plans accepted, for display on the page. */
  acceptedInsurers: [
    "Aetna",
    "Allegiance",
    "Blue Cross Blue Shield",
    "Boulder Administrative Services",
    "Cigna",
    "Mountain Health CO-OP",
    "PacificSource",
    "UnitedHealthcare",
    "Western Mutual Insurance",
  ],
  insuranceNote: "We do not accept Medicare, Medicaid, or Tricare.",

  mapUrl:
    "https://maps.google.com/?q=South+Hills+Medicine+301+Saddle+Dr+Helena+MT+59601",

  /** Profiles that reference this business, for schema.org `sameAs`. */
  sameAs: ["https://www.facebook.com/profile.php?id=100064733118312"],
} as const;

/** "08:00" -> "8:00 AM". Keeps human-readable hours derived from the same
 *  24-hour values the schema uses, so the visible page can't drift from it. */
function to12Hour(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

/** Accepted insurers as a human-readable, comma-separated list with a final
 *  "and" (e.g. "Aetna, Allegiance, and Cigna"). */
export function acceptedInsurersList(): string {
  const list = BUSINESS.acceptedInsurers;
  if (list.length <= 1) return list.join("");
  return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
}

/** Human-readable office hours (e.g. "Monday – Friday", "8:00 AM – 5:00 PM")
 *  for display, derived from BUSINESS.hours. Days not listed are closed. */
export function officeHours(): { days: string; time: string }[] {
  return BUSINESS.hours.map((h) => ({
    days:
      h.days.length > 1
        ? `${h.days[0]} – ${h.days[h.days.length - 1]}`
        : h.days[0],
    time: `${to12Hour(h.opens)} – ${to12Hour(h.closes)}`,
  }));
}
