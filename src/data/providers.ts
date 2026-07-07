import type { ImageMetadata } from "astro";
import careyImg from "../assets/bio_carey.png";
import airicaImg from "../assets/bio_airica.JPG";
import meganImg from "../assets/bio_megan2.JPG";

export interface Provider {
  id: string;
  name: string;
  /** Post-nominal letters as shown on the page, e.g. "DNP, FNP-C". */
  credentials: string;
  /** Plain-language role, used for schema.org Person `jobTitle`. */
  jobTitle: string;
  status?: string;
  image: ImageMetadata;
  /** Institutions attended, for schema.org `alumniOf`. */
  alumniOf: string[];
  /** Clinical focus areas, for schema.org `knowsAbout`. */
  knowsAbout: string[];
  bio: string[];
}

// Single source of truth for provider info. Consumed by Providers.astro for
// rendering and by index.astro to emit Person structured data — keeping the
// visible page and the schema in sync (important for medical E-E-A-T).
export const providers: Provider[] = [
  {
    id: "carey",
    name: "Carey Phelan",
    credentials: "DNP, FNP-C",
    jobTitle: "Family Nurse Practitioner",
    image: careyImg,
    alumniOf: ["Gonzaga University"],
    knowsAbout: [
      "Primary care",
      "Critical care",
      "Internal medicine",
      "Mental health",
    ],
    bio: [
      "A board-certified Family Nurse Practitioner who earned her Doctor of Nursing Practice degree from Gonzaga University—GO ZAGS!",
      "She brings a diverse clinical background, having practiced in critical care/ER, internal medicine, mental health, and care for the developmentally delayed population.",
      "Outside of her practice, Carey enjoys scuba diving with her husband, gardening, and spending time with her beloved dogs.",
    ],
  },
  {
    id: "airica",
    name: "Airica Rishavy",
    credentials: "DNP, FNP",
    jobTitle: "Family Nurse Practitioner",
    status: "✓ Accepting New Patients",
    image: airicaImg,
    alumniOf: ["Montana State University", "Regis University"],
    knowsAbout: [
      "Primary care",
      "Urgent care",
      "Emergency medicine",
      "Post-anesthesia care",
    ],
    bio: [
      "Earned her Doctor of Nursing Practice from Montana State University, after earning a Bachelor of Science in Nursing from Regis University and a Bachelor of Science in Sociology from Montana State University.",
      "Her nursing background includes experience in Urgent Care, Same Day Services, the Post-Anesthesia Care Unit (PACU), and the Emergency Department.",
      "She is board-certified by the American Academy of Nurse Practitioners.",
      "A proud Montana native, Airica enjoys spending time outdoors. She finds peace and joy on the trails with her husband, Andy, and their dog, Willow, by her side.",
    ],
  },
  {
    id: "megan",
    name: "Megan Macke",
    credentials: "DNP, FNP",
    jobTitle: "Family Nurse Practitioner",
    status: "✓ Accepting New Patients",
    image: meganImg,
    alumniOf: ["University of Mary"],
    knowsAbout: [
      "Primary care",
      "Women's health",
      "Fertility Education and Medical Management (FEMM)",
      "Hormonal and menstrual health",
    ],
    bio: [
      "A board-certified Family Nurse Practitioner who earned her Doctor of Nursing Practice degree from the University of Mary in Bismarck, ND. Originally from Billings, MT, she is proud to serve the Helena community.",
      "Megan has a special interest in women's health and primary care. She has pursued advanced training in Fertility Education and Medical Management (FEMM) to provide patients with comprehensive guidance on hormonal health, menstrual cycles, and evidence-based care options supporting ovulation/fertility.",
      "In addition to her clinical work, Megan enjoys life with her husband, their three kids, and their Goldendoodle. Together, they love spending time outdoors camping, boating, along with traveling internationally.",
    ],
  },
];
