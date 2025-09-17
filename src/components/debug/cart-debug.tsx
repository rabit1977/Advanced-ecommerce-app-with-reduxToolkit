'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { Button } from '@/components/ui/button';

const CartDebug = () => {
  const { cart, products, addToCart } = useApp();
  
  const addTestItem = () => {
    if (products.length > 0) {
      const testProduct = products[0];
      addToCart({
        id: testProduct.id,
        quantity: 1,
        title: testProduct.title,
        price: testProduct.price,
        options: {}
      });
    }
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 border rounded shadow-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Cart Debug</h3>
      <p>Items in cart: {cart.length}</p>
      <p>Products loaded: {products.length}</p>
      
      <div className="mt-2 space-y-2">
        <Button size="sm" onClick={addTestItem} className="w-full">
          Add Test Item
        </Button>
        <Button size="sm" variant="outline" onClick={clearCart} className="w-full">
          Clear Cart
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => console.log('Cart:', cart)} 
          className="w-full"
        >
          Log Cart to Console
        </Button>
      </div>
      
      {cart.length > 0 && (
        <div className="mt-2 text-xs">
          <p>Cart contents:</p>
          <ul>
            {cart.map(item => (
              <li key={item.cartItemId}>
                {item.title} x{item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { CartDebug };