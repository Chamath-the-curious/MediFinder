export const pharmacies = [
  {
    id: 1,
    name: "HealthPlus Pharmacy",
    address: "123 Galle Road, Colombo 03",
    lat: 6.9271,
    lon: 79.8512,
    rating: 4.5,
    medicines: [
      { id: 'p1', name: "Panadol", price: 150, category: "Pain Relief" },
      { id: 'p2', name: "Panadol Extra", price: 200, category: "Pain Relief" },
      { id: 'a1', name: "Amoxicillin 500mg", price: 450, category: "Antibiotics" },
      { id: 'a2', name: "Augmentin 625mg", price: 850, category: "Antibiotics" },
      { id: 'v1', name: "Vitamin C 1000mg", price: 380, category: "Vitamins" },
      { id: 'v2', name: "Vitamin D3", price: 290, category: "Vitamins" },
      { id: 'd1', name: "Metformin 500mg", price: 180, category: "Diabetes" },
      { id: 'c1', name: "Cetirizine 10mg", price: 220, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  },
  {
    id: 2,
    name: "MediCare Dispensary",
    address: "45 Marine Drive, Colombo 04",
    lat: 6.9350,
    lon: 79.8450,
    rating: 4.2,
    medicines: [
      { id: 'b1', name: "Brufen 400mg", price: 180, category: "Pain Relief" },
      { id: 'b2', name: "Brufen 600mg", price: 250, category: "Pain Relief" },
      { id: 'a3', name: "Augmentin 375mg", price: 650, category: "Antibiotics" },
      { id: 'a4', name: "Azithromycin 500mg", price: 520, category: "Antibiotics" },
      { id: 'v3', name: "Vitamin D 1000IU", price: 320, category: "Vitamins" },
      { id: 'v4', name: "Multivitamin", price: 450, category: "Vitamins" },
      { id: 'd2', name: "Glucophage 500mg", price: 195, category: "Diabetes" },
      { id: 'c2', name: "Panadol Cold", price: 280, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  },
  {
    id: 3,
    name: "Apollo Medical Store",
    address: "78 Kingsway, Colombo 05",
    lat: 6.9200,
    lon: 79.8600,
    rating: 4.8,
    medicines: [
      { id: 'n1', name: "Nurofen 200mg", price: 220, category: "Pain Relief" },
      { id: 'n2', name: "Nurofen Plus", price: 350, category: "Pain Relief" },
      { id: 'z1', name: "Zithromax 250mg", price: 480, category: "Antibiotics" },
      { id: 'z2', name: "Zithromax 500mg", price: 620, category: "Antibiotics" },
      { id: 'v5', name: "Supradyn Multivitamin", price: 550, category: "Vitamins" },
      { id: 'v6', name: "Centrum", price: 680, category: "Vitamins" },
      { id: 'd3', name: "Januvia 100mg", price: 1200, category: "Diabetes" },
      { id: 'c3', name: "Strepsils", price: 190, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  },
  {
    id: 4,
    name: "City Pharma",
    address: "15 Fort Street, Colombo 01",
    lat: 6.9400,
    lon: 79.8400,
    rating: 4.0,
    medicines: [
      { id: 'cd1', name: "Codeine Phosphate", price: 280, category: "Pain Relief" },
      { id: 'cd2', name: "Tramadol 50mg", price: 420, category: "Pain Relief" },
      { id: 'ci1', name: "Ciprofloxacin 500mg", price: 380, category: "Antibiotics" },
      { id: 'ci2', name: "Ciproxin 250mg", price: 290, category: "Antibiotics" },
      { id: 'bc1', name: "Neurobion", price: 320, category: "Vitamins" },
      { id: 'bc2', name: "Becosine", price: 410, category: "Vitamins" },
      { id: 'd4', name: "Insulin Glargine", price: 1500, category: "Diabetes" },
      { id: 'c4', name: "Aspirin 100mg", price: 120, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  },
  {
    id: 5,
    name: "Wellness Pharmacy",
    address: "200 High Street, Colombo 10",
    lat: 6.9100,
    lon: 79.8700,
    rating: 4.6,
    medicines: [
      { id: 'pd1', name: "Panadeine", price: 190, category: "Pain Relief" },
      { id: 'pd2', name: "Panadeine Extra", price: 260, category: "Pain Relief" },
      { id: 'az1', name: "Azithromycin 250mg", price: 450, category: "Antibiotics" },
      { id: 'az2', name: "Azithrocyn", price: 380, category: "Antibiotics" },
      { id: 'ir1', name: "Iron Tablets", price: 180, category: "Vitamins" },
      { id: 'ir2', name: "Feroglobin", price: 420, category: "Vitamins" },
      { id: 'd5', name: "Metformin 850mg", price: 220, category: "Diabetes" },
      { id: 'c5', name: "Flu medication", price: 340, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  },
  {
    id: 6,
    name: "CarePlus Dispensary",
    address: "55 York Street, Colombo 02",
    lat: 6.9300,
    lon: 79.8550,
    rating: 4.3,
    medicines: [
      { id: 'm1', name: "Mersic", price: 165, category: "Pain Relief" },
      { id: 'm2', name: "Migrastat", price: 240, category: "Pain Relief" },
      { id: 'cf1', name: "Ceftriaxone 1g", price: 680, category: "Antibiotics" },
      { id: 'cf2', name: "Cefixime 200mg", price: 520, category: "Antibiotics" },
      { id: 'ca1', name: "Calcium + D3", price: 350, category: "Vitamins" },
      { id: 'ca2', name: "Calcimax", price: 420, category: "Vitamins" },
      { id: 'd6', name: "Glipizide 5mg", price: 195, category: "Diabetes" },
      { id: 'c6', name: "Cough syrup", price: 280, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  },
  {
    id: 7,
    name: "Rajasinghe Medical",
    address: "88 Union Place, Colombo 07",
    lat: 6.9150,
    lon: 79.8650,
    rating: 4.7,
    medicines: [
      { id: 'dc1', name: "Diclofenac 50mg", price: 180, category: "Pain Relief" },
      { id: 'dc2', name: "Diclomax", price: 290, category: "Pain Relief" },
      { id: 'dx1', name: "Doxycycline 100mg", price: 480, category: "Antibiotics" },
      { id: 'dx2', name: "Doxytet", price: 520, category: "Antibiotics" },
      { id: 'fa1', name: "Folic Acid 5mg", price: 90, category: "Vitamins" },
      { id: 'fa2', name: "Ferric Acid", price: 150, category: "Vitamins" },
      { id: 'd7', name: "Sitagliptin 50mg", price: 890, category: "Diabetes" },
      { id: 'c7', name: "Dispro", price: 220, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  },
  {
    id: 8,
    name: "Hikmed Pharmacy",
    address: "33 Bambalapitiya, Colombo 04",
    lat: 6.9250,
    lon: 79.8420,
    rating: 4.1,
    medicines: [
      { id: 'tm1', name: "Tramadol 100mg", price: 350, category: "Pain Relief" },
      { id: 'tm2', name: "Ultram", price: 420, category: "Pain Relief" },
      { id: 'mt1', name: "Metronidazole 400mg", price: 280, category: "Antibiotics" },
      { id: 'mt2', name: "Flagyl", price: 320, category: "Antibiotics" },
      { id: 'zn1', name: "Zinc Gluconate", price: 190, category: "Vitamins" },
      { id: 'zn2', name: "Zincovit", price: 280, category: "Vitamins" },
      { id: 'd8', name: "Amlodipine 5mg", price: 180, category: "Diabetes" },
      { id: 'c8', name: "Benadryl", price: 240, category: "Cold & Flu" }
    ],
    categories: ["Pain Relief", "Antibiotics", "Vitamins", "Diabetes", "Cold & Flu"]
  }
];

export const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins", "Cold & Flu", "Diabetes"];

export const initialReviews = [
  { id: 1, pharmacyId: 1, user: "John D.", rating: 5, text: "Great service and fast delivery!" },
  { id: 2, pharmacyId: 1, user: "Sarah M.", rating: 4, text: "Good prices, friendly staff" },
  { id: 3, pharmacyId: 2, user: "Mike R.", rating: 4, text: "Always has medicines in stock" },
  { id: 4, pharmacyId: 3, user: "Priya K.", rating: 5, text: "Very professional pharmacists" }
];