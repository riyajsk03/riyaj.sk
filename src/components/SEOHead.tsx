import React, { useEffect } from 'react';
import { PageId } from '../types';

interface SEOConfig {
  title: string;
  description: string;
  path: string;
}

const PAGE_SEO: Record<PageId, SEOConfig> = {
  home: {
    title: 'Riyaj Sk — Customer Service Representative & Web Builder',
    description: 'Riyaj Sk — Customer Service Representative at Concentrix Bangalore. 80% WhatsApp & email chat concurrency, 98.5% CSAT, 26 AI & InfoSec certifications, and web builder.',
    path: '/'
  },
  about: {
    title: 'About Riyaj Sk — Background, Journey & Operational Philosophy',
    description: 'Learn about Riyaj Sk: based in Bangalore with roots in West Bengal. 2+ years across multi-channel BPO operations, high-concurrency chat triage, and digital services.',
    path: '/about'
  },
  experience: {
    title: 'Work Experience & Skills — Riyaj Sk | Concentrix Bangalore',
    description: 'Professional experience of Riyaj Sk at Concentrix Service India: 80% digital queue focus, CRM triage (Infobip, Avaya, Marvin), 98.5% CSAT, and technical systems.',
    path: '/experience'
  },
  certifications: {
    title: 'Licenses & Certifications — Riyaj Sk | 26 Verified Credentials',
    description: '26 verified certifications: NextWave AI & RPA deep dives, Concentrix University Annual InfoSec & Social Engineering, and Microsoft 365 Excel.',
    path: '/certifications'
  },
  work: {
    title: 'Selected Projects & Audio Spaces — Riyaj Sk | MEHFIL & Zero Cap',
    description: 'Explore web applications crafted by Riyaj Sk: MEHFIL multi-world ambient audio & chat, Zero Cap lofi radio, Dhaba Radio 90s archive, and OmniQueue CRM.',
    path: '/work'
  },
  contact: {
    title: 'Contact Riyaj Sk — Frontline Customer Support & Web Inquiries',
    description: 'Get in touch with Riyaj Sk for customer experience roles, technical support operations, and frontend web development collaboration in Bangalore or remote.',
    path: '/contact'
  },
  admin: {
    title: 'Admin Management Portal — Riyaj Sk',
    description: 'Administrative portal for live Firebase Firestore synchronization and portfolio content management.',
    path: '/admin'
  },
  'not-found': {
    title: '404 — Page Not Found | Riyaj Sk',
    description: 'The requested resource could not be found. Explore available destinations across Riyaj Sk portfolio.',
    path: '/404'
  }
};

const BASE_URL = 'https://riyajsk.vercel.app';
const OG_IMAGE_URL = 'https://riyajsk.vercel.app/og-image.svg';

export const SEOHead: React.FC<{ activePage: PageId }> = ({ activePage }) => {
  const seo = PAGE_SEO[activePage] || PAGE_SEO.home;
  const canonicalUrl = `${BASE_URL}${seo.path === '/' ? '' : seo.path}`;

  useEffect(() => {
    // 1. Update Title
    document.title = seo.title;

    // 2. Helper to set or update meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Meta Description
    setMetaTag('name', 'description', seo.description);

    // 4. Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 5. Open Graph Tags
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', OG_IMAGE_URL);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Riyaj Sk');

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', OG_IMAGE_URL);
  }, [seo, canonicalUrl]);

  // Structured Data (JSON-LD): Person, WebSite & LocalBusiness / ProfessionalService
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name: 'Riyaj Sk',
        alternateName: ['Riyaj', 'xriyajsk'],
        jobTitle: 'Customer Service Representative & Web Builder',
        description: 'Customer Service Representative at Concentrix Bangalore specializing in WhatsApp chat & email concurrency, CRM triage, and web applications.',
        url: BASE_URL,
        image: OG_IMAGE_URL,
        email: 'xriyajsk@gmail.com',
        sameAs: [
          'https://linkedin.com/in/riyaj-sk-409605335',
          'https://github.com/xriyajsk',
          'https://xmehfil.vercel.app/'
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Concentrix Service India Pvt. Ltd.',
          location: {
            '@type': 'PostalAddress',
            addressLocality: 'Bangalore',
            addressRegion: 'Karnataka',
            addressCountry: 'IN'
          }
        },
        knowsAbout: [
          'Customer Service',
          'WhatsApp Chat Support',
          'Email Ticket Triage',
          'High-Concurrency Support',
          'CRM Systems',
          'Infobip',
          'Avaya',
          'Data Privacy & InfoSec',
          'Robotic Process Automation',
          'Conversational AI',
          'React',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'Firebase'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Riyaj Sk — Official Portfolio',
        description: 'Portfolio, verified certifications, professional experience and web applications of Riyaj Sk.',
        publisher: {
          '@id': `${BASE_URL}/#person`
        }
      },
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': `${BASE_URL}/#localbusiness`,
        name: 'Riyaj Sk — Customer Support & Web Craft',
        description: 'Professional frontline customer support, omnichannel chat triage, and modern web application development services.',
        url: BASE_URL,
        image: OG_IMAGE_URL,
        telephone: '+91-9876543210',
        email: 'xriyajsk@gmail.com',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bangalore',
          addressRegion: 'Karnataka',
          postalCode: '560001',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 12.9716,
          longitude: 77.5946
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Bangalore'
          },
          {
            '@type': 'Country',
            name: 'India'
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Remote Worldwide'
          }
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
