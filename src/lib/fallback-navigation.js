export const fallbackHeader = {
  announcementText: '24/7 Emergency Plumbing in Dubai',
  showPhoneInBar: true,
  logoPrimary: 'SKS',
  logoSecondary: 'Plumbers Dubai',
  logoImage: null,
  menuItems: [
    {label: 'Home', href: '/', openInNewTab: false, children: []},
    {
      label: 'Services',
      href: '/services/',
      openInNewTab: false,
      children: [
        {label: 'Emergency Plumber', href: '/services/emergency-plumber/', openInNewTab: false},
        {label: 'Water Pump Repair', href: '/services/water-pump-repair/', openInNewTab: false},
        {label: 'Drain Unblocking', href: '/services/drain-unblocking-service/', openInNewTab: false},
        {label: 'Water Heater Repair', href: '/services/water-heater-repair/', openInNewTab: false},
        {label: 'View All Services', href: '/services/', openInNewTab: false},
      ],
    },
    {
      label: 'Categories',
      href: '/categories/',
      openInNewTab: false,
      children: [
        {label: 'Emergency Plumbing', href: '/categories/emergency-plumbing/', openInNewTab: false},
        {label: 'Residential Plumbing', href: '/categories/residential-plumbing/', openInNewTab: false},
        {label: 'Commercial Plumbing', href: '/categories/commercial-plumbing/', openInNewTab: false},
        {label: 'Pump Services', href: '/categories/pump-services/', openInNewTab: false},
        {label: 'Specialized Services', href: '/categories/specialized-plumbing-services/', openInNewTab: false},
      ],
    },
    {label: 'Blog', href: '/blog/', openInNewTab: false, children: []},
    {label: 'About', href: '/pages/about/', openInNewTab: false, children: []},
    {label: 'Contact', href: '/pages/contact/', openInNewTab: false, children: []},
  ],
  ctaButton: {
    enabled: true,
    label: 'Get a Quote',
    href: '/pages/contact/',
    openInNewTab: false,
  },
}

export const fallbackFooter = {
  brandTitle: 'SKS Plumbers Dubai',
  description:
    'Professional plumbing services in Dubai. Licensed plumbers available 24/7 for emergencies, repairs, and installations.',
  columns: [
    {
      title: 'Quick Links',
      links: [
        {label: 'Home', href: '/', openInNewTab: false},
        {label: 'Services', href: '/services/', openInNewTab: false},
        {label: 'Categories', href: '/categories/', openInNewTab: false},
        {label: 'Blog', href: '/blog/', openInNewTab: false},
        {label: 'About', href: '/pages/about/', openInNewTab: false},
        {label: 'Contact', href: '/pages/contact/', openInNewTab: false},
      ],
    },
    {
      title: 'Service Categories',
      links: [
        {label: 'Emergency Plumbing', href: '/categories/emergency-plumbing/', openInNewTab: false},
        {label: 'Residential Plumbing', href: '/categories/residential-plumbing/', openInNewTab: false},
        {label: 'Commercial Plumbing', href: '/categories/commercial-plumbing/', openInNewTab: false},
        {label: 'Pump Services', href: '/categories/pump-services/', openInNewTab: false},
        {label: 'View All Categories', href: '/categories/', openInNewTab: false},
      ],
    },
    {
      title: 'Contact',
      links: [
        {label: 'Contact Form', href: '/pages/contact/', openInNewTab: false},
        {label: 'Emergency Plumber', href: '/services/emergency-plumber/', openInNewTab: false},
        {label: '24/7 Plumbing Service', href: '/services/247-plumbing-service/', openInNewTab: false},
      ],
    },
  ],
  copyrightText: '© {year} SKS Plumbers. All rights reserved.',
  bottomNote: 'Licensed Plumbing Services in Dubai, UAE',
}

export function getFallbackHeader() {
  return fallbackHeader
}

export function getFallbackFooter() {
  return fallbackFooter
}
