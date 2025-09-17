import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartItem } from './cart-item';
import * as hooks from '@/lib/store/hooks';
import { updateCartQuantity, removeFromCart, saveForLater } from '@/lib/store/slices/cartSlice';
import { CartItem as CartItemType } from '@/lib/types';

// Mock the Redux hooks
const mockDispatch = jest.fn();
jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch);

// Mock Next.js components
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

const mockItem: CartItemType = {
  cartItemId: '1',
  id: 'prod1',
  title: 'Test Product',
  price: 100,
  quantity: 2,
  image: '/test-image.jpg',
  options: {
    Color: '#ff0000',
    Size: 'M',
  },
};

describe('CartItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders item details correctly', () => {
    render(<CartItem item={mockItem} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument(); // price * quantity
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByText(/Color:/)).toBeInTheDocument();
    expect(screen.getByText(/Size: M/)).toBeInTheDocument();
  });

  it('calls updateCartQuantity when quantity buttons are clicked', () => {
    render(<CartItem item={mockItem} />);

    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(mockDispatch).toHaveBeenCalledWith(updateCartQuantity({ cartItemId: '1', newQuantity: 1 }));

    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(mockDispatch).toHaveBeenCalledWith(updateCartQuantity({ cartItemId: '1', newQuantity: 3 }));
  });

  it('calls saveForLater when "Save for Later" is clicked', () => {
    render(<CartItem item={mockItem} />);

    fireEvent.click(screen.getByText('Save for Later'));
    expect(mockDispatch).toHaveBeenCalledWith(saveForLater('1'));
  });

  it('calls removeFromCart when "Remove" is clicked', () => {
    render(<CartItem item={mockItem} />);

    fireEvent.click(screen.getByText('Remove'));
    expect(mockDispatch).toHaveBeenCalledWith(removeFromCart('1'));
  });

  describe('OptionDisplay', () => {
    it('renders a color swatch for a color option', () => {
      render(<CartItem item={mockItem} />);
      const colorSwatch = screen.getByTitle('#ff0000');
      expect(colorSwatch).toBeInTheDocument();
      expect(colorSwatch).toHaveStyle('backgroundColor: #ff0000');
    });

    it('renders text for a non-color option', () => {
      render(<CartItem item={mockItem} />);
      expect(screen.getByText(/Size: M/)).toBeInTheDocument();
    });
  });
});