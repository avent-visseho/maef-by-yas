/**
 * Footer.jsx - Composant de pied de page principal de Maef By Yas
 *
 * Ce composant affiche le pied de page avec :
 * - Informations de contact
 * - Liens de navigation
 * - Réseaux sociaux
 * - Newsletter
 * - Mentions légales
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Heart,
  ArrowUp,
  Clock,
  Shield,
  Truck,
} from "lucide-react";
import { APP_CONFIG, SOCIAL_LINKS } from "@utils/constants";
import { isValidEmail, smoothScrollTo } from "@utils/helpers";

/**
 * Composant Footer principal
 */
const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle, loading, success, error
  const [newsletterMessage, setNewsletterMessage] = useState("");

  // Configuration des liens du footer
  const footerLinks = {
    shop: [
      { name: "Pagnes", path: "/shop?category=pagnes" },
      { name: "Bijoux", path: "/shop?category=bijoux" },
      { name: "Sacs", path: "/shop?category=sacs" },
      { name: "Chaussures", path: "/shop?category=chaussures" },
      { name: "Voiles Suisses", path: "/shop?category=voiles-suisses" },
      { name: "Nouveautés", path: "/shop?filter=newest" },
    ],
    company: [
      { name: "À propos", path: "/about" },
      { name: "Notre histoire", path: "/about#histoire" },
      { name: "Nos artisans", path: "/about#artisans" },
      { name: "Blog", path: "/blog" },
      { name: "Presse", path: "/presse" },
      { name: "Carrières", path: "/careers" },
    ],
    customer: [
      { name: "Contact", path: "/contact" },
      { name: "Guide des tailles", path: "/size-guide" },
      { name: "Livraison", path: "/shipping" },
      { name: "Retours", path: "/returns" },
      { name: "FAQ", path: "/faq" },
      { name: "Avis clients", path: "/reviews" },
    ],
    legal: [
      { name: "Mentions légales", path: "/legal" },
      { name: "Conditions générales", path: "/terms" },
      { name: "Politique de confidentialité", path: "/privacy" },
      { name: "Cookies", path: "/cookies" },
      { name: "RGPD", path: "/gdpr" },
    ],
  };

  // Icônes des réseaux sociaux
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  };

  /**
   * Gestionnaire d'inscription à la newsletter
   */
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      setNewsletterStatus("error");
      setNewsletterMessage("Veuillez entrer votre adresse email");
      return;
    }

    if (!isValidEmail(newsletterEmail)) {
      setNewsletterStatus("error");
      setNewsletterMessage("Format d'email invalide");
      return;
    }

    setNewsletterStatus("loading");

    try {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNewsletterStatus("success");
      setNewsletterMessage("Inscription réussie ! Merci de votre confiance.");
      setNewsletterEmail("");

      // Réinitialiser le message après 3 secondes
      setTimeout(() => {
        setNewsletterStatus("idle");
        setNewsletterMessage("");
      }, 3000);
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  /**
   * Retour en haut de page
   */
  const scrollToTop = () => {
    smoothScrollTo(document.body);
  };

  return (
    <footer className="bg-secondary-900 text-white relative">
      {/* Section principale */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Colonne 1 - Informations de l'entreprise */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <img
                  src="/logos/maef-by-yas-logo.png"
                  alt={APP_CONFIG.NAME}
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.target.src = "/logos/maef-by-yas-logo.png";
                  }}
                />
              </Link>
            </div>

            {/* Description */}
            <p className="text-secondary-300 mb-6 leading-relaxed">
              {APP_CONFIG.DESCRIPTION}. Découvrez l'authenticité et l'élégance
              de la mode africaine avec nos créations uniques.
            </p>

            {/* Informations de contact */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <p className="text-secondary-300">{APP_CONFIG.ADDRESS}</p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a
                  href={`tel:${APP_CONFIG.PHONE}`}
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  {APP_CONFIG.PHONE}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a
                  href={`mailto:${APP_CONFIG.EMAIL}`}
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  {APP_CONFIG.EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Colonne 2 - Boutique */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Boutique</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Entreprise */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Newsletter et Service Client */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Restez connecté
            </h3>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-secondary-300 mb-4">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières
                nouveautés et offres exclusives.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full px-4 py-3 bg-secondary-800 border border-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    disabled={newsletterStatus === "loading"}
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Message de statut */}
                {newsletterMessage && (
                  <p
                    className={`text-sm ${
                      newsletterStatus === "success"
                        ? "text-green-400"
                        : newsletterStatus === "error"
                        ? "text-red-400"
                        : "text-secondary-300"
                    }`}
                  >
                    {newsletterMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Service Client */}
            <div>
              <h4 className="text-base font-medium text-white mb-3">
                Service Client
              </h4>
              <ul className="space-y-2">
                {footerLinks.customer.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-secondary-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section des avantages */}
        <div className="border-t border-secondary-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-600 rounded-full">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">Livraison gratuite</h4>
                <p className="text-sm text-secondary-400">
                  À partir de 1000FCFA d'achat
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-600 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">Paiement sécurisé</h4>
                <p className="text-sm text-secondary-400">
                  Protection SSL garantie
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-600 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">Support 7j/7</h4>
                <p className="text-sm text-secondary-400">Assistance dédiée</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section réseaux sociaux */}
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">
                Suivez-nous
              </h4>
              <div className="flex space-x-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform];
                  if (!IconComponent) return null;

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary-800 hover:bg-primary-600 rounded-full transition-colors duration-300 group"
                      aria-label={`Suivre sur ${platform}`}
                    >
                      <IconComponent className="w-5 h-5 text-secondary-300 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Bouton retour en haut */}
            <button
              onClick={scrollToTop}
              className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition-colors duration-300 group"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-secondary-800 bg-secondary-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-secondary-400">
                © {new Date().getFullYear()} {APP_CONFIG.NAME}. Tous droits
                réservés.
              </p>
              <div className="flex items-center space-x-1 text-sm text-secondary-400">
                <span>Fait avec</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>au {APP_CONFIG.ADDRESS.split(",").pop()}</span>
              </div>
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-4">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-secondary-600">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
