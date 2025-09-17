'use client';

import React, { useState, useMemo } from 'react';
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
      status: 'Pending'
    };
    
    const newOrderId = dispatch(placeOrder(orderDetails));
    if (newOrderId) {
      router.push('/order-confirmation');
    }
  };

  return (
    <AuthGuard>
      <div className="bg-slate-50 min-h-[70vh] dark:bg-slate-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">Checkout</h1>
          <CheckoutSteps currentStep={step} />
          
          <div className="mt-8 grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 rounded-lg border bg-white p-6 shadow-sm dark:bg-slate-950 dark:border-slate-800">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">Shipping Information</h2>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      name="firstName" 
                      placeholder="First Name" 
                      value={shippingInfo.firstName} 
                      onChange={handleShippingChange} 
                    />
                    <Input 
                      name="lastName" 
                      placeholder="Last Name" 
                      value={shippingInfo.lastName} 
                      onChange={handleShippingChange} 
                    />
                    <Input 
                      name="address" 
                      placeholder="Address" 
                      className="sm:col-span-2" 
                      value={shippingInfo.address} 
                      onChange={handleShippingChange} 
                    />
                    <Input 
                      name="city" 
                      placeholder="City" 
                      value={shippingInfo.city} 
                      onChange={handleShippingChange} 
                    />
                    <Input 
                      name="state" 
                      placeholder="State" 
                      value={shippingInfo.state} 
                      onChange={handleShippingChange} 
                    />
                    <Input 
                      name="zip" 
                      placeholder="Zip Code" 
                      value={shippingInfo.zip} 
                      onChange={handleShippingChange} 
                    />
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium dark:text-white mb-2">Shipping Method</h3>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg bg-slate-100 dark:bg-slate-800 dark:border-slate-700">
                        <input 
                          type="radio" 
                          name="shipping" 
                          value="standard" 
                          checked={shippingMethod === 'standard'} 
                          onChange={() => setShippingMethod('standard')} 
                          className="form-radio h-4 w-4 text-slate-900 dark:text-slate-50"
                        />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Standard Shipping</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">5-7 business days - {priceFmt(5.00)}</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-lg bg-slate-100 dark:bg-slate-800 dark:border-slate-700">
                        <input 
                          type="radio" 
                          name="shipping" 
                          value="express" 
                          checked={shippingMethod === 'express'} 
                          onChange={() => setShippingMethod('express')} 
                          className="form-radio h-4 w-4 text-slate-900 dark:text-slate-50"
                        />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Express Shipping</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">2-3 business days - {priceFmt(15.00)}</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="mt-6" 
                    onClick={() => setStep(2)} 
                    disabled={!isShippingValid}
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">Payment Details</h2>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input 
                      name="cardNumber" 
                      placeholder="Card Number" 
                      className="sm:col-span-2" 
                      value={paymentInfo.cardNumber} 
                      onChange={handlePaymentChange} 
                    />
                    <Input 
                      name="nameOnCard" 
                      placeholder="Name on Card" 
                      className="sm:col-span-2" 
                      value={paymentInfo.nameOnCard} 
                      onChange={handlePaymentChange} 
                    />
                    <Input 
                      name="expiry" 
                      placeholder="Expiration Date (MM/YY)" 
                      value={paymentInfo.expiry} 
                      onChange={handlePaymentChange} 
                    />
                    <Input 
                      name="cvc" 
                      placeholder="CVC" 
                      value={paymentInfo.cvc} 
                      onChange={handlePaymentChange} 
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="mt-6" onClick={() => setStep(1)}>
                      Back to Shipping
                    </Button>
                    <Button 
                      size="lg" 
                      className="mt-6" 
                      onClick={() => setStep(3)} 
                      disabled={!isPaymentValid}
                    >
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
                    <Button 
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700" 
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="rounded-lg border bg-white p-6 shadow-sm lg:col-span-1 h-fit dark:bg-slate-950 dark:border-slate-800">
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
    </AuthGuard>
  );
};

export default CheckoutPage;