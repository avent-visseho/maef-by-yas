/**
 * LoginForm.jsx - Formulaire de connexion pour Maef By Yas
 *
 * Ce composant gère :
 * - Saisie email/mot de passe
 * - Validation des champs
 * - États de chargement et d'erreur
 * - Liens vers inscription et mot de passe oublié
 * - Connexion via réseaux sociaux (future implémentation)
 *
 * @author Votre équipe de développement
 * @version 1.0.0
 */

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { isValidEmail } from "@utils/helpers";
import { USER_CONFIG, MESSAGES } from "@utils/constants";

/**
 * Composant LoginForm principal
 */
const LoginForm = ({
  onSuccess,
  redirectTo = "/",
  className = "",
  compact = false,
}) => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // États locaux du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Récupérer la destination de redirection depuis l'état de navigation
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

    // Validation email
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est requise";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Adresse email invalide";
    }

    // Validation mot de passe
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    } else if (formData.password.length < USER_CONFIG.MIN_PASSWORD_LENGTH) {
      errors.password = `Le mot de passe doit contenir au moins ${USER_CONFIG.MIN_PASSWORD_LENGTH} caractères`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Callback de succès si fourni
        if (onSuccess) {
          onSuccess(result.user);
        }

        // Redirection
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  /**
   * Basculer la visibilité du mot de passe
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-soft ${
        compact ? "p-6" : "p-8"
      } ${className}`}
    >
      {/* En-tête */}
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-8 h-8 text-primary-600" />
        </div>
        <h2
          className={`font-bold text-secondary-900 ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          Se connecter
        </h2>
        <p className="text-secondary-600 mt-2">
          Accédez à votre compte Maef By Yas
        </p>
      </div>

      {/* Erreur générale */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Erreur de connexion</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ email */}
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

        {/* Champ mot de passe */}
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
              autoComplete="current-password"
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
          {formErrors.password && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {formErrors.password}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              disabled={isLoading}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-secondary-700"
            >
              Se souvenir de moi
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        {/* Bouton de connexion */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
              Connexion en cours...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Se connecter
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

      {/* Liens vers inscription */}
      <div className="mt-6 text-center">
        <p className="text-sm text-secondary-600">
          Vous n'avez pas encore de compte ?{" "}
          <Link
            to="/register"
            state={{ from: location.state?.from }}
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            Créer un compte
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
                Connexion sécurisée
              </p>
              <p className="text-sm text-secondary-600 mt-1">
                Vos données sont protégées par un chiffrement SSL et ne sont
                jamais partagées avec des tiers.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  onSuccess: PropTypes.func,
  redirectTo: PropTypes.string,
  className: PropTypes.string,
  compact: PropTypes.bool,
};

export default LoginForm;
