import {SERVICE_MENU_ITEMS} from '@/lib/site-content'

export const fallbackHeader = {
  announcementText: '24/7 Emergency Service',
  showPhoneInBar: true,
  logoPrimary: 'Handyman',
  logoSecondary: 'Maintenance',
  logoTagline: '- DUBAI -',
  logoImage: null,
  menuItems: [
    {label: 'Home', href: '/', openInNewTab: false, children: []},
    {
      label: 'Services',
      href: '/services/',
      openInNewTab: false,
      children: SERVICE_MENU_ITEMS,
    },
    {label: 'About Us', href: '/about/', openInNewTab: false, children: []},
    {label: 'Why Choose Us', href: '/why-choose-us/', openInNewTab: false, children: []},
    {label: 'Service Areas', href: '/service-areas/', openInNewTab: false, children: []},
    {label: 'Gallery', href: '/gallery/', openInNewTab: false, children: []},
    {label: 'Contact Us', href: '/contact/', openInNewTab: false, children: []},
  ],
  ctaButton: {
    enabled: true,
    label: 'Call Now',
    href: '/contact/',
    openInNewTab: false,
  },
}

export const fallbackFooter = {
  brandTitle: 'Handyman Maintenance Dubai',
  description:
    'Professional handyman and maintenance services in Dubai. Plumbing, electrical, AC, painting, carpentry, and more — available 24/7.',
  columns: [
    {
      title: 'Quick Links',
      links: [
        {label: 'Home', href: '/', openInNewTab: false},
        {label: 'Services', href: '/services/', openInNewTab: false},
        {label: 'About Us', href: '/about/', openInNewTab: false},
        {label: 'Why Choose Us', href: '/why-choose-us/', openInNewTab: false},
        {label: 'Gallery', href: '/gallery/', openInNewTab: false},
        {label: 'Contact Us', href: '/contact/', openInNewTab: false},
      ],
    },
    {
      title: 'Service Areas',
      links: [
        {label: 'All Service Areas', href: '/service-areas/', openInNewTab: false},
        {label: 'Emergency Plumbing', href: '/categories/emergency-plumbing/', openInNewTab: false},
        {label: 'Residential Plumbing', href: '/categories/residential-plumbing/', openInNewTab: false},
        {label: 'Commercial Plumbing', href: '/categories/commercial-plumbing/', openInNewTab: false},
        {label: 'Pump Services', href: '/categories/pump-services/', openInNewTab: false},
      ],
    },
    {
      title: 'Contact',
      links: [
        {label: 'Contact Form', href: '/contact/', openInNewTab: false},
        {label: 'Emergency Plumber', href: '/services/emergency-plumber/', openInNewTab: false},
        {label: '24/7 Plumbing Service', href: '/services/247-plumbing-service/', openInNewTab: false},
        {label: 'Blog', href: '/blog/', openInNewTab: false},
      ],
    },
  ],
  copyrightText: '© {year} Handyman Maintenance. All rights reserved.',
  bottomNote: 'Licensed Plumbing Services in Dubai, UAE',
}

export function getFallbackHeader() {
  return fallbackHeader
}

export function getFallbackFooter() {
  return fallbackFooter
}
