/**
 * ContactForm.jsx - Formulaire de contact pour Maef By Yas
 *
 * Ce composant gère :
 * - Saisie des informations de contact
 * - Validation des champs
 * - Envoi du message
 * - États de chargement et confirmation
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { isValidEmail, isValidPhone } from "@utils/helpers";

/**
 * Composant ContactForm principal
 */
const ContactForm = ({
  onSubmit,
  className = "",
  showPhone = true,
  showSubject = true,
  compact = false,
}) => {
  // États du formulaire
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

  // Sujets prédéfinis
  const subjects = [
    "Information produit",
    "Commande et livraison",
    "Service après-vente",
    "Partenariat",
    "Autre",
  ];

  /**
   * Gestionnaire de changement des champs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur du champ modifié
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Effacer l'erreur générale
    if (submitError) {
      setSubmitError("");
    }
  };

  /**
   * Validation du formulaire
   */
  const validateForm = () => {
    const errors = {};

    // Prénom requis
    if (!formData.firstName.trim()) {
      errors.firstName = "Le prénom est requis";
    }

    // Nom requis
    if (!formData.lastName.trim()) {
      errors.lastName = "Le nom est requis";
    }

    // Email requis et valide
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est requise";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Adresse email invalide";
    }

    // Téléphone (optionnel mais doit être valide si renseigné)
    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = "Numéro de téléphone invalide";
    }

    // Sujet requis si affiché
    if (showSubject && !formData.subject) {
      errors.subject = "Veuillez sélectionner un sujet";
    }

    // Message requis
    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Gestionnaire de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      // Simulation d'envoi (remplacer par votre logique d'envoi)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Callback personnalisé si fourni
      if (onSubmit) {
        await onSubmit(formData);
      }

      setIsSubmitted(true);

      // Réinitialiser le formulaire après un délai
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
      console.error("Erreur envoi formulaire:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Affichage de confirmation
  if (isSubmitted) {
    return (
      <div
        className={`bg-white rounded-lg shadow-soft p-8 text-center ${className}`}
      >
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-secondary-900 mb-4">
          Message envoyé !
        </h3>
        <p className="text-secondary-600 mb-6">
          Merci pour votre message. Notre équipe vous répondra dans les plus
          brefs délais.
        </p>
        <p className="text-sm text-secondary-500">
          Vous allez être redirigé automatiquement...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-soft ${
        compact ? "p-6" : "p-8"
      } ${className}`}
    >
      {/* En-tête */}
      <div className="mb-8">
        <h2
          className={`font-bold text-secondary-900 ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          Contactez-nous
        </h2>
        <p className="text-secondary-600 mt-2">
          Nous sommes là pour répondre à toutes vos questions
        </p>
      </div>

      {/* Erreur générale */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{submitError}</p>
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom et prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prénom */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-secondary-700 mb-2"
            >
              Prénom *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                  formErrors.firstName
                    ? "border-red-300 focus:border-red-500"
                    : "border-secondary-300 focus:border-primary-500"
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

          {/* Nom */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-secondary-700 mb-2"
            >
              Nom *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                formErrors.lastName
                  ? "border-red-300 focus:border-red-500"
                  : "border-secondary-300 focus:border-primary-500"
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

        {/* Email et téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary-700 mb-2"
            >
              Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                  formErrors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-secondary-300 focus:border-primary-500"
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

          {/* Téléphone */}
          {showPhone && (
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-secondary-700 mb-2"
              >
                Téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                    formErrors.phone
                      ? "border-red-300 focus:border-red-500"
                      : "border-secondary-300 focus:border-primary-500"
                  }`}
                  placeholder="+33 1 23 45 67 89"
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
          )}
        </div>

        {/* Sujet */}
        {showSubject && (
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-secondary-700 mb-2"
            >
              Sujet *
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                formErrors.subject
                  ? "border-red-300 focus:border-red-500"
                  : "border-secondary-300 focus:border-primary-500"
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
        )}

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            Message *
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-secondary-400" />
            </div>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none ${
                formErrors.message
                  ? "border-red-300 focus:border-red-500"
                  : "border-secondary-300 focus:border-primary-500"
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
          <p className="mt-2 text-sm text-secondary-500">
            Minimum 10 caractères ({formData.message.length}/10)
          </p>
        </div>

        {/* Bouton d'envoi */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
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

      {/* Note de confidentialité */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
        <p className="text-sm text-secondary-600">
          <strong>Confidentialité :</strong> Vos informations personnelles sont
          protégées et ne seront utilisées que pour répondre à votre demande.
        </p>
      </div>
    </div>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  showPhone: PropTypes.bool,
  showSubject: PropTypes.bool,
  compact: PropTypes.bool,
};

export default ContactForm;
