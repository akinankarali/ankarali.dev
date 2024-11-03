'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollText, Home, Map, Layers, Bookmark, ExternalLink, Github, Linkedin, Twitter, FileText } from "lucide-react"
import { fetchWritings } from "../../services/firebaseService";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import Loader from "./components/Loader"

export default function Component() {
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const writingsData = await fetchWritings();
      setWritings(writingsData);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    
    <div className="flex min-h-screen bg-background">
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 border-r min-h-screen p-6 hidden md:block backdrop-blur-sm bg-background/80 fixed"
      >
        <div className="mb-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold mb-2"
          >
            Saim Akın Ankaralı
          </motion.h2>
          <p className="text-muted-foreground">Frontend Developer</p>
        </div>

        <nav className="space-y-2">
          {[
            { icon: Home, label: "Home", href: "/" },
            { icon: ScrollText, label: "Writing", href: "/writing" },
            { icon: Map, label: "Journey", href: "/journey" },
            { icon: Layers, label: "Stack", href: "/stacks" },
            { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t">
          <h3 className="text-sm font-medium mb-4">Online</h3>
          <div className="space-y-2">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/akinankarali" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/akinankarali/" },
              { icon: Twitter, label: "Twitter", href: "https://x.com/akinankarali" },
              { icon: FileText, label: "Medium", href: "https://medium.com/@saimakinankarali" },
            ].map((social, index) => (
              <motion.div
                key={social.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                <Link
                  href={social.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                >
                  <social.icon className="h-4 w-4" />
                  {social.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 p-6 md:ml-64">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              Hi 👋 I&#39;m{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                Akın
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
            I&#39;m a Frontend Developer crafting engaging user interfaces with Vue.js, Nuxt.js, React, Next.js and JavaScript. Passionate about improving user experiences, I’m highly collaborative and always eager to learn new technologies.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Writing</h2>
            {loading ? (
             <div className="flex items-center justify-center h-24">
              <Loader />
             </div>
            ) : (
              <div className="space-y-4">
                {writings.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/writing/${post.slug}`}>
                      <Card className="hover:bg-accent/50 transition-colors">
                        <CardContent className="flex justify-between items-center py-4">
                          <div className="flex gap-4 items-center">
                            <span className="text-sm text-muted-foreground min-w-24">
                              {new Date(post.date).toLocaleDateString("tr-TR", {
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </span>
                            <span className="hover:text-primary">{post.title}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "example-ci-cd-docker",
                  description: "CI/CD pipeline with Docker",
                  tech: ["React", "Next.js"],
                  link: "https://github.com/akinankarali/example-ci-cd-docker",
                },
                {
                  title: "currency-convert-angular",
                  description: "Currency converter with Angular for learning purposes",
                  tech: ["Angular", "Typescript", "SCSS"],
                  link: "https://github.com/akinankarali/currency-convert-angular",
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <Card className="h-full hover:bg-accent/50 transition-colors">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">
                        <Link href={project.link} target="_blank" className="flex items-center gap-2 hover:text-primary">
                          {project.title}
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-primary/10 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}