const demoModules = import.meta.glob('../../demo/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const routeMap: Record<string, string> = {
  'index.html': '/',
  'home-4.html': '/',
  'home-4-op.html': '/',
  'about.html': '/about/',
  'service.html': '/services/',
  'service-details.html': '/service-details/',
  'project.html': '/projects/',
  'project-details.html': '/project-details/',
  'shop.html': '/products/',
  'shop-details.html': '/product-details/',
  'cart.html': '/cart/',
  'checkout.html': '/checkout/',
  'wishlist.html': '/wishlist/',
  'team.html': '/team/',
  'team-details.html': '/team-details/',
  'contact.html': '/contact/',
};

function getSource(fileName: string) {
  const entry = Object.entries(demoModules).find(([filePath]) => filePath.endsWith(`/${fileName}`));
  if (!entry) {
    throw new Error(`Missing demo source for ${fileName}`);
  }
  return entry[1];
}

const sharedSource = getSource('index.html');

function sanitize(html: string) {
  return html
    .replace(/(?:\.\.\/)?assets\//g, '/assets/')
    .replace(/href="([^"]+\.html)"/g, (_, file) => `href="${routeMap[file] ?? `/${file.replace(/\.html$/, '/')}`}"`)
    .replace(/action="https:\/\/html\.favdevs\.com\/construz\/demo\/mail\.php"/g, 'action="#"')
    .replace(/<img(?![^>]*\bdecoding=)([^>]*?)>/g, '<img decoding="async"$1>')
    .replace(/<img(?![^>]*\bloading=)([^>]*?)>/g, '<img loading="lazy"$1>');
}

function findTagStart(source: string, pattern: RegExp) {
  const match = pattern.exec(source);
  return match?.index ?? -1;
}

export function getSharedShell() {
  const bodyStart = sharedSource.indexOf('<body>');
  const headerStart = findTagStart(sharedSource, /<header\b[^>]*class="[^"]*\bnav-header\b[^"]*"/i);
  const footerStart = findTagStart(sharedSource, /<footer\b[^>]*class="[^"]*\bfooter-wrapper\b[^"]*"/i);
  const footerEnd = sharedSource.indexOf('</footer>') + '</footer>'.length;

  return {
    top: sanitize(sharedSource.slice(bodyStart + '<body>'.length, headerStart)),
    header: sanitize(sharedSource.slice(headerStart, sharedSource.indexOf('</header>') + '</header>'.length)),
    footer: sanitize(sharedSource.slice(footerStart, footerEnd)),
  };
}

export function getPageHtml(fileName: string) {
  const source = getSource(fileName);
  const match = source.match(/<\/header>([\s\S]*?)<footer\b[^>]*class="[^"]*\bfooter-wrapper\b[^"]*"/i);
  if (!match) {
    throw new Error(`Unable to extract page content from ${fileName}`);
  }
  return sanitize(match[1].trim());
}

export function getPageTitle(fileName: string) {
  const source = getSource(fileName);
  const title = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? 'Engineers';
  return title.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getIndexHeroHtml() {
  const page = getPageHtml('index.html');
  const marker = '<div class="about-area-1';
  const splitIndex = page.indexOf(marker);
  return splitIndex > -1 ? page.slice(0, splitIndex).trim() : page;
}

export function getIndexAfterHeroHtml() {
  const page = getPageHtml('index.html');
  const marker = '<div class="about-area-1';
  const splitIndex = page.indexOf(marker);
  return splitIndex > -1 ? page.slice(splitIndex).trim() : '';
}

export function getContactHtmlParts() {
  const page = getPageHtml('contact.html');
  const formStartMarker = '<section class="contact-area-2';
  const start = page.indexOf(formStartMarker);
  return {
    beforeForm: start > -1 ? page.slice(0, start).trim() : page,
    formSection: start > -1 ? page.slice(start).trim() : '',
  };
}
