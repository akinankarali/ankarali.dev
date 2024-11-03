'use client'

import { useState,useEffect } from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { fetchBookmarks } from "../../../services/firebaseService";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [currentCategory, setCurrentCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredBookmarks = bookmarks.flatMap(category => 
    category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (currentCategory === "All" || category.category === currentCategory)
    )
  )

  const totalPages = Math.ceil(filteredBookmarks.length / itemsPerPage)
  const paginatedBookmarks = filteredBookmarks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    async function getData() {
      const bookmarksData = await fetchBookmarks();
      setBookmarks(bookmarksData);
    }
    getData();
  }, []);

 
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Bookmarks
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={currentCategory === "All" ? "default" : "outline"}
            onClick={() => setCurrentCategory("All")}
          >
            All
          </Button>
          {bookmarks.map((category) => (
            <Button
              key={category.category}
              variant={currentCategory === category.category ? "default" : "outline"}
              onClick={() => setCurrentCategory(category.category)}
            >
              {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
            </Button>
          ))}
        </div>
      </motion.div>

      <Card>
        <CardContent className="p-6">
          {paginatedBookmarks.length > 0 ? (
            <ul className="space-y-2">
              {paginatedBookmarks.map((bookmark, index) => (
                <motion.li
                  key={bookmark.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-primary hover:underline"
                  >
                    <span>{bookmark.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              There is no bookmark with the specified name.
            </p>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}