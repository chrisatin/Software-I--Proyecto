const sampleProperties = [
  {
    title: "Casa Moderna en Zona Rosa",
    description: "Hermosa casa moderna de 3 pisos con acabados de lujo, ubicada en el corazón de la Zona Rosa. Cuenta con amplios espacios, jardín privado y garaje para 2 vehículos.",
    price: 850000000,
    location: "Zona Rosa, Bogotá",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    property_type: "house",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    model_3d_path: "/models/house1.glb",
    features: [
      "Jardín privado",
      "Garaje para 2 carros",
      "Terraza en azotea",
      "Sala de juegos",
      "Closets empotrados",
      "Cocina integral",
      "Zona de lavandería"
    ]
  },
  {
    title: "Apartamento Ejecutivo en Chapinero",
    description: "Elegante apartamento en torre de lujo con vista panorámica de la ciudad. Incluye amenities como gimnasio, piscina y salón comunal.",
    price: 450000000,
    location: "Chapinero, Bogotá",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    property_type: "apartment",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800"
    ],
    model_3d_path: "/models/apartment1.glb",
    features: [
      "Vista panorámica",
      "Amenities del edificio",
      "Gimnasio",
      "Piscina",
      "Salón comunal",
      "Seguridad 24/7",
      "Ascensor"
    ]
  },
  {
    title: "Casa Campestre en Chía",
    description: "Espaciosa casa campestre con terreno de 2000m², ideal para familias que buscan tranquilidad y contacto con la naturaleza.",
    price: 1200000000,
    location: "Chía, Cundinamarca",
    bedrooms: 5,
    bathrooms: 4,
    area: 300,
    property_type: "house",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    model_3d_path: "/models/house2.glb",
    features: [
      "Terreno de 2000m²",
      "Jardín amplio",
      "Huerta",
      "Garaje para 3 carros",
      "Bodega",
      "Terraza cubierta",
      "Zona de parrilla"
    ]
  },
  {
    title: "Oficina Comercial en Centro",
    description: "Moderno local comercial en el centro de Bogotá, ideal para oficinas o negocio. Excelente ubicación y alta afluencia de público.",
    price: 320000000,
    location: "Centro, Bogotá",
    bedrooms: 0,
    bathrooms: 2,
    area: 80,
    property_type: "commercial",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
    ],
    model_3d_path: "/models/office1.glb",
    features: [
      "Ubicación estratégica",
      "Alta afluencia",
      "Estacionamiento",
      "Aire acondicionado",
      "Sistema de seguridad",
      "Acceso para discapacitados"
    ]
  },
  {
    title: "Apartamento en Usaquén",
    description: "Acogedor apartamento de 2 habitaciones en barrio residencial, cerca a parques y colegios. Ideal para parejas jóvenes.",
    price: 280000000,
    location: "Usaquén, Bogotá",
    bedrooms: 2,
    bathrooms: 2,
    area: 75,
    property_type: "apartment",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800"
    ],
    model_3d_path: "/models/apartment2.glb",
    features: [
      "Barrio residencial",
      "Cerca a parques",
      "Seguridad",
      "Ascensor",
      "Balcón",
      "Closets empotrados"
    ]
  },
  {
    title: "Terreno en Suba",
    description: "Terreno plano de 500m² en excelente ubicación, ideal para construcción de casa o edificio. Servicios públicos disponibles.",
    price: 180000000,
    location: "Suba, Bogotá",
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    property_type: "land",
    status: "available",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    model_3d_path: "/models/land1.glb",
    features: [
      "Terreno plano",
      "Servicios públicos",
      "Excelente ubicación",
      "Fácil acceso",
      "Zona residencial"
    ]
  }
];

const sampleUsers = [
  {
    name: "María González",
    email: "maria@example.com",
    password: "password123",
    role: "admin"
  },
  {
    name: "Carlos Rodríguez",
    email: "carlos@example.com", 
    password: "password123",
    role: "user"
  },
  {
    name: "Ana Martínez",
    email: "ana@example.com",
    password: "password123",
    role: "user"
  }
];

module.exports = {
  sampleProperties,
  sampleUsers
};
