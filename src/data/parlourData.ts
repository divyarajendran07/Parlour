import heroSalonImg from '@/src/assets/images/hero_luxury_salon_1791195457016.jpg';
import hairStylingImg from '@/src/assets/images/service_hair_styling_1791195470481.jpg';
import facialRitualImg from '@/src/assets/images/service_facial_ritual_1791195489943.jpg';
import bridalGlamourImg from '@/src/assets/images/service_bridal_glamour_1791195502931.jpg';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'skin' | 'bridal' | 'nails' | 'brows';
  durationMinutes: number;
  price: number;
  description: string;
  specialistNote: string;
  image?: string;
  popular?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialties: string[];
  initials: string;
  accentColor: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  treatment: string;
  quote: string;
  rating: number;
  date: string;
}

export interface BookingRecord {
  id: string;
  bookingCode: string;
  serviceIds: string[];
  serviceNames: string[];
  totalPrice: number;
  totalDuration: number;
  specialistId: string;
  specialistName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  createdAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export const PARLOUR_IMAGES = {
  hero: heroSalonImg,
  hair: hairStylingImg,
  facial: facialRitualImg,
  bridal: bridalGlamourImg,
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'hair-balayage',
    name: 'Bespoke Balayage & Gloss Ritual',
    category: 'hair',
    durationMinutes: 150,
    price: 245,
    description: 'Custom hand-painted multidimensional dimension finished with a pH-balancing peptide gloss and botanical scalp bath.',
    specialistNote: 'Includes full consultation, custom toning, and blow-dry style.',
    image: hairStylingImg,
    popular: true,
  },
  {
    id: 'hair-couture-cut',
    name: 'Architectural Cut & Organic Finish',
    category: 'hair',
    durationMinutes: 60,
    price: 95,
    description: 'Face-framing precision tailoring adapted to hair density, bone structure, and organic movement with signature thermal finish.',
    specialistNote: 'Complementary dry texture analysis & botanical mist.',
    image: hairStylingImg,
  },
  {
    id: 'hair-keratin-silk',
    name: 'Bio-Protein Keratin Silk Glaze',
    category: 'hair',
    durationMinutes: 120,
    price: 210,
    description: 'Formaldehyde-free smoothing therapy infused with camellia seed oil that eliminates frizz while preserving natural bounce for 16 weeks.',
    specialistNote: 'Heat-activated molecular seal with mirror gloss shine.',
  },
  {
    id: 'hair-scalp-therapy',
    name: 'Trichology Scalp Detox & Head Spa',
    category: 'hair',
    durationMinutes: 60,
    price: 110,
    description: 'Japanese head-spa hydro-massage, exfoliation of micro-buildup, ultrasonic micro-mist infusion, and acupressure release.',
    specialistNote: 'Features cold-pressed rosemary and blue tansy scalp elixir.',
  },
  {
    id: 'skin-hydra-cellular',
    name: 'Cellular Luminous Hydrafacial',
    category: 'skin',
    durationMinutes: 75,
    price: 185,
    description: 'Quad-action dermal infusion with gentle vortex suction, multi-molecular hyaluronic acid, peptide matrix, and cryo-firming wand.',
    specialistNote: 'Zero downtime; leaves skin deeply hydrated and camera-ready.',
    image: facialRitualImg,
    popular: true,
  },
  {
    id: 'skin-24k-lift',
    name: '24K Gold Stem Cell Lifting Facial',
    category: 'skin',
    durationMinutes: 90,
    price: 260,
    description: 'Medical-grade plant stem cells, 24-karat gold foil micro-infusion, microcurrent muscle tone therapy, and lymphatic drainage.',
    specialistNote: 'Noticeable sculpting along cheekbones and jawline.',
    image: facialRitualImg,
  },
  {
    id: 'skin-bio-renewal',
    name: 'Bio-Enzymatic Brightening Peel',
    category: 'skin',
    durationMinutes: 60,
    price: 140,
    description: 'Gentle fruit enzyme and lactic resurfacing formulated for delicate skin to lift pigmentation and refine texture without redness.',
    specialistNote: 'Finished with calming cold chamomile compress.',
  },
  {
    id: 'bridal-couture-suite',
    name: 'Haute Bridal Hair & Airbrush Makeup',
    category: 'bridal',
    durationMinutes: 180,
    price: 360,
    description: 'Complete high-fashion bridal styling including bespoke veil/ornament pinning, luminous waterproof airbrush complexion, and silk lashes.',
    specialistNote: 'Includes full-sized touch-up kit and crystal setting spray.',
    image: bridalGlamourImg,
    popular: true,
  },
  {
    id: 'bridal-trial-session',
    name: 'Bridal Vision Consultation & Trial',
    category: 'bridal',
    durationMinutes: 120,
    price: 195,
    description: 'Two complete look transitions, veil pairing, lighting testing under daylight and warm reception simulation.',
    specialistNote: 'High-resolution preview shots provided for reference.',
    image: bridalGlamourImg,
  },
  {
    id: 'bridal-bridesmaid-glow',
    name: 'Bridal Party Radiance & Chignon',
    category: 'bridal',
    durationMinutes: 90,
    price: 160,
    description: 'Elegantly synchronized soft glam makeup with textured bun, modern half-up twist, or relaxed Hollywood waves.',
    specialistNote: 'Ideal for mothers of the bride and bridal party.',
  },
  {
    id: 'nails-japanese-gel',
    name: 'Japanese Couture Gel Manicure',
    category: 'nails',
    durationMinutes: 75,
    price: 85,
    description: 'Dry Russian-style cuticle preparation followed by high-adhesion breathable Japanese gel and bespoke minimalist nail art.',
    specialistNote: 'Non-damaging removal and 4+ week chip-resistant longevity.',
  },
  {
    id: 'nails-spa-pedicure',
    name: 'Botanical Sea Salt Ritual Pedicure',
    category: 'nails',
    durationMinutes: 60,
    price: 90,
    description: 'Aromatherapeutic warm soak, organic eucalyptus volcanic scrub, callus smoothing, hot stone calf massage, and sheer gloss polish.',
    specialistNote: 'Includes warmed lavender herbal booties.',
  },
  {
    id: 'brows-hd-sculpt',
    name: 'Bespoke Brow Architecture & Tint',
    category: 'brows',
    durationMinutes: 45,
    price: 65,
    description: 'Golden ratio facial mapping, precise threading or organic resin wax, custom hybrid dye tinting for natural fullness.',
    specialistNote: 'Lasts up to 6 weeks on brow hair and 10 days on skin.',
  },
  {
    id: 'brows-lash-lift',
    name: 'Keratin Lash Infusion Lift & Tint',
    category: 'brows',
    durationMinutes: 60,
    price: 110,
    description: 'Gentle, cysteamine-based lifting formula that curls natural lashes skyward from the root without harsh perming chemicals.',
    specialistNote: 'Deep blue-black glossy pigment coat included.',
  },
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'helene-vance',
    name: 'Hélène Vance',
    role: 'Founder & Creative Hair Director',
    experience: '14 Years Mastery',
    bio: 'Former senior educator at Vidal Sassoon London, Hélène specializes in effortless French balayage, dimensional framing, and restorative hair wellness.',
    specialties: ['Lived-In Balayage', 'Editorial Cuts', 'Scalp Health'],
    initials: 'HV',
    accentColor: '#B88655',
  },
  {
    id: 'camille-laurent',
    name: 'Dr. Camille Laurent',
    role: 'Clinical Esthetician & Skin Director',
    experience: '11 Years Clinical Practice',
    bio: 'Board-certified medical esthetician trained in Paris and Zurich, focusing on barrier restoration, cellular hydrafacials, and non-invasive microcurrent lift.',
    specialties: ['Cellular Hydrafacial', '24K Gold Lift', 'Dermal Peels'],
    initials: 'CL',
    accentColor: '#9C7A5B',
  },
  {
    id: 'priya-sen',
    name: 'Priya Sen',
    role: 'Head of Bridal Artistry & Glamour',
    experience: '10 Years Bridal Couture',
    bio: 'Recognized for red-carpet and high-end luxury weddings across Milan, Dubai, and Mumbai. Master of breathable camera-ready complexion and ornate updos.',
    specialties: ['Haute Bridal Makeup', 'Modern Chignon', 'Airbrush Complexion'],
    initials: 'PS',
    accentColor: '#C49B71',
  },
  {
    id: 'matteo-rossi',
    name: 'Matteo Rossi',
    role: 'Master Colorist & Texture Specialist',
    experience: '9 Years Colour Mastery',
    bio: 'Specialist in corrective color, sun-kissed gloss glazing, and keratin silk therapies with a strict focus on zero-damage organic formulations.',
    specialties: ['Bio-Protein Keratin', 'Gloss Glazing', 'Corrective Tone'],
    initials: 'MR',
    accentColor: '#A87D50',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Genevieve Duprès',
    role: 'Art Collector & Fashion Producer',
    treatment: 'Bespoke Balayage & Gloss Ritual',
    quote: 'Hélène gave my fine hair a multidimensional depth and sheen that looks sunlit even in winter. The parlour is an oasis of calm without the usual salon noise.',
    rating: 5,
    date: 'February 2026',
  },
  {
    id: 't-2',
    author: 'Sophia Chen-Alvarez',
    role: 'Architectural Director',
    treatment: 'Cellular Luminous Hydrafacial',
    quote: 'The 24K cellular facial restored my skin barrier within one appointment. No redness, just an unmistakable dewy glow that sustained for three weeks.',
    rating: 5,
    date: 'January 2026',
  },
  {
    id: 't-3',
    author: 'Claire Whitmore',
    role: 'Bride (Winter Wedding)',
    treatment: 'Haute Bridal Hair & Airbrush Makeup',
    quote: 'Priya and her team made my wedding morning so effortless. My hair stayed pristine through twelve hours of celebrations and tears. Impeccable craftsmanship.',
    rating: 5,
    date: 'March 2026',
  },
];

export const SALON_INFO = {
  name: 'ÉLAN Atelier de Beauté',
  tagline: 'Artisanal Hair Couture, Cellular Skincare & Bridal Sanctuaries',
  address: '420 Boulevard Saint-Germain, Level 2',
  district: 'Paris 7e · Valet Parking Available',
  phone: '+33 1 44 28 90 20',
  email: 'concierge@elan-atelier.com',
  hours: [
    { days: 'Monday – Friday', hours: '09:00 — 20:00' },
    { days: 'Saturday', hours: '08:30 — 19:30' },
    { days: 'Sunday (Bridal & Private Suite Only)', hours: '10:00 — 16:00' },
  ],
  amenities: [
    'Complimentary cold-pressed botanicals & organic herbal infusions',
    'Private VIP treatment suites with acoustic privacy',
    'Certified trichology scalp diagnostic microscopy',
    '100% cruelty-free, bio-fermented professional formulations',
  ],
};
