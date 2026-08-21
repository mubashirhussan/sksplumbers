import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

function loadToken() {
  const envPath = resolve('../studio-sksplumbers/.env')
  const raw = readFileSync(envPath, 'utf8')
  const match = raw.match(/^SANITY_API_TOKEN=(.+)$/m)
  if (!match) throw new Error('SANITY_API_TOKEN not found in studio .env')
  return match[1].trim()
}

const client = createClient({
  projectId: 'yk2toi4y',
  dataset: 'production',
  apiVersion: '2026-05-15',
  token: loadToken(),
  useCdn: false,
})

const NEW_SECTIONS = [
  {
    _type: 'homeServices',
    _key: 'services',
    heading: 'Our Services',
    cardButtonLabel: 'Learn More',
    viewAllLabel: 'View All Services',
    viewAllHref: '/services/',
  },
  {
    _type: 'homeFeature',
    _key: 'why-trust',
    eyebrow: 'Why Choose Us',
    heading: 'Why Dubai Homes And Businesses Trust Handyman Maintenance',
    theme: 'light',
    imagePosition: 'right',
    items: [
      {
        _key: 'wf1',
        _type: 'trustItem',
        icon: 'quote',
        title: 'Free Quote On Every Job',
        text: 'Clear pricing before work starts — no surprises on the day.',
      },
      {
        _key: 'wf2',
        _type: 'trustItem',
        icon: 'emergency',
        title: 'Emergency Service Available',
        text: '24/7 callouts across Dubai for urgent leaks, blockages, and breakdowns.',
      },
      {
        _key: 'wf3',
        _type: 'trustItem',
        icon: 'users',
        title: 'Licensed Experienced Team',
        text: 'Skilled technicians for plumbing, electrical, AC, painting, and more.',
      },
      {
        _key: 'wf4',
        _type: 'trustItem',
        icon: 'check',
        title: 'Clean Reliable Workmanship',
        text: 'We protect your property, finish tidily, and leave only when you are satisfied.',
      },
    ],
    buttonText: 'Contact Us',
    buttonHref: '/contact/',
  },
  {
    _type: 'homeMission',
    _key: 'mission',
    theme: 'gold',
    heading: "Dubai's Trusted Handyman And Maintenance Company",
    description:
      'Handyman Maintenance delivers fast, affordable home and office services across Dubai. From emergency plumbing to electrical, AC, painting, carpentry, and tiles — one call covers your villa, apartment, or workplace.',
    buttonText: 'Contact Us',
    buttonHref: '/contact/',
  },
  {
    _type: 'homeFeature',
    _key: 'approach',
    eyebrow: 'Our Approach',
    heading: 'Handyman Maintenance: Reliable Approach',
    theme: 'dark',
    imagePosition: 'right',
    items: [
      {
        _key: 'ap1',
        _type: 'trustItem',
        icon: 'calendar',
        title: 'Simple And Fast Scheduling',
        text: 'Book by phone or WhatsApp and get a clear arrival window.',
      },
      {
        _key: 'ap2',
        _type: 'trustItem',
        icon: 'clock',
        title: 'On-Time Arrivals',
        text: 'Our team respects your time and updates you if plans change.',
      },
      {
        _key: 'ap3',
        _type: 'trustItem',
        icon: 'van',
        title: 'Fully Equipped Visits',
        text: 'Technicians arrive with tools and common parts ready to work.',
      },
      {
        _key: 'ap4',
        _type: 'trustItem',
        icon: 'quality',
        title: 'Quality You Can Trust',
        text: 'We test the repair and make sure the job is done properly before we leave.',
      },
    ],
    buttonText: 'Contact Us',
    buttonHref: '/contact/',
  },
  {
    _type: 'homeWhyChoose',
    _key: 'why-choose',
    eyebrow: 'Why Choose Us',
    heading: 'Why Handyman Maintenance',
    description:
      'Dubai homes and businesses choose us for fast response, clear pricing, and reliable workmanship.',
    useSitePoints: true,
    buttonText: 'Learn More',
    buttonHref: '/why-choose-us/',
  },
  {
    _type: 'homeFaq',
    _key: 'faq',
    eyebrow: 'FAQs',
    heading: 'Frequently Asked Questions',
    description: 'Quick answers about our handyman and maintenance services in Dubai.',
    faqs: [
      {
        _key: 'faq1',
        _type: 'faqItem',
        question: 'How quickly can you respond to emergencies in Dubai?',
        answer:
          'Handyman Maintenance offers 24/7 emergency service across Dubai with same-day response for urgent plumbing, electrical, and AC calls.',
      },
      {
        _key: 'faq2',
        _type: 'faqItem',
        question: 'Are your technicians licensed in Dubai?',
        answer:
          'Yes. Our technicians are licensed and experienced professionals serving homes, offices, and villas across Dubai.',
      },
      {
        _key: 'faq3',
        _type: 'faqItem',
        question: 'Do you provide a free quote before starting work?',
        answer:
          'Yes. We give a clear quote before work begins so you know the cost upfront — no hidden charges.',
      },
      {
        _key: 'faq4',
        _type: 'faqItem',
        question: 'Which areas in Dubai do you cover?',
        answer:
          'We serve Dubai Marina, Jumeirah, Business Bay, Downtown, JLT, JVC, Al Barsha, and many more areas across Dubai.',
      },
      {
        _key: 'faq5',
        _type: 'faqItem',
        question: 'What services can I book with one call?',
        answer:
          'Plumbing, electrical, AC, painting, carpentry, and tiles & gypsum — one team for home and office maintenance.',
      },
    ],
  },
  {
    _type: 'homeTrust',
    _key: 'trust',
  },
  {
    _type: 'homeServiceAreas',
    _key: 'areas',
    heading: 'Areas We Serve',
    useSiteAreas: true,
    buttonText: 'View All Areas',
    buttonHref: '/service-areas/',
  },
  {
    _type: 'homeContact',
    _key: 'contact',
    heading: 'Contact Us Today',
    description: 'Tell us what you need and we will get back to you quickly.',
    showForm: true,
    showDetails: true,
  },
  {
    _type: 'homeContactBanner',
    _key: 'cta',
    heading: 'Need a Handyman in Dubai?',
    description:
      'Handyman Maintenance offers fast, affordable services across Dubai. Available 24/7 for emergencies.',
    buttonText: 'Get Free Quote',
    buttonHref: '/contact/',
    showPhone: true,
  },
]

const existing = await client.fetch(`*[_type == "homePage"][0]{
  _id,
  "selectedServices": sections[_type == "homeServices"][0].selectedServices
}`)

if (!existing?._id) {
  throw new Error('homePage document not found')
}

const sections = NEW_SECTIONS.map((section) => {
  if (section._type === 'homeServices' && existing.selectedServices?.length) {
    return {...section, selectedServices: existing.selectedServices}
  }
  return section
})

await client.patch(existing._id).set({sections}).commit()

const verify = await client.fetch(`*[_type == "homePage"][0]{sections[]{_type,_key,heading}}`)
console.log('Updated home page sections:')
console.log(JSON.stringify(verify, null, 2))
