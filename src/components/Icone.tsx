import type { SVGProps } from "react";

/** Icônes dessinées sur une grille de 24 × 24, tracées avec `currentColor`. */
const TRACES = {
  flamme: (
    <path
      d="M12 2.5c.6 3.2 4.8 5.6 4.8 10.6a4.8 4.8 0 0 1-9.6 0c0-2 .9-3.4 1.9-4.5.3 1.6 1 2.6 2 3 0-3.2-.5-6.1.9-9.1Z"
      fill="currentColor"
    />
  ),
  eclair: <path d="M13.5 2 5 13.5h6L10 22l9-12.5h-6.2L13.5 2Z" fill="currentColor" />,
  fermer: <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" />,
  coche: <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  croix: <path d="M7 7l10 10M17 7 7 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />,
  attention: (
    <>
      <path d="M12 7v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="1.7" fill="currentColor" />
    </>
  ),
  cadenas: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="2.4" fill="none" />
    </>
  ),
  etoile: <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z" fill="currentColor" />,
  hautParleur: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  livre: (
    <path
      d="M4 5.5C6.5 4.3 9.5 4.3 12 6c2.5-1.7 5.5-1.7 8-.5v13c-2.5-1.2-5.5-1.2-8 .5-2.5-1.7-5.5-1.7-8-.5v-13ZM12 6v13"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  crayon: (
    <path
      d="m4.5 19.5 1-4.5L15.8 4.7a2 2 0 0 1 2.8 0l.7.7a2 2 0 0 1 0 2.8L9 18.5l-4.5 1ZM13.5 7l3.5 3.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  discussion: (
    <>
      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3.5V13h.5A2.5 2.5 0 0 1 3 10.5z" fill="currentColor" />
      <path d="M19 8.5h.5A1.5 1.5 0 0 1 21 10v5a2.5 2.5 0 0 1-2.5 2.5H18V21l-4-3.5h-2.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
    </>
  ),
  nombres: (
    <text x="12" y="16.8" textAnchor="middle" fontSize="12.5" fontWeight="900" fontFamily="Nunito, system-ui, sans-serif" fill="currentColor">
      123
    </text>
  ),
  famille: (
    <>
      <circle cx="8" cy="6.5" r="3" fill="currentColor" />
      <circle cx="16.5" cy="8.5" r="2.5" fill="currentColor" />
      <path d="M2.5 20c0-4 2.4-7 5.5-7s5.5 3 5.5 7z" fill="currentColor" />
      <path d="M14 20c0-3.3.9-6 3-6s4.5 2.7 4.5 6z" fill="currentColor" />
    </>
  ),
} as const;

export type NomIcone = keyof typeof TRACES;

export function Icone({ nom, taille = 24, ...props }: { nom: string; taille?: number } & SVGProps<SVGSVGElement>) {
  const trace = TRACES[nom as NomIcone] ?? TRACES.livre;
  return (
    <svg viewBox="0 0 24 24" width={taille} height={taille} aria-hidden="true" focusable="false" {...props}>
      {trace}
    </svg>
  );
}
