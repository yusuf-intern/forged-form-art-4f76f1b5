export type ProductCategory = 
  | 'screws' 
  | 'fasteners' 
  | 'bolts' 
  | 'nuts' 
  | 'washers' 
  | 'anchors';

export type ScrewType = 
  | 'wood-screw' 
  | 'machine-screw' 
  | 'self-tapping' 
  | 'drywall-screw' 
  | 'deck-screw' 
  | 'sheet-metal-screw';

export type FastenerType = 
  | 'rivet' 
  | 'pin' 
  | 'clip' 
  | 'staple' 
  | 'cable-tie';

export type HeadType = 
  | 'flat' 
  | 'pan' 
  | 'round' 
  | 'hex' 
  | 'oval' 
  | 'truss' 
  | 'button';

export type Material = 
  | 'steel' 
  | 'stainless-steel' 
  | 'brass' 
  | 'aluminum' 
  | 'zinc-plated' 
  | 'galvanized';

export type Finish = 
  | 'plain' 
  | 'zinc' 
  | 'black-oxide' 
  | 'chrome' 
  | 'nickel' 
  | 'hot-dip-galvanized';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subType: ScrewType | FastenerType | string;
  headType?: HeadType;
  material: Material;
  finish: Finish;
  size: string;
  length?: string;
  threadPitch?: string;
  price: number;
  priceUnit: string;
  stock: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
}

export const products: Product[] = [
  // SCREWS - Wood Screws
  {
    id: 'ws-001',
    name: 'Wood Screw - Flat Head',
    category: 'screws',
    subType: 'wood-screw',
    headType: 'flat',
    material: 'steel',
    finish: 'zinc',
    size: '#8',
    length: '1-1/2"',
    threadPitch: 'Coarse',
    price: 12.99,
    priceUnit: 'box/100',
    stock: 2450,
    image: '/placeholder.svg',
    description: 'General purpose wood screw with flat countersink head. Ideal for furniture and cabinetry.',
    specifications: {
      'Drive Type': 'Phillips',
      'Thread Type': 'Coarse',
      'Point Type': 'Gimlet',
      'Load Capacity': '150 lbs'
    }
  },
  {
    id: 'ws-002',
    name: 'Wood Screw - Pan Head',
    category: 'screws',
    subType: 'wood-screw',
    headType: 'pan',
    material: 'stainless-steel',
    finish: 'plain',
    size: '#10',
    length: '2"',
    threadPitch: 'Coarse',
    price: 18.99,
    priceUnit: 'box/100',
    stock: 1820,
    image: '/placeholder.svg',
    description: 'Stainless steel pan head wood screw for outdoor applications.',
    specifications: {
      'Drive Type': 'Square',
      'Thread Type': 'Coarse',
      'Point Type': 'Sharp',
      'Corrosion Resistance': 'High'
    }
  },
  // SCREWS - Machine Screws
  {
    id: 'ms-001',
    name: 'Machine Screw - Hex Head',
    category: 'screws',
    subType: 'machine-screw',
    headType: 'hex',
    material: 'steel',
    finish: 'zinc',
    size: 'M6',
    length: '25mm',
    threadPitch: '1.0mm',
    price: 8.49,
    priceUnit: 'box/50',
    stock: 3200,
    image: '/placeholder.svg',
    description: 'Precision machine screw for metal-to-metal fastening applications.',
    specifications: {
      'Drive Type': 'Hex',
      'Thread Type': 'Metric Fine',
      'Grade': '8.8',
      'Tensile Strength': '800 MPa'
    }
  },
  {
    id: 'ms-002',
    name: 'Machine Screw - Button Head',
    category: 'screws',
    subType: 'machine-screw',
    headType: 'button',
    material: 'stainless-steel',
    finish: 'plain',
    size: 'M4',
    length: '12mm',
    threadPitch: '0.7mm',
    price: 14.99,
    priceUnit: 'box/100',
    stock: 1560,
    image: '/placeholder.svg',
    description: 'Low-profile button head for aesthetic applications.',
    specifications: {
      'Drive Type': 'Hex Socket',
      'Thread Type': 'Metric',
      'Grade': 'A2-70',
      'Application': 'Electronics'
    }
  },
  // SCREWS - Self-Tapping
  {
    id: 'st-001',
    name: 'Self-Tapping Screw - Pan Head',
    category: 'screws',
    subType: 'self-tapping',
    headType: 'pan',
    material: 'steel',
    finish: 'black-oxide',
    size: '#6',
    length: '3/4"',
    price: 9.99,
    priceUnit: 'box/100',
    stock: 4100,
    image: '/placeholder.svg',
    description: 'Self-tapping screw for sheet metal and plastics.',
    specifications: {
      'Drive Type': 'Phillips',
      'Point Type': 'Type AB',
      'Thread': 'Sharp cutting',
      'Material Compatibility': 'Metal, Plastic'
    }
  },
  // SCREWS - Drywall
  {
    id: 'dw-001',
    name: 'Drywall Screw - Bugle Head',
    category: 'screws',
    subType: 'drywall-screw',
    headType: 'flat',
    material: 'steel',
    finish: 'black-oxide',
    size: '#6',
    length: '1-5/8"',
    price: 15.99,
    priceUnit: 'box/500',
    stock: 8500,
    image: '/placeholder.svg',
    description: 'Fine thread drywall screw for metal studs.',
    specifications: {
      'Drive Type': 'Phillips',
      'Thread Type': 'Fine',
      'Point Type': 'Sharp',
      'Application': 'Metal Studs'
    }
  },
  // SCREWS - Deck Screws
  {
    id: 'dk-001',
    name: 'Composite Deck Screw',
    category: 'screws',
    subType: 'deck-screw',
    headType: 'flat',
    material: 'stainless-steel',
    finish: 'plain',
    size: '#10',
    length: '2-1/2"',
    price: 42.99,
    priceUnit: 'box/100',
    stock: 920,
    image: '/placeholder.svg',
    description: 'Premium deck screw with self-drilling tip for composite decking.',
    specifications: {
      'Drive Type': 'Star/Torx',
      'Thread Type': 'Coarse',
      'Coating': 'ACQ Compatible',
      'Weather Rating': 'Extreme'
    }
  },
  // FASTENERS - Rivets
  {
    id: 'rv-001',
    name: 'Blind Rivet - Dome Head',
    category: 'fasteners',
    subType: 'rivet',
    material: 'aluminum',
    finish: 'plain',
    size: '3/16"',
    price: 24.99,
    priceUnit: 'box/250',
    stock: 3400,
    image: '/placeholder.svg',
    description: 'Pop rivet for permanent blind-side fastening.',
    specifications: {
      'Grip Range': '0.063" - 0.125"',
      'Mandrel': 'Steel',
      'Shear Strength': '310 lbs',
      'Tensile Strength': '350 lbs'
    }
  },
  {
    id: 'rv-002',
    name: 'Structural Rivet',
    category: 'fasteners',
    subType: 'rivet',
    material: 'steel',
    finish: 'zinc',
    size: '1/4"',
    price: 45.99,
    priceUnit: 'box/100',
    stock: 1200,
    image: '/placeholder.svg',
    description: 'High-strength structural rivet for load-bearing applications.',
    specifications: {
      'Grip Range': '0.125" - 0.250"',
      'Mandrel': 'Locking',
      'Shear Strength': '1200 lbs',
      'Application': 'Structural'
    }
  },
  // FASTENERS - Pins
  {
    id: 'pn-001',
    name: 'Clevis Pin',
    category: 'fasteners',
    subType: 'pin',
    material: 'steel',
    finish: 'zinc',
    size: '5/16" x 2"',
    price: 3.49,
    priceUnit: 'each',
    stock: 890,
    image: '/placeholder.svg',
    description: 'Standard clevis pin for mechanical linkages.',
    specifications: {
      'Head Style': 'Flat',
      'Hole Location': 'Cross-drilled',
      'Hardness': 'HRC 28-34',
      'Use With': 'Cotter Pin'
    }
  },
  // BOLTS
  {
    id: 'bt-001',
    name: 'Hex Bolt - Grade 8',
    category: 'bolts',
    subType: 'hex-bolt',
    headType: 'hex',
    material: 'steel',
    finish: 'zinc',
    size: '3/8"-16',
    length: '2"',
    price: 28.99,
    priceUnit: 'box/50',
    stock: 2100,
    image: '/placeholder.svg',
    description: 'High-strength hex bolt for heavy-duty applications.',
    specifications: {
      'Grade': '8',
      'Thread': 'UNC Coarse',
      'Proof Load': '120,000 PSI',
      'Tensile Strength': '150,000 PSI'
    }
  },
  {
    id: 'bt-002',
    name: 'Carriage Bolt',
    category: 'bolts',
    subType: 'carriage-bolt',
    headType: 'round',
    material: 'galvanized',
    finish: 'hot-dip-galvanized',
    size: '1/2"-13',
    length: '4"',
    price: 32.99,
    priceUnit: 'box/25',
    stock: 780,
    image: '/placeholder.svg',
    description: 'Square-neck carriage bolt for wood-to-wood connections.',
    specifications: {
      'Neck': 'Square',
      'Grade': '5',
      'Thread': 'UNC Coarse',
      'Application': 'Outdoor/Structural'
    }
  },
  {
    id: 'bt-003',
    name: 'Lag Bolt',
    category: 'bolts',
    subType: 'lag-bolt',
    headType: 'hex',
    material: 'steel',
    finish: 'zinc',
    size: '3/8"',
    length: '3"',
    price: 18.99,
    priceUnit: 'box/25',
    stock: 1450,
    image: '/placeholder.svg',
    description: 'Heavy-duty lag screw for wood framing.',
    specifications: {
      'Thread Type': 'Gimlet Point',
      'Grade': '2',
      'Application': 'Wood Framing',
      'Withdrawal Strength': '500 lbs'
    }
  },
  // NUTS
  {
    id: 'nt-001',
    name: 'Hex Nut - Grade 8',
    category: 'nuts',
    subType: 'hex-nut',
    material: 'steel',
    finish: 'zinc',
    size: '3/8"-16',
    price: 12.99,
    priceUnit: 'box/100',
    stock: 5600,
    image: '/placeholder.svg',
    description: 'Standard hex nut for use with Grade 8 bolts.',
    specifications: {
      'Grade': '8',
      'Thread': 'UNC Coarse',
      'Width Across Flats': '9/16"',
      'Height': '21/64"'
    }
  },
  {
    id: 'nt-002',
    name: 'Nylon Lock Nut',
    category: 'nuts',
    subType: 'lock-nut',
    material: 'steel',
    finish: 'zinc',
    size: '1/4"-20',
    price: 8.99,
    priceUnit: 'box/100',
    stock: 4200,
    image: '/placeholder.svg',
    description: 'Self-locking nut with nylon insert.',
    specifications: {
      'Locking Element': 'Nylon Insert',
      'Thread': 'UNC Coarse',
      'Prevailing Torque': '8 in-lbs',
      'Reusable': 'Limited'
    }
  },
  {
    id: 'nt-003',
    name: 'Wing Nut',
    category: 'nuts',
    subType: 'wing-nut',
    material: 'steel',
    finish: 'zinc',
    size: '1/4"-20',
    price: 6.99,
    priceUnit: 'box/50',
    stock: 2800,
    image: '/placeholder.svg',
    description: 'Hand-tighten wing nut for tool-free assembly.',
    specifications: {
      'Style': 'Cold Forged',
      'Thread': 'UNC Coarse',
      'Wing Span': '1-1/8"',
      'Application': 'Hand Assembly'
    }
  },
  // WASHERS
  {
    id: 'wh-001',
    name: 'Flat Washer - USS',
    category: 'washers',
    subType: 'flat-washer',
    material: 'steel',
    finish: 'zinc',
    size: '3/8"',
    price: 5.99,
    priceUnit: 'box/100',
    stock: 8900,
    image: '/placeholder.svg',
    description: 'Standard USS pattern flat washer.',
    specifications: {
      'Inner Diameter': '7/16"',
      'Outer Diameter': '1"',
      'Thickness': '0.065"',
      'Pattern': 'USS Wide'
    }
  },
  {
    id: 'wh-002',
    name: 'Split Lock Washer',
    category: 'washers',
    subType: 'lock-washer',
    material: 'steel',
    finish: 'zinc',
    size: '3/8"',
    price: 4.99,
    priceUnit: 'box/100',
    stock: 6700,
    image: '/placeholder.svg',
    description: 'Helical spring lock washer for vibration resistance.',
    specifications: {
      'Style': 'Regular',
      'Inner Diameter': '0.393"',
      'Thickness': '0.094"',
      'Load Rating': 'Medium-Duty'
    }
  },
  {
    id: 'wh-003',
    name: 'Fender Washer',
    category: 'washers',
    subType: 'fender-washer',
    material: 'stainless-steel',
    finish: 'plain',
    size: '1/4"',
    price: 9.99,
    priceUnit: 'box/100',
    stock: 3400,
    image: '/placeholder.svg',
    description: 'Extra-large OD washer for load distribution.',
    specifications: {
      'Inner Diameter': '9/32"',
      'Outer Diameter': '1-1/4"',
      'Thickness': '0.062"',
      'Application': 'Sheet Metal'
    }
  },
  // ANCHORS
  {
    id: 'an-001',
    name: 'Wedge Anchor',
    category: 'anchors',
    subType: 'wedge-anchor',
    material: 'steel',
    finish: 'zinc',
    size: '3/8" x 3"',
    price: 42.99,
    priceUnit: 'box/50',
    stock: 1200,
    image: '/placeholder.svg',
    description: 'Concrete wedge anchor for heavy-duty applications.',
    specifications: {
      'Base Material': 'Concrete',
      'Embedment': '2-1/4"',
      'Tensile Load': '3,760 lbs',
      'Shear Load': '5,820 lbs'
    }
  },
  {
    id: 'an-002',
    name: 'Sleeve Anchor',
    category: 'anchors',
    subType: 'sleeve-anchor',
    material: 'steel',
    finish: 'zinc',
    size: '1/2" x 4"',
    price: 38.99,
    priceUnit: 'box/25',
    stock: 890,
    image: '/placeholder.svg',
    description: 'Versatile anchor for concrete, brick, and block.',
    specifications: {
      'Base Material': 'Concrete/Masonry',
      'Embedment': '2"',
      'Tensile Load': '2,100 lbs',
      'Head Style': 'Hex Nut'
    }
  },
  {
    id: 'an-003',
    name: 'Toggle Bolt',
    category: 'anchors',
    subType: 'toggle-bolt',
    material: 'steel',
    finish: 'zinc',
    size: '1/4" x 4"',
    price: 15.99,
    priceUnit: 'box/20',
    stock: 1560,
    image: '/placeholder.svg',
    description: 'Spring-wing toggle bolt for hollow wall applications.',
    specifications: {
      'Base Material': 'Hollow Wall',
      'Wall Thickness': '3/8" - 1-3/4"',
      'Tensile Load': '265 lbs',
      'Wing Spread': '2-1/8"'
    }
  },
  {
    id: 'an-004',
    name: 'Drop-In Anchor',
    category: 'anchors',
    subType: 'drop-in-anchor',
    material: 'steel',
    finish: 'zinc',
    size: '3/8"',
    price: 28.99,
    priceUnit: 'box/50',
    stock: 980,
    image: '/placeholder.svg',
    description: 'Internally threaded anchor for flush mount applications.',
    specifications: {
      'Base Material': 'Concrete',
      'Embedment': '1-9/16"',
      'Tensile Load': '2,030 lbs',
      'Thread': '3/8"-16'
    }
  }
];

export const categories = [
  { id: 'screws', name: 'Screws', count: 6 },
  { id: 'fasteners', name: 'Fasteners', count: 3 },
  { id: 'bolts', name: 'Bolts', count: 3 },
  { id: 'nuts', name: 'Nuts', count: 3 },
  { id: 'washers', name: 'Washers', count: 3 },
  { id: 'anchors', name: 'Anchors', count: 4 },
] as const;

export const screwTypes = [
  { id: 'wood-screw', name: 'Wood Screws' },
  { id: 'machine-screw', name: 'Machine Screws' },
  { id: 'self-tapping', name: 'Self-Tapping' },
  { id: 'drywall-screw', name: 'Drywall Screws' },
  { id: 'deck-screw', name: 'Deck Screws' },
  { id: 'sheet-metal-screw', name: 'Sheet Metal' },
] as const;

export const fastenerTypes = [
  { id: 'rivet', name: 'Rivets' },
  { id: 'pin', name: 'Pins' },
  { id: 'clip', name: 'Clips' },
  { id: 'staple', name: 'Staples' },
  { id: 'cable-tie', name: 'Cable Ties' },
] as const;

export const materials = [
  { id: 'steel', name: 'Steel' },
  { id: 'stainless-steel', name: 'Stainless Steel' },
  { id: 'brass', name: 'Brass' },
  { id: 'aluminum', name: 'Aluminum' },
  { id: 'zinc-plated', name: 'Zinc Plated' },
  { id: 'galvanized', name: 'Galvanized' },
] as const;

export const finishes = [
  { id: 'plain', name: 'Plain' },
  { id: 'zinc', name: 'Zinc' },
  { id: 'black-oxide', name: 'Black Oxide' },
  { id: 'chrome', name: 'Chrome' },
  { id: 'nickel', name: 'Nickel' },
  { id: 'hot-dip-galvanized', name: 'Hot-Dip Galvanized' },
] as const;

export const headTypes = [
  { id: 'flat', name: 'Flat' },
  { id: 'pan', name: 'Pan' },
  { id: 'round', name: 'Round' },
  { id: 'hex', name: 'Hex' },
  { id: 'oval', name: 'Oval' },
  { id: 'truss', name: 'Truss' },
  { id: 'button', name: 'Button' },
] as const;
