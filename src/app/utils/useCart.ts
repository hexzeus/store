import { useState, useEffect } from 'react';

interface CartItem {
    id: string;
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

    const addToCart = (productId: string) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const existingItem = updatedCart.find((item) => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                updatedCart.push({ id: productId, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    return { cart, addToCart };
};