/**
 * RegisterForm.jsx - Formulaire d'inscription pour Maef By Yas
 *
 * Ce composant gère :
 * - Saisie des informations d'inscription
 * - Validation des champs et des mots de passe
 * - Création de compte
 * - États de chargement et d'erreur
 * - Liens vers connexion
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { isValidEmail, isValidPassword } from "@utils/helpers";
import { USER_CONFIG } from "@utils/constants";

/**
 * Composant RegisterForm principal
 */
const RegisterForm = ({
  onSuccess,
  redirectTo = "/",
  className = "",
  compact = false,
}) => {
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // États locaux du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);

  // Récupérer la destination de redirection
  const from = location.state?.from?.pathname || redirectTo;

  /**
   * Gestionnaire de changement des champs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer les erreurs lors de la saisie
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Effacer l'erreur générale
    if (error) {
      clearError();
    }
  };

  /**
   * Validation des champs
   */
  const validateForm = () => {
    const errors = {};

    // Validation prénom
    if (!formData.firstName.trim()) {
      errors.firstName = "Le prénom est requis";
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = "Le prénom doit contenir au moins 2 caractères";
    }

    // Validation nom
    if (!formData.lastName.trim()) {
      errors.lastName = "Le nom est requis";
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = "Le nom doit contenir au moins 2 caractères";
    }

    // Validation email
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est requise";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Adresse email invalide";
    }

    // Validation mot de passe
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    } else if (!isValidPassword(formData.password)) {
      errors.password = `Le mot de passe doit contenir au moins ${USER_CONFIG.MIN_PASSWORD_LENGTH} caractères, une majuscule, une minuscule et un chiffre`;
    }

    // Validation confirmation mot de passe
    if (!formData.confirmPassword) {
      errors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Validation acceptation des conditions
    if (!acceptTerms) {
      errors.terms = "Vous devez accepter les conditions d'utilisation";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Évaluation de la force du mot de passe
   */
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: "", color: "" };

    let score = 0;
    let feedback = [];

    // Longueur
    if (password.length >= 8) score += 1;
    else feedback.push("8 caractères minimum");

    // Majuscule
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("une majuscule");

    // Minuscule
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("une minuscule");

    // Chiffre
    if (/\d/.test(password)) score += 1;
    else feedback.push("un chiffre");

    // Caractère spécial
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    const strength = {
      0: { text: "Très faible", color: "text-red-600" },
      1: { text: "Faible", color: "text-red-500" },
      2: { text: "Correct", color: "text-orange-500" },
      3: { text: "Bon", color: "text-yellow-500" },
      4: { text: "Fort", color: "text-green-500" },
      5: { text: "Très fort", color: "text-green-600" },
    };

    return {
      score,
      ...strength[score],
      feedback:
        feedback.length > 0 ? `Manque: ${feedback.join(", ")}` : "Excellent!",
    };
  };

  /**
   * Gestionnaire de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        acceptNewsletter,
      };

      const result = await register(userData);

      if (result.success) {
        // Callback de succès si fourni
        if (onSuccess) {
          onSuccess(result.user);
        }

        // Redirection
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    }
  };

  /**
   * Basculer la visibilité du mot de passe
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div
      className={`bg-white rounded-lg shadow-soft ${
        compact ? "p-6" : "p-8"
      } ${className}`}
    >
      {/* En-tête */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <UserPlus className="w-8 h-8 text-primary-600" />
        </div>
        <h2
          className={`font-bold text-secondary-900 ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          Créer un compte
        </h2>
        <p className="text-secondary-600 mt-2">
          Rejoignez la communauté Maef By Yas
        </p>
      </div>

      {/* Erreur générale */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Erreur d'inscription</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
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
              Prénom
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
              Nom
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

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            Adresse email
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
              autoComplete="email"
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

        {/* Mot de passe */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                formErrors.password
                  ? "border-red-300 focus:border-red-500"
                  : "border-secondary-300 focus:border-primary-500"
              }`}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
              disabled={isLoading}
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Indicateur de force du mot de passe */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-secondary-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength.score <= 2
                        ? "bg-red-500"
                        : passwordStrength.score <= 3
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${passwordStrength.color}`}
                >
                  {passwordStrength.text}
                </span>
              </div>
              {passwordStrength.feedback && (
                <p className="text-xs text-secondary-600 mt-1">
                  {passwordStrength.feedback}
                </p>
              )}
            </div>
          )}

          {formErrors.password && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formErrors.password}
            </p>
          )}
        </div>

        {/* Confirmation mot de passe */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-secondary-700 mb-2"
          >
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                formErrors.confirmPassword
                  ? "border-red-300 focus:border-red-500"
                  : "border-secondary-300 focus:border-primary-500"
              }`}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
              disabled={isLoading}
              aria-label={
                showConfirmPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Indication de correspondance des mots de passe */}
          {formData.confirmPassword && (
            <div className="mt-2">
              {formData.password === formData.confirmPassword ? (
                <p className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Les mots de passe correspondent
                </p>
              ) : (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Les mots de passe ne correspondent pas
                </p>
              )}
            </div>
          )}

          {formErrors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Cases à cocher */}
        <div className="space-y-4">
          {/* Acceptation des conditions */}
          <div className="flex items-start space-x-3">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              disabled={isLoading}
              required
            />
            <label htmlFor="acceptTerms" className="text-sm text-secondary-700">
              J'accepte les{" "}
              <Link
                to="/terms"
                className="text-primary-600 hover:text-primary-500 underline"
              >
                conditions d'utilisation
              </Link>{" "}
              et la{" "}
              <Link
                to="/privacy"
                className="text-primary-600 hover:text-primary-500 underline"
              >
                politique de confidentialité
              </Link>
            </label>
          </div>
          {formErrors.terms && (
            <p className="text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formErrors.terms}
            </p>
          )}

          {/* Newsletter optionnelle */}
          <div className="flex items-start space-x-3">
            <input
              id="acceptNewsletter"
              type="checkbox"
              checked={acceptNewsletter}
              onChange={(e) => setAcceptNewsletter(e.target.checked)}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              disabled={isLoading}
            />
            <label
              htmlFor="acceptNewsletter"
              className="text-sm text-secondary-700"
            >
              Je souhaite recevoir les newsletters et offres promotionnelles
              (optionnel)
            </label>
          </div>
        </div>

        {/* Bouton d'inscription */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
              Création en cours...
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 mr-2" />
              Créer mon compte
            </>
          )}
        </button>
      </form>

      {/* Séparateur */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-secondary-500">Ou</span>
          </div>
        </div>
      </div>

      {/* Liens vers connexion */}
      <div className="mt-6 text-center">
        <p className="text-sm text-secondary-600">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            state={{ from: location.state?.from }}
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            Se connecter
          </Link>
        </p>
      </div>

      {/* Note de sécurité */}
      {!compact && (
        <div className="mt-8 p-4 bg-secondary-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-secondary-900">
                Données sécurisées
              </p>
              <p className="text-sm text-secondary-600 mt-1">
                Vos informations personnelles sont protégées par un chiffrement
                SSL et ne sont jamais partagées avec des tiers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

RegisterForm.propTypes = {
  onSuccess: PropTypes.func,
  redirectTo: PropTypes.string,
  className: PropTypes.string,
  compact: PropTypes.bool,
};

export default RegisterForm;
