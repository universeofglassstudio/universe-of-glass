export const t = {
  en: {
    navHome: 'Home',
    navGallery: 'Gallery',
    navCommissions: 'Commissions',
    navAbout: 'About',
    navContact: 'Contact',
    heroTitle: 'Universe of Glass Studio',
    heroSubtitle: '✦ art born of light and glass ✦',
    heroDesc: 'Handmade stained glass pieces, original or fandom-inspired, designed to bring light, color, and personality to your space.',
    orderLabel: 'For orders',
    btnHero: 'DM me on Instagram',
    galleryTitle: 'Gallery',
    commissionsTitle: 'Let’s create together!',
    commissionsBody: 'If you have an idea for a custom stained-glass piece, I would love to hear about it. Message me on Instagram and let’s talk about colors, shapes, symbols, and light.',
    commissionsBtn: 'Request a custom piece on Instagram',
    aboutTitle: 'About Universe of Glass Studio',
    aboutBody: 'Universe of Glass Studio was born from Gabriela’s passion for stained glass art, discovered in 2022 and turned into a dream come true in 2025. Today, each handmade piece is created to bring the beauty of glass into people’s lives through light, color, and forms full of personality.',
    contactTitle: 'Contact',
    contactSubtitle: 'Let the light in',
    available: 'Available',
    sold: 'Sold',
    made_to_order: 'Made to order',
    askPiece: 'DM me on Instagram about this piece',
    siteDescription: 'Handmade stained glass art by Universe of Glass Studio.',
    dimensionsLabel: 'Dimensions',
    techniqueLabel: 'Technique',
    backToGallery: 'Back to gallery',
    footerCopyright: '© 2026 Universe of Glass Studio. Crafted with light.',
  },
  ro: {
    navHome: 'Acasă',
    navGallery: 'Galerie',
    navCommissions: 'Comenzi',
    navAbout: 'Despre',
    navContact: 'Contact',
    heroTitle: 'Universe of Glass Studio',
    heroSubtitle: '✦ artă născută din lumină și sticlă ✦',
    heroDesc: 'Piese handmade din sticlă de vitraliu, originale sau inspirate din fandom, menite să aducă lumină, culoare și personalitate spațiului tău.',
    orderLabel: 'Pentru comenzi',
    btnHero: 'Trimite un mesaj pe Instagram',
    galleryTitle: 'Galerie',
    commissionsTitle: 'Hai să creăm împreună!',
    commissionsBody: 'Dacă ai o idee pentru o piesă personalizată din sticlă, mi-ar plăcea să o aud. Trimite-mi un mesaj pe Instagram și hai să vorbim despre culori, forme, simboluri și lumină.',
    commissionsBtn: 'Solicită o piesă personalizată pe Instagram',
    aboutTitle: 'Despre Universe of Glass Studio',
    aboutBody: 'Universe of Glass Studio s-a născut din pasiunea Gabrielei pentru arta vitraliului, descoperită în 2022 și transformată în vis devenit realitate în 2025. Astăzi, fiecare piesă handmade este creată pentru a aduce în viețile oamenilor frumusețea sticlei prin lumină, culoare și forme pline de personalitate.',
    contactTitle: 'Contact',
    contactSubtitle: 'Lăsați lumina să intre',
    available: 'Disponibil',
    sold: 'Vândut',
    made_to_order: 'La Comandă',
    askPiece: 'Trimite-mi un mesaj pe Instagram despre această piesă',
    siteDescription: 'Vitralii handmade realizate de Universe of Glass Studio.',
    dimensionsLabel: 'Dimensiuni',
    techniqueLabel: 'Tehnică',
    backToGallery: 'Înapoi la galerie',
    footerCopyright: '© 2026 Universe of Glass Studio. Lucrat cu lumină.',
  }
} as const;

export type Lang = keyof typeof t;

export function localizePath(path: string, lang: Lang): string {
  if (lang === 'en') return path;
  if (path === '/') return '/ro/';
  return `/ro${path}`;
}
