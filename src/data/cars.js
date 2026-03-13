// ── Image URLs (Unsplash) ──────────────────────────────────────
export const IMGS = {
  hero:       'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1800&q=80',
  m3:         'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=900&q=80',
  x5:         'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=80',
  i8:         'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=80',
  m5:         'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80',
  series7:    'https://images.unsplash.com/photo-1627370066453-5e0e0abe2148?w=900&q=80',
  x7:         'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&q=80',
  interior:   'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80',
  engine:     'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=80',
  about:      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=80',
  dealership: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=80',
  contact:    'https://images.unsplash.com/photo-1562991472-2f77d64a7879?w=1200&q=80',
  map:        'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1800&q=60',
};

// ── Car Inventory ──────────────────────────────────────────────
export const CARS = [
  {
    id:       1,
    name:     'BMW M3 Competition',
    category: 'Sports',
    price:    '$74,900',
    img:      IMGS.m3,
    hp:       '503 HP',
    torque:   '479 lb-ft',
    top:      '180 mph',
    accel:    '3.8s 0-60',
    desc:     'The M3 Competition is the pinnacle of sports sedan engineering — twin-turbo inline-six, carbon fibre trim, and track-tuned suspension.',
  },
  {
    id:       2,
    name:     'BMW X5 xDrive40i',
    category: 'SUV',
    price:    '$65,900',
    img:      IMGS.x5,
    hp:       '335 HP',
    torque:   '330 lb-ft',
    top:      '155 mph',
    accel:    '5.3s 0-60',
    desc:     'The X5 defines the luxury SUV segment — commanding presence, intelligent AWD, and a sumptuous interior for five adults.',
  },
  {
    id:       3,
    name:     'BMW i8 Roadster',
    category: 'Electric',
    price:    '$147,500',
    img:      IMGS.i8,
    hp:       '369 HP',
    torque:   '420 lb-ft',
    top:      '155 mph',
    accel:    '4.4s 0-60',
    desc:     'A plug-in hybrid supercar with scissor doors and a carbon-fibre passenger cell. The future of driving, today.',
  },
  {
    id:       4,
    name:     'BMW M5 CS',
    category: 'Sports',
    price:    '$142,000',
    img:      IMGS.m5,
    hp:       '627 HP',
    torque:   '553 lb-ft',
    top:      '189 mph',
    accel:    '2.9s 0-60',
    desc:     'The most powerful production M car ever built. Forged wheels, ceramic brakes, and a 4.4L V8 that defies physics.',
  },
  {
    id:       5,
    name:     'BMW 7 Series',
    category: 'Luxury',
    price:    '$95,900',
    img:      IMGS.series7,
    hp:       '375 HP',
    torque:   '398 lb-ft',
    top:      '155 mph',
    accel:    '4.5s 0-60',
    desc:     'The flagship of BMW luxury. Executive rear lounge, 31-inch rear Theatre Screen, and a crystal gear selector.',
  },
  {
    id:       6,
    name:     'BMW X7 M60i',
    category: 'SUV',
    price:    '$115,900',
    img:      IMGS.x7,
    hp:       '523 HP',
    torque:   '553 lb-ft',
    top:      '155 mph',
    accel:    '4.3s 0-60',
    desc:     'Three rows of pure luxury with M Performance DNA. The largest BMW SUV, built without compromise.',
  },
];

// ── Testimonials ───────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name:  'Alexander K.',
    role:  'M3 Competition Owner',
    quote: 'The M3 Competition is a masterpiece. Raw power, sublime handling — it has transformed every commute into an event.',
    stars: 5,
  },
  {
    name:  'Priya S.',
    role:  'X5 Owner',
    quote: 'The X5 is perfect for my family. Luxury that never compromises — every journey feels like first class.',
    stars: 5,
  },
  {
    name:  'Marco D.',
    role:  'i8 Roadster Owner',
    quote: 'The i8 turns heads everywhere I go. It is not just a car, it is a statement about the future of driving.',
    stars: 5,
  },
];

// ── Stats ──────────────────────────────────────────────────────
export const STATS = [
  { label: 'Years of Innovation', val: '107',   pct: 100 },
  { label: 'Countries Worldwide', val: '140+',  pct: 90  },
  { label: 'Cars Sold (2023)',    val: '2.55M', pct: 85  },
  { label: 'Satisfaction Rate',  val: '97%',   pct: 97  },
];
