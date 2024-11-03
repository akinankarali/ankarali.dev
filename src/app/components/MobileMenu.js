'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, ScrollText, Map, Layers, Briefcase, Bookmark, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ScrollText, label: "Writing", href: "/writing" },
  { icon: Map, label: "Journey", href: "/journey" },
  { icon: Layers, label: "Stack", href: "/stacks" },
  { icon: Briefcase, label: "Workspace", href: "/workspace" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
]

const socialItems = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 left-0 w-64 h-full bg-background shadow-lg z-50 p-6 overflow-y-auto"
          >
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-2">Saim Akın Ankaralı</h2>
              <p className="text-muted-foreground mb-6">Frontend Developer</p>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-sm font-medium mb-4">Online</h3>
                <div className="space-y-2">
                  {socialItems.map((social) => (
                    <Link
                      key={social.href}
                      href={social.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                    >
                      <social.icon className="h-4 w-4" />
                      {social.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}