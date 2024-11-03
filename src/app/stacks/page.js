'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function StackPage() {
  const stackItems = [
    {
      category: "Frontend",
      technologies: ["Vue", "Nuxt.js", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook", "Jest"],
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      category: "DevOps",
      technologies: ["Docker", "Azure", "CI/CD", "Git"],
    },
    {
      category: "Tools",
      technologies: ["VS Code", "Figma", "Postman", "Notion", "Slack", "Jira"],
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Tech Stack
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2">
        {stackItems.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{item.category}</h2>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
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
    </div>
  )
}