"use client";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blogData";
import { usePosts } from "@/lib/queries";
export default function BlogIndexPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    // Fetch live data from backend; fall back to static if unavailable
    const { data: apiPosts } = usePosts();
    const displayPosts = apiPosts?.length
        ? apiPosts.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            category: p.category,
            readTime: p.readTime,
            image: p.image,
            date: p.date,
            author: p.author,
        }))
        : BLOG_POSTS;
    const categories = ["All", ...Array.from(new Set(displayPosts.map((p) => p.category)))];
    const filteredPosts = displayPosts.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    return (<div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      {/* Header */}
      <div className="border-b border-[#E5DCD3]/50 pb-8 text-center sm:text-left">
        <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center justify-center sm:justify-start gap-1.5">
          <BookOpen className="h-3.5 w-3.5"/>
          The STORDS Journal
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Botanical Haircare Education
        </h1>
        <p className="mt-2 text-sm text-[#1D1D1D]/60 max-w-xl">
          Articles, research, and styling tips from African heritage oil sourcing and science-based scalp care.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5DCD3]/30 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all ${activeCategory === cat
                ? "bg-primary text-white"
                : "bg-[#F7F2EB]/50 hover:bg-[#F7F2EB] text-primary"}`}>
              {cat}
            </button>))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-full border border-[#E5DCD3] bg-transparent pl-9 pr-4 py-2 text-xs font-semibold text-[#1D1D1D] focus:border-primary focus:outline-none"/>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1D1D1D]/40"/>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (<p className="text-center text-sm text-[#1D1D1D]/55 py-20">
          No articles match your search criteria.
        </p>) : (<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {filteredPosts.map((post) => (<article key={post.id} className="group rounded-2xl border border-[#E5DCD3]/40 bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-accent">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" className="object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-[#1D1D1D]/50 font-semibold">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-lg font-bold text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="font-sans text-xs text-[#1D1D1D]/65 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-light">
                  Read Full Article
                  <span className="text-[10px]">&rarr;</span>
                </Link>
              </div>
            </article>))}
        </div>)}
    </div>);
}
