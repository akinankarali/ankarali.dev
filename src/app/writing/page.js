'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { fetchWritings } from "../../../services/firebaseService";
import { useState, useEffect } from "react";
import Image from 'next/image';
import Loader from '../components/Loader';

export default function WritingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const writingsData = await fetchWritings();
      setPosts(writingsData);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Writing
      </motion.h1>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <Link href={`/writing/${post.slug}`}>
              <Card className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-6">
                  {post.imageUrl && (
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title}
                      width={600}
                      height={400}
                      className="mb-4 rounded-lg object-cover"
                      style={{ maxHeight: "400px" }}
                      priority
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}