import logo from "../assets/logo-poksong.svg";

/**
 * Logo Poksong : une scène de marché en deux bulles. L'une demande le prix d'une calebasse (bulle rouge),
 * l'autre répond en cauris (bulle verte), aux couleurs du drapeau camerounais.
 * Le dessin est généré par `tools/logo_poksong.py`.
 */
export function Logo({ taille = 36 }: { taille?: number }) {
  return <img src={logo} width={taille} height={taille} alt="Poksong" />;
}
