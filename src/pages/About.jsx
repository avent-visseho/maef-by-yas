/**
 * About.jsx - Page À Propos de Maef By Yas - Version Hybride
 *
 * Combine la structure de la version 1 avec les sections africaines de la version 2
 *
 * @author Votre équipe de développement
 * @version 3.0.0 - Version Hybride
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

// Données de la version 1
const companyStats = [
  {
    icon: Package,
    number: "500+",
    label: "Créations Uniques",
    description: "Produits soigneusement sélectionnés",
    color: "text-pink-600",
  },
  {
    icon: Users,
    number: "50+",
    label: "Artisans Partenaires",
    description: "Créateurs talentueux à travers l'Afrique",
    color: "text-purple-600",
  },
  {
    icon: Heart,
    number: "2000+",
    label: "Clients Satisfaits",
    description: "Communauté fidèle et engagée",
    color: "text-red-600",
  },
  {
    icon: Globe,
    number: "15+",
    label: "Pays Couverts",
    description: "Livraisons dans toute l'Europe",
    color: "text-green-600",
  },
];

const coreValues = [
  {
    icon: Heart,
    title: "Authenticité",
    description:
      "Chaque produit raconte l'histoire authentique de l'artisanat africain, préservant les traditions ancestrales.",
    color: "bg-red-50 text-red-600",
    features: [
      "Techniques traditionnelles",
      "Matériaux authentiques",
      "Savoir-faire ancestral",
    ],
  },
  {
    icon: Award,
    title: "Qualité Premium",
    description:
      "Sélection rigoureuse des meilleurs artisans pour garantir une qualité exceptionnelle.",
    color: "bg-yellow-50 text-yellow-600",
    features: [
      "Contrôle qualité strict",
      "Matériaux nobles",
      "Finitions impeccables",
    ],
  },
  {
    icon: Handshake,
    title: "Commerce Équitable",
    description:
      "Relations durables avec nos artisans partenaires, basées sur le respect et la juste rémunération.",
    color: "bg-green-50 text-green-600",
    features: [
      "Rémunération équitable",
      "Partenariats durables",
      "Impact positif",
    ],
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "Mariage harmonieux entre traditions séculaires et tendances contemporaines.",
    color: "bg-purple-50 text-purple-600",
    features: [
      "Design moderne",
      "Techniques innovantes",
      "Créativité sans limites",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Sélection des Artisans",
    description:
      "Nous parcourons l'Afrique pour identifier les artisans les plus talentueux, respectueux des traditions.",
    icon: Eye,
    color: "text-pink-600",
  },
  {
    number: "02",
    title: "Partenariat Équitable",
    description:
      "Établissement de relations durables basées sur le respect mutuel et la juste rémunération.",
    icon: Handshake,
    color: "text-purple-600",
  },
  {
    number: "03",
    title: "Création Collaborative",
    description:
      "Collaboration étroite pour créer des pièces alliant tradition et modernité.",
    icon: Sparkles,
    color: "text-yellow-600",
  },
  {
    number: "04",
    title: "Contrôle Qualité",
    description:
      "Vérification rigoureuse de chaque produit selon nos standards de qualité premium.",
    icon: Shield,
    color: "text-green-600",
  },
  {
    number: "05",
    title: "Livraison Soignée",
    description:
      "Emballage avec soin et expédition sécurisée pour préserver la beauté de chaque création.",
    icon: Truck,
    color: "text-blue-600",
  },
];

const milestones = [
  {
    year: "2019",
    title: "Création de Maef By Yas",
    description:
      "Naissance du projet avec la première collection de pagnes authentiques",
    achievement: "10 produits lancés",
  },
  {
    year: "2020",
    title: "Extension de la Gamme",
    description:
      "Ajout des bijoux artisanaux et premiers partenariats avec les artisans",
    achievement: "25 artisans partenaires",
  },
  {
    year: "2021",
    title: "Croissance Internationale",
    description:
      "Ouverture aux marchés européens et développement de la maroquinerie",
    achievement: "500+ clients satisfaits",
  },
  {
    year: "2022",
    title: "Consolidation & Innovation",
    description:
      "Lancement des chaussures et voiles suisses, certification commerce équitable",
    achievement: "50+ artisans partenaires",
  },
  {
    year: "2023",
    title: "Excellence Reconnue",
    description:
      "Prix de l'innovation en commerce équitable et expansion européenne",
    achievement: "1500+ clients fidèles",
  },
  {
    year: "2024",
    title: "Vision Future",
    description:
      "Nouvelle collection premium et plateforme digitale révolutionnaire",
    achievement: "2000+ clients, 15 pays",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Aïcha Koné",
    role: "Artisane Partenaire - Côte d'Ivoire",
    text: "Travailler avec Maef By Yas a transformé ma vie. Mes créations sont valorisées et je peux faire vivre ma famille dignement.",
    rating: 5,
    avatar: "👩🏿‍🎨",
    location: "Abidjan",
  },
  {
    id: 2,
    name: "Marie Dubois",
    role: "Cliente Fidèle",
    text: "Chaque achat chez Maef By Yas est une découverte. La qualité est exceptionnelle et on sent l'amour dans chaque détail.",
    rating: 5,
    avatar: "👩🏼",
    location: "Paris",
  },
  {
    id: 3,
    name: "Kwame Asante",
    role: "Maître Bijoutier - Ghana",
    text: "Cette collaboration respecte notre savoir-faire traditionnel tout en nous ouvrant vers de nouveaux horizons créatifs.",
    rating: 5,
    avatar: "👨🏿‍🔧",
    location: "Accra",
  },
];

const certifications = [
  {
    icon: Award,
    title: "Commerce Équitable Certifié",
    description:
      "Certification officielle pour nos pratiques commerciales équitables",
    date: "2022",
  },
  {
    icon: Shield,
    title: "Qualité ISO 9001",
    description: "Standard international de gestion de la qualité",
    date: "2023",
  },
  {
    icon: Heart,
    title: "Artisanat Authentique",
    description:
      "Label d'authenticité délivré par la Fédération Africaine des Artisans",
    date: "2023",
  },
  {
    icon: Globe,
    title: "Impact Positif Vérifié",
    description: "Certification d'impact social et environnemental positif",
    date: "2024",
  },
];

// Données de la version 2 pour les sections africaines
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

// Hero Section Africain (de la version 2)
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

// Composant Mission & Vision (version 1)
const MissionVision = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Maef By Yas existe pour célébrer et préserver la richesse de
                l'artisanat africain. Nous créons un pont entre les artisans
                talentueux du continent africain et les amoureux de mode
                authentique à travers le monde.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Notre mission va au-delà du simple commerce : nous construisons
                des relations durables, soutenons les communautés artisanales et
                préservons des savoir-faire millénaires pour les générations
                futures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Target,
                  label: "Excellence",
                  desc: "Qualité premium garantie",
                },
                {
                  icon: Heart,
                  label: "Authenticité",
                  desc: "Produits 100% authentiques",
                },
                {
                  icon: Users,
                  label: "Communauté",
                  desc: "Impact social positif",
                },
                {
                  icon: Globe,
                  label: "Durabilité",
                  desc: "Commerce responsable",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                >
                  <item.icon className="w-6 h-6 text-pink-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.label}
                    </h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/products/pagnes/pagne_14.jpg"
                alt="Mission Maef By Yas"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div
                className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400"
                style={{ display: "none" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-serif font-bold mb-2">
                  Notre Vision
                </h3>
                <p className="text-pink-100 text-sm leading-relaxed">
                  Devenir la référence mondiale de la mode africaine
                  authentique, en créant un écosystème durable qui valorise
                  l'artisanat traditionnel.
                </p>
              </div>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-green-400 rounded-full opacity-20 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Valeurs Fondamentales (version 1)
const CoreValues = () => {
  const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Nos Valeurs Fondamentales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Les principes qui guident chacune de nos actions et décisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredValue(index)}
              onMouseLeave={() => setHoveredValue(null)}
              className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <value.icon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                {value.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {value.description}
              </p>

              <div
                className={`space-y-2 transition-all duration-300 ${
                  hoveredValue === index
                    ? "opacity-100 max-h-40"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                {value.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Carte Interactive de l'Afrique (version 2)
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

// Composant Processus de Création (version 1)
const CreationProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Notre Processus de Création
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            De la sélection des artisans à la livraison, découvrez notre
            approche méticuleuse
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-pink-200 -translate-x-1/2" />

            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div
                    className={`bg-white p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 ${
                      activeStep === index ? "scale-105" : ""
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <step.icon className={`w-6 h-6 ${step.color} mr-3`} />
                      <span className="text-2xl font-bold text-gray-300">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-pink-200 rounded-full items-center justify-center shadow-soft">
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Timeline de l'entreprise (version 1)
const CompanyTimeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Notre Parcours
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Les étapes clés de notre croissance et de notre engagement pour
            l'excellence
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-600 to-purple-600 md:left-1/2 md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-8 pl-12" : "md:pl-8 pl-12"
                  } md:pl-0`}
                >
                  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-medium transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">
                        {milestone.year}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {milestone.achievement}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full border-4 border-white shadow-soft flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Témoignages (version 1)
const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Témoignages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Les voix de notre communauté : artisans, clients et partenaires
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-8">
                  <div className="bg-white rounded-2xl shadow-soft p-8 mx-auto max-w-2xl">
                    <div className="flex items-center justify-center mb-6">
                      <Quote className="w-8 h-8 text-pink-300" />
                    </div>

                    <blockquote className="text-lg text-gray-700 text-center mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex items-center justify-center space-x-1 mb-6">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-center">
                      <div className="text-3xl mb-3">{testimonial.avatar}</div>
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-pink-600 font-medium mb-2">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-500 flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-pink-600 scale-125"
                    : "bg-gray-300 hover:bg-pink-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Composant Certifications et Reconnaissances (version 1)
const CertificationsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Certifications & Reconnaissances
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre engagement pour l'excellence reconnu par des organismes
            prestigieux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-medium transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <cert.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                {cert.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {cert.description}
              </p>

              <div className="text-pink-600 font-medium text-sm">
                Obtenu en {cert.date}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm">
              Toutes nos certifications sont vérifiées et renouvelées
              annuellement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA final avec design africain (version 2)
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

// Composant principal About Hybride
const About = () => {
  useEffect(() => {
    // Scroll vers le haut lors du chargement de la page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section Africain (remplace AboutHero) */}
      <AfricanHero />

      {/* Mission & Vision (conservé de la version 1) */}
      <MissionVision />

      {/* Valeurs Fondamentales (conservé de la version 1) */}
      <CoreValues />

      {/* Carte de l'Afrique (remplace SocialImpact) */}
      <AfricaMap />

      {/* Processus de Création (conservé de la version 1) */}
      <CreationProcess />

      {/* Timeline de l'entreprise (conservé de la version 1) */}
      <CompanyTimeline />

      {/* Témoignages (conservé de la version 1) */}
      <TestimonialsSection />

      {/* Certifications (conservé de la version 1) */}
      <CertificationsSection />

      {/* CTA Final Africain (remplace CTASection) */}
      <AfricanCTA />
    </div>
  );
};

export default About;
