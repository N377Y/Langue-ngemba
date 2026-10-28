import { useId } from "react";

/**
 * Logo Poksong : une bulle de dialogue (« pok song », parlons) aux couleurs du drapeau camerounais,
 * vert, rouge, jaune, avec l'étoile au centre.
 */
export function Logo({ taille = 36 }: { taille?: number }) {
  const id = useId();
  const bulle = "M12 4h24a10 10 0 0 1 10 10v12a10 10 0 0 1-10 10H20l-9.5 8.2a1 1 0 0 1-1.6-.9L10 35.8A10 10 0 0 1 2 26V14A10 10 0 0 1 12 4Z";
  return (
    <svg viewBox="0 0 48 48" width={taille} height={taille} role="img" aria-label="Poksong">
      <defs>
        <clipPath id={id}>
          <path d={bulle} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width="16.7" height="48" fill="#007A5E" />
        <rect x="16.6" y="0" width="14.8" height="48" fill="#CE1126" />
        <rect x="31.3" y="0" width="16.7" height="48" fill="#FCD116" />
      </g>
      <path d="m24 12.2 2.35 4.95 5.4.62-4 3.68 1.08 5.33L24 24.1l-4.83 2.68 1.08-5.33-4-3.68 5.4-.62Z" fill="#FCD116" />
    </svg>
  );
}
