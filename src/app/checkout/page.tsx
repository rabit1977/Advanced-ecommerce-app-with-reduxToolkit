'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckoutSteps } from '@/components/checkout/checkout-steps';
import { CartSummary } from '@/components/cart/cart-summary';
import { priceFmt } from '@/lib/utils/formatters';
import Image from 'next/image';
import { placeOrder } from '@/lib/store/thunks/orderThunks';
import AuthGuard from '@/components/auth/auth-guard';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface MobileOrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  shippingCost: number;
  taxes: number;
  total: number;
}

// --- Mobile-only Order Summary --- //
const MobileOrderSummary = ({ cart, subtotal, shippingCost, taxes, total }: MobileOrderSummaryProps) => (
  <div className="lg:hidden mb-8">
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Show order summary</span>
            </div>
            <span className="font-bold text-lg">{priceFmt(total)}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="border-t border-slate-200 dark:border-slate-800">
            <ul className="py-4 space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 flex-shrink-0 relative rounded-md overflow-hidden border dark:border-slate-800">
                    <Image 
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium ml-auto dark:text-white">{priceFmt(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
            <CartSummary 
              subtotal={subtotal}
              shipping={shippingCost}
              taxes={taxes}
              total={total}
              isCollapsible
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart } = useAppSelector((state) => state.cart);
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvc: ''
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const subtotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0), 
    [cart]
  );
  
  const shippingCost = shippingMethod === 'express' ? 15.00 : 5.00;
  const taxes = subtotal * 0.08;
  const total = subtotal + shippingCost + taxes;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const isShippingValid = Object.values(shippingInfo).every(field => field.trim() !== '');
  const isPaymentValid = Object.values(paymentInfo).every(field => field.trim() !== '');

  const handlePlaceOrder = () => {
    const orderDetails = {
      items: cart,
      total,
      shippingAddress: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        street: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zip,
        country: 'USA'
      },
      billingAddress: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        street: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zip: shippingInfo.zip,
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      status: 'Pending' as 'Pending',
      createdAt: new Date().toISOString(),
      selectedId: null,
    };
    
    const newOrderId: string = dispatch(placeOrder(orderDetails));
    if (newOrderId) {
      router.push(`/order-confirmation?orderId=${newOrderId}`);
    }
  };

  const handleLeaveCheckout = useCallback((url: string) => {
    setNextUrl(url);
    setShowLeaveConfirm(true);
  }, []);

  const handleConfirmLeave = () => {
    if (nextUrl) {
      router.push(nextUrl);
    }
    setShowLeaveConfirm(false);
    setNextUrl(null);
  };

  const handleCancelLeave = () => {
    setShowLeaveConfirm(false);
    setNextUrl(null);
  };

  return (
    <AuthGuard>
      <div className="bg-slate-50 min-h-[70vh] dark:bg-slate-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">Checkout</h1>
          
          <MobileOrderSummary 
            cart={cart}
            subtotal={subtotal}
            shippingCost={shippingCost}
            taxes={taxes}
            total={total}
          />

          <CheckoutSteps currentStep={step} />
          
          <div className="mt-8 grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-950 dark:border-slate-800">
              {/* Checkout Steps Content */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">Shipping Information</h2>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input name="firstName" placeholder="First Name" value={shippingInfo.firstName} onChange={handleShippingChange} />
                    <Input name="lastName" placeholder="Last Name" value={shippingInfo.lastName} onChange={handleShippingChange} />
                    <Input name="address" placeholder="Address" className="sm:col-span-2" value={shippingInfo.address} onChange={handleShippingChange} />
                    <Input name="city" placeholder="City" value={shippingInfo.city} onChange={handleShippingChange} />
                    <Input name="state" placeholder="State" value={shippingInfo.state} onChange={handleShippingChange} />
                    <Input name="zip" placeholder="ZIP Code" value={shippingInfo.zip} onChange={handleShippingChange} />
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium dark:text-white mb-2">Shipping Method</h3>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg bg-slate-100 dark:bg-slate-800 dark:border-slate-700">
                        <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="form-radio h-4 w-4 text-slate-900 dark:text-slate-50"/>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Standard Shipping</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">5-7 business days - {priceFmt(5.00)}</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg bg-slate-100 dark:bg-slate-800 dark:border-slate-700">
                        <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="form-radio h-4 w-4 text-slate-900 dark:text-slate-50"/>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Express Shipping</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">2-3 business days - {priceFmt(15.00)}</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <Button size="lg" className="mt-6" onClick={() => setStep(2)} disabled={!isShippingValid}>
                    Continue to Payment
                  </Button>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">Payment Details</h2>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input name="cardNumber" placeholder="Card Number" className="sm:col-span-2" value={paymentInfo.cardNumber} onChange={handlePaymentChange} />
                    <Input name="nameOnCard" placeholder="Name on Card" className="sm:col-span-2" value={paymentInfo.nameOnCard} onChange={handlePaymentChange} />
                    <Input name="expiry" placeholder="Expiration Date (MM/YY)" value={paymentInfo.expiry} onChange={handlePaymentChange} />
                    <Input name="cvc" placeholder="CVC" value={paymentInfo.cvc} onChange={handlePaymentChange} />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="mt-6" onClick={() => setStep(1)}>
                      Back to Shipping
                    </Button>
                    <Button size="lg" className="mt-6" onClick={() => setStep(3)} disabled={!isPaymentValid}>
                      Review Order
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">Review Your Order</h2>
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="border p-4 rounded-md dark:border-slate-700">
                      <h3 className="font-medium dark:text-white">Shipping to:</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br/>
                        {shippingInfo.address}<br/>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                      </p>
                    </div>
                    <div className="border p-4 rounded-md dark:border-slate-700">
                      <h3 className="font-medium dark:text-white">Payment Method:</h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {paymentInfo.nameOnCard} - Card ending in {paymentInfo.cardNumber.slice(-4)}
                      </p>
                    </div>
                    <div className="border p-4 rounded-md dark:border-slate-700">
                      <h3 className="font-medium dark:text-white">Items:</h3>
                      <ul className="mt-2 space-y-4">
                        {cart.map((item) => (
                          <li key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 flex-shrink-0 relative rounded-md overflow-hidden">
                              <Image src={item.image} alt={item.title} fill className="object-cover"/>
                            </div>
                            <div>
                              <p className="font-medium dark:text-white">{item.title}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                              <p className="text-sm font-medium dark:text-white">{priceFmt(item.price * item.quantity)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                      Back to Payment
                    </Button>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handlePlaceOrder}>
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden lg:block rounded-lg border bg-white p-6 shadow-sm lg:col-span-1 h-fit dark:bg-slate-950 dark:border-slate-800">
              <CartSummary 
                subtotal={subtotal}
                shipping={shippingCost}
                taxes={taxes}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showLeaveConfirm} onOpenChange={setShowLeaveConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Checkout?</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave the checkout process? Your progress will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelLeave}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmLeave}>
              Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthGuard>
  );
};

export default CheckoutPage;
