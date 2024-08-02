// src/app/hooks/useCart.ts

import { useState, useEffect } from 'react';

export interface CartItem {
    id: number;
    variantId: number;
    name: string;
    price: string;
    image: string;
    quantity: number;
}

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const existingItem = updatedCart.find((cartItem) => cartItem.variantId === item.variantId);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                updatedCart.push(item);
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (variantId: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.variantId !== variantId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const updateQuantity = (variantId: number, quantity: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item =>
                item.variantId === variantId ? { ...item, quantity } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};