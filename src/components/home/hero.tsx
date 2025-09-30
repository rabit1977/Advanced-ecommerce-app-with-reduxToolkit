'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { priceFmt } from '@/lib/utils/formatters';
import { getProductImage } from '@/lib/utils/product-images';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface HeroProps {
  /** Products to display in carousel */
  products: Product[];
  /** Number of products to show in carousel */
  carouselLimit?: number;
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
  /** Whether to show testimonials section */
  showTestimonials?: boolean;
}

interface Testimonial {
  quote: string;
  name: string;
  rating?: number;
}

/**
 * Professional hero component with animated product carousel and testimonials
 *
 * Features:
 * - Auto-playing carousel with manual controls
 * - Smooth animations with Framer Motion
 * - Pause on hover
 * - Keyboard navigation support
 * - Responsive design
 * - Performance optimized
 */
const Hero = ({
  products,
  carouselLimit = 8,
  autoPlayInterval = 5000,
  showTestimonials = true,
}: HeroProps) => {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Testimonials data
  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        quote:
          "The Quantum TV has the best picture I've ever seen. Absolutely stunning quality!",
        name: 'Sarah J.',
        rating: 5,
      },
      {
        quote:
          'My new AeroBook is unbelievably fast and light. Perfect for my daily work.',
        name: 'Mike R.',
        rating: 5,
      },
      {
        quote:
          'Fast shipping and excellent customer service! Highly recommend this store.',
        name: 'Emily W.',
        rating: 5,
      },
    ],
    []
  );

  // Carousel state
  const carouselProducts = useMemo(
    () => products.slice(0, carouselLimit),
    [products, carouselLimit]
  );

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Get current product
  const currentProduct = carouselProducts[currentProductIndex];

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentProductIndex((prev) => (prev + 1) % carouselProducts.length);
  }, [carouselProducts.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentProductIndex(
      (prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length
    );
  }, [carouselProducts.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentProductIndex ? 1 : -1);
      setCurrentProductIndex(index);
    },
    [currentProductIndex]
  );

  // Navigation to pages
  const navigateToProducts = useCallback(() => {
    router.push('/products');
  }, [router]);

  const navigateToProduct = useCallback(
    (productId: string) => {
      router.push(`/products/${productId}`);
    },
    [router]
  );

  const navigateToAbout = useCallback(() => {
    router.push('/about');
  }, [router]);

  // Auto-play carousel
  useEffect(() => {
    if (carouselProducts.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentProductIndex((prev) => (prev + 1) % carouselProducts.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [carouselProducts.length, isPaused, autoPlayInterval]);

  // Auto-cycle testimonials
  useEffect(() => {
    if (!showTestimonials) return;

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length, showTestimonials]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Animation variants
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1], // Custom easing
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
      },
    }),
  };

  const fadeInUpVariants: Variants  = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0, delay, ease: 'easeOut' },
    }),
  };

  if (carouselProducts.length === 0) {
    return null;
  }

  return (
    <div className='relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800'>
      {/* Hero Header Section */}
      <div className='container mx-auto px-4 py-12 sm:py-16 lg:py-20 text-center'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeInUpVariants}
          custom={0}
          className='space-y-6'
        >
          <Badge variant='secondary' className='text-sm font-medium px-4 py-1'>
            🎉 New Arrivals Available
          </Badge>

          <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white'>
            The Future of Tech, <span className='text-primary'>Today</span>
          </h1>

          <motion.p
            initial='hidden'
            animate='visible'
            variants={fadeInUpVariants}
            custom={0.2}
            className='mx-auto max-w-3xl text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed'
          >
            Discover cutting-edge electronics and gadgets designed to elevate
            your everyday life. Unbeatable prices, unmatched quality.
          </motion.p>

          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeInUpVariants}
            custom={0.4}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'
          >
            <Button
              size='lg'
              onClick={navigateToProducts}
              className='gap-2 text-base px-8'
            >
              <ShoppingBag className='h-5 w-5' />
              Shop Now
            </Button>
            <Button
              size='lg'
              variant='outline'
              onClick={navigateToAbout}
              className='text-base px-8'
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Product Carousel Section */}
      {carouselProducts.length > 0 && (
        <div
          ref={carouselRef}
          className='relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[600px] overflow-hidden bg-slate-900'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role='region'
          aria-label='Featured products carousel'
        >
          <AnimatePresence initial={false} custom={direction} mode='wait'>
            <motion.div
              key={currentProductIndex}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              className='absolute inset-0'
            >
              {/* Product Image */}
              <div className='relative w-full h-full'>
                <Image
                  src={getProductImage(currentProduct)}
                  alt={currentProduct.title}
                  fill
                  className='object-cover'
                  priority={currentProductIndex === 0}
                  sizes='100vw'
                  quality={90}
                />

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

                {/* Product Info Overlay */}
                <div className='absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12'>
                  <div className='max-w-4xl space-y-4'>
                    {/* Category Badge */}
                    {currentProduct.category && (
                      <Badge
                        variant='secondary'
                        className='w-fit backdrop-blur-sm'
                      >
                        {currentProduct.category}
                      </Badge>
                    )}

                    {/* Product Title */}
                    <h2 className='text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight'>
                      {currentProduct.title}
                    </h2>

                    {/* Product Description */}
                    <p className='text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl line-clamp-2'>
                      {currentProduct.description}
                    </p>

                    {/* Price and Rating */}
                    <div className='flex items-center gap-4 flex-wrap'>
                      <span className='text-2xl sm:text-3xl font-bold text-white'>
                        {priceFmt(currentProduct.price)}
                      </span>
                      {currentProduct.rating && (
                        <div className='flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1'>
                          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                          <span className='text-sm font-medium text-white'>
                            {currentProduct.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Button
                      size='lg'
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToProduct(currentProduct.id);
                      }}
                      className='w-fit gap-2'
                    >
                      View Product
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {carouselProducts.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className='absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-200 z-10 group'
                aria-label='Previous product'
              >
                <ChevronLeft className='h-6 w-6 group-hover:scale-110 transition-transform' />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className='absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all duration-200 z-10 group'
                aria-label='Next product'
              >
                <ChevronRight className='h-6 w-6 group-hover:scale-110 transition-transform' />
              </button>

              {/* Dot Indicators */}
              <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
                {carouselProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentProductIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={
                      index === currentProductIndex ? 'true' : 'false'
                    }
                  />
                ))}
              </div>

              {/* Pause Indicator */}
              {isPaused && (
                <div className='absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm z-10'>
                  Paused
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Testimonials Section */}
      {showTestimonials && testimonials.length > 0 && (
        <div className='container mx-auto px-4 py-12 sm:py-16 lg:py-20'>
          <div className='max-w-3xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='space-y-6'
            >
              <h3 className='text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white'>
                What Our Customers Say
              </h3>

              <div className='relative h-32 sm:h-24'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className='absolute inset-0 flex flex-col items-center justify-center gap-4'
                  >
                    {/* Rating Stars */}
                    {testimonials[currentTestimonial].rating && (
                      <div className='flex gap-1'>
                        {Array.from({
                          length: testimonials[currentTestimonial].rating!,
                        }).map((_, i) => (
                          <Star
                            key={i}
                            className='h-5 w-5 fill-yellow-400 text-yellow-400'
                          />
                        ))}
                      </div>
                    )}

                    {/* Quote */}
                    <p className='text-base sm:text-lg text-slate-600 dark:text-slate-300 italic max-w-2xl'>
                      "{testimonials[currentTestimonial].quote}"
                    </p>

                    {/* Author */}
                    <p className='text-sm font-semibold text-slate-900 dark:text-slate-400'>
                      — {testimonials[currentTestimonial].name}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Testimonial Indicators */}
              <div className='flex justify-center gap-2 pt-4'>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-primary scale-125'
                        : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Hero };
export type { HeroProps, Testimonial };
