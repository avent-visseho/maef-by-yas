/**
 * constants.js - Constantes globales de Maef By Yas
 * 
 * Ce fichier contient toutes les constantes utilisées dans l'application :
 * - Configuration générale
 * - Limites et valeurs par défaut
 * - Messages d'erreur et de succès
 * - URLs et endpoints
 * - Réglages de l'interface
 * 
 * @author Votre équipe de développement
 * @version 1.0.0
 */

// Informations de base de l'application
export const APP_CONFIG = {
  NAME: 'Maef By Yas',
  VERSION: '1.0.0',
  DESCRIPTION: 'Boutique en ligne de produits vestimentaires africains authentiques',
  URL: 'https://maef-by-yas.com',
  EMAIL: 'contact@maef-by-yas.com',
  PHONE: '+229 XX XX XX XX',
  ADDRESS: 'Porto-Novo, Ouémé, Bénin'
};

// Réseaux sociaux
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/maefbyyas',
  INSTAGRAM: 'https://instagram.com/maefbyyas',
  TWITTER: 'https://twitter.com/maefbyyas',
  WHATSAPP: 'https://wa.me/+229XXXXXXXX',
  YOUTUBE: 'https://youtube.com/@maefbyyas',
  TIKTOK: 'https://tiktok.com/@maefbyyas'
};

// Configuration du panier
export const CART_CONFIG = {
  MAX_ITEMS: 50,
  MAX_QUANTITY_PER_ITEM: 10,
  MIN_ORDER_AMOUNT: 20,
  FREE_SHIPPING_THRESHOLD: 100,
  STORAGE_KEY: 'maef-cart',
  EXPIRY_DAYS: 30
};

// Configuration des utilisateurs
export const USER_CONFIG = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_LOGIN_ATTEMPTS: 5,
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 heures en ms
  STORAGE_KEY: 'maef-user',
  AVATAR_PLACEHOLDER: '/images/default-avatar.png'
};

// Configuration de la pagination
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZES: [8, 12, 24, 48],
  MAX_VISIBLE_PAGES: 5,
  LOAD_MORE_INCREMENT: 12
};

// Configuration des filtres de produits
export const FILTER_CONFIG = {
  PRICE_RANGES: [
    { min: 0, max: 50, label: 'Moins de 50€' },
    { min: 50, max: 100, label: '50€ - 100€' },
    { min: 100, max: 200, label: '100€ - 200€' },
    { min: 200, max: 500, label: '200€ - 500€' },
    { min: 500, max: Infinity, label: 'Plus de 500€' }
  ],
  SORT_OPTIONS: [
    { value: 'featured', label: 'Mis en avant' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'name-asc', label: 'Nom A-Z' },
    { value: 'name-desc', label: 'Nom Z-A' },
    { value: 'rating', label: 'Mieux notés' }
  ],
  DEFAULT_SORT: 'featured'
};

// Configuration de la recherche
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  MAX_SUGGESTIONS: 8,
  DEBOUNCE_DELAY: 300,
  STORAGE_KEY: 'maef-search-history',
  MAX_HISTORY_ITEMS: 10
};

// États des commandes (pour usage futur)
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Types de notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

/**
 * constants.js - Constantes globales de Maef By Yas (Suite et fin)
 */

// Messages de notification (suite)
export const MESSAGES = {
  SUCCESS: {
    PRODUCT_ADDED_TO_CART: 'Produit ajouté au panier avec succès !',
    PRODUCT_REMOVED_FROM_CART: 'Produit retiré du panier',
    CART_UPDATED: 'Panier mis à jour',
    CART_CLEARED: 'Panier vidé',
    USER_LOGGED_IN: 'Connexion réussie !',
    USER_LOGGED_OUT: 'Déconnexion réussie',
    USER_REGISTERED: 'Inscription réussie !',
    PROFILE_UPDATED: 'Profil mis à jour avec succès',
    MESSAGE_SENT: 'Votre message a été envoyé avec succès !',
    NEWSLETTER_SUBSCRIBED: 'Abonnement à la newsletter confirmé !',
    COPIED_TO_CLIPBOARD: 'Copié dans le presse-papiers'
  },
  ERROR: {
    GENERIC: 'Une erreur s\'est produite. Veuillez réessayer.',
    NETWORK: 'Erreur de connexion. Vérifiez votre connexion internet.',
    PRODUCT_NOT_FOUND: 'Produit non trouvé',
    CART_EMPTY: 'Votre panier est vide',
    CART_LIMIT_REACHED: 'Limite maximum du panier atteinte',
    INVALID_EMAIL: 'Adresse email invalide',
    INVALID_PASSWORD: 'Mot de passe trop court (6 caractères minimum)',
    LOGIN_FAILED: 'Email ou mot de passe incorrect',
    REGISTRATION_FAILED: 'Erreur lors de l\'inscription',
    REQUIRED_FIELDS: 'Veuillez remplir tous les champs obligatoires',
    INVALID_PHONE: 'Numéro de téléphone invalide',
    OUT_OF_STOCK: 'Produit en rupture de stock',
    QUANTITY_EXCEEDED: 'Quantité demandée non disponible',
    SESSION_EXPIRED: 'Session expirée. Veuillez vous reconnecter.',
    PAYMENT_FAILED: 'Erreur de paiement. Veuillez réessayer.',
    FILE_TOO_LARGE: 'Fichier trop volumineux',
    INVALID_FILE_TYPE: 'Type de fichier non autorisé'
  },
  WARNING: {
    CART_ITEM_LIMIT: 'Quantité maximum atteinte pour cet article',
    LOW_STOCK: 'Stock limité pour ce produit',
    SESSION_EXPIRING: 'Votre session expire bientôt',
    UNSAVED_CHANGES: 'Vous avez des modifications non sauvegardées'
  },
  INFO: {
    LOADING: 'Chargement en cours...',
    SEARCHING: 'Recherche en cours...',
    NO_RESULTS: 'Aucun résultat trouvé',
    EMPTY_CART: 'Votre panier est vide. Découvrez nos produits !',
    FREE_SHIPPING: 'Livraison gratuite à partir de 100€',
    SECURE_PAYMENT: 'Paiement 100% sécurisé'
  }
};

// Configuration des animations
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    EXTRA_SLOW: 1000
  },
  EASING: {
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
};

// Breakpoints responsive (correspond à Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,   // sm: @media (min-width: 640px)
  MD: 768,   // md: @media (min-width: 768px)  
  LG: 1024,  // lg: @media (min-width: 1024px)
  XL: 1280,  // xl: @media (min-width: 1280px)
  '2XL': 1536 // 2xl: @media (min-width: 1536px)
};

// Configuration des images
export const IMAGE_CONFIG = {
  PLACEHOLDER: '/images/placeholder.jpg',
  AVATAR_DEFAULT: '/images/default-avatar.png',
  LOGO: '/images/logos/maef-by-yas-logo.png',
  LOGO_DARK: '/images/logos/maef-by-yas-logo-dark.png',
  FAVICON: '/favicon.ico',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  QUALITY: {
    THUMBNAIL: 70,
    MEDIUM: 85,
    HIGH: 95
  },
  SIZES: {
    THUMBNAIL: { width: 150, height: 150 },
    SMALL: { width: 300, height: 300 },
    MEDIUM: { width: 600, height: 600 },
    LARGE: { width: 1200, height: 1200 }
  }
};

// Configuration SEO
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Maef By Yas - Boutique de mode africaine authentique',
  TITLE_SEPARATOR: ' | ',
  DEFAULT_DESCRIPTION: 'Découvrez notre collection de pagnes, bijoux, sacs et accessoires africains authentiques. Qualité premium et artisanat traditionnel.',
  DEFAULT_KEYWORDS: 'pagne africain, bijoux artisanaux, mode africaine, wax, ankara, kente, sacs cuir, chaussures, voile suisse',
  OG_IMAGE: '/images/og-image.jpg',
  TWITTER_HANDLE: '@maefbyyas',
  SITE_URL: 'https://maef-by-yas.com'
};

// Configuration des cookies et localStorage
export const STORAGE_CONFIG = {
  KEYS: {
    CART: 'maef-cart',
    USER: 'maef-user',
    PREFERENCES: 'maef-preferences',
    SEARCH_HISTORY: 'maef-search-history',
    WISHLIST: 'maef-wishlist',
    VIEWED_PRODUCTS: 'maef-viewed-products',
    THEME: 'maef-theme',
    LANGUAGE: 'maef-language'
  },
  EXPIRY: {
    SESSION: 24 * 60 * 60 * 1000, // 24 heures
    CART: 30 * 24 * 60 * 60 * 1000, // 30 jours
    PREFERENCES: 365 * 24 * 60 * 60 * 1000 // 1 an
  }
};

// Configuration de validation des formulaires
export const VALIDATION_CONFIG = {
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: 'Veuillez entrer une adresse email valide'
  },
  PHONE: {
    REGEX: /^(?:\+33|0)[1-9](?:[0-9]{8})$/,
    MESSAGE: 'Veuillez entrer un numéro de téléphone valide'
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    MESSAGE: 'Le mot de passe doit contenir au moins 6 caractères avec une majuscule, une minuscule et un chiffre'
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    REGEX: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    MESSAGE: 'Nom invalide (2-50 caractères, lettres uniquement)'
  },
  ZIP_CODE: {
    REGEX: /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/,
    MESSAGE: 'Code postal invalide'
  }
};

// Configuration des types de fichiers acceptés
export const FILE_CONFIG = {
  IMAGES: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif']
  },
  DOCUMENTS: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    TYPES: ['application/pdf', 'text/plain', 'application/msword'],
    EXTENSIONS: ['.pdf', '.txt', '.doc', '.docx']
  }
};

// Configuration des modales
export const MODAL_CONFIG = {
  ANIMATION_DURATION: 300,
  OVERLAY_OPACITY: 0.5,
  MAX_WIDTH: {
    SM: '400px',
    MD: '600px',
    LG: '800px',
    XL: '1200px',
    FULL: '95vw'
  },
  Z_INDEX: {
    MODAL: 1000,
    OVERLAY: 999,
    DROPDOWN: 100,
    TOOLTIP: 200
  }
};

// Configuration des notifications toast
export const TOAST_CONFIG = {
  DURATION: {
    SUCCESS: 4000,
    ERROR: 6000,
    WARNING: 5000,
    INFO: 3000
  },
  POSITION: {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center'
  },
  MAX_TOASTS: 5,
  DEFAULT_POSITION: 'top-right'
};

// Configuration des couleurs du thème
export const THEME_COLORS = {
  PRIMARY: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843'
  },
  SECONDARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  },
  SUCCESS: '#10b981',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6'
};

// Configuration de la navigation
export const NAVIGATION_CONFIG = {
  MAIN_MENU: [
    { name: 'Accueil', path: '/', exact: true },
    { name: 'Boutique', path: '/shop' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ],
  FOOTER_MENU: {
    SHOP: [
      { name: 'Tous les produits', path: '/shop' },
      { name: 'Pagnes', path: '/shop?category=pagnes' },
      { name: 'Bijoux', path: '/shop?category=bijoux' },
      { name: 'Sacs', path: '/shop?category=sacs' },
      { name: 'Chaussures', path: '/shop?category=chaussures' }
    ],
    COMPANY: [
      { name: 'À propos', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Conditions générales', path: '/terms' },
      { name: 'Politique de confidentialité', path: '/privacy' },
      { name: 'Mentions légales', path: '/legal' }
    ],
    SUPPORT: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Livraison', path: '/shipping' },
      { name: 'Retours', path: '/returns' },
      { name: 'Guide des tailles', path: '/size-guide' }
    ]
  }
};

// Configuration des métadonnées des pages
export const PAGE_META = {
  HOME: {
    title: 'Accueil',
    description: 'Boutique en ligne de mode africaine authentique - Pagnes, bijoux, sacs et accessoires de qualité premium',
    keywords: 'mode africaine, pagne, bijoux, artisanat, authentique'
  },
  SHOP: {
    title: 'Boutique',
    description: 'Découvrez toute notre collection de produits africains authentiques',
    keywords: 'boutique, produits africains, shopping'
  },
  ABOUT: {
    title: 'À Propos',
    description: 'Découvrez l\'histoire de Maef By Yas et notre passion pour la mode africaine authentique',
    keywords: 'à propos, histoire, mission, valeurs'
  },
  CONTACT: {
    title: 'Contact',
    description: 'Contactez-nous pour toute question ou demande d\'information',
    keywords: 'contact, support, aide, information'
  }
};

// Configuration des devises et localisation
export const LOCALE_CONFIG = {
  DEFAULT_CURRENCY: 'EUR',
  DEFAULT_LOCALE: 'fr-FR',
  SUPPORTED_CURRENCIES: [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'XOF', symbol: 'CFA', name: 'Franc CFA' },
    { code: 'USD', symbol: '$', name: 'Dollar US' }
  ],
  SUPPORTED_LOCALES: [
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' }
  ]
};

// Configuration des évaluations
export const RATING_CONFIG = {
  MAX_STARS: 5,
  MIN_RATING: 1,
  MAX_RATING: 5,
  DEFAULT_RATING: 0,
  ALLOW_HALF_STARS: true,
  REQUIRED_PURCHASE: false // Pour activer plus tard avec le backend
};

// Configuration des tailles
export const SIZE_CONFIG = {
  CLOTHING: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  SHOES_EU: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
  SHOES_US: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
  RINGS: ['48', '50', '52', '54', '56', '58', '60', '62', '64', '66', '68'],
  FABRIC: ['1m', '2m', '3m', '4m', '5m', '6m']
};

// Configuration des couleurs produits
export const PRODUCT_COLORS = {
  NOIR: { name: 'Noir', hex: '#000000', code: 'black' },
  BLANC: { name: 'Blanc', hex: '#FFFFFF', code: 'white' },
  ROUGE: { name: 'Rouge', hex: '#EF4444', code: 'red' },
  BLEU: { name: 'Bleu', hex: '#3B82F6', code: 'blue' },
  VERT: { name: 'Vert', hex: '#10B981', code: 'green' },
  JAUNE: { name: 'Jaune', hex: '#F59E0B', code: 'yellow' },
  VIOLET: { name: 'Violet', hex: '#8B5CF6', code: 'purple' },
  ROSE: { name: 'Rose', hex: '#EC4899', code: 'pink' },
  ORANGE: { name: 'Orange', hex: '#F97316', code: 'orange' },
  GRIS: { name: 'Gris', hex: '#6B7280', code: 'gray' },
  BEIGE: { name: 'Beige', hex: '#D2B48C', code: 'beige' },
  MARRON: { name: 'Marron', hex: '#92400E', code: 'brown' },
  DORE: { name: 'Doré', hex: '#FCD34D', code: 'gold' },
  ARGENTE: { name: 'Argenté', hex: '#E5E7EB', code: 'silver' }
};

// Regex utiles
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_FR: /^(?:\+33|0)[1-9](?:[0-9]{8})$/,
  ZIP_CODE_FR: /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Configuration des performances
export const PERFORMANCE_CONFIG = {
  IMAGE_LAZY_LOADING: true,
  COMPONENT_LAZY_LOADING: true,
  DEBOUNCE_SEARCH: 300,
  THROTTLE_SCROLL: 100,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_CONCURRENT_REQUESTS: 6
};

// URLs d'API (pour usage futur avec backend)
export const API_ENDPOINTS = {
  /* BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api', */
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  USERS: '/users',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  CART: '/cart',
  ORDERS: '/orders',
  SEARCH: '/search',
  CONTACT: '/contact',
  NEWSLETTER: '/newsletter'
};

// Configuration des tests (pour usage futur)
export const TEST_CONFIG = {
  TEST_IDS: {
    PRODUCT_CARD: 'product-card',
    ADD_TO_CART_BUTTON: 'add-to-cart-btn',
    CART_ITEM: 'cart-item',
    LOGIN_FORM: 'login-form',
    SEARCH_INPUT: 'search-input',
    FILTER_SIDEBAR: 'filter-sidebar'
  }
};

export default {
  APP_CONFIG,
  SOCIAL_LINKS,
  CART_CONFIG,
  USER_CONFIG,
  PAGINATION_CONFIG,
  FILTER_CONFIG,
  SEARCH_CONFIG,
  ORDER_STATUS,
  NOTIFICATION_TYPES,
  MESSAGES,
  ANIMATION_CONFIG,
  BREAKPOINTS,
  IMAGE_CONFIG,
  SEO_CONFIG,
  STORAGE_CONFIG,
  VALIDATION_CONFIG,
  FILE_CONFIG,
  MODAL_CONFIG,
  TOAST_CONFIG,
  THEME_COLORS,
  NAVIGATION_CONFIG,
  PAGE_META,
  LOCALE_CONFIG,
  RATING_CONFIG,
  SIZE_CONFIG,
  PRODUCT_COLORS,
  REGEX_PATTERNS,
  PERFORMANCE_CONFIG,
  API_ENDPOINTS,
  TEST_CONFIG
};