'use client';

import React from 'react';
import { CartProvider } from '../../../../context/CartProvider';

const TiendaLayout = ({ children }) => {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    );
};

export default TiendaLayout;
