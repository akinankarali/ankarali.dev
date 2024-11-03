'use client'

import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderTopColor: '#c26ddf',
        }}
      />
    </div>
  )
}