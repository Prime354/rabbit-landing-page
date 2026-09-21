import { ProjectData } from '../components/ProjectModal';

export interface MarqueeTile {
  id: number;
  title: string;
  category: string;
  image: string;
  tag: string;
}

// 21 distinct graphic design image tiles for the dual-row marquee
export const marqueeTiles: MarqueeTile[] = [
  // 1 to 11 for Row 1
  {
    id: 1,
    title: 'Aura Cosmetics Identity',
    category: 'Packaging Design',
    tag: 'Identity',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'TypoLab Annual Poster',
    category: 'Poster Series',
    tag: 'Typography',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Komorebi Coffee Roasters',
    category: 'Brand Guidelines',
    tag: 'Branding',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Sonder Magazine Issue 04',
    category: 'Editorial Layout',
    tag: 'Editorial',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Neon Horizon Festival',
    category: 'Visual Identity',
    tag: 'Events',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Botanica Gin Packaging',
    category: 'Bottle Label Design',
    tag: 'Packaging',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Vektor Typeface Specimen',
    category: 'Type Specimen',
    tag: 'Typography',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Subtle Goods Stationery',
    category: 'Stationery Suite',
    tag: 'Print',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    title: 'Arcadia Synthwave EP',
    category: 'Vinyl Sleeve Design',
    tag: 'Music',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: 'Form & Function Exhibition',
    category: 'Exhibition Catalog',
    tag: 'Editorial',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    title: 'Velvet Skin Lab',
    category: 'Cosmetic Boxes',
    tag: 'Packaging',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
  },

  // 12 to 21 for Row 2
  {
    id: 12,
    title: 'Chromatic Spectrum Posters',
    category: 'Screenprint Series',
    tag: 'Print',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 13,
    title: 'Monolith Studio Brand',
    category: 'Corporate Identity',
    tag: 'Branding',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 14,
    title: 'Kinetic Motion Graphics',
    category: 'Social Media Kit',
    tag: 'Digital',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 15,
    title: 'Ceramica Artisan Pottery',
    category: 'Tag & Hangtag Design',
    tag: 'Packaging',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 16,
    title: 'Bauhaus Revived 2026',
    category: 'Geometric Art Prints',
    tag: 'Art Direction',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 17,
    title: 'Lunar Coffee Beans Packaging',
    category: 'Pouch Mockup',
    tag: 'Packaging',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 18,
    title: 'Abstract Thoughts Book',
    category: 'Hardcover Book Cover',
    tag: 'Editorial',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 19,
    title: 'Verve Club Identity',
    category: 'Nightclub Branding',
    tag: 'Branding',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 20,
    title: 'Nordic Architecture Guide',
    category: 'Minimalist Book Spread',
    tag: 'Editorial',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 21,
    title: 'Prism Organic Tea',
    category: 'Eco Tin Packaging',
    tag: 'Packaging',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
  },
];

// 3 Stacking Project Cards data matching spec
export const projectsData: ProjectData[] = [
  {
    number: '01',
    category: 'Brand Identity',
    name: 'Bloomhaus Branding',
    clientType: 'Client',
    year: '2025 - 2026',
    role: 'Lead Identity Designer',
    description:
      'A full identity system for an organic sustainable floral atelier and studio based in Copenhagen. The visual language balances botanical delicacy with bold architectural typography, translating seamlessly across physical boutique signage, foil-stamped luxury packaging, and digital touchpoints.',
    deliverables: [
      'Core Brandmark & Monogram System',
      '84-page Brand Guidelines Book',
      'Sustainable Packaging & Ribbons',
      'Custom Botanical Iconography Suite',
      'E-commerce Digital Design System',
    ],
    palette: ['#1C2A20', '#D6E2D5', '#E8B4B8', '#D4AF37', '#0E1310'],
    images: {
      // Left Top: Logo mark / identity exploration
      top: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      // Left Bottom: Brand guideline spread
      bottom: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80',
      // Right Column: Luxury packaging mockup
      right: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    number: '02',
    category: 'Editorial & Print',
    name: 'Wildwood Zine',
    clientType: 'Personal',
    year: '2025',
    role: 'Art Director & Editor',
    description:
      'An independent biannual arts and culture publication exploring tactile textures, forgotten folk crafts, and experimental typography. Printed on 140gsm FSC-certified recycled paper with spot UV detailing and exposed smyth-sewn spine binding.',
    deliverables: [
      'Biannual Zine Master Template',
      'Cover Art Direction & Screenprints',
      'Modular 12-Column Typographic Grid',
      'Custom Drop Caps & Type Ornaments',
      'Limited Edition Print Box Set',
    ],
    palette: ['#2C2523', '#E9E4DB', '#C85A32', '#6B705C', '#1B1E19'],
    images: {
      // Left Top: Cover spread
      top: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
      // Left Bottom: Interior layout pages
      bottom: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
      // Right Column: Stacked print mockup
      right: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    },
  },
  {
    number: '03',
    category: 'Music Packaging',
    name: 'Nocturne Records',
    clientType: 'Client',
    year: '2025 - 2026',
    role: 'Packaging & Visual Specialist',
    description:
      'A moody, cyber-noir visual identity and tactile record packaging for an underground electronic music label. The design uses holographic foil stamping on heavy black card stock, kinetic typographic treatments, and tour merchandise systems.',
    deliverables: [
      'Gatefold Vinyl Packaging & Inserts',
      'Typographic Merchandise Collection',
      'Interactive Augmented Reality Album Cover',
      'Tour Posters & Billboard System',
      'Social Media Motion Toolkits',
    ],
    palette: ['#0A0A0C', '#7928CA', '#FF0080', '#00DFD8', '#E6E6E6'],
    images: {
      // Left Top: Album art vinyl sleeve
      top: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
      // Left Bottom: Merch mockup & apparel
      bottom: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80',
      // Right Column: Poster design & billboard
      right: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    },
  },
];
