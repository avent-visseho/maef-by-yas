/**
 * Contact.jsx - Page de contact complète pour Maef By Yas
 *
 * Cette page comprend :
 * - Section hero avec informations de contact
 * - Formulaire de contact intégré
 * - Carte avec localisation
 * - FAQ et informations utiles
 * - Newsletter en bas de page
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  AlertCircle,
  CheckCircle,
  Gift,
  Sparkles,
  Bell,
  Star,
  TrendingUp,
  Package,
  Plus,
  Minus,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Headphones,
  Shield,
  Truck,
  RotateCcw,
  Quote,
  ArrowRight,
} from "lucide-react";

// Validation des emails
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation des numéros de téléphone
const isValidPhone = (phone) => {
  const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Composant Hero de la page Contact
const ContactHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-pink-600 to-purple-700 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <MessageSquare className="w-10 h-10" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white">
            Contactez-nous
          </h1>

          <p className="text-xl text-pink-100 max-w-2xl mx-auto mb-8">
            Une question, un conseil, une demande particulière ? Notre équipe
            est là pour vous accompagner dans votre découverte de l'artisanat
            africain authentique.
          </p>
        </div>
      </div>
    </section>
  );
};

// Composant ContactForm
const ContactForm = ({ onSubmit, className = "", compact = false }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const subjects = [
    "Information produit",
    "Commande et livraison",
    "Service après-vente",
    "Partenariat",
    "Autre",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) errors.lastName = "Le nom est requis";

    if (!formData.email.trim()) {
      errors.email = "L'adresse email est requise";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Adresse email invalide";
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = "Numéro de téléphone invalide";
    }

    if (!formData.subject) errors.subject = "Veuillez sélectionner un sujet";

    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (onSubmit) await onSubmit(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      setSubmitError("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={`bg-white rounded-lg shadow-soft p-8 text-center ${className}`}
      >
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Message envoyé !
        </h3>
        <p className="text-gray-600 mb-6">
          Merci pour votre message. Notre équipe vous répondra dans les plus
          brefs délais.
        </p>
        <p className="text-sm text-gray-500">
          Vous allez être redirigé automatiquement...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-lg ${
        compact ? "p-6" : "p-8"
      } ${className}`}
    >
      <div className="mb-8">
        <h2
          className={`font-bold text-gray-900 ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          Envoyez-nous un message
        </h2>
        <p className="text-gray-600 mt-2">
          Nous sommes là pour répondre à toutes vos questions
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Prénom *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${
                  formErrors.firstName
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-pink-500"
                }`}
                placeholder="Votre prénom"
                disabled={isLoading}
                required
              />
            </div>
            {formErrors.firstName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${
                formErrors.lastName
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-pink-500"
              }`}
              placeholder="Votre nom"
              disabled={isLoading}
              required
            />
            {formErrors.lastName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${
                  formErrors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-pink-500"
                }`}
                placeholder="votre@email.com"
                disabled={isLoading}
                required
              />
            </div>
            {formErrors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${
                  formErrors.phone
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-300 focus:border-pink-500"
                }`}
                placeholder="+229 0196945997"
                disabled={isLoading}
              />
            </div>
            {formErrors.phone && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sujet *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors ${
              formErrors.subject
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-pink-500"
            }`}
            disabled={isLoading}
            required
          >
            <option value="">Sélectionnez un sujet</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {formErrors.subject && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formErrors.subject}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message *
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors resize-none ${
                formErrors.message
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-pink-500"
              }`}
              placeholder="Écrivez votre message ici..."
              disabled={isLoading}
              required
            />
          </div>
          {formErrors.message && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formErrors.message}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Minimum 10 caractères ({formData.message.length}/10)
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Envoyer le message
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Confidentialité :</strong> Vos informations personnelles sont
          protégées et ne seront utilisées que pour répondre à votre demande.
        </p>
      </div>
    </div>
  );
};

// Composant FAQ
const FAQ = () => {
  const [openItems, setOpenItems] = useState([]);

  const faqItems = [
    {
      question: "Quels sont vos délais de livraison ?",
      answer:
        "Nous livrons en France métropolitaine sous 2-3 jours ouvrés pour les commandes passées avant 14h. Pour les DOM-TOM et l'international, comptez 5-10 jours ouvrés selon la destination.",
    },
    {
      question: "Vos produits sont-ils authentiques ?",
      answer:
        "Absolument ! Tous nos produits sont sélectionnés directement auprès d'artisans africains partenaires. Nous garantissons l'authenticité et la qualité de chaque création.",
    },
    {
      question: "Puis-je retourner un produit ?",
      answer:
        "Oui, vous avez 30 jours pour retourner tout article non porté dans son emballage d'origine. Les frais de retour sont à votre charge, sauf en cas de défaut.",
    },
    {
      question: "Proposez-vous des créations sur mesure ?",
      answer:
        "Nous proposons certains services de personnalisation selon les produits. Contactez-nous avec vos demandes spécifiques et nous étudierons la faisabilité avec nos artisans.",
    },
    {
      question: "Comment entretenir mes bijoux artisanaux ?",
      answer:
        "Évitez le contact avec l'eau et les produits chimiques. Rangez-les dans un endroit sec et nettoyez-les délicatement avec un chiffon doux. Des conseils spécifiques sont fournis avec chaque commande.",
    },
    {
      question: "Offrez-vous la livraison gratuite ?",
      answer:
        "Oui, la livraison est gratuite en France métropolitaine dès 50€ d'achat. En dessous de ce montant, les frais de port sont de 4,90€.",
    },
  ];

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses aux questions les plus courantes
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleItem(index)}
                className="w-full bg-white rounded-lg shadow-sm border p-6 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <Minus className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-pink-600 flex-shrink-0" />
                  )}
                </div>
                {openItems.includes(index) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Contactez-nous directement</span>
          </button>
        </div> */}
      </div>
    </section>
  );
};

// Composant Features/Services
const ContactFeatures = () => {
  const features = [
    {
      icon: Headphones,
      title: "Support 7j/7",
      description: "Notre équipe est disponible tous les jours pour vous aider",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "Toutes vos transactions sont 100% sécurisées",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Expédition sous 24h et suivi de commande en temps réel",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: RotateCcw,
      title: "Retour Gratuit",
      description: "30 jours pour changer d'avis, retour simple et gratuit",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Votre satisfaction est notre priorité absolue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Newsletter adapté
const NewsletterContact = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) return;

    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
      }, 3000);
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto text-white">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              Inscription réussie !
            </h3>
            <p className="text-pink-100">
              Vous recevrez bientôt nos actualités et votre code de réduction.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white mb-8">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
              Restez informé de nos actualités
            </h2>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Recevez nos nouveautés, conseils et 10% de réduction sur votre
              première commande
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              {[
                {
                  icon: Gift,
                  text: "10% de réduction sur votre première commande",
                },
                {
                  icon: Bell,
                  text: "Soyez les premiers informés de nos nouveautés",
                },
                {
                  icon: Sparkles,
                  text: "Conseils et tendances mode africaine",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <benefit.icon className="w-6 h-6 text-pink-300 flex-shrink-0" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900"
                  disabled={status === "loading"}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === "loading" ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mr-2" />
                    ...
                  </div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-pink-200 mt-4">
              En vous inscrivant, vous acceptez de recevoir nos emails
              marketing. Vous pouvez vous désabonner à tout moment.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

// Composant Map (Version simplifiée avec placeholder)
/* const ContactMap = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Trouvez-nous
          </h2>
          <p className="text-lg text-gray-600">
            Venez découvrir nos créations dans notre showroom parisien
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Notre Showroom
                  </h3>
                  <p className="text-gray-600 mb-2">
                    123 Rue de l'Artisanat
                    <br />
                    75001 Paris, France
                  </p>
                  <p className="text-sm text-gray-500">
                    Métro : Châtelet - Les Halles (Lignes 1, 4, 7, 11, 14)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Horaires d'ouverture
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi</span>
                      <span>9h00 - 18h30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi</span>
                      <span>10h00 - 19h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span>14h00 - 18h00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Contact direct
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>+229 0196945997</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>contact@maefbyyas.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>+2290196945997</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden relative">
              
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center animate-bounce">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">Notre Showroom</p>
                  <p className="text-sm text-gray-600">
                    123 Rue de l'Artisanat, Paris
                  </p>
                </div>
              </div>

             
              <div className="absolute inset-0">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute bg-gray-400 opacity-20"
                    style={{
                      width: `${Math.random() * 100}%`,
                      height: "2px",
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 50}%`,
                      transform: `rotate(${Math.random() * 90}deg)`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-gray-600 text-center">
                <MapPin className="w-4 h-4 inline mr-1" />
                Cliquez pour ouvrir dans Google Maps
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; */

// Composant Testimonials adapté pour Contact
const ContactTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amina K.",
      location: "Cotonou",
      rating: 5,
      text: "Service client exceptionnel ! J'ai eu un souci avec ma commande et l'équipe a été très réactive pour le résoudre rapidement.",
      avatar: "👩🏾",
      category: "Service Client",
    },
    {
      id: 2,
      name: "Marie L.",
      location: "Ouidah",
      rating: 5,
      text: "Réponse ultra rapide à mes questions par email. L'équipe connaît vraiment bien ses produits et donne d'excellents conseils.",
      avatar: "👩🏼",
      category: "Support",
    },
    {
      id: 3,
      name: "Fatou D.",
      location: "Porto-Novo",
      rating: 5,
      text: "J'ai visité le showroom parisien, l'accueil était chaleureux et j'ai pu voir la qualité des produits de mes propres yeux.",
      avatar: "👩🏿",
      category: "Showroom",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            L'avis de nos clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez ce qu'ils pensent de notre service client
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <Quote className="w-6 h-6 text-pink-300 mb-2" />
                <blockquote className="text-gray-700 italic">
                  "{testimonial.text}"
                </blockquote>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                  <div className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                    {testimonial.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant Social Links
const SocialLinks = () => {
  const socialLinks = [
    {
      platform: "Facebook",
      icon: Facebook,
      url: "#",
      color: "text-blue-600",
      bgColor: "bg-blue-100 hover:bg-blue-200",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: "#",
      color: "text-pink-600",
      bgColor: "bg-pink-100 hover:bg-pink-200",
    },
    {
      platform: "Twitter",
      icon: Twitter,
      url: "#",
      color: "text-blue-400",
      bgColor: "bg-blue-100 hover:bg-blue-200",
    },
    {
      platform: "WhatsApp",
      icon: MessageCircle,
      url: "#",
      color: "text-green-600",
      bgColor: "bg-green-100 hover:bg-green-200",
    },
  ];

  return (
    <section className="py-16 bg-white border-t">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Suivez-nous sur les réseaux sociaux
          </h3>
          <p className="text-gray-600 mb-8">
            Restez connecté pour découvrir nos dernières créations et actualités
          </p>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                className={`group p-4 ${social.bgColor} rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                aria-label={`Suivez-nous sur ${social.platform}`}
              >
                <social.icon
                  className={`w-6 h-6 ${social.color} transition-transform group-hover:scale-110`}
                />
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Ou contactez-nous directement par WhatsApp au{" "}
              <a
                href="https://wa.me/33612345678"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                +2290196945997
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant principal Contact Page
const Contact = () => {
  const handleContactSubmit = async (formData) => {
    console.log("Contact form submitted:", formData);
    // Ici vous pouvez ajouter la logique d'envoi à votre backend
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div>
              <ContactForm onSubmit={handleContactSubmit} />
            </div>

            {/* Informations complémentaires */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Autres moyens de nous contacter
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "Téléphone",
                      content: "+229 0196945997",
                      description: "Lun-Ven 9h-18h, Sam 10h-17h",
                      color: "text-blue-600",
                      bgColor: "bg-blue-100",
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: "contact@maefbyyas.com",
                      description: "Réponse garantie sous 24h",
                      color: "text-pink-600",
                      bgColor: "bg-pink-100",
                    },
                    {
                      icon: MessageCircle,
                      title: "WhatsApp",
                      content: "+2290196945997",
                      description: "Chat direct et instantané",
                      color: "text-green-600",
                      bgColor: "bg-green-100",
                    },
                    {
                      icon: MessageSquare,
                      title: "Chat en ligne",
                      content: "Disponible sur le site",
                      description: "Support en temps réel",
                      color: "text-purple-600",
                      bgColor: "bg-purple-100",
                    },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`p-3 ${contact.bgColor} rounded-lg flex-shrink-0`}
                      >
                        <contact.icon className={`w-6 h-6 ${contact.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {contact.title}
                        </h4>
                        <p className="text-gray-700 font-medium mb-1">
                          {contact.content}
                        </p>
                        <p className="text-sm text-gray-500">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <ContactFeatures />

      {/* Map Section */}
     {/*  <ContactMap /> */}

      {/* FAQ Section */}
      <FAQ />

      {/* Testimonials */}
      <ContactTestimonials />

      {/* Social Links */}
      <SocialLinks />
    </div>
  );
};

export default Contact;
