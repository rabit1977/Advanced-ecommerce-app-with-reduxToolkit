import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Headset, LucideIcon, Package, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: 'Fast & Reliable Shipping',
    description:
      'Get your products delivered quickly and safely to your doorstep with our efficient shipping network.',
    icon: Truck,
  },
  {
    title: '24/7 Customer Support',
    description:
      'Our dedicated support team is always available to assist you with any queries or issues.',
    icon: Headset,
  },
  {
    title: 'Quality Assurance',
    description:
      'We ensure all our products meet the highest quality standards for your satisfaction.',
    icon: ShieldCheck,
  },
  {
    title: 'Easy Returns & Refunds',
    description:
      'Hassle-free returns and quick refunds if you are not completely satisfied with your purchase.',
    icon: Package,
  },
];
export const metadata = {
  title: 'Our Services',
  description:
    'Discover the range of services Electro offers, including fast shipping, 24/7 support, quality assurance, and easy returns.',
};

const Services = () => {
  return (
    <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-foreground mb-4'>
          Our Services
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          At Electro, we are committed to providing an exceptional shopping
          experience. Discover the range of services designed to make your life
          easier.
        </p>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
        {services.map((service, index) => (
          <Card
            key={index}
            className='flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow duration-300'
          >
            <CardHeader className='flex flex-col items-center mb-4'>
              <service.icon className='h-10 w-10 text-primary mb-2' />
            </CardHeader>

            <CardTitle className='text-lg font-semibold text-foreground'>
              {service.title}
            </CardTitle>
            <CardDescription className='text-sm text-muted-foreground'>
              {service.description}
            </CardDescription>
            <CardContent></CardContent>
          </Card>
        ))}
      </section>

      <section className='text-center'>
        <h2 className='text-2xl font-bold text-foreground mb-4'>
          Need Assistance?
        </h2>
        <p className='text-lg text-muted-foreground mb-6'>
          Our customer support team is here to help you with any questions or
          concerns.
        </p>
        <Link href='/contact'>
          <Button variant='default' size='lg'>
            Contact Support
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Services;
