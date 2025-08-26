/**
 * Newsletter.jsx - Composant d'inscription à la newsletter Maef By Yas
 *
 * Ce composant gère :
 * - Formulaire d'inscription newsletter
 * - Validation des emails
 * - États de chargement et succès
 * - Design responsive et attractif
 * - Options de préférences
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Mail,
  Send,
  Check,
  AlertCircle,
  Gift,
  Sparkles,
  Bell,
  Star,
  TrendingUp,
  Package,
} from "lucide-react";

/**
 * Validation d'email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Composant Newsletter principal
 */
const Newsletter = ({
  title = "Restez connecté à l'authenticité",
  subtitle = "Recevez en exclusivité nos nouveautés et bons plans",
  placeholder = "Votre adresse email",
  ctaText = "S'abonner",
  showBenefits = true,
  showPreferences = false,
  variant = "default", // 'default', 'minimal', 'card', 'banner'
  onSubscribe,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState({
    newProducts: true,
    promotions: true,
    tips: false,
  });
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Observer pour l'animation d'entrée
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("newsletter-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  /**
   * Gestionnaire de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setErrorMessage("Veuillez saisir votre adresse email");
      setStatus("error");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Veuillez saisir une adresse email valide");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Simulation d'appel API ou callback personnalisé
      if (onSubscribe) {
        await onSubscribe({ email, preferences });
      } else {
        // Simulation délai réseau
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  /**
   * Gestionnaire de changement des préférences
   */
  const handlePreferenceChange = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * Reset du formulaire après succès
   */
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("idle");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  /**
   * Benefits à afficher
   */
  const benefits = [
    {
      icon: Gift,
      text: "10% de réduction sur votre première commande",
      highlight: true,
    },
    {
      icon: Bell,
      text: "Soyez les premiers informés de nos nouveautés",
    },
    {
      icon: Star,
      text: "Accès exclusif aux ventes privées",
    },
    {
      icon: TrendingUp,
      text: "Conseils et tendances mode africaine",
    },
  ];

  /**
   * Rendu selon la variante
   */
  const renderContent = () => {
    const formContent = (
      <div
        className={`transition-all duration-700 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* En-tête */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-secondary-900 mb-3">
            {title}
          </h3>
          {subtitle && (
            <p className="text-secondary-600 max-w-xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Avantages */}
        {showBenefits && (
          <div
            className={`mb-8 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      benefit.highlight
                        ? "bg-primary-50 border border-primary-200"
                        : "bg-secondary-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        benefit.highlight
                          ? "text-primary-600"
                          : "text-secondary-600"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        benefit.highlight
                          ? "text-primary-800 font-medium"
                          : "text-secondary-700"
                      }`}
                    >
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          {status === "success" ? (
            // État de succès
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-secondary-900 mb-2">
                Inscription réussie !
              </h4>
              <p className="text-secondary-600">
                Merci de votre confiance. Vous recevrez bientôt votre code de
                réduction par email.
              </p>
            </div>
          ) : (
            // Formulaire d'inscription
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Champ email */}
              <div className="relative">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full pl-12 pr-4 py-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-base ${
                      status === "error"
                        ? "border-red-300 bg-red-50"
                        : "border-secondary-300 bg-white"
                    }`}
                    disabled={status === "loading"}
                  />
                </div>

                {/* Message d'erreur */}
                {status === "error" && errorMessage && (
                  <div className="flex items-center space-x-2 mt-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Préférences */}
              {showPreferences && (
                <div className="space-y-3 p-4 bg-secondary-50 rounded-lg">
                  <h5 className="font-medium text-secondary-900">
                    Vos préférences de contenu :
                  </h5>

                  <div className="space-y-2">
                    {[
                      {
                        key: "newProducts",
                        label: "Nouveaux produits",
                        icon: Package,
                      },
                      {
                        key: "promotions",
                        label: "Promotions exclusives",
                        icon: Gift,
                      },
                      {
                        key: "tips",
                        label: "Conseils et tendances",
                        icon: Sparkles,
                      },
                    ].map((pref) => {
                      const Icon = pref.icon;
                      return (
                        <label
                          key={pref.key}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={preferences[pref.key]}
                            onChange={() => handlePreferenceChange(pref.key)}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Icon className="w-4 h-4 text-secondary-600" />
                          <span className="text-sm text-secondary-700">
                            {pref.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bouton d'inscription */}
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="w-full flex items-center justify-center space-x-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Inscription en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{ctaText}</span>
                  </>
                )}
              </button>

              {/* Mentions légales */}
              <p className="text-xs text-secondary-500 text-center mt-4">
                En vous inscrivant, vous acceptez de recevoir nos emails
                marketing. Vous pouvez vous désabonner à tout moment.{" "}
                <a
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Politique de confidentialité
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    );

    // Rendu selon la variante
    switch (variant) {
      case "minimal":
        return (
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={status === "loading"}
              />
              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !email.trim()}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 transition-colors"
              >
                {status === "loading" ? "..." : "OK"}
              </button>
            </div>
          </div>
        );

      case "banner":
        return (
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-center md:text-left">
                <h4 className="font-semibold">{title}</h4>
                {subtitle && (
                  <p className="text-primary-200 text-sm">{subtitle}</p>
                )}
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 px-4 py-2 rounded text-secondary-900 focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={status === "loading"}
                />
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading" || !email.trim()}
                  className="px-6 py-2 bg-white text-primary-600 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors font-medium"
                >
                  {status === "loading" ? "..." : ctaText}
                </button>
              </div>
            </div>
          </div>
        );

      case "card":
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">{formContent}</div>
        );

      default:
        return formContent;
    }
  };

  if (variant === "minimal" || variant === "banner") {
    return <div className={className}>{renderContent()}</div>;
  }

  return (
    <section
      id="newsletter-section"
      className={`section-padding bg-gradient-to-b from-primary-50 to-white ${className}`}
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {variant === "card" ? (
            <div className="relative">
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent-200 rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse delay-1000" />

              {renderContent()}
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </section>
  );
};

Newsletter.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  ctaText: PropTypes.string,
  showBenefits: PropTypes.bool,
  showPreferences: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "minimal", "card", "banner"]),
  onSubscribe: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Composant NewsletterPopup - Version popup/modal
 */
export const NewsletterPopup = ({
  isOpen,
  onClose,
  title = "Ne manquez rien !",
  subtitle = "Recevez 10% de réduction sur votre première commande",
  autoShow = true,
  showDelay = 3000,
}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (autoShow) {
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, showDelay);

      return () => clearTimeout(timer);
    }
  }, [autoShow, showDelay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;

    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");

      setTimeout(() => {
        onClose?.();
      }, 2000);
    } catch (error) {
      setStatus("error");
    }
  };

  const isVisible = isOpen || shouldShow;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative transform transition-all duration-300 scale-100">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 transition-colors"
        >
          ×
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Merci !</h3>
            <p className="text-secondary-600">
              Votre code promo arrive par email.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                {title}
              </h3>
              <p className="text-secondary-600">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                disabled={status === "loading"}
              />

              <button
                type="submit"
                disabled={status === "loading" || !isValidEmail(email)}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {status === "loading"
                  ? "Inscription..."
                  : "Obtenir ma réduction"}
              </button>
            </form>

            <p className="text-xs text-secondary-500 text-center mt-4">
              Pas de spam, promis ! Vous pouvez vous désabonner à tout moment.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

NewsletterPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  autoShow: PropTypes.bool,
  showDelay: PropTypes.number,
};

/**
 * Hook personnalisé pour gérer l'état de la newsletter
 */
export const useNewsletter = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const subscribe = async (emailAddress, preferences = {}) => {
    try {
      // Logique d'inscription (API call)
      console.log("Subscribe:", { email: emailAddress, preferences });

      setEmail(emailAddress);
      setIsSubscribed(true);

      // Stocker dans localStorage
      localStorage.setItem("newsletter_subscribed", "true");
      localStorage.setItem("newsletter_email", emailAddress);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const unsubscribe = () => {
    setIsSubscribed(false);
    setEmail("");
    localStorage.removeItem("newsletter_subscribed");
    localStorage.removeItem("newsletter_email");
  };

  // Vérifier l'état au montage
  React.useEffect(() => {
    const subscribed = localStorage.getItem("newsletter_subscribed");
    const savedEmail = localStorage.getItem("newsletter_email");

    if (subscribed === "true" && savedEmail) {
      setIsSubscribed(true);
      setEmail(savedEmail);
    }
  }, []);

  return {
    isSubscribed,
    email,
    subscribe,
    unsubscribe,
  };
};

export default Newsletter;
