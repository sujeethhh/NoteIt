
'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type:'spring', stiffness: 200, damping: 20 }}

    
    >
      {children}
    </motion.div>
  );
}
