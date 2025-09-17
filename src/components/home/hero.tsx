'use client';

import { Button } from '@/components/ui/button';
import { useProducts } from '@/lib/hooks/useProducts';
import { getProductImage } from '@/lib/utils/product-images';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const Hero = () => {
  const router = useRouter();
  const { products } = useProducts();
  const testimonials = useMemo(
    () => [
      {
        quote: "The Quantum TV has the best picture I've ever seen.",
        name: 'Sarah J.',
      },
      {
        quote: 'My new AeroBook is unbelievably fast and light.',
        name: 'Mike R.',
      },
      {
        quote: 'Fast shipping and excellent customer service!',
        name: 'Emily W.',
      },
    ],
    []
  );
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const carouselProducts = useMemo(() => {
    // Show the first 5 products for a focused carousel
    return products.slice(0, 8);
  }, [products]);

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  // Manual navigation functions
  const nextSlide = () => {
    setDirection(1);
    setCurrentProductIndex((prev) => (prev + 1) % carouselProducts.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentProductIndex(
      (prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length
    );
  };

  // Auto-cycle products every 3 seconds
  useEffect(() => {
    if (carouselProducts.length > 0 && !isPaused) {
      const productTimer = setInterval(() => {
        setDirection(1); // Ensure the animation direction is always 'next' for auto-play
        setCurrentProductIndex((prev) => (prev + 1) % carouselProducts.length);
      }, 3000); // Change product every 3 seconds
      return () => clearInterval(productTimer);
    }
  }, [carouselProducts.length, isPaused]);

  // Auto-cycle testimonials every 5 seconds
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);

  const navigateToProducts = () => {
    router.push('/products');
  };

  const productVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
    }),
    animate: {
      x: '0%',
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className='bg-slate-50 dark:bg-slate-900'>
      {/* Main Hero Section */}
      <div className='container mx-auto px-4 py-16 sm:py-20 text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white'
        >
          The Future of Tech, Today.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300'
        >
          Discover cutting-edge electronics and gadgets designed to elevate your
          everyday life. Unbeatable prices, unmatched quality.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-4'
        >
          <Button size='lg' onClick={navigateToProducts}>
            Shop Now
          </Button>
          <Button
            size='lg'
            variant='outline'
            onClick={() => router.push('/about')}
          >
            Learn More
          </Button>
        </motion.div>
      </div>

      {/* NEW: Automated, sliding product carousel */}
      {carouselProducts.length > 0 && (
        <div className='relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden'>
          <div
            className='w-full h-full relative'
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentProductIndex}
                variants={productVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className='absolute inset-0'
                custom={direction}
              >
                <div className='relative w-full h-full'>
                  <Image
                    src={getProductImage(carouselProducts[currentProductIndex])}
                    alt={carouselProducts[currentProductIndex].title}
                    fill
                    className='object-cover'
                    sizes='100vw'
                    priority
                  />
                  <div className='absolute inset-0 bg-black/50 flex flex-col justify-end p-8'>
                    <h2 className='text-3xl sm:text-5xl font-extrabold text-white'>
                      {carouselProducts[currentProductIndex].title}
                    </h2>
                    <p className='mt-2 text-lg text-slate-300'>
                      {carouselProducts[currentProductIndex].description}
                    </p>
                    <Button
                      size='lg'
                      className='mt-4 w-fit cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          `/products/${carouselProducts[currentProductIndex].id}`
                        );
                      }}
                    >
                      View Product
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className='absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10 cursor-pointer'
            >
              <ChevronLeft className='h-8 w-8' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className='absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10 cursor-pointer'
            >
              <ChevronRight className='h-8 w-8' />
            </button>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <div className='container mx-auto px-4 py-12 sm:py-16 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='mt-12 h-10'
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <p className='text-slate-600 italic dark:text-slate-400'>
                {testimonials[currentTestimonial].quote}
              </p>
              <p className='text-sm font-semibold text-slate-500 mt-1 dark:text-slate-500'>
                - {testimonials[currentTestimonial].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export { Hero };
