// =============================================
// ALAMDAR CATALOG DATA MODEL
// Hierarchy: ToolGroup → Product → Type1 → Type2 → Type3 (SKU)
// =============================================

export interface Type3Variant {
  id: string;
  label: string; // e.g. "1 inch - 100pcs", "2 inch - 50pcs"
  sku: string;
  price: number;
  stock: number;
  image?: string; // optional override
}

export interface Type2Variant {
  id: string;
  label: string; // e.g. "Bugle Head", "Phillips Head"
  priceModifier: number; // added to base price e.g. +6.00
  image?: string;
  type3Options: Type3Variant[];
}

export interface Type1Product {
  id: string;
  name: string; // e.g. "Self Drilling Screw"
  description: string;
  image: string;
  basePrice: number; // cheapest possible price
  material?: string;
  popular?: boolean;
  type2Label: string; // label for the type2 selector e.g. "Head Type"
  type2Display: 'dropdown' | 'radio'; // admin-configurable
  type3Label: string; // label for the type3 selector e.g. "Size & Pack"
  type3Display: 'dropdown' | 'radio';
  type2Options: Type2Variant[];
}

export interface CatalogProduct {
  id: string;
  name: string; // e.g. "Fasteners", "Rivets"
  description: string;
  image: string;
  type1Items: Type1Product[];
}

export interface ToolGroup {
  id: string;
  name: string; // e.g. "Painting Tools", "Grinding Tools"
  description: string;
  image: string;
  icon: string; // emoji
  products: CatalogProduct[];
}

// =============================================
// DEMO DATA
// =============================================

export const toolGroups: ToolGroup[] = [
  {
    id: 'fastening-tools',
    name: 'Fastening Solutions',
    description: 'Professional-grade screws, bolts, rivets and fasteners for every application',
    image: '/placeholder.svg',
    icon: '🔩',
    products: [
      {
        id: 'screws',
        name: 'Screws',
        description: 'Self-drilling, drywall, wood, and machine screws',
        image: '/placeholder.svg',
        type1Items: [
          {
            id: 'self-drilling-screw',
            name: 'Self Drilling Screw',
            description: 'High-performance self-drilling screws for metal and wood applications. No pre-drilling required.',
            image: '/placeholder.svg',
            basePrice: 8.99,
            material: 'Carbon Steel',
            popular: true,
            type2Label: 'Head Type',
            type2Display: 'radio',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'bugle-head',
                label: 'Bugle Head',
                priceModifier: 0,
                type3Options: [
                  { id: 'bg-8x1-100', label: '#8 × 1" — 100pcs', sku: 'SDS-BG-8x1-100', price: 8.99, stock: 2500 },
                  { id: 'bg-8x1.5-100', label: '#8 × 1½" — 100pcs', sku: 'SDS-BG-8x1.5-100', price: 10.49, stock: 1800 },
                  { id: 'bg-10x2-50', label: '#10 × 2" — 50pcs', sku: 'SDS-BG-10x2-50', price: 9.99, stock: 1200 },
                  { id: 'bg-10x3-50', label: '#10 × 3" — 50pcs', sku: 'SDS-BG-10x3-50', price: 12.99, stock: 900 },
                ]
              },
              {
                id: 'hex-head',
                label: 'Hex Head',
                priceModifier: 2.00,
                type3Options: [
                  { id: 'hx-8x1-100', label: '#8 × 1" — 100pcs', sku: 'SDS-HX-8x1-100', price: 10.99, stock: 2000 },
                  { id: 'hx-10x1.5-50', label: '#10 × 1½" — 50pcs', sku: 'SDS-HX-10x1.5-50', price: 11.49, stock: 1500 },
                  { id: 'hx-12x2-50', label: '#12 × 2" — 50pcs', sku: 'SDS-HX-12x2-50', price: 14.99, stock: 800 },
                ]
              },
              {
                id: 'pan-head',
                label: 'Pan Head',
                priceModifier: 1.50,
                type3Options: [
                  { id: 'pn-6x0.75-200', label: '#6 × ¾" — 200pcs', sku: 'SDS-PN-6x0.75-200', price: 12.99, stock: 3000 },
                  { id: 'pn-8x1-100', label: '#8 × 1" — 100pcs', sku: 'SDS-PN-8x1-100', price: 10.49, stock: 2200 },
                ]
              }
            ]
          },
          {
            id: 'drywall-screw',
            name: 'Drywall Screw',
            description: 'Fine and coarse thread drywall screws for metal and wood studs. Black oxide finish.',
            image: '/placeholder.svg',
            basePrice: 6.99,
            material: 'Carbon Steel',
            popular: true,
            type2Label: 'Thread Type',
            type2Display: 'radio',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'fine-thread',
                label: 'Fine Thread (Metal Studs)',
                priceModifier: 0,
                type3Options: [
                  { id: 'ft-6x1-500', label: '#6 × 1" — 500pcs', sku: 'DWS-FT-6x1-500', price: 12.99, stock: 5000 },
                  { id: 'ft-6x1.25-500', label: '#6 × 1¼" — 500pcs', sku: 'DWS-FT-6x1.25-500', price: 14.49, stock: 4000 },
                  { id: 'ft-6x1.625-500', label: '#6 × 1⅝" — 500pcs', sku: 'DWS-FT-6x1.625-500', price: 15.99, stock: 3500 },
                ]
              },
              {
                id: 'coarse-thread',
                label: 'Coarse Thread (Wood Studs)',
                priceModifier: -0.50,
                type3Options: [
                  { id: 'ct-6x1.25-500', label: '#6 × 1¼" — 500pcs', sku: 'DWS-CT-6x1.25-500', price: 11.99, stock: 6000 },
                  { id: 'ct-6x1.625-1000', label: '#6 × 1⅝" — 1000pcs', sku: 'DWS-CT-6x1.625-1000', price: 22.99, stock: 2500 },
                  { id: 'ct-8x2.5-500', label: '#8 × 2½" — 500pcs', sku: 'DWS-CT-8x2.5-500', price: 18.99, stock: 1800 },
                ]
              }
            ]
          },
          {
            id: 'wood-screw',
            name: 'Wood Screw',
            description: 'Premium wood screws with sharp gimlet points for easy driving. Multiple head styles available.',
            image: '/placeholder.svg',
            basePrice: 7.49,
            material: 'Stainless Steel',
            popular: false,
            type2Label: 'Head Type',
            type2Display: 'dropdown',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'flat-head',
                label: 'Flat Head (Countersink)',
                priceModifier: 0,
                type3Options: [
                  { id: 'fh-8x1.5-100', label: '#8 × 1½" — 100pcs', sku: 'WS-FH-8x1.5-100', price: 12.99, stock: 2000 },
                  { id: 'fh-10x2-100', label: '#10 × 2" — 100pcs', sku: 'WS-FH-10x2-100', price: 15.99, stock: 1500 },
                ]
              },
              {
                id: 'round-head',
                label: 'Round Head',
                priceModifier: 1.00,
                type3Options: [
                  { id: 'rh-8x1-100', label: '#8 × 1" — 100pcs', sku: 'WS-RH-8x1-100', price: 11.49, stock: 1800 },
                  { id: 'rh-10x1.5-50', label: '#10 × 1½" — 50pcs', sku: 'WS-RH-10x1.5-50', price: 8.49, stock: 2200 },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'bolts-nuts',
        name: 'Bolts & Nuts',
        description: 'Hex bolts, carriage bolts, lag bolts and matching nuts',
        image: '/placeholder.svg',
        type1Items: [
          {
            id: 'hex-bolt',
            name: 'Hex Bolt',
            description: 'Grade 5 & 8 hex bolts for structural and mechanical applications.',
            image: '/placeholder.svg',
            basePrice: 14.99,
            material: 'Alloy Steel',
            popular: true,
            type2Label: 'Grade',
            type2Display: 'radio',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'grade-5',
                label: 'Grade 5',
                priceModifier: 0,
                type3Options: [
                  { id: 'g5-3/8x2-50', label: '3/8"-16 × 2" — 50pcs', sku: 'HB-G5-3/8x2-50', price: 18.99, stock: 1500 },
                  { id: 'g5-1/2x3-25', label: '1/2"-13 × 3" — 25pcs', sku: 'HB-G5-1/2x3-25', price: 14.99, stock: 1200 },
                ]
              },
              {
                id: 'grade-8',
                label: 'Grade 8',
                priceModifier: 6.00,
                type3Options: [
                  { id: 'g8-3/8x2-50', label: '3/8"-16 × 2" — 50pcs', sku: 'HB-G8-3/8x2-50', price: 28.99, stock: 900 },
                  { id: 'g8-1/2x3-25', label: '1/2"-13 × 3" — 25pcs', sku: 'HB-G8-1/2x3-25', price: 24.99, stock: 700 },
                ]
              }
            ]
          },
          {
            id: 'carriage-bolt',
            name: 'Carriage Bolt',
            description: 'Square-neck carriage bolts for wood-to-wood and wood-to-metal connections.',
            image: '/placeholder.svg',
            basePrice: 12.49,
            material: 'Galvanized Steel',
            popular: false,
            type2Label: 'Finish',
            type2Display: 'dropdown',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'zinc-finish',
                label: 'Zinc Plated',
                priceModifier: 0,
                type3Options: [
                  { id: 'zn-3/8x3-25', label: '3/8" × 3" — 25pcs', sku: 'CB-ZN-3/8x3-25', price: 12.49, stock: 1000 },
                  { id: 'zn-1/2x4-25', label: '1/2" × 4" — 25pcs', sku: 'CB-ZN-1/2x4-25', price: 16.99, stock: 800 },
                ]
              },
              {
                id: 'hdg-finish',
                label: 'Hot-Dip Galvanized',
                priceModifier: 4.00,
                type3Options: [
                  { id: 'hdg-3/8x3-25', label: '3/8" × 3" — 25pcs', sku: 'CB-HDG-3/8x3-25', price: 16.49, stock: 600 },
                  { id: 'hdg-1/2x4-25', label: '1/2" × 4" — 25pcs', sku: 'CB-HDG-1/2x4-25', price: 20.99, stock: 500 },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'rivets',
        name: 'Rivets',
        description: 'Blind rivets and structural rivets for permanent fastening',
        image: '/placeholder.svg',
        type1Items: [
          {
            id: 'blind-rivet',
            name: 'Blind Rivet (Pop Rivet)',
            description: 'Aluminum and steel blind rivets for one-side access fastening.',
            image: '/placeholder.svg',
            basePrice: 9.99,
            material: 'Aluminum/Steel',
            popular: false,
            type2Label: 'Material',
            type2Display: 'radio',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'aluminum-steel',
                label: 'Aluminum Body / Steel Mandrel',
                priceModifier: 0,
                type3Options: [
                  { id: 'as-3/16x250', label: '3/16" — 250pcs', sku: 'BR-AS-3/16-250', price: 24.99, stock: 3000 },
                  { id: 'as-1/8x500', label: '1/8" — 500pcs', sku: 'BR-AS-1/8-500', price: 19.99, stock: 4000 },
                ]
              },
              {
                id: 'all-steel',
                label: 'All Steel',
                priceModifier: 8.00,
                type3Options: [
                  { id: 'ss-3/16x100', label: '3/16" — 100pcs', sku: 'BR-SS-3/16-100', price: 22.99, stock: 1200 },
                  { id: 'ss-1/4x100', label: '1/4" — 100pcs', sku: 'BR-SS-1/4-100', price: 28.99, stock: 800 },
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'anchoring-systems',
    name: 'Anchoring Systems',
    description: 'Concrete anchors, wall plugs, and mounting solutions for every substrate',
    image: '/placeholder.svg',
    icon: '⚓',
    products: [
      {
        id: 'concrete-anchors',
        name: 'Concrete Anchors',
        description: 'Wedge, sleeve, and drop-in anchors for solid concrete',
        image: '/placeholder.svg',
        type1Items: [
          {
            id: 'wedge-anchor',
            name: 'Wedge Anchor',
            description: 'Heavy-duty wedge anchors for permanent concrete fastening. Meets ICC-ES AC193.',
            image: '/placeholder.svg',
            basePrice: 18.99,
            material: 'Carbon Steel',
            popular: true,
            type2Label: 'Finish',
            type2Display: 'radio',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'zinc-plated',
                label: 'Zinc Plated',
                priceModifier: 0,
                type3Options: [
                  { id: 'zp-3/8x3-50', label: '3/8" × 3" — 50pcs', sku: 'WA-ZP-3/8x3-50', price: 42.99, stock: 1200 },
                  { id: 'zp-1/2x4-25', label: '1/2" × 4" — 25pcs', sku: 'WA-ZP-1/2x4-25', price: 38.99, stock: 900 },
                ]
              },
              {
                id: 'stainless',
                label: 'Stainless Steel 304',
                priceModifier: 12.00,
                type3Options: [
                  { id: 'ss-3/8x3-25', label: '3/8" × 3" — 25pcs', sku: 'WA-SS-3/8x3-25', price: 48.99, stock: 500 },
                  { id: 'ss-1/2x4-10', label: '1/2" × 4" — 10pcs', sku: 'WA-SS-1/2x4-10', price: 34.99, stock: 400 },
                ]
              }
            ]
          },
          {
            id: 'sleeve-anchor',
            name: 'Sleeve Anchor',
            description: 'Versatile anchors for concrete, brick, and block. Hex nut and acorn nut options.',
            image: '/placeholder.svg',
            basePrice: 15.99,
            material: 'Carbon Steel',
            popular: false,
            type2Label: 'Head Style',
            type2Display: 'dropdown',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'hex-nut',
                label: 'Hex Nut',
                priceModifier: 0,
                type3Options: [
                  { id: 'hn-3/8x3-25', label: '3/8" × 3" — 25pcs', sku: 'SA-HN-3/8x3-25', price: 22.99, stock: 1000 },
                  { id: 'hn-1/2x4-25', label: '1/2" × 4" — 25pcs', sku: 'SA-HN-1/2x4-25', price: 28.99, stock: 700 },
                ]
              },
              {
                id: 'acorn-nut',
                label: 'Acorn Nut',
                priceModifier: 3.00,
                type3Options: [
                  { id: 'an-3/8x3-25', label: '3/8" × 3" — 25pcs', sku: 'SA-AN-3/8x3-25', price: 25.99, stock: 600 },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'wall-anchors',
        name: 'Wall Anchors',
        description: 'Toggle bolts, wall plugs, and hollow wall fasteners',
        image: '/placeholder.svg',
        type1Items: [
          {
            id: 'toggle-bolt',
            name: 'Toggle Bolt',
            description: 'Spring-wing toggle bolts for heavy loads in hollow walls.',
            image: '/placeholder.svg',
            basePrice: 8.99,
            material: 'Steel',
            popular: false,
            type2Label: 'Type',
            type2Display: 'radio',
            type3Label: 'Size & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'spring-wing',
                label: 'Spring Wing',
                priceModifier: 0,
                type3Options: [
                  { id: 'sw-1/4x4-20', label: '1/4" × 4" — 20pcs', sku: 'TB-SW-1/4x4-20', price: 15.99, stock: 1500 },
                  { id: 'sw-3/8x4-10', label: '3/8" × 4" — 10pcs', sku: 'TB-SW-3/8x4-10', price: 12.99, stock: 1000 },
                ]
              },
              {
                id: 'snap-toggle',
                label: 'Snap Toggle',
                priceModifier: 4.00,
                type3Options: [
                  { id: 'st-1/4-10', label: '1/4" — 10pcs', sku: 'TB-ST-1/4-10', price: 16.99, stock: 800 },
                  { id: 'st-3/8-10', label: '3/8" — 10pcs', sku: 'TB-ST-3/8-10', price: 19.99, stock: 600 },
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'abrasives-cutting',
    name: 'Abrasives & Cutting',
    description: 'Grinding wheels, cutting discs, sanding products and abrasive tools',
    image: '/placeholder.svg',
    icon: '⚙️',
    products: [
      {
        id: 'cutting-discs',
        name: 'Cutting Discs',
        description: 'Metal and masonry cutting discs for angle grinders',
        image: '/placeholder.svg',
        type1Items: [
          {
            id: 'metal-cutting-disc',
            name: 'Metal Cutting Disc',
            description: 'Thin cutting discs for fast, clean cuts on steel and stainless steel.',
            image: '/placeholder.svg',
            basePrice: 2.49,
            material: 'Aluminum Oxide',
            popular: true,
            type2Label: 'Diameter',
            type2Display: 'radio',
            type3Label: 'Thickness & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: '4.5-inch',
                label: '4½" (115mm)',
                priceModifier: 0,
                type3Options: [
                  { id: '4.5-1mm-10', label: '1mm thick — 10pcs', sku: 'MCD-4.5-1mm-10', price: 12.99, stock: 5000 },
                  { id: '4.5-1.6mm-10', label: '1.6mm thick — 10pcs', sku: 'MCD-4.5-1.6mm-10', price: 14.99, stock: 4000 },
                  { id: '4.5-1mm-25', label: '1mm thick — 25pcs', sku: 'MCD-4.5-1mm-25', price: 28.99, stock: 2000 },
                ]
              },
              {
                id: '9-inch',
                label: '9" (230mm)',
                priceModifier: 3.00,
                type3Options: [
                  { id: '9-2mm-5', label: '2mm thick — 5pcs', sku: 'MCD-9-2mm-5', price: 18.99, stock: 2500 },
                  { id: '9-3mm-5', label: '3mm thick — 5pcs', sku: 'MCD-9-3mm-5', price: 21.99, stock: 1800 },
                ]
              }
            ]
          },
          {
            id: 'grinding-disc',
            name: 'Grinding Disc',
            description: 'Depressed centre grinding wheels for metal surface preparation and weld blending.',
            image: '/placeholder.svg',
            basePrice: 3.99,
            material: 'Aluminum Oxide',
            popular: false,
            type2Label: 'Diameter',
            type2Display: 'radio',
            type3Label: 'Grit & Pack',
            type3Display: 'dropdown',
            type2Options: [
              {
                id: 'g-4.5-inch',
                label: '4½" (115mm)',
                priceModifier: 0,
                type3Options: [
                  { id: 'g4.5-24-5', label: '24 Grit — 5pcs', sku: 'GD-4.5-24-5', price: 14.99, stock: 3000 },
                  { id: 'g4.5-60-5', label: '60 Grit — 5pcs', sku: 'GD-4.5-60-5', price: 13.99, stock: 3500 },
                ]
              },
              {
                id: 'g-7-inch',
                label: '7" (180mm)',
                priceModifier: 4.00,
                type3Options: [
                  { id: 'g7-24-5', label: '24 Grit — 5pcs', sku: 'GD-7-24-5', price: 22.99, stock: 1500 },
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// Helper: get all popular Type1 products across all groups
export function getPopularProducts(): (Type1Product & { groupId: string; groupName: string; productName: string })[] {
  const popular: (Type1Product & { groupId: string; groupName: string; productName: string })[] = [];
  for (const group of toolGroups) {
    for (const product of group.products) {
      for (const type1 of product.type1Items) {
        if (type1.popular) {
          popular.push({ ...type1, groupId: group.id, groupName: group.name, productName: product.name });
        }
      }
    }
  }
  return popular;
}

// Helper: find a tool group by id
export function findToolGroup(groupId: string): ToolGroup | undefined {
  return toolGroups.find(g => g.id === groupId);
}

// Helper: find product within a group
export function findProduct(groupId: string, productId: string): CatalogProduct | undefined {
  const group = findToolGroup(groupId);
  return group?.products.find(p => p.id === productId);
}
