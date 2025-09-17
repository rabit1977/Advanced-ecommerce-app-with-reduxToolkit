'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUI } from '@/lib/hooks/useUI';
import { Mail, MapPin, Phone, Share2 } from 'lucide-react';
import React, { useState } from 'react';

const ContactPage = () => {
  const { showToast } = useUI();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log('Form submitted:', formData);
    showToast("Message sent! We'll be in touch soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className='bg-slate-50 min-h-[70vh] dark:bg-slate-900'>
      <div className='container mx-auto px-4 py-16'>
        <h1 className='text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-center'>
          Get in Touch
        </h1>
        <p className='mt-4 text-lg text-slate-600 dark:text-slate-300 text-center'>
          We&apos;re here to help you. Fill out the form below or find us at our
          office.
        </p>

        <div className='mt-12 grid md:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='rounded-xl border bg-white p-6 shadow-lg dark:bg-slate-950 dark:border-slate-800'>
            <h2 className='text-2xl font-semibold dark:text-white'>
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
              <Input
                name='name'
                placeholder='Your Name'
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                name='email'
                type='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                name='subject'
                placeholder='Subject'
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Textarea
                name='message'
                placeholder='Your Message'
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button type='submit' className='w-full'>
                <Share2 className='h-4 w-4 mr-2' />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className='space-y-6'>
            <div className='rounded-xl border bg-white p-6 shadow-lg dark:bg-slate-950 dark:border-slate-800'>
              <h2 className='text-2xl font-semibold dark:text-white'>
                Our Location
              </h2>
              <div className='mt-4 space-y-4'>
                <div className='flex items-center gap-3'>
                  <MapPin className='h-5 w-5 text-slate-600 dark:text-slate-400' />
                  <div>
                    <p className='font-medium dark:text-white'>Address</p>
                    <p className='text-slate-600 dark:text-slate-300'>
                      123 Tech Avenue, Suite 100
                      <br />
                      Innovation City, CA 90210
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Phone className='h-5 w-5 text-slate-600 dark:text-slate-400' />
                  <div>
                    <p className='font-medium dark:text-white'>Phone</p>
                    <p className='text-slate-600 dark:text-slate-300'>
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Mail className='h-5 w-5 text-slate-600 dark:text-slate-400' />
                  <div>
                    <p className='font-medium dark:text-white'>Email</p>
                    <p className='text-slate-600 dark:text-slate-300'>
                      support@electro.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='rounded-xl border bg-white p-6 shadow-lg dark:bg-slate-950 dark:border-slate-800'>
              <h2 className='text-2xl font-semibold dark:text-white'>
                Business Hours
              </h2>
              <div className='mt-4 space-y-2 text-slate-600 dark:text-slate-300'>
                <div className='flex justify-between'>
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className='rounded-xl overflow-hidden shadow-lg h-64'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.004258724266!3d40.74076987932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c8eef01%3A0x7a2ff2c2e2b3c3b!2sTech%20Avenue!5e0!3m2!1sen!2sus!4v1690835000000!5m2!1sen!2sus'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
