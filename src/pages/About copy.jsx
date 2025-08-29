/**
 * About.jsx - Page À Propos de Maef By Yas - Design Alternatif
 *
 * Design inspiré par les motifs africains, avec une approche plus artistique
 * et culturelle. Mise en avant de l'héritage africain et de l'authenticité.
 *
 * @author Votre équipe de développement
 * @version 2.0.0 - Design Alternatif
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Users,
  Award,
  Globe,
  Handshake,
  Star,
  ChevronRight,
  MapPin,
  Calendar,
  Target,
  Sparkles,
  Shield,
  Truck,
  Clock,
  CheckCircle,
  ArrowRight,
  Quote,
  Play,
  Eye,
  Package,
  TrendingUp,
  Zap,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Compass,
  Sunrise,
  Mountain,
  Waves,
  Wind,
  Leaf,
  Sun,
  Moon,
} from "lucide-react";

// Données enrichies avec thématique africaine
const africanPatterns = [
  {
    name: "Kente",
    description: "Motifs géométriques du Ghana",
    colors: ["#FFD700", "#FF6B35", "#004E89", "#009639"],
  },
  {
    name: "Mudcloth",
    description: "Bogolan du Mali",
    colors: ["#8B4513", "#F4E4BC", "#2F1B14", "#D2691E"],
  },
  {
    name: "Ankara",
    description: "Wax prints colorés",
    colors: ["#FF1744", "#FF9800", "#4CAF50", "#2196F3"],
  },
];

const culturalValues = [
  {
    icon: Sun,
    title: "Ubuntu",
    subtitle: "Je suis parce que nous sommes",
    description:
      "La philosophie africaine d'humanité partagée guide notre approche communautaire.",
    pattern: "kente",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Mountain,
    title: "Harambee",
    subtitle: "Travaillons ensemble",
    description:
      "L'esprit de coopération kenyane inspire notre collaboration avec les artisans.",
    pattern: "mudcloth",
    color: "from-amber-400 to-yellow-500",
  },
  {
    icon: Waves,
    title: "Sankofa",
    subtitle: "Regarder en arrière pour aller de l'avant",
    description: "Honorer les traditions tout en innovant pour l'avenir.",
    pattern: "ankara",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Wind,
    title: "Nyama",
    subtitle: "L'énergie créatrice",
    description: "Chaque création porte l'énergie spirituelle de son créateur.",
    pattern: "kente",
    color: "from-blue-400 to-indigo-500",
  },
];

const artisanStories = [
  {
    name: "Mama Ama",
    craft: "Tisseuse de Kente",
    location: "Kumasi, Ghana",
    story:
      "Depuis 30 ans, je tisse les fils d'or qui racontent l'histoire de mon peuple.",
    avatar: "👵🏿",
    specialty: "Motifs royaux traditionnels",
    years: "30+ ans d'expérience",
    pattern: "kente",
  },
  {
    name: "Abdou Traoré",
    craft: "Maître du Bogolan",
    location: "Ségou, Mali",
    story:
      "Mon père m'a appris que chaque trait sur le tissu porte une signification sacrée.",
    avatar: "👨🏿‍🎨",
    specialty: "Teintures naturelles ancestrales",
    years: "25+ ans d'expérience",
    pattern: "mudcloth",
  },
  {
    name: "Fatou Diop",
    craft: "Bijoutière d'art",
    location: "Dakar, Sénégal",
    story:
      "Mes bijoux portent l'âme de l'Afrique, chaque perle raconte une légende.",
    avatar: "👩🏾‍🔧",
    specialty: "Bijoux en or et pierres précieuses",
    years: "20+ ans d'expérience",
    pattern: "ankara",
  },
];

const continentMap = [
  {
    country: "Ghana",
    artisans: 15,
    specialty: "Kente & Bijoux",
    coords: [0, -8],
  },
  {
    country: "Mali",
    artisans: 12,
    specialty: "Bogolan & Sculpture",
    coords: [-4, 17],
  },
  {
    country: "Sénégal",
    artisans: 10,
    specialty: "Bijoux & Maroquinerie",
    coords: [-14, 16],
  },
  {
    country: "Côte d'Ivoire",
    artisans: 8,
    specialty: "Tissage & Poterie",
    coords: [-5, 8],
  },
  {
    country: "Burkina Faso",
    artisans: 6,
    specialty: "Bronze & Textiles",
    coords: [-2, 12],
  },
  {
    country: "Bénin",
    artisans: 5,
    specialty: "Sculptures & Pagnes",
    coords: [2, 9],
  },
];

// Composant de motif décoratif africain
const AfricanPattern = ({ pattern, className = "" }) => {
  const patterns = {
    kente: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern
            id="kente"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
          >
            <rect width="20" height="20" fill="#FFD700" />
            <rect width="10" height="10" fill="#FF6B35" />
            <rect x="10" y="10" width="10" height="10" fill="#004E89" />
            <path
              d="M0,0 L20,20 M20,0 L0,20"
              stroke="#009639"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#kente)" opacity="0.3" />
      </svg>
    ),
    mudcloth: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern
            id="mudcloth"
            patternUnits="userSpaceOnUse"
            width="25"
            height="25"
          >
            <rect width="25" height="25" fill="#F4E4BC" />
            <circle cx="12.5" cy="12.5" r="3" fill="#8B4513" />
            <path
              d="M5,5 Q12.5,15 20,5 M5,20 Q12.5,10 20,20"
              stroke="#2F1B14"
              strokeWidth="1.5"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#mudcloth)" opacity="0.2" />
      </svg>
    ),
    ankara: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern
            id="ankara"
            patternUnits="userSpaceOnUse"
            width="30"
            height="30"
          >
            <rect width="30" height="30" fill="#FF1744" />
            <circle cx="15" cy="15" r="8" fill="#FF9800" opacity="0.8" />
            <polygon points="15,5 20,12 15,19 10,12" fill="#4CAF50" />
            <rect
              x="8"
              y="8"
              width="14"
              height="14"
              fill="none"
              stroke="#2196F3"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#ankara)" opacity="0.25" />
      </svg>
    ),
  };

  return patterns[pattern] || patterns.kente;
};

// Hero Section avec design africain immersif
const AfricanHero = () => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % africanPatterns.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-amber-900 via-red-800 to-orange-900">
      {/* Motifs africains animés */}
      <div className="absolute inset-0">
        <AfricanPattern
          pattern="kente"
          className="absolute inset-0 w-full h-full animate-pulse"
        />
        <AfricanPattern
          pattern="mudcloth"
          className="absolute inset-0 w-full h-full opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Éléments décoratifs flottants */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-60 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            {/* Contenu textuel */}
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                <span className="text-yellow-300 font-medium tracking-wider uppercase text-sm">
                  Ubuntu • Harambee • Sankofa
                </span>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-400"></div>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-none">
                L'Âme de
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  l'Afrique
                </span>
              </h1>

              <p className="text-xl sm:text-2xl mb-8 text-orange-100 leading-relaxed">
                Nous sommes les gardiens des traditions, les conteurs
                d'histoires tissées dans l'or et sculptées dans l'ébène. Chaque
                création porte l'héritage millénaire du continent mère.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {africanPatterns.map((pattern, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      currentPattern === index
                        ? "border-yellow-400 bg-yellow-400/20"
                        : "border-white/30 hover:border-white/50"
                    }`}
                    onClick={() => setCurrentPattern(index)}
                  >
                    <h3 className="font-bold text-lg">{pattern.name}</h3>
                    <p className="text-sm text-orange-200">
                      {pattern.description}
                    </p>
                    <div className="flex space-x-1 mt-2">
                      {pattern.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Découvrir Notre Héritage
                  <Compass className="w-6 h-6 ml-3 transition-transform group-hover:rotate-180" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Image artistique */}
            <div className="relative">
              <div className="relative aspect-square rounded-full overflow-hidden border-8 border-yellow-400/30">
                <img
                  src="/images/products/pagnes/pagne_12.jpg"
                  alt="Héritage africain"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-500"
                  style={{ display: "none" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Éléments décoratifs orbitaux */}
              <div className="absolute inset-0">
                {[Sun, Moon, Star, Sparkles].map((Icon, index) => (
                  <div
                    key={index}
                    className="absolute w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce"
                    style={{
                      top: `${[10, 85, 20, 75][index]}%`,
                      left: `${[85, 15, 15, 85][index]}%`,
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: "3s",
                    }}
                  >
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Valeurs Culturelles
const CulturalValues = () => {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>
            <Sun className="w-8 h-8 text-orange-600" />
            <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-amber-500"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Nos Racines Profondes
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Guidés par la sagesse ancestrale africaine, nos valeurs puisent dans
            les philosophies millénaires du continent
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {culturalValues.map((value, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transition-all duration-500 ${
                activeValue === index ? "scale-105 z-10" : "hover:scale-102"
              }`}
              onClick={() => setActiveValue(index)}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border-4 border-transparent group-hover:border-yellow-400 transition-all duration-300">
                {/* Motif de fond */}
                <div className="absolute inset-0 opacity-10">
                  <AfricanPattern
                    pattern={value.pattern}
                    className="w-full h-full"
                  />
                </div>

                <div className="relative p-8">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <value.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {value.title}
                  </h3>

                  <p className="text-center text-orange-600 font-semibold mb-4 text-lg">
                    {value.subtitle}
                  </p>

                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>

                  {activeValue === index && (
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center animate-fade-in">
                      <div className="inline-flex items-center text-orange-600 font-medium">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Valeur Fondamentale
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section Histoires d'Artisans
const ArtisanStories = () => {
  const [selectedArtisan, setSelectedArtisan] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-br from-red-900 via-orange-900 to-amber-900 text-white relative overflow-hidden">
      {/* Motifs de fond */}
      <div className="absolute inset-0">
        <AfricanPattern
          pattern="ankara"
          className="absolute inset-0 w-full h-full opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Mountain className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">
              Visages de l'Authenticité
            </h2>
            <Mountain className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-xl text-orange-200 max-w-3xl mx-auto leading-relaxed">
            Rencontrez les maîtres artisans qui donnent vie à nos créations,
            gardiens des traditions millénaires
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {artisanStories.map((artisan, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transition-all duration-500 ${
                selectedArtisan === index ? "scale-105" : "hover:scale-102"
              }`}
              onClick={() => setSelectedArtisan(index)}
            >
              <div className="relative overflow-hidden rounded-3xl bg-black/30 backdrop-blur-sm border-2 border-yellow-400/30 group-hover:border-yellow-400 transition-all duration-300">
                {/* Avatar grande taille */}
                <div className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-6xl shadow-2xl">
                      {artisan.avatar}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{artisan.name}</h3>
                  <p className="text-yellow-400 font-semibold mb-1">
                    {artisan.craft}
                  </p>
                  <div className="flex items-center justify-center text-orange-300 mb-6">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{artisan.location}</span>
                  </div>

                  <div className="bg-black/40 rounded-xl p-4 mb-6">
                    <Quote className="w-6 h-6 text-yellow-400 mx-auto mb-3" />
                    <p className="text-orange-100 italic leading-relaxed text-sm">
                      "{artisan.story}"
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center text-orange-200">
                      <Award className="w-4 h-4 mr-2" />
                      {artisan.specialty}
                    </div>
                    <div className="flex items-center justify-center text-orange-200">
                      <Clock className="w-4 h-4 mr-2" />
                      {artisan.years}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section détaillée de l'artisan sélectionné */}
        <div className="mt-16 bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-yellow-400/30">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Focus sur {artisanStories[selectedArtisan].name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h4 className="font-bold mb-2">Spécialité</h4>
                <p className="text-orange-200 text-sm">
                  {artisanStories[selectedArtisan].specialty}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h4 className="font-bold mb-2">Communauté</h4>
                <p className="text-orange-200 text-sm">
                  Transmet son savoir à 12 apprentis
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-black" />
                </div>
                <h4 className="font-bold mb-2">Impact</h4>
                <p className="text-orange-200 text-sm">
                  Soutient 25 familles de sa région
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Carte Interactive de l'Afrique
const AfricaMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Notre Réseau Continental
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Du Ghana au Sénégal, du Mali au Bénin, nous collaborons avec des
            artisans exceptionnels à travers l'Afrique de l'Ouest
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Carte stylisée */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 relative overflow-hidden">
              {/* Silhouette simplifiée de l'Afrique de l'Ouest */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="africaGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#F59E0B", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#DC2626", stopOpacity: 0.8 }}
                    />
                  </linearGradient>
                </defs>

                {/* Forme simplifiée de l'Afrique de l'Ouest */}
                <path
                  d="M50,100 Q100,80 150,100 Q200,90 250,120 Q300,140 350,180 Q360,220 340,260 Q320,300 280,320 Q240,340 200,330 Q160,320 120,300 Q80,280 60,240 Q40,200 50,160 Z"
                  fill="url(#africaGradient)"
                  stroke="#F59E0B"
                  strokeWidth="3"
                />

                {/* Points des pays */}
                {continentMap.map((location, index) => (
                  <g key={index}>
                    <circle
                      cx={200 + location.coords[1] * 8}
                      cy={200 + location.coords[0] * 8}
                      r="8"
                      fill="#DC2626"
                      stroke="#FFFFFF"
                      strokeWidth="3"
                      className="cursor-pointer hover:r-12 transition-all duration-300"
                      onClick={() => setSelectedCountry(location)}
                    />
                    <text
                      x={200 + location.coords[1] * 8}
                      y={190 + location.coords[0] * 8}
                      textAnchor="middle"
                      className="text-xs font-bold fill-gray-800 pointer-events-none"
                    >
                      {location.country}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Informations détaillées */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {continentMap.map((location, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedCountry?.country === location.country
                      ? "bg-gradient-to-br from-orange-500 to-red-600 text-white scale-105"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCountry(location)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{location.country}</h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedCountry?.country === location.country
                          ? "bg-white/20"
                          : "bg-orange-500"
                      }`}
                    >
                      <Users
                        className={`w-4 h-4 ${
                          selectedCountry?.country === location.country
                            ? "text-white"
                            : "text-white"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Artisans:</span>
                      <span className="font-semibold">{location.artisans}</span>
                    </div>
                    <div>
                      <span className="block text-xs opacity-75">
                        {location.specialty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCountry && (
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl animate-fade-in">
                <h3 className="text-2xl font-bold mb-4">
                  Focus sur {selectedCountry.country}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {selectedCountry.artisans}
                    </div>
                    <div className="text-sm opacity-75">
                      Artisans partenaires
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">5+</div>
                    <div className="text-sm opacity-75">
                      Années de collaboration
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">100+</div>
                    <div className="text-sm opacity-75">
                      Créations produites
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-black/20 rounded-xl">
                  <p className="text-sm">
                    <strong>Spécialité:</strong> {selectedCountry.specialty}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Rituels et Traditions
const RitualsSection = () => {
  const rituals = [
    {
      name: "Cérémonie de Bénédiction",
      description:
        "Chaque nouvelle création est bénie selon les rituels ancestraux",
      icon: Sun,
      color: "from-yellow-400 to-orange-500",
      details:
        "Les anciens bénissent nos créations avec des prières traditionnelles",
    },
    {
      name: "Transmission du Savoir",
      description:
        "Les maîtres transmettent leurs secrets aux nouvelles générations",
      icon: Users,
      color: "from-green-400 to-emerald-500",
      details:
        "Formation continue de jeunes artisans dans les techniques ancestrales",
    },
    {
      name: "Célébration Communautaire",
      description: "Chaque livraison est célébrée par toute la communauté",
      icon: Heart,
      color: "from-pink-400 to-red-500",
      details: "Fêtes communautaires marquant chaque étape de production",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Étoiles animées */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Moon className="w-8 h-8 text-blue-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">Rituels Sacrés</h2>
            <Moon className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Chaque création suit des rituels ancestraux qui connectent
            l'artisan, l'objet et son futur propriétaire dans une harmonie
            spirituelle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rituals.map((ritual, index) => (
            <div key={index} className="group relative">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${ritual.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500`}
                >
                  <ritual.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-center mb-4 group-hover:text-yellow-400 transition-colors">
                  {ritual.name}
                </h3>

                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  {ritual.description}
                </p>

                <div className="bg-black/30 rounded-xl p-4 border border-gray-600">
                  <p className="text-sm text-gray-400 italic text-center">
                    {ritual.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg">
            🌟 Chaque produit porte une bénédiction ancestrale 🌟
          </div>
        </div>
      </div>
    </section>
  );
};

// Section Future Vision
const FutureVision = () => {
  const visionPoints = [
    {
      icon: Globe,
      title: "Expansion Mondiale",
      description: "Porter l'art africain aux quatre coins du monde",
      year: "2025",
    },
    {
      icon: Users,
      title: "1000 Artisans",
      description: "Soutenir mille familles d'artisans",
      year: "2026",
    },
    {
      icon: Leaf,
      title: "Zéro Carbone",
      description: "Production 100% éco-responsable",
      year: "2027",
    },
    {
      icon: Award,
      title: "Centre d'Excellence",
      description: "École mondiale d'artisanat africain",
      year: "2028",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Particules flottantes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Vision 2030</h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Notre regard tourné vers l'avenir, guidé par la sagesse du passé
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline futuriste */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 -translate-x-1/2 hidden md:block" />

          {visionPoints.map((point, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`flex-1 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <point.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {point.year}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                  <p className="text-purple-200 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full items-center justify-center shadow-2xl border-4 border-white">
                <point.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-6 rounded-full">
            <h3 className="text-2xl font-bold mb-2">
              Rejoignez-nous dans cette aventure
            </h3>
            <p className="text-blue-200">
              L'avenir de l'artisanat africain se construit ensemble
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA final avec design africain
const AfricanCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 relative overflow-hidden">
      {/* Motifs de fond */}
      <div className="absolute inset-0">
        <AfricanPattern
          pattern="kente"
          className="absolute inset-0 w-full h-full opacity-30"
        />
        <AfricanPattern
          pattern="mudcloth"
          className="absolute inset-0 w-full h-full opacity-20"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="text-8xl mb-6">🌍</div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              L'Afrique vous attend
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Plongez dans un univers authentique où chaque achat soutient une
              famille, préserve une tradition et célèbre un héritage millénaire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🎨",
                text: "500+ Créations Uniques",
                desc: "Chaque pièce raconte une histoire",
              },
              {
                icon: "👥",
                text: "50+ Artisans Soutenus",
                desc: "Des familles entières bénéficient",
              },
              {
                icon: "🌱",
                text: "100% Équitable",
                desc: "Commerce responsable certifié",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="font-bold text-lg mb-2">{stat.text}</div>
                <div className="text-orange-200 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group relative px-12 py-5 bg-white text-orange-600 font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                🛍️ Découvrir nos Trésors
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
              </span>
            </button>

            <button className="group px-12 py-5 border-3 border-white text-white hover:bg-white hover:text-orange-600 font-bold rounded-full text-lg transition-all duration-300 flex items-center justify-center">
              📞 Parler à un Expert
            </button>
          </div>

          <div className="flex justify-center space-x-8">
            {[
              { icon: Instagram, label: "Instagram", handle: "@maefbyyas" },
              { icon: Facebook, label: "Facebook", handle: "/maefbyyas" },
              { icon: Youtube, label: "YouTube", handle: "Maef By Yas" },
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className="group flex flex-col items-center space-y-2 text-white hover:text-yellow-300 transition-colors"
              >
                <div className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 border-2 border-white/30">
                  <social.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium">{social.handle}</span>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-orange-200 text-lg font-medium">
              "Asante sana" - Merci de faire partie de notre famille ❤️
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant principal About avec design africain
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section Africain */}
      <AfricanHero />

      {/* Valeurs Culturelles */}
      <CulturalValues />

      {/* Histoires d'Artisans */}
      <ArtisanStories />

      {/* Carte de l'Afrique */}
      <AfricaMap />

      {/* Rituels et Traditions */}
      <RitualsSection />

      {/* Vision Future */}
      <FutureVision />

      {/* CTA Final Africain */}
      <AfricanCTA />
    </div>
  );
};

export default About;
