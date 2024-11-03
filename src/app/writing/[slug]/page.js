'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchWritings } from '../../../../services/firebaseService'
import Loader from '../../components/Loader'
import Image from 'next/image'
import DOMPurify from 'dompurify'

export default function PostPage({ params }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { slug } = params

  useEffect(() => {
    async function getData() {
      setLoading(true)
      try {
        const posts = await fetchWritings()
        const matchedPost = posts.find((post) => post.slug === slug)
        setPost(matchedPost)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
      setLoading(false)
    }
    getData()
  }, [slug])

  if (loading) {
    return <Loader />
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Content not found</h1>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {post.title}
      </motion.h1>
      
      {post.imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            width={800} 
            height={400} 
            priority
            className="w-full h-auto rounded-lg object-cover max-h-96"
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} 
            className="leading-relaxed"
          />
        </article>
      </motion.div>
    </div>
  )
}

function sanitizeHtml(html) {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'code', 'pre', 'blockquote', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    })
}