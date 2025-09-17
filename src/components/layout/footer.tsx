'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Zap } from 'lucide-react';
import Link from 'next/link';

// Data for footer links to make the component cleaner and easier to update
const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'TVs & Displays', href: '/products?category=TVs' },
      { label: 'Laptops & Computers', href: '/products?category=Laptops' },
      { label: 'Phones & Tablets', href: '/products?category=Phones' },
      { label: 'Audio', href: '/products?category=Audio' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Returns', href: '/shipping' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:gap-8  md:grid-cols-3'>
          {/* Brand Section */}
          <div className='flex flex-col items-start'>
            <Link href='/' className='flex items-center gap-2'>
              <Zap className='h-7 w-7 text-foreground' />
              <span className='text-xl font-bold text-foreground'>Electro</span>
            </Link>
            <p className='mt-4 text-sm text-muted-foreground'>
              Your one-stop shop for the best electronics.
            </p>
            <div className='mt-4 flex space-x-4'>
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} passHref>
                  <Button variant='ghost' size='icon' aria-label={social.label}>
                    <social.icon className='h-5 w-5 text-muted-foreground transition-colors hover:text-foreground' />
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 md:col-span-2 '>
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className='font-semibold text-foreground'>
                  {section.title}
                </h4>
                <ul className='mt-4 space-y-3'>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className='grid  md:col-span-6 md:max-w-2xl mt-12 mx-auto items-center'>
          <h4 className='font-semibold text-foreground'>Stay Connected</h4>
          <p className='mt-4 text-sm text-muted-foreground'>
            Subscribe to our newsletter for the latest deals and updates.
          </p>
          <form className='mt-4 flex gap-2'>
            <Input
              type='email'
              placeholder='Enter your email'
              className='flex-1'
              aria-label='Email for newsletter'
            />
            <Button type='submit'>Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='border-t p-4 text-center'>
        <p className='text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} Electro Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}