# Logo Poksong : deux bulles de dialogue. L'une demande le prix d'une calebasse, l'autre répond en cauris.
import sys

def cauri(cx, cy, s, rot):
    teeth = "".join(f"M{22.3 - (0.6 if k in (0, 6) else 0)} {13 + k * 3.6}h-2.2M{25.7 + (0.6 if k in (0, 6) else 0)} {13 + k * 3.6}h2.2" for k in range(7))
    return f'''<g transform="translate({cx} {cy}) rotate({rot}) scale({s}) translate(-24 -24)">
    <path d="M24 4c8.6 0 14 8.6 14 20s-5.4 20-14 20-14-8.6-14-20S15.4 4 24 4Z" fill="url(#ivoire)" stroke="#6B4320" stroke-width="2.4"/>
    <path d="M24 8.5c-2 5.5-2.6 11-1.6 15.5S22 32.5 24 39.5c2-5.5 2.6-11 1.6-15.5S26 13.5 24 8.5Z" fill="#4A2A12"/>
    <path d="{teeth}" stroke="#8C5A2E" stroke-width="2" stroke-linecap="round"/>
  </g>'''

CALEBASSE = "M20 4.5h8c.6 0 1 .4 1 1v4.3c0 2.5 1.2 4.3 3.4 5.9C38.3 19.6 42 24.4 42 30.5 42 38.8 34 45 24 45S6 38.8 6 30.5c0-6.1 3.7-10.9 9.6-14.8 2.2-1.6 3.4-3.4 3.4-5.9V5.5c0-.6.4-1 1-1Z"

def calebasse(cx, cy, s):
    return f'''<g transform="translate({cx} {cy}) scale({s}) translate(-24 -25)">
    <g clip-path="url(#cal)">
      <rect width="48" height="48" fill="#E0962F"/>
      <rect y="25" width="48" height="9" fill="#7A3E12"/>
      <path d="M0 25l4 4.5L8 25l4 4.5 4-4.5 4 4.5 4-4.5 4 4.5 4-4.5 4 4.5 4-4.5 4 4.5 4-4.5M0 34l4-4.5L8 34l4-4.5 4 4.5 4-4.5 4 4.5 4-4.5 4 4.5 4-4.5 4 4.5 4-4.5 4 4.5" stroke="#FCD116" stroke-width="2" fill="none"/>
      <path d="M13 21c1.5-1.8 3.4-3 5.5-3.8" stroke="#F6C77E" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    </g>
    <path d="{CALEBASSE}" fill="none" stroke="#4E260A" stroke-width="2.6"/>
  </g>'''

def bulle(x, y, w, h, r, queue):
    # queue : "g" (en bas à gauche) ou "d" (en bas à droite)
    b = y + h
    if queue == "g":
        q = f"L{x + 15} {b}L{x + 5} {b + 9}L{x + 7} {b}"
        return f"M{x + r} {y}H{x + w - r}A{r} {r} 0 0 1 {x + w} {y + r}V{b - r}A{r} {r} 0 0 1 {x + w - r} {b}{q}H{x + r}A{r} {r} 0 0 1 {x} {b - r}V{y + r}A{r} {r} 0 0 1 {x + r} {y}Z"
    q = f"L{x + w - 7} {b}L{x + w - 5} {b + 9}L{x + w - 15} {b}"
    return f"M{x + r} {y}H{x + w - r}A{r} {r} 0 0 1 {x + w} {y + r}V{b - r}A{r} {r} 0 0 1 {x + w - r} {b}{q}H{x + r}A{r} {r} 0 0 1 {x} {b - r}V{y + r}A{r} {r} 0 0 1 {x + r} {y}Z"

question = bulle(3, 3, 34, 30, 10, "g")
reponse = bulle(25, 21, 36, 28, 10, "d")
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="ivoire" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFF6DF"/><stop offset="0.7" stop-color="#F0DDB2"/><stop offset="1" stop-color="#DCC08A"/></radialGradient>
    <clipPath id="cal"><path d="{CALEBASSE}"/></clipPath>
  </defs>
  <path d="{question}" fill="#CE1126" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
  {calebasse(20, 17.5, 0.5)}
  <path d="{reponse}" fill="#007A5E" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
  {cauri(34.5, 35, 0.33, -25)}
  {cauri(43, 35, 0.33, 0)}
  {cauri(51.5, 35, 0.33, 25)}
</svg>
'''
open(sys.argv[1], "w").write(svg)
