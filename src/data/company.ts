export const companyInfo = {
  name: "Engineers Interlocks",
  tagline:
    "Premium interlocks, designer tiles, and hollow bricks manufactured in Kerala.",
  phone: "+91 9061 686 999",
  secondaryPhone: "+91 9847 207 063",
  email: "engineerspaver@gmail.com",
  address:
    "Near Vijaya Bank, Edavannappara Road, Mundakkulam (Kondotty), Malappuram 673 638",
  website: "https://engineers-website-v2.engineerspaver-ea1.workers.dev",
  whatsapp: "+919061686999",
  businessHours: "Mon-Sat 10:00-19:30",
  mapsUrl:
    "https://maps.google.com/?q=Near+Vijaya+Bank+Edavannappara+Road+Mundakkulam+Kondotty+Malappuram+673638",
  logo: "/assets/img/logo.avif",
  logoWhite: "/assets/img/logo-white.svg",
  favicon: "/assets/img/favicons/favicon.png",
  socialImage: "/og-image.jpg",
  socialImageAlt:
    "Engineers Interlocks premium interlocks and designer tiles in Kerala",
  social: {
    instagram: "https://www.instagram.com/engineers_interlocks",
    threads: "https://www.threads.com/@engineers_interlocks",
    facebook: "https://www.facebook.com/share/1Bxa6quikF/?mibextid=wwXIfr",
  },
};

export const companyLocations = [
  {
    name: "Mundakkulam, Kondotty",
    label: "Interlocks",
    addressLines: ["Near Vijaya Bank, Edavannappara Road, Malappuram, 673 638"],
    phone: "+91 9061 015 552",
    phoneHref: "+919061015552",
    media: {
      type: "map",
      title: "Mundakkulam branch location",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.9841128558037!2d75.96420567679343!3d11.188811051448283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64f60324e916b%3A0x66313a45002b7088!2sEngineers%20Interlocks%20and%20Hollowbricks!5e0!3m2!1sen!2sae!4v1782372055369!5m2!1sen!2sae",
    },
  },
  {
    name: "Vettukad",
    label: "HollowBricks",
    addressLines: ["Opp. Valiyaparamba Road"],
    phone: "+91 9061 015 549",
    phoneHref: "+919061015549",
    media: {
      type: "map",
      title: "Vettukad branch location",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.62711153877!2d75.89885101781377!3d11.174908790420913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba651468f3885e7%3A0xb42645dc9d27d47a!2sEngineers%20Interlocks%20and%20Hollowbricks!5e0!3m2!1sen!2sae!4v1782372165630!5m2!1sen!2sae",
    },
  },
  {
    name: "Ayikkarappadi",
    label: "Interlocks",
    addressLines: ["Opp. Petrol Pump, NH 213, Malappuram, 673 637"],
    phone: "+91 9061 015 562",
    phoneHref: "+919061015562",
    media: {
      type: "map",
      title: "Ayikkarappadi branch location",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.62711153877!2d75.89885101781377!3d11.174908790420913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba651468f3885e7%3A0xb42645dc9d27d47a!2sEngineers%20Interlocks%20and%20Hollowbricks!5e0!3m2!1sen!2sae!4v1782372165630!5m2!1sen!2sae",
    },
  },
  {
    name: "Thangilakadavu, Mavoor",
    label: "Interlocks",
    addressLines: ["Near MRPL Petrol Pump, Near 11th Mile"],
    phone: "+91 9061 015 549",
    phoneHref: "+919061015549",
    media: {
      type: "map",
      title: "Thangilakadavu branch location",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1637.1007760618484!2d75.92627227821119!3d11.26262473582296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64536ded5c957%3A0xd2f08d630e204299!2sThengilakadavu%20auto%20stand!5e0!3m2!1sen!2sae!4v1782380679223!5m2!1sen!2sae",
    },
  },
] as const;

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: companyInfo.name,
  url: companyInfo.website,
  telephone: companyInfo.phone,
  email: companyInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address,
    addressLocality: "Malappuram",
    addressRegion: "Kerala",
    postalCode: "673638",
    addressCountry: "IN",
  },
  openingHours: ["Mo-Sa 10:00-19:30"],
  hasMap: companyInfo.mapsUrl,
};
