/**
 * categories.js - Base de données des catégories Maef By Yas
 *
 * Ce fichier contient toutes les informations sur les catégories de produits :
 * - Définitions des catégories principales
 * - Sous-catégories avec leurs métadonnées
 * - Images et icônes associées
 * - Descriptions et mots-clés SEO
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import { CATEGORIES, SUBCATEGORIES } from "./products.js";

/**
 * Informations détaillées des catégories principales
 */
export const CATEGORY_DETAILS = {
  [CATEGORIES.PAGNES]: {
    id: CATEGORIES.PAGNES,
    name: "Pagnes",
    title: "Pagnes Africains Authentiques",
    description:
      "Découvrez notre collection de pagnes wax, ankara et kente authentiques. Tissus traditionnels africains de qualité premium pour vos créations uniques.",
    longDescription:
      "Nos pagnes sont soigneusement sélectionnés pour leur authenticité et leur qualité exceptionnelle. Chaque tissu raconte une histoire et porte en lui la richesse de la culture africaine. Parfaits pour confectionner des tenues traditionnelles ou modernes.",
    image: "/images/categories/pagnes-hero.jpg",
    icon: "🎨",
    color: "#DC2626",
    gradient: "from-red-500 to-pink-600",
    subcategories: [
      SUBCATEGORIES.PAGNES_TRADITIONNELS,
      SUBCATEGORIES.PAGNES_MODERNES,
      SUBCATEGORIES.PAGNES_PREMIUM,
    ],
    featured: true,
    seoKeywords: [
      "pagne africain",
      "wax",
      "ankara",
      "kente",
      "tissu traditionnel",
    ],
    priceRange: { min: 35, max: 250 },
  },

  [CATEGORIES.BIJOUX]: {
    id: CATEGORIES.BIJOUX,
    name: "Bijoux",
    title: "Bijoux Artisanaux Africains",
    description:
      "Bijoux uniques créés par des artisans talentueux. Colliers, bracelets, boucles d'oreilles et bagues aux inspirations africaines authentiques.",
    longDescription:
      "Chaque bijou de notre collection est une œuvre d'art unique, façonnée avec passion par nos artisans partenaires. Matériaux nobles, techniques ancestrales et designs contemporains s'harmonisent pour créer des pièces d'exception.",
    image: "/images/categories/bijoux-hero.jpg",
    icon: "💎",
    color: "#D97706",
    gradient: "from-amber-500 to-yellow-600",
    subcategories: [
      SUBCATEGORIES.COLLIERS,
      SUBCATEGORIES.BRACELETS,
      SUBCATEGORIES.BOUCLES_OREILLES,
      SUBCATEGORIES.BAGUES,
    ],
    featured: true,
    seoKeywords: [
      "bijoux africains",
      "artisanal",
      "collier",
      "bracelet",
      "boucles oreilles",
    ],
    priceRange: { min: 25, max: 180 },
  },

  [CATEGORIES.SACS]: {
    id: CATEGORIES.SACS,
    name: "Sacs",
    title: "Maroquinerie de Qualité",
    description:
      "Sacs à main, pochettes et accessoires en cuir véritable. Designs élégants alliant tradition et modernité pour toutes les occasions.",
    longDescription:
      "Notre collection de maroquinerie privilégie la qualité et le savoir-faire artisanal. Cuirs sélectionnés, coutures impeccables et finitions soignées caractérisent chacune de nos créations.",
    image: "/images/categories/sacs-hero.jpg",
    icon: "👜",
    color: "#059669",
    gradient: "from-emerald-500 to-teal-600",
    subcategories: [
      SUBCATEGORIES.SACS_MAIN,
      SUBCATEGORIES.SACS_SOIREE,
      SUBCATEGORIES.POCHETTES,
    ],
    featured: true,
    seoKeywords: [
      "sac cuir",
      "maroquinerie",
      "sac main",
      "pochette",
      "artisanal",
    ],
    priceRange: { min: 65, max: 280 },
  },

  [CATEGORIES.CHAUSSURES]: {
    id: CATEGORIES.CHAUSSURES,
    name: "Chaussures",
    title: "Chaussures Élégantes & Confortables",
    description:
      "Escarpins, sandales et chaussures de ville. Confort optimal et style raffiné pour accompagner toutes vos tenues.",
    longDescription:
      "Nos chaussures conjuguent élégance et confort grâce à des matériaux de qualité et un design pensé pour le bien-être du pied. Chaque modèle est conçu pour vous accompagner avec style au quotidien.",
    image: "/images/categories/chaussures-hero.jpg",
    icon: "👠",
    color: "#7C3AED",
    gradient: "from-purple-500 to-indigo-600",
    subcategories: [
      SUBCATEGORIES.ESCARPINS,
      SUBCATEGORIES.SANDALES,
      SUBCATEGORIES.BASKETS,
    ],
    featured: true,
    seoKeywords: [
      "chaussures femme",
      "escarpins",
      "sandales",
      "confort",
      "élégant",
    ],
    priceRange: { min: 75, max: 165 },
  },

  [CATEGORIES.VOILES_SUISSES]: {
    id: CATEGORIES.VOILES_SUISSES,
    name: "Voiles Suisses",
    title: "Voiles Suisses Premium",
    description:
      "Voiles suisses de qualité exceptionnelle avec broderies fines. Tissus nobles pour vos créations les plus élégantes.",
    longDescription:
      "Nos voiles suisses sont reconnus pour leur qualité supérieure et leurs broderies délicates réalisées à la main. Tissus d'exception pour des créations raffinées et intemporelles.",
    image: "/images/categories/voiles-hero.jpg",
    icon: "✨",
    color: "#EC4899",
    gradient: "from-pink-500 to-rose-600",
    subcategories: [SUBCATEGORIES.VOILES_HOMME, SUBCATEGORIES.VOILES_FEMME],
    featured: false,
    seoKeywords: [
      "voile suisse",
      "broderie",
      "premium",
      "tissu noble",
      "artisanal",
    ],
    priceRange: { min: 180, max: 350 },
  },

  [CATEGORIES.GUIPURES]: {
    id: CATEGORIES.GUIPURES,
    name: "Guipures",
    title: "Dentelles & Guipures de Luxe",
    description:
      "Guipures et dentelles raffinées pour vos créations haute couture. Motifs délicats et finesse exceptionnelle.",
    longDescription:
      "Nos guipures et dentelles sont sélectionnées pour leur beauté et leur qualité supérieure. Parfaites pour apporter une touche de luxe et de raffinement à vos créations couture.",
    image: "/images/categories/guipures-hero.jpg",
    icon: "🕸️",
    color: "#0EA5E9",
    gradient: "from-sky-500 to-blue-600",
    subcategories: [SUBCATEGORIES.GUIPURES_DENTELLE],
    featured: false,
    seoKeywords: [
      "guipure",
      "dentelle",
      "luxe",
      "haute couture",
      "raffinement",
    ],
    priceRange: { min: 65, max: 125 },
  },

  [CATEGORIES.SEQUINS]: {
    id: CATEGORIES.SEQUINS,
    name: "Sequins",
    title: "Tissus Pailletés & Sequins",
    description:
      "Tissus à sequins brillants pour vos tenues de fête et soirée. Éclat et glamour garantis pour toutes vos occasions spéciales.",
    longDescription:
      "Nos tissus à sequins transforment chaque création en pièce d'exception. Qualité premium et brillance incomparable pour des tenues qui ne passent pas inaperçues.",
    image: "/images/categories/sequins-hero.jpg",
    icon: "✨",
    color: "#F59E0B",
    gradient: "from-yellow-500 to-orange-600",
    subcategories: [SUBCATEGORIES.SEQUINS_BRILLANTS],
    featured: false,
    seoKeywords: [
      "sequins",
      "paillettes",
      "tissu brillant",
      "soirée",
      "glamour",
    ],
    priceRange: { min: 95, max: 165 },
  },

  [CATEGORIES.TISSUS_SOIREE]: {
    id: CATEGORIES.TISSUS_SOIREE,
    name: "Tissus de Soirée",
    title: "Tissus Luxueux pour Soirée",
    description:
      "Satins, mousselines et tissus nobles pour créer des robes de soirée exceptionnelles. Élégance et sophistication assurées.",
    longDescription:
      "Notre sélection de tissus de soirée réunit les plus belles matières : satins soyeux, mousselines vaporeuses et tissus structuré pour des créations d'une élégance incomparable.",
    image: "/images/categories/tissus-soiree-hero.jpg",
    icon: "🌙",
    color: "#8B5CF6",
    gradient: "from-violet-500 to-purple-600",
    subcategories: [SUBCATEGORIES.TISSUS_LUXE],
    featured: false,
    seoKeywords: ["tissu soirée", "satin", "mousseline", "luxe", "robe soirée"],
    priceRange: { min: 80, max: 145 },
  },
};

/**
 * Informations détaillées des sous-catégories
 */
export const SUBCATEGORY_DETAILS = {
  // Pagnes
  [SUBCATEGORIES.PAGNES_TRADITIONNELS]: {
    id: SUBCATEGORIES.PAGNES_TRADITIONNELS,
    name: "Pagnes Traditionnels",
    parentCategory: CATEGORIES.PAGNES,
    description: "Pagnes wax authentiques aux motifs ancestraux africains",
    image: "/images/subcategories/pagnes-traditionnels.jpg",
  },
  [SUBCATEGORIES.PAGNES_MODERNES]: {
    id: SUBCATEGORIES.PAGNES_MODERNES,
    name: "Pagnes Modernes",
    parentCategory: CATEGORIES.PAGNES,
    description: "Designs contemporains alliant tradition et modernité",
    image: "/images/subcategories/pagnes-modernes.jpg",
  },
  [SUBCATEGORIES.PAGNES_PREMIUM]: {
    id: SUBCATEGORIES.PAGNES_PREMIUM,
    name: "Pagnes Premium",
    parentCategory: CATEGORIES.PAGNES,
    description: "Tissus d'exception pour les occasions spéciales",
    image: "/images/subcategories/pagnes-premium.jpg",
  },

  // Bijoux
  [SUBCATEGORIES.COLLIERS]: {
    id: SUBCATEGORIES.COLLIERS,
    name: "Colliers",
    parentCategory: CATEGORIES.BIJOUX,
    description: "Colliers artisanaux aux inspirations africaines",
    image: "/images/subcategories/colliers.jpg",
  },
  [SUBCATEGORIES.BRACELETS]: {
    id: SUBCATEGORIES.BRACELETS,
    name: "Bracelets",
    parentCategory: CATEGORIES.BIJOUX,
    description: "Bracelets et manchettes uniques faits main",
    image: "/images/subcategories/bracelets.jpg",
  },
  [SUBCATEGORIES.BOUCLES_OREILLES]: {
    id: SUBCATEGORIES.BOUCLES_OREILLES,
    name: "Boucles d'Oreilles",
    parentCategory: CATEGORIES.BIJOUX,
    description: "Boucles d'oreilles élégantes et originales",
    image: "/images/subcategories/boucles-oreilles.jpg",
  },
  [SUBCATEGORIES.BAGUES]: {
    id: SUBCATEGORIES.BAGUES,
    name: "Bagues",
    parentCategory: CATEGORIES.BIJOUX,
    description: "Bagues raffinées aux designs authentiques",
    image: "/images/subcategories/bagues.jpg",
  },

  // Sacs
  [SUBCATEGORIES.SACS_MAIN]: {
    id: SUBCATEGORIES.SACS_MAIN,
    name: "Sacs à Main",
    parentCategory: CATEGORIES.SACS,
    description: "Sacs à main en cuir pour le quotidien",
    image: "/images/subcategories/sacs-main.jpg",
  },
  [SUBCATEGORIES.SACS_SOIREE]: {
    id: SUBCATEGORIES.SACS_SOIREE,
    name: "Sacs de Soirée",
    parentCategory: CATEGORIES.SACS,
    description: "Pochettes et sacs élégants pour vos soirées",
    image: "/images/subcategories/sacs-soiree.jpg",
  },
  [SUBCATEGORIES.POCHETTES]: {
    id: SUBCATEGORIES.POCHETTES,
    name: "Pochettes",
    parentCategory: CATEGORIES.SACS,
    description: "Petites pochettes pratiques et stylées",
    image: "/images/subcategories/pochettes.jpg",
  },

  // Chaussures
  [SUBCATEGORIES.ESCARPINS]: {
    id: SUBCATEGORIES.ESCARPINS,
    name: "Escarpins",
    parentCategory: CATEGORIES.CHAUSSURES,
    description: "Escarpins élégants pour toutes occasions",
    image: "/images/subcategories/escarpins.jpg",
  },
  [SUBCATEGORIES.SANDALES]: {
    id: SUBCATEGORIES.SANDALES,
    name: "Sandales",
    parentCategory: CATEGORIES.CHAUSSURES,
    description: "Sandales confortables et tendance",
    image: "/images/subcategories/sandales.jpg",
  },
  [SUBCATEGORIES.BASKETS]: {
    id: SUBCATEGORIES.BASKETS,
    name: "Baskets",
    parentCategory: CATEGORIES.CHAUSSURES,
    description: "Baskets décontractées au style unique",
    image: "/images/subcategories/baskets.jpg",
  },

  // Voiles Suisses
  [SUBCATEGORIES.VOILES_HOMME]: {
    id: SUBCATEGORIES.VOILES_HOMME,
    name: "Voiles Homme",
    parentCategory: CATEGORIES.VOILES_SUISSES,
    description: "Voiles suisses brodés pour homme",
    image: "/images/subcategories/voiles-homme.jpg",
  },
  [SUBCATEGORIES.VOILES_FEMME]: {
    id: SUBCATEGORIES.VOILES_FEMME,
    name: "Voiles Femme",
    parentCategory: CATEGORIES.VOILES_SUISSES,
    description: "Voiles suisses délicats pour femme",
    image: "/images/subcategories/voiles-femme.jpg",
  },

  // Autres sous-catégories
  [SUBCATEGORIES.GUIPURES_DENTELLE]: {
    id: SUBCATEGORIES.GUIPURES_DENTELLE,
    name: "Guipures & Dentelles",
    parentCategory: CATEGORIES.GUIPURES,
    description: "Dentelles fines et guipures de luxe",
    image: "/images/subcategories/guipures-dentelle.jpg",
  },
  [SUBCATEGORIES.SEQUINS_BRILLANTS]: {
    id: SUBCATEGORIES.SEQUINS_BRILLANTS,
    name: "Sequins Brillants",
    parentCategory: CATEGORIES.SEQUINS,
    description: "Tissus pailletés pour soirées glamour",
    image: "/images/subcategories/sequins-brillants.jpg",
  },
  [SUBCATEGORIES.TISSUS_LUXE]: {
    id: SUBCATEGORIES.TISSUS_LUXE,
    name: "Tissus de Luxe",
    parentCategory: CATEGORIES.TISSUS_SOIREE,
    description: "Tissus premium pour robes de soirée",
    image: "/images/subcategories/tissus-luxe.jpg",
  },
};

/**
 * Fonction pour obtenir toutes les catégories
 * @returns {Array} Liste des catégories avec leurs détails
 */
export const getAllCategories = () => {
  return Object.values(CATEGORY_DETAILS);
};

/**
 * Fonction pour obtenir les catégories en vedette
 * @returns {Array} Liste des catégories en vedette
 */
export const getFeaturedCategories = () => {
  return Object.values(CATEGORY_DETAILS).filter((cat) => cat.featured);
};

/**
 * Fonction pour obtenir une catégorie par ID
 * @param {string} categoryId - ID de la catégorie
 * @returns {Object|null} Détails de la catégorie ou null si non trouvée
 */
export const getCategoryById = (categoryId) => {
  return CATEGORY_DETAILS[categoryId] || null;
};

/**
 * Fonction pour obtenir les sous-catégories d'une catégorie
 * @param {string} categoryId - ID de la catégorie parent
 * @returns {Array} Liste des sous-catégories
 */
export const getSubcategoriesByCategory = (categoryId) => {
  const category = CATEGORY_DETAILS[categoryId];
  if (!category) return [];

  return category.subcategories.map((subId) => SUBCATEGORY_DETAILS[subId]);
};

/**
 * Fonction pour obtenir une sous-catégorie par ID
 * @param {string} subcategoryId - ID de la sous-catégorie
 * @returns {Object|null} Détails de la sous-catégorie ou null si non trouvée
 */
export const getSubcategoryById = (subcategoryId) => {
  return SUBCATEGORY_DETAILS[subcategoryId] || null;
};

/**
 * Navigation breadcrumb
 * @param {string} categoryId - ID de la catégorie
 * @param {string} subcategoryId - ID de la sous-catégorie (optionnel)
 * @returns {Array} Chemin de navigation
 */
export const getBreadcrumbPath = (categoryId, subcategoryId = null) => {
  const breadcrumb = [
    { name: "Accueil", path: "/" },
    { name: "Boutique", path: "/shop" },
  ];

  const category = getCategoryById(categoryId);
  if (category) {
    breadcrumb.push({
      name: category.name,
      path: `/shop?category=${categoryId}`,
    });

    if (subcategoryId) {
      const subcategory = getSubcategoryById(subcategoryId);
      if (subcategory) {
        breadcrumb.push({
          name: subcategory.name,
          path: `/shop?category=${categoryId}&subcategory=${subcategoryId}`,
        });
      }
    }
  }

  return breadcrumb;
};

export default CATEGORY_DETAILS;
