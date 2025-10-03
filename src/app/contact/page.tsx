'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUI } from '@/lib/hooks/useUI';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useCallback, useState, useTransition } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

/**
 * Contact page component with form validation and accessibility
 *
 * Features:
 * - Client-side form validation
 * - Loading states with useTransition
 * - Accessible form with proper labels
 * - Responsive layout
 * - Animated elements with Framer Motion
 */
const ContactPage = () => {
  const { showToast } = useUI();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, startTransition] = useTransition();

  /**
   * Validate form fields
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /**
   * Handle input changes
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      startTransition(() => {
        // Simulate API call
        setTimeout(() => {
          console.log('Form submitted:', formData);
          showToast("Message sent! We'll be in touch soon.");
          setFormData(INITIAL_FORM_STATE);
          setErrors({});
        }, 1000);
      });
    },
    [formData, validateForm, showToast]
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay },
    }),
  };

  return (
    <div className=''>
      <div className='container mx-auto px-4 py-12 sm:py-16 lg:py-20'>
        {/* Page Header */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeInUp}
          className='text-center mb-12 sm:mb-16'
        >
          <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white'>
            Get in Touch
          </h1>
          <p className='mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
            We&apos;re here to help you. Fill out the form below or find us at
            our office.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Contact Form */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeInUp}
            custom={0.1}
          >
            <div className='rounded-xl border bg-white p-6 sm:p-8 shadow-lg dark:bg-slate-900 dark:border-slate-800'>
              <h2 className='text-2xl font-semibold dark:text-white mb-6'>
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className='space-y-5' noValidate>
                {/* Name Field */}
                <div className='space-y-2'>
                  <Label htmlFor='name'>
                    Name <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='name'
                    name='name'
                    placeholder='John Doe'
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isPending}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={
                      errors.name
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {errors.name && (
                    <p id='name-error' className='text-sm text-red-500'>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className='space-y-2'>
                  <Label htmlFor='email'>
                    Email <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='john@example.com'
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isPending}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={
                      errors.email
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {errors.email && (
                    <p id='email-error' className='text-sm text-red-500'>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className='space-y-2'>
                  <Label htmlFor='subject'>
                    Subject <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='subject'
                    name='subject'
                    placeholder='How can we help?'
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isPending}
                    aria-invalid={!!errors.subject}
                    aria-describedby={
                      errors.subject ? 'subject-error' : undefined
                    }
                    className={
                      errors.subject
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {errors.subject && (
                    <p id='subject-error' className='text-sm text-red-500'>
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className='space-y-2'>
                  <Label htmlFor='message'>
                    Message <span className='text-red-500'>*</span>
                  </Label>
                  <Textarea
                    id='message'
                    name='message'
                    placeholder='Tell us more about your inquiry...'
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isPending}
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    className={
                      errors.message
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                  />
                  {errors.message && (
                    <p id='message-error' className='text-sm text-red-500'>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='w-full gap-2'
                  size='lg'
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='h-4 w-4' />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <div className='space-y-6'>
            {/* Location Card */}
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeInUp}
              custom={0.2}
              className='rounded-xl border bg-white p-6 shadow-lg dark:bg-slate-900 dark:border-slate-800'
            >
              <h2 className='text-2xl font-semibold dark:text-white mb-6'>
                Our Location
              </h2>
              <div className='space-y-5'>
                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                    <MapPin className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-semibold text-lg dark:text-white'>
                      Address
                    </p>
                    <p className='text-slate-600 dark:text-slate-400 mt-1'>
                      123 Tech Avenue, Suite 100
                      <br />
                      Innovation City, CA 90210
                    </p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                    <Phone className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-semibold text-lg dark:text-white'>
                      Phone
                    </p>
                    <a
                      href='tel:+15551234567'
                      className='text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors mt-1 block'
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                    <Mail className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <p className='font-semibold text-lg dark:text-white'>
                      Email
                    </p>
                    <a
                      href='mailto:support@electro.com'
                      className='text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors mt-1 block'
                    >
                      support@electro.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Hours Card */}
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeInUp}
              custom={0.3}
              className='rounded-xl border bg-white p-6 shadow-lg dark:bg-slate-900 dark:border-slate-800'
            >
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center'>
                  <Clock className='h-5 w-5 text-primary' />
                </div>
                <h2 className='text-2xl font-semibold dark:text-white'>
                  Business Hours
                </h2>
              </div>
              <div className='space-y-3 text-slate-600 dark:text-slate-400'>
                <div className='flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700'>
                  <span className='font-medium'>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className='flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700'>
                  <span className='font-medium'>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='font-medium'>Sunday</span>
                  <span className='text-red-500 font-medium'>Closed</span>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeInUp}
              custom={0.4}
              className='rounded-xl overflow-hidden shadow-lg h-64 sm:h-80'
            >
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.004258724266!3d40.74076987932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c8eef01%3A0x7a2ff2c2e2b3c3b!2sTech%20Avenue!5e0!3m2!1sen!2sus!4v1690835000000!5m2!1sen!2sus'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Office location map'
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
