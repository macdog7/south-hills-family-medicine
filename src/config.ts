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

/**
 * Announced-but-not-yet-effective changes, shown in the site-wide MoveBanner.
 * The live NAP/hours in BUSINESS below stay accurate to *today* (search
 * engines and patients rely on them), and switch over when each change happens:
 *
 *   - On/after Dec 1, 2026 (the move): set `BUSINESS.address = UPCOMING.address`
 *     and `BUSINESS.mapUrl = UPCOMING.mapUrl`.
 *   - In January 2027 (Mon–Fri schedule): set `BUSINESS.hours = UPCOMING.hours`,
 *     and update Airica's `schedule` line in src/data/providers.ts.
 *   - Once both are live, remove <MoveBanner /> from Header.astro,
 *     <MoveAnnouncement /> from index.astro, the footer move notice, the
 *     move sentence in the location FAQ, the "Is South Hills Medicine
 *     moving?" FAQ, and the `notice` colors in global.css.
 */
export const UPCOMING = {
  moveDate: "December 1",
  address: {
    street: "2748 Colonial Dr",
    city: "Helena",
    region: "MT",
    postalCode: "59601",
    country: "US",
  },
  mapUrl:
    "https://maps.google.com/?q=South+Hills+Medicine+2748+Colonial+Dr+Helena+MT+59601",
  hoursStart: "January",
  /** Office hours once the Monday–Friday schedule starts. */
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
} as const;

export const BUSINESS = {
  /** Primary customer-facing brand name. Use this verbatim everywhere. */
  name: "South Hills Medicine",
  /** Registered / legacy names, kept so search engines resolve them to one entity. */
  legalName: "South Hills Internal Medicine Associates, PLLP",
  alternateNames: ["South Hills Family Medicine", "South Hills Internal Medicine"],

  phone: "+14064422205",
  phoneDisplay: "(406) 442-2205",
  email: "info@south-hills-medicine.com",

  /** Current address. On Dec 1, 2026 switch to UPCOMING.address (see above). */
  address: {
    street: "301 Saddle Dr Suite D",
    city: "Helena",
    region: "MT",
    postalCode: "59601",
    country: "US",
  },

  /** Current office hours: Monday–Thursday 8:00 AM–5:00 PM. Days not listed
   *  are closed. In January 2027 switch to UPCOMING.hours (see above). */
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

  /** Switch to UPCOMING.mapUrl together with the address. */
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

const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** Days the office is closed (any day not listed in BUSINESS.hours), joined
 *  for display — e.g. "Friday, Saturday, and Sunday" or "Saturday and Sunday".
 *  Derived so the "closed" text can't disagree with the open hours. */
export function closedDays(conjunction = "and"): string {
  const open = new Set<string>(BUSINESS.hours.flatMap((h) => [...h.days]));
  const closed = WEEK.filter((d) => !open.has(d));
  if (closed.length <= 2) return closed.join(` ${conjunction} `);
  const serial = conjunction === "and" ? "," : ""; // Oxford comma only for "and"
  return `${closed.slice(0, -1).join(", ")}${serial} ${conjunction} ${closed[closed.length - 1]}`;
}
