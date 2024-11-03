'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { fetchJourneyItems } from '../../../services/firebaseService';

export default function JourneyPage() {
  const [journeyItems, setJourneyItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchJourneyItems();
      const sortedData = data.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      setJourneyItems(sortedData);
    }
    getData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1 
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Journey
      </motion.h1>

      <div className="space-y-12">
        {journeyItems.map((yearData, yearIndex) => (
          <div key={yearData.year} className="relative">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-24 pt-1 relative">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                  {yearData.year}
                </div>
                <div className="absolute top-8 bottom-0 left-1/2 w-px bg-gray-300 -translate-x-1/2" />
              </div>
              <div className="flex-grow space-y-6">
                {yearData.items.map((item, itemIndex) => (
                  <motion.div
                    key={`${yearData.year}-${itemIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (yearIndex * yearData.items.length + itemIndex) * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                      <div className="flex flex-col gap-4">
                        {item.imageUrl && (
                            <div className="relative w-full hidden sm:block" style={{ height: '32rem' }}>
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                layout="fill"
                                className="object-cover rounded-lg"
                                priority={yearIndex === 0 && itemIndex < 2}
                            />
                            </div>
                        )}
                        <div className="w-full">
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                            </p>
                        </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}