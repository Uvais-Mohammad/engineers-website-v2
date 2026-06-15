export const companyInfo = {
  name: 'Engineers',
  tagline: 'Modern construction, engineering, and property solutions.',
  phone: '+91 9061 686 999',
  secondaryPhone: '+91 9847 207 063',
  email: 'engineerspaver@gmail.com',
  address: 'Mundakkulam, Malappuram, Kerala, 673638',
  website: 'https://example.com',
  whatsapp: '+919061686999',
  businessHours: 'Mon-Sat 10:00-19:30',
  mapsUrl: 'https://www.google.com/maps',
  logo: '/assets/img/logo.avif',
  logoWhite: '/assets/img/logo-white.svg',
  favicon: '/assets/img/favicons/favicon.png',
  social: {
    twitter: 'https://www.twitter.com/',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: companyInfo.name,
  url: companyInfo.website,
  telephone: companyInfo.phone,
  email: companyInfo.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyInfo.address,
    addressLocality: 'New York',
    addressCountry: 'US',
  },
  openingHours: ['Mo-Sa 10:00-19:30'],
  hasMap: companyInfo.mapsUrl,
};
