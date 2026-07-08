type NavigationLink = {
  label: string;
  href: string;
};

export const mainNavigation: NavigationLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Gallery', href: '/image-gallery/' },
  { label: 'Products', href: '/products/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerLinks: Record<'company' | 'support', NavigationLink[]> = {
  company: [
    { label: 'About Us', href: '/about/' },
    { label: 'Our Products', href: '/products/' },
    { label: 'Gallery', href: '/image-gallery/' },
    
  ],
  support: [
  ],
};
