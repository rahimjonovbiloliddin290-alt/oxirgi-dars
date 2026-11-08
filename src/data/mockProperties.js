export const EXCHANGE_RATE_UZS = 12850;

export const INITIAL_PROPERTIES = [
  {
    id: "prop-1",
    title: "The Boulevard Imperial Penthouse",
    type: "Penthouse",
    purpose: "sale",
    statusBadge: "Featured",
    isHotDeal: true,
    isDiscounted: false,
    hasInstallment: true,
    priceUSD: 485000,
    originalPriceUSD: 510000,
    areaM2: 320,
    bedrooms: 4,
    bathrooms: 4,
    floor: 24,
    totalFloors: 25,
    yearBuilt: 2024,
    parkingSpaces: 2,
    location: {
      city: "Tashkent",
      district: "Tashkent City",
      address: "Boulevard Residences, Block 4, Shaykhontohur",
      coordinates: { lat: 41.3142, lng: 69.2486 }
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "High-speed WiFi",
      "Underground Parking",
      "24/7 Security & CCTV",
      "Panoramic Terrace",
      "Smart Home Automation",
      "Private Heated Pool",
      "Central HVAC & Air Filtration",
      "Private Elevator Access",
      "Concierge Service"
    ],
    description: "Experience the pinnacle of luxury living in the heart of Tashkent City. This custom-designed penthouse offers breathtaking 360-degree panoramic skyline vistas, Italian marble flooring, double-height ceiling reception halls, and direct high-speed private elevator access. Includes smart lighting, motorized drapery, and a bespoke Scavolini chef's kitchen with Miele appliances.",
    nearbyPoints: [
      { name: "Tashkent City Central Park", distance: "120m", type: "park" },
      { name: "Hilton Tashkent Congress Center", distance: "250m", type: "hotel" },
      { name: "Ozbekiston Metro Station", distance: "450m", type: "transit" },
      { name: "Westminster International School", distance: "1.2km", type: "school" },
      { name: "Korzinka Supermarket", distance: "200m", type: "shop" }
    ],
    agent: {
      name: "Alisher Rustamov",
      role: "Luxury Estates Director",
      phone: "+998 90 123 45 67",
      telegram: "@alisher_luxury_realty",
      email: "alisher.r@uybozor.uz",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    views: 1420
  },
  {
    id: "prop-2",
    title: "Villa Solarium with Botanic Garden",
    type: "Villa",
    purpose: "sale",
    statusBadge: "Hot Deal",
    isHotDeal: true,
    isDiscounted: true,
    hasInstallment: true,
    priceUSD: 620000,
    originalPriceUSD: 690000,
    areaM2: 550,
    bedrooms: 6,
    bathrooms: 5,
    floor: 2,
    totalFloors: 2,
    yearBuilt: 2023,
    parkingSpaces: 4,
    location: {
      city: "Tashkent",
      district: "Mirzo Ulugbek",
      address: "Darkhan Elite Enclave, 14 Buyuk Ipak Yoli",
      coordinates: { lat: 41.3255, lng: 69.3012 }
    },
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "Private Heated Pool",
      "Private Garden",
      "High-speed WiFi",
      "24/7 Security & CCTV",
      "Smart Home Automation",
      "Finnish Sauna & Spa",
      "Covered 4-Car Garage",
      "Backup Power Generator",
      "Outdoor BBQ Patio"
    ],
    description: "An architectural masterpiece set upon 8 acres of manicured botanical landscaping in Mirzo Ulugbek. Featuring an infinity heated pool, Swedish sauna, floor-to-ceiling thermal argon glazing, and a detached guest cottage. High level diplomatic security infrastructure with automated perimeter sensors.",
    nearbyPoints: [
      { name: "British School of Tashkent", distance: "800m", type: "school" },
      { name: "Pushkin Metro Station", distance: "900m", type: "transit" },
      { name: "Eco Park Tashkent", distance: "1.4km", type: "park" },
      { name: "Macro Supermarket", distance: "350m", type: "shop" }
    ],
    agent: {
      name: "Dilnoza Karimova",
      role: "Senior Residential Advisor",
      phone: "+998 97 888 22 11",
      telegram: "@dilnoza_realtor",
      email: "dilnoza.k@uybozor.uz",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    views: 2840
  },
  {
    id: "prop-3",
    title: "Mirabad Avenue Sky Residence",
    type: "Apartment",
    purpose: "sale",
    statusBadge: "Installments Available",
    isHotDeal: false,
    isDiscounted: false,
    hasInstallment: true,
    priceUSD: 235000,
    originalPriceUSD: 235000,
    areaM2: 145,
    bedrooms: 3,
    bathrooms: 2,
    floor: 9,
    totalFloors: 12,
    yearBuilt: 2024,
    parkingSpaces: 1,
    location: {
      city: "Tashkent",
      district: "Yakkasaroy",
      address: "Mirabad Avenue, Block C, Mirobod",
      coordinates: { lat: 41.2985, lng: 69.2715 }
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "Underground Parking",
      "High-speed WiFi",
      "24/7 Security & CCTV",
      "Gym & Fitness Center",
      "Children's Playground",
      "Concierge Service",
      "Soundproof Double Glazing"
    ],
    description: "Step into modern European elegance at Mirabad Avenue. This premium 3-room residence features open-concept living, acoustic sound insulation, quartz countertops, designer bathrooms with Hansgrohe fixtures, and floor-to-ceiling glass balconies overlooking the landscaped courtyard promenade.",
    nearbyPoints: [
      { name: "Oybek Metro Station", distance: "500m", type: "transit" },
      { name: "Central Railway Station", distance: "1.1km", type: "transit" },
      { name: "Tashkent International Clinic", distance: "750m", type: "hospital" },
      { name: "Glamour Avenue Boutiques", distance: "50m", type: "shop" }
    ],
    agent: {
      name: "Sardor Umidov",
      role: "Apartment Specialist",
      phone: "+998 93 456 78 90",
      telegram: "@sardor_realty",
      email: "sardor.u@uybozor.uz",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    views: 1980
  },
  {
    id: "prop-4",
    title: "Yunusobod Greenfield Modern Townhouse",
    type: "House",
    purpose: "sale",
    statusBadge: "Discounted",
    isHotDeal: true,
    isDiscounted: true,
    hasInstallment: true,
    priceUSD: 189000,
    originalPriceUSD: 215000,
    areaM2: 210,
    bedrooms: 4,
    bathrooms: 3,
    floor: 3,
    totalFloors: 3,
    yearBuilt: 2023,
    parkingSpaces: 2,
    location: {
      city: "Tashkent",
      district: "Yunusobod",
      address: "19-Mavze, Greenfield Gated Community",
      coordinates: { lat: 41.3654, lng: 69.2891 }
    },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "Private Garden",
      "Underground Parking",
      "High-speed WiFi",
      "24/7 Security & CCTV",
      "Rooftop Terrace",
      "Individual Heating Boiler",
      "Children's Playground"
    ],
    description: "Contemporary 3-story family townhouse with private courtyard patio and private rooftop sunset lounge. Quiet gated neighborhood with 24/7 guarded checkpoint, perimeter cameras, and safe playgrounds. Ideal for families wanting suburban tranquility with quick city access.",
    nearbyPoints: [
      { name: "Turkiston Metro Station", distance: "700m", type: "transit" },
      { name: "Mega Planet Shopping Mall", distance: "950m", type: "shop" },
      { name: "Tashkent TV Tower & Aqua Park", distance: "2.3km", type: "park" },
      { name: "International Cambridge School", distance: "1.1km", type: "school" }
    ],
    agent: {
      name: "Alisher Rustamov",
      role: "Luxury Estates Director",
      phone: "+998 90 123 45 67",
      telegram: "@alisher_luxury_realty",
      email: "alisher.r@uybozor.uz",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    views: 1120
  },
  {
    id: "prop-5",
    title: "Chilanzar Heights Panoramic Suite",
    type: "Apartment",
    purpose: "sale",
    statusBadge: "Hot Deal",
    isHotDeal: true,
    isDiscounted: false,
    hasInstallment: true,
    priceUSD: 115000,
    originalPriceUSD: 125000,
    areaM2: 95,
    bedrooms: 2,
    bathrooms: 2,
    floor: 11,
    totalFloors: 16,
    yearBuilt: 2024,
    parkingSpaces: 1,
    location: {
      city: "Tashkent",
      district: "Chilanzar",
      address: "Bunyodkor Avenue 28, Near Gafur Gulom Park",
      coordinates: { lat: 41.2789, lng: 69.2154 }
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b8100ff?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "High-speed WiFi",
      "Underground Parking",
      "24/7 Security & CCTV",
      "Elevator",
      "Smart Intercom",
      "Balcony View"
    ],
    description: "Fully designer-furnished 2-bedroom home located in Chilanzar's most desirable modern complex. Finished with premium German laminate, recessed mood lighting, built-in wardrobes, and energy-efficient climate control. Ready for immediate move-in or high-yield rental investment.",
    nearbyPoints: [
      { name: "Mirzo Ulugbek Metro Station", distance: "300m", type: "transit" },
      { name: "Gafur Gulom Culture & Leisure Park", distance: "400m", type: "park" },
      { name: "Bunyodkor Stadium", distance: "1.0km", type: "sports" },
      { name: "Chilanzar Central Bazaar", distance: "1.2km", type: "shop" }
    ],
    agent: {
      name: "Dilnoza Karimova",
      role: "Senior Residential Advisor",
      phone: "+998 97 888 22 11",
      telegram: "@dilnoza_realtor",
      email: "dilnoza.k@uybozor.uz",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    views: 3100
  },
  {
    id: "prop-6",
    title: "Oasis Commercial Glass Plaza & Offices",
    type: "Commercial",
    purpose: "sale",
    statusBadge: "Featured",
    isHotDeal: false,
    isDiscounted: false,
    hasInstallment: true,
    priceUSD: 790000,
    originalPriceUSD: 790000,
    areaM2: 720,
    bedrooms: 0,
    bathrooms: 6,
    floor: 1,
    totalFloors: 4,
    yearBuilt: 2024,
    parkingSpaces: 12,
    location: {
      city: "Tashkent",
      district: "Mirzo Ulugbek",
      address: "Mustaqillik Avenue 82, Business District",
      coordinates: { lat: 41.3211, lng: 69.2944 }
    },
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "24/7 Security & CCTV",
      "Underground Parking",
      "High-speed WiFi",
      "Backup Power Generator",
      "Elevator",
      "Central HVAC & Air Filtration",
      "Conference Rooms",
      "Fiber Optic Internet"
    ],
    description: "Prime freehold 4-story commercial building designed for multinational headquarters, high-tech startups, or boutique medical centers. Features full curtain-wall glazing, open floor plans, 12 private underground parking bays, industrial backup generators, and fiber redundancy.",
    nearbyPoints: [
      { name: "Mustaqillik Maydoni Metro", distance: "450m", type: "transit" },
      { name: "Central Bank of Uzbekistan", distance: "600m", type: "bank" },
      { name: "Hyatt Regency Tashkent", distance: "850m", type: "hotel" }
    ],
    agent: {
      name: "Sardor Umidov",
      role: "Apartment Specialist",
      phone: "+998 93 456 78 90",
      telegram: "@sardor_realty",
      email: "sardor.u@uybozor.uz",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    views: 1640
  },
  {
    id: "prop-7",
    title: "Registan Heritage Villa & Orchard",
    type: "Villa",
    purpose: "sale",
    statusBadge: "Discounted",
    isHotDeal: true,
    isDiscounted: true,
    hasInstallment: false,
    priceUSD: 345000,
    originalPriceUSD: 380000,
    areaM2: 420,
    bedrooms: 5,
    bathrooms: 4,
    floor: 2,
    totalFloors: 2,
    yearBuilt: 2022,
    parkingSpaces: 3,
    location: {
      city: "Samarkand",
      district: "Samarkand City",
      address: "Silk Road Oasis, 8 Registan Ring Road",
      coordinates: { lat: 39.6542, lng: 66.9758 }
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "Private Garden",
      "Private Heated Pool",
      "24/7 Security & CCTV",
      "Outdoor BBQ Patio",
      "Traditional Aivan Terrace",
      "High-speed WiFi"
    ],
    description: "Captivating oriental luxury meets modern architecture. Located near the historic Silk Road heart of Samarkand, with traditional carved wooden aivans, mature fruit orchards, a heated outdoor pool, and private hammam.",
    nearbyPoints: [
      { name: "Registan Ensemble", distance: "1.4km", type: "culture" },
      { name: "Samarkand International Airport", distance: "6.5km", type: "transit" },
      { name: "Siyob Bazaar", distance: "1.8km", type: "shop" }
    ],
    agent: {
      name: "Dilnoza Karimova",
      role: "Senior Residential Advisor",
      phone: "+998 97 888 22 11",
      telegram: "@dilnoza_realtor",
      email: "dilnoza.k@uybozor.uz",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    views: 890
  },
  {
    id: "prop-8",
    title: "Anhor Riverfront Smart Studio",
    type: "Apartment",
    purpose: "sale",
    statusBadge: "Hot Deal",
    isHotDeal: true,
    isDiscounted: false,
    hasInstallment: true,
    priceUSD: 78000,
    originalPriceUSD: 85000,
    areaM2: 58,
    bedrooms: 1,
    bathrooms: 1,
    floor: 7,
    totalFloors: 14,
    yearBuilt: 2024,
    parkingSpaces: 1,
    location: {
      city: "Tashkent",
      district: "Shaykhontohur",
      address: "Anhor Promenade 12, Waterfront Quarter",
      coordinates: { lat: 41.3204, lng: 69.2555 }
    },
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80"
    ],
    amenities: [
      "High-speed WiFi",
      "Underground Parking",
      "Smart Home Automation",
      "Elevator",
      "24/7 Security & CCTV",
      "Riverfront Jogging Path"
    ],
    description: "Sleek waterfront studio apartment offering serene views of the Anhor canal promenade. Fully equipped with smart IoT lighting, automated climate control, integrated sound system, and floor-to-ceiling glass doors opening onto a sunny riverfront balcony.",
    nearbyPoints: [
      { name: "Alisher Navoi Metro", distance: "400m", type: "transit" },
      { name: "Anhor Lokomotiv Park", distance: "200m", type: "park" },
      { name: "Samarqand Darvoza Mall", distance: "900m", type: "shop" }
    ],
    agent: {
      name: "Sardor Umidov",
      role: "Apartment Specialist",
      phone: "+998 93 456 78 90",
      telegram: "@sardor_realty",
      email: "sardor.u@uybozor.uz",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    views: 4210
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: "t-1",
    name: "Dr. Farrukh Toshmatov",
    role: "Neurosurgeon & Investor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    text: "UyBozor helped us secure an extraordinary penthouse in Tashkent City. The dual currency transparency and real-time mortgage calculations eliminated all confusion. The concierge service handled all registration within 48 hours!",
    propertyPurchased: "The Boulevard Imperial Penthouse",
    date: "October 2026"
  },
  {
    id: "t-2",
    name: "Kamola & Timur Ismoilov",
    role: "Tech Founders",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    text: "Finding a modern villa with genuine high-speed fiber and smart automation was challenging until we worked with UyBozor. Their 0% installment plan negotiated with the developer saved us over $40,000 in financing fees.",
    propertyPurchased: "Villa Solarium with Botanic Garden",
    date: "September 2026"
  },
  {
    id: "t-3",
    name: "Rustam Kadyrov",
    role: "Commercial Real Estate Partner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    text: "Flawless experience acquiring corporate headquarters on Mustaqillik Avenue. The price-per-square-meter analytical breakdown and instant verified legal documentation gave our investment board complete confidence.",
    propertyPurchased: "Oasis Commercial Glass Plaza",
    date: "August 2026"
  }
];

export const DISTRICTS_LIST = [
  "All Districts",
  "Tashkent City",
  "Mirzo Ulugbek",
  "Yakkasaroy",
  "Yunusobod",
  "Chilanzar",
  "Shaykhontohur",
  "Samarkand City"
];

export const PROPERTY_TYPES = [
  "All",
  "Apartment",
  "Villa",
  "Penthouse",
  "House",
  "Commercial"
];

export const AMENITIES_LIST = [
  "High-speed WiFi",
  "Underground Parking",
  "24/7 Security & CCTV",
  "Private Heated Pool",
  "Private Garden",
  "Panoramic Terrace",
  "Smart Home Automation",
  "Gym & Fitness Center",
  "Elevator",
  "Central HVAC & Air Filtration",
  "Finnish Sauna & Spa",
  "Children's Playground"
];
