import { BUSINESS, officeHours } from "../config";

export interface FAQ {
  question: string;
  answer: string;
}

const { address, phoneDisplay, phone } = BUSINESS;
const hoursLine = officeHours()
  .map((h) => `${h.days}, ${h.time}`)
  .join("; ");

// FAQ content is built strictly from facts already stated elsewhere on the site
// (config.ts NAP/hours/insurance, the "adults 18 and older" scope, and the
// provider "Accepting New Patients" badges). Consumed by Faq.astro for the
// visible accordion and by index.astro to emit FAQPage structured data, so the
// on-page answers and the schema always match. Nothing here is invented — if a
// fact changes, update config.ts and it flows through.
export const faqs: FAQ[] = [
  {
    question: "Is South Hills Medicine accepting new patients?",
    answer: `Some of our nurse practitioners are currently accepting new patients. Please call us at ${phoneDisplay} to check current availability.`,
  },
  {
    question: "What ages do you see?",
    answer:
      "South Hills Medicine provides primary care for adults 18 and older.",
  },
  {
    question: "What insurance do you accept?",
    answer: BUSINESS.insuranceNote,
  },
  {
    question: "What are your office hours?",
    answer: `Our office is open ${hoursLine}. We are closed on weekends.`,
  },
  {
    question: "Where is South Hills Medicine located?",
    answer: `We are located at ${address.street}, ${address.city}, ${address.region} ${address.postalCode}.`,
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer primary and preventive care, chronic condition management, acute and same-day visits, medication management, and women's and men's health.",
  },
  {
    question: "How do I schedule an appointment?",
    answer: `Call us at ${phoneDisplay} (${phone}) to schedule an appointment.`,
  },
];
