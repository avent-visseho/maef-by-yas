/**
 * products.js - Base de données des produits Maef By Yas
 * 
 * Ce fichier contient tous les produits de la boutique avec leurs informations détaillées :
 * - Pagnes
 * - Bijoux
 * - Sacs
 * - Chaussures
 * - Voiles suisses
 * - Guipures
 * - Sequins
 * - Tissus pour robes de soirée
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

// Catégories principales
export const CATEGORIES = {
  PAGNES: 'pagnes',
  BIJOUX: 'bijoux',
  SACS: 'sacs',
  CHAUSSURES: 'chaussures',
  VOILES_SUISSES: 'voiles-suisses',
  GUIPURES: 'guipures',
  SEQUINS: 'sequins',
  TISSUS_SOIREE: 'tissus-soiree'
};

// Sous-catégories
export const SUBCATEGORIES = {
  // Pagnes
  PAGNES_TRADITIONNELS: 'pagnes-traditionnels',
  PAGNES_MODERNES: 'pagnes-modernes',
  PAGNES_PREMIUM: 'pagnes-premium',
  
  // Bijoux
  COLLIERS: 'colliers',
  BRACELETS: 'bracelets',
  BOUCLES_OREILLES: 'boucles-oreilles',
  BAGUES: 'bagues',
  
  // Sacs
  SACS_MAIN: 'sacs-main',
  SACS_SOIREE: 'sacs-soiree',
  POCHETTES: 'pochettes',
  
  // Chaussures
  ESCARPINS: 'escarpins',
  SANDALES: 'sandales',
  BASKETS: 'baskets',
  
  // Voiles suisses
  VOILES_HOMME: 'voiles-homme',
  VOILES_FEMME: 'voiles-femme',
  
  // Autres
  GUIPURES_DENTELLE: 'guipures-dentelle',
  SEQUINS_BRILLANTS: 'sequins-brillants',
  TISSUS_LUXE: 'tissus-luxe'
};

// Couleurs disponibles
export const COLORS = {
  ROUGE: '#DC2626',
  BLEU: '#2563EB',
  VERT: '#16A34A',
  JAUNE: '#CA8A04',
  ROSE: '#DB2777',
  VIOLET: '#9333EA',
  ORANGE: '#EA580C',
  NOIR: '#000000',
  BLANC: '#FFFFFF',
  BEIGE: '#D4A574',
  DORE: '#FFD700',
  ARGENTE: '#C0C0C0'
};

// Tailles disponibles
export const SIZES = {
  CLOTHING: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  SHOES: ['36', '37', '38', '39', '40', '41', '42', '43'],
  BAGS: ['Petit', 'Moyen', 'Grand'],
  FABRIC: ['1m', '2m', '3m', '5m', '10m']
};

// Base de données des produits
export const PRODUCTS = [
  // PAGNES
  {
    id: 'pagne-001',
    name: 'Pagne Wax Traditionnel Royal',
    category: CATEGORIES.PAGNES,
    subcategory: SUBCATEGORIES.PAGNES_TRADITIONNELS,
    price: 45.00,
    originalPrice: 60.00,
    currency: 'EUR',
    description: 'Magnifique pagne wax authentique aux motifs traditionnels africains. Tissu de qualité premium avec des couleurs éclatantes qui ne ternissent pas au lavage.',
    longDescription: 'Ce pagne wax traditionnel est confectionné selon les méthodes ancestrales africaines. Les motifs géométriques racontent une histoire de royauté et de noblesse. Le tissu 100% coton est traité selon la technique de la cire résistante, garantissant une longévité exceptionnelle et des couleurs vives qui résistent au temps.',
    images: [
      '/images/products/pagnes/pagne-001-1.jpg',
      '/images/products/pagnes/pagne-001-2.jpg',
      '/images/products/pagnes/pagne-001-3.jpg',
      '/images/products/pagnes/pagne-001-4.jpg'
    ],
    colors: [COLORS.ROUGE, COLORS.BLEU, COLORS.JAUNE, COLORS.VERT],
    sizes: SIZES.FABRIC,
    inStock: true,
    quantity: 25,
    featured: true,
    trending: false,
    onSale: true,
    rating: 4.8,
    reviews: 156,
    tags: ['traditionnel', 'wax', 'coton', 'authentique', 'africain'],
    brand: 'Maef By Yas',
    origin: 'Bénin',
    material: '100% Coton Wax',
    care: 'Lavage à 30°C, séchage à l\'ombre',
    weight: '200g/m²'
  },

  // BIJOUX
  {
    id: 'bijoux-001',
    name: 'Collier Perles Dorées Africaines',
    category: CATEGORIES.BIJOUX,
    subcategory: SUBCATEGORIES.COLLIERS,
    price: 89.00,
    currency: 'EUR',
    description: 'Sublime collier en perles dorées artisanales inspiré des bijoux traditionnels africains. Pièce unique et élégante.',
    longDescription: 'Ce collier exceptionnel est composé de perles dorées soigneusement sélectionnées et assemblées à la main par nos artisans. Chaque perle raconte une histoire et apporte une touche de luxe à votre tenue. Le fermoir en métal doré assure une fermeture sécurisée.',
    images: [
      '/images/products/bijoux/collier-001-1.jpg',
      '/images/products/bijoux/collier-001-2.jpg',
      '/images/products/bijoux/collier-001-3.jpg'
    ],
    colors: [COLORS.DORE, COLORS.ARGENTE],
    sizes: ['Unique'],
    inStock: true,
    quantity: 12,
    featured: true,
    trending: false,
    onSale: false,
    rating: 4.9,
    reviews: 67,
    tags: ['artisanal', 'perles', 'doré', 'unique', 'luxe'],
    brand: 'Maef By Yas',
    material: 'Perles dorées, métal doré',
    care: 'Éviter l\'humidité, nettoyer avec un chiffon doux'
  },

  // SACS
  {
    id: 'sac-001',
    name: 'Sac à Main Cuir Tressé Artisanal',
    category: CATEGORIES.SACS,
    subcategory: SUBCATEGORIES.SACS_MAIN,
    price: 156.00,
    currency: 'EUR',
    description: 'Sac à main en cuir véritable tressé à la main par nos artisans. Design unique et finitions impeccables.',
    longDescription: 'Ce sac à main exceptionnel est entièrement confectionné à la main par nos maîtres artisans. Le cuir de première qualité est tressé selon une technique ancestrale, créant un motif unique et sophistiqué. L\'intérieur doublé dispose de plusieurs compartiments pratiques.',
    images: [
      '/images/products/sacs/sac-001-1.jpg',
      '/images/products/sacs/sac-001-2.jpg',
      '/images/products/sacs/sac-001-3.jpg',
      '/images/products/sacs/sac-001-4.jpg'
    ],
    colors: [COLORS.NOIR, COLORS.BEIGE, COLORS.ROUGE],
    sizes: SIZES.BAGS,
    inStock: true,
    quantity: 8,
    featured: true,
    trending: false,
    onSale: false,
    rating: 4.8,
    reviews: 43,
    tags: ['cuir', 'artisanal', 'tressé', 'unique', 'luxe'],
    brand: 'Maef By Yas',
    material: 'Cuir véritable, doublure textile',
    dimensions: 'L35 x H25 x P12 cm',
    care: 'Nettoyer avec un produit spécialisé cuir'
  },

  // GUIPURES
  {
    id: 'guipure-001',
    name: 'Guipure Dentelle Florale Luxe',
    category: CATEGORIES.GUIPURES,
    subcategory: SUBCATEGORIES.GUIPURES_DENTELLE,
    price: 78.00,
    currency: 'EUR',
    description: 'Guipure en dentelle avec motifs floraux pour créations haute couture. Qualité exceptionnelle et finesse remarquable.',
    longDescription: 'Cette guipure d\'exception présente des motifs floraux d\'une finesse remarquable. Parfaite pour les créations de haute couture, elle apporte une touche de luxe et de raffinement à vos confections.',
    images: [
      '/images/products/guipures/guipure-001-1.jpg',
      '/images/products/guipures/guipure-001-2.jpg'
    ],
    colors: [COLORS.BLANC, COLORS.BEIGE, COLORS.NOIR],
    sizes: SIZES.FABRIC,
    inStock: true,
    quantity: 22,
    featured: false,
    trending: false,
    onSale: true,
    rating: 4.6,
    reviews: 18,
    tags: ['guipure', 'dentelle', 'florale', 'luxe', 'haute-couture'],
    brand: 'Maef By Yas',
    material: 'Dentelle de coton',
    originalPrice: 95.00
  },

  // TISSUS DE SOIRÉE
  {
    id: 'tissu-001',
    name: 'Tissu Satin Luxe pour Robe de Soirée',
    category: CATEGORIES.TISSUS_SOIREE,
    subcategory: SUBCATEGORIES.TISSUS_LUXE,
    price: 87.00,
    currency: 'EUR',
    description: 'Tissu satin de qualité premium pour confectionner des robes de soirée élégantes et sophistiquées.',
    longDescription: 'Ce tissu satin d\'exception offre un tombé parfait et un éclat subtil qui sublime toutes vos créations. Sa texture soyeuse et sa brillance naturelle en font le choix idéal pour les robes de soirée, les tops chics ou les jupes plissées.',
    images: [
      '/images/products/tissus/tissu-001-1.jpg',
      '/images/products/tissus/tissu-001-2.jpg'
    ],
    colors: [COLORS.NOIR, COLORS.ROUGE, COLORS.BLEU, COLORS.VIOLET],
    sizes: SIZES.FABRIC,
    inStock: true,
    quantity: 20,
    featured: false,
    trending: false,
    onSale: false,
    rating: 4.6,
    reviews: 31,
    tags: ['satin', 'luxe', 'soirée', 'élégant'],
    brand: 'Maef By Yas',
    material: 'Satin polyester premium',
    care: 'Lavage délicat à 30°C'
  },

  // Produits supplémentaires pour une meilleure variété

  // SACS DE SOIRÉE
  {
    id: 'sac-002',
    name: 'Pochette Soirée Paillettes Dorées',
    category: CATEGORIES.SACS,
    subcategory: SUBCATEGORIES.SACS_SOIREE,
    price: 74.00,
    currency: 'EUR',
    description: 'Pochette de soirée scintillante avec paillettes dorées et chaîne amovible. Parfaite pour vos sorties glamour.',
    longDescription: 'Cette pochette élégante apportera une touche de glamour à toutes vos tenues de soirée. Les paillettes dorées captent magnifiquement la lumière, tandis que la chaîne fine et amovible vous offre plusieurs options de port.',
    images: [
      '/images/products/sacs/sac-002-1.jpg',
      '/images/products/sacs/sac-002-2.jpg',
      '/images/products/sacs/sac-002-3.jpg'
    ],
    colors: [COLORS.DORE, COLORS.ARGENTE, COLORS.NOIR],
    sizes: ['Unique'],
    inStock: true,
    quantity: 18,
    featured: false,
    trending: true,
    onSale: false,
    rating: 4.3,
    reviews: 27,
    tags: ['pochette', 'soirée', 'paillettes', 'glamour', 'chaîne'],
    brand: 'Maef By Yas',
    material: 'Textile pailleté, chaîne métal doré',
    dimensions: 'L25 x H15 x P3 cm'
  },
];

// Fonction utilitaire pour obtenir les produits par catégorie
export const getProductsByCategory = (category) => {
  return PRODUCTS.filter(product => product.category === category);
};

// Fonction utilitaire pour obtenir les produits en vedette
export const getFeaturedProducts = () => {
  return PRODUCTS.filter(product => product.featured);
};

// Fonction utilitaire pour obtenir les produits tendance
export const getTrendingProducts = () => {
  return PRODUCTS.filter(product => product.trending);
};

// Fonction utilitaire pour obtenir les produits en promotion
export const getProductsOnSale = () => {
  return PRODUCTS.filter(product => product.onSale);
};

// Fonction utilitaire pour obtenir un produit par ID
export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === id);
};

// Fonction utilitaire pour rechercher des produits
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Fonction utilitaire pour filtrer les produits par prix
export const filterProductsByPrice = (minPrice, maxPrice) => {
  return PRODUCTS.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};

// Fonction utilitaire pour trier les produits
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    default:
      return sorted;
  }
};

// Statistiques sur les produits
export const getProductStats = () => {
  const totalProducts = PRODUCTS.length;
  const categories = [...new Set(PRODUCTS.map(p => p.category))].length;
  const inStockProducts = PRODUCTS.filter(p => p.inStock).length;
  const featuredProducts = PRODUCTS.filter(p => p.featured).length;
  
  return {
    totalProducts,
    categories,
    inStockProducts,
    featuredProducts,
    outOfStock: totalProducts - inStockProducts
  };
};

export default PRODUCTS;