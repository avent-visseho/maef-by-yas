/**
 * helpers.js - Fonctions utilitaires pour Maef By Yas
 *
 * Ce fichier contient toutes les fonctions d'aide réutilisables :
 * - Formatage des prix et devises
 * - Manipulation de dates
 * - Validation de formulaires
 * - Génération d'URLs et slugs
 * - Utilitaires pour images et médias
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

/**
 * Formate un prix avec la devise
 * @param {number} price - Prix à formater
 * @param {string} currency - Devise (EUR, USD, etc.)
 * @param {string} locale - Locale pour le formatage (fr-FR par défaut)
 * @returns {string} Prix formaté
 */
export const formatPrice = (price, currency = "XOF", locale = "fr-FR") => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } catch (error) {
    console.warn("Erreur de formatage prix:", error);
    return `${price} ${currency}`;
  }
};

/**
 * Calcule le pourcentage de réduction
 * @param {number} originalPrice - Prix original
 * @param {number} salePrice - Prix en promotion
 * @returns {number} Pourcentage de réduction arrondi
 */
export const calculateDiscountPercentage = (originalPrice, salePrice) => {
  if (originalPrice <= 0 || salePrice <= 0 || salePrice >= originalPrice) {
    return 0;
  }

  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Génère un slug URL-friendly à partir d'une chaîne
 * @param {string} text - Texte à convertir en slug
 * @returns {string} Slug généré
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[àáâäãåą]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôöõø]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "c")
    .replace(/[ñ]/g, "n")
    .replace(/[ýÿ]/g, "y")
    .replace(/[^\w\s-]/g, "") // Supprime les caractères spéciaux
    .replace(/[\s_-]+/g, "-") // Remplace espaces et underscores par des tirets
    .replace(/^-+|-+$/g, ""); // Supprime les tirets en début et fin
};

/**
 * Tronque un texte à une longueur donnée
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @param {string} suffix - Suffixe à ajouter (... par défaut)
 * @returns {string} Texte tronqué
 */
export const truncateText = (text, maxLength = 100, suffix = "...") => {
  if (!text || text.length <= maxLength) {
    return text || "";
  }

  return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Capitalise la première lettre d'une chaîne
 * @param {string} str - Chaîne à capitaliser
 * @returns {string} Chaîne capitalisée
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalise chaque mot d'une phrase
 * @param {string} str - Phrase à capitaliser
 * @returns {string} Phrase avec chaque mot capitalisé
 */
export const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
};

/**
 * Formate une date en français
 * @param {string|Date} date - Date à formater
 * @param {string} format - Format souhaité ('short', 'medium', 'long')
 * @returns {string} Date formatée
 */
export const formatDate = (date, format = "medium") => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!dateObj || isNaN(dateObj.getTime())) {
    return "";
  }

  const options = {
    short: { year: "numeric", month: "2-digit", day: "2-digit" },
    medium: { year: "numeric", month: "long", day: "numeric" },
    long: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  try {
    return dateObj.toLocaleDateString(
      "fr-FR",
      options[format] || options.medium
    );
  } catch (error) {
    console.warn("Erreur de formatage date:", error);
    return dateObj.toLocaleDateString();
  }
};

/**
 * Calcule le temps écoulé depuis une date
 * @param {string|Date} date - Date de référence
 * @returns {string} Temps écoulé en format lisible
 */
export const getTimeAgo = (date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now - dateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} jours`;
  if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`;
  if (diffDays < 365) return `Il y a ${Math.ceil(diffDays / 30)} mois`;

  return `Il y a ${Math.ceil(diffDays / 365)} ans`;
};

/**
 * Valide une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} True si l'email est valide
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone français
 * @param {string} phone - Numéro de téléphone
 * @returns {boolean} True si le numéro est valide
 */
export const isValidPhoneNumber = (phone) => {
  // Format acceptés: +33123456789, 0123456789, 01 23 45 67 89, 01.23.45.67.89
  const phoneRegex = /^(?:\+33|0)[1-9](?:[0-9]{8})$/;
  const cleanPhone = phone.replace(/[\s.-]/g, "");
  return phoneRegex.test(cleanPhone);
};

/**
 * Valide un code postal français
 * @param {string} zipCode - Code postal
 * @returns {boolean} True si le code postal est valide
 */
export const isValidZipCode = (zipCode) => {
  const zipRegex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  return zipRegex.test(zipCode);
};

/**
 * Génère un ID unique
 * @param {string} prefix - Préfixe pour l'ID
 * @returns {string} ID unique généré
 */
export const generateUniqueId = (prefix = "id") => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}-${randomStr}`;
};

/**
 * Debounce une fonction (limite les appels successifs)
 * @param {Function} func - Fonction à debouncer
 * @param {number} wait - Délai d'attente en ms
 * @param {boolean} immediate - Exécuter immédiatement
 * @returns {Function} Fonction debouncée
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
};

/**
 * Throttle une fonction (limite la fréquence d'appel)
 * @param {Function} func - Fonction à throttler
 * @param {number} limit - Limite en ms
 * @returns {Function} Fonction throttlée
 */
export const throttle = (func, limit) => {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Copie du texte dans le presse-papiers
 * @param {string} text - Texte à copier
 * @returns {Promise<boolean>} Promesse résolue avec le succès de l'opération
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (error) {
    console.warn("Erreur copie clipboard:", error);
    return false;
  }
};

/**
 * Optimise une URL d'image avec des paramètres
 * @param {string} src - URL source de l'image
 * @param {Object} options - Options d'optimisation
 * @returns {string} URL optimisée
 */
export const optimizeImageUrl = (src, options = {}) => {
  if (!src) return "/images/placeholder.jpg";

  const { width, height, quality = 85, format = "auto" } = options;

  // Si l'image est déjà externe, la retourner telle quelle
  if (src.startsWith("http")) return src;

  // Pour les images locales, on peut ajouter des paramètres d'optimisation
  let optimizedUrl = src;
  const params = new URLSearchParams();

  if (width) params.set("w", width);
  if (height) params.set("h", height);
  if (quality !== 85) params.set("q", quality);
  if (format !== "auto") params.set("f", format);

  if (params.toString()) {
    optimizedUrl += `?${params.toString()}`;
  }

  return optimizedUrl;
};

/**
 * Gère l'erreur de chargement d'image avec une image de fallback
 * @param {Event} event - Événement d'erreur de l'image
 * @param {string} fallbackSrc - URL de l'image de fallback
 */
export const handleImageError = (
  event,
  fallbackSrc = "/images/placeholder.jpg"
) => {
  const img = event.target;
  if (img.src !== fallbackSrc) {
    img.src = fallbackSrc;
    img.alt = "Image non disponible";
  }
};

/**
 * Convertit les paramètres d'URL en objet
 * @param {string} search - Chaîne de paramètres (?param1=value1&param2=value2)
 * @returns {Object} Objet avec les paramètres
 */
export const parseUrlParams = (search) => {
  const params = new URLSearchParams(search);
  const result = {};

  for (const [key, value] of params) {
    result[key] = value;
  }

  return result;
};

/**
 * Convertit un objet en paramètres d'URL
 * @param {Object} params - Objet des paramètres
 * @returns {string} Chaîne de paramètres
 */
export const objectToUrlParams = (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.set(key, value.toString());
      }
    }
  });

  return searchParams.toString();
};

/**
 * Détecte le type d'appareil (mobile, tablet, desktop)
 * @returns {string} Type d'appareil détecté
 */
export const getDeviceType = () => {
  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

/**
 * Scroll fluide vers un élément
 * @param {string|Element} target - Sélecteur ou élément cible
 * @param {Object} options - Options de scroll
 */
export const smoothScrollTo = (target, options = {}) => {
  const element =
    typeof target === "string" ? document.querySelector(target) : target;

  if (!element) return;

  const defaultOptions = {
    behavior: "smooth",
    block: "start",
    inline: "nearest",
    ...options,
  };

  element.scrollIntoView(defaultOptions);
};

/**
 * Génère une URL de partage pour les réseaux sociaux
 * @param {string} platform - Plateforme (facebook, twitter, whatsapp, etc.)
 * @param {Object} data - Données à partager (url, title, text)
 * @returns {string} URL de partage
 */
export const generateSocialShareUrl = (platform, data) => {
  const { url, title, text, image } = data;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText} ${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}${
      image ? `&media=${encodeURIComponent(image)}` : ""
    }`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText} ${encodedUrl}`,
  };

  return shareUrls[platform.toLowerCase()] || "";
};

/**
 * Vérifie si l'utilisateur préfère le mode sombre
 * @returns {boolean} True si le mode sombre est préféré
 */
export const prefersDarkMode = () => {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

/**
 * Sauvegarde des données dans le localStorage de manière sécurisée
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à stocker
 * @returns {boolean} Succès de l'opération
 */
export const secureLocalStorageSet = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.warn("Erreur localStorage set:", error);
    return false;
  }
};

/**
 * Récupère des données du localStorage de manière sécurisée
 * @param {string} key - Clé de stockage
 * @param {any} defaultValue - Valeur par défaut si la clé n'existe pas
 * @returns {any} Valeur récupérée ou valeur par défaut
 */
export const secureLocalStorageGet = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn("Erreur localStorage get:", error);
    return defaultValue;
  }
};

/**
 * Supprime une clé du localStorage de manière sécurisée
 * @param {string} key - Clé à supprimer
 * @returns {boolean} Succès de l'opération
 */
export const secureLocalStorageRemove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn("Erreur localStorage remove:", error);
    return false;
  }
};
