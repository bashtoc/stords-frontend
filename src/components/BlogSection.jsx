"use client";
import React from "react";
import { Link } from "react-router-dom";

import { ArrowRight, BookOpen } from "lucide-react";
import { usePosts } from "@/lib/queries";
// Fallback static posts shown while loading or if backend is offline
const FALLBACK_POSTS = [
    {
        id: "benefits-of-batana-oil",
        slug: "benefits-of-batana-oil",
        title: "The Science & Sourcing of Batana Oil",
        excerpt: "Discover why Honduran forest communities have relied on this rare kernel extract for centuries to protect and grow healthy, shiny hair.",
        image: "/ingredients_hero.png",
        date: "June 24, 2026",
        author: "STORDS Editorial",
    },
    {
        id: "prevent-hair-breakage",
        slug: "prevent-hair-breakage",
        title: "5 Proven Rules to Stop Hair Breakage",
        excerpt: "Are you losing length to split ends and styling damage? Learn mechanical and hydration adjustments to increase tensile strength.",
        image: "/hair_model.png",
        date: "June 18, 2026",
        author: "STORDS Editorial",
    },
    {
        id: "moisture-vs-growth",
        slug: "moisture-vs-growth",
        title: "Hair Moisture vs. Hair Growth: Explained",
        excerpt: "Many search for growth serums when the real challenge is moisture retention. We break down the differences and key routines.",
        image: "/hairmoisture.png",
        date: "June 10, 2026",
        author: "STORDS Editorial",
    },
];
export default function BlogSection() {
    const { data: posts, isLoading, isError } = usePosts();
    // Use API data if available, otherwise fall back to static data
    const displayPosts = isLoading || isError || !posts?.length ? FALLBACK_POSTS : posts;
    return (<section className="bg-[#F7F2EB]/50 py-20 lg:py-28" id="blog">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">

        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5"/>
              The STORDS Journal
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl mt-2">
              Haircare Education & Guides
            </h2>
          </div>
          <Link to="/blog" className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors">
            View All Articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
          </Link>
        </div>

        {/* Loading skeleton */}
        {isLoading && (<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (<div key={i} className="rounded-2xl border border-[#E5DCD3]/40 bg-[#FCFBF8] overflow-hidden animate-pulse">
                <div className="h-48 bg-[#E5DCD3]/50"/>
                <div className="p-6 space-y-3">
                  <div className="h-3 w-1/3 rounded bg-[#E5DCD3]/70"/>
                  <div className="h-5 rounded bg-[#E5DCD3]/70"/>
                  <div className="h-3 w-5/6 rounded bg-[#E5DCD3]/50"/>
                </div>
              </div>))}
          </div>)}

        {/* Posts Grid */}
        {!isLoading && (<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayPosts.map((post) => (<article key={post.id} className="group rounded-2xl border border-[#E5DCD3]/40 bg-[#FCFBF8] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div>
                  {/* Image header */}
                  <div className="relative h-48 w-full overflow-hidden bg-accent">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" className="object-cover group-hover:scale-105 transition-transform duration-700"/>
                    <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                      {post.author}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] text-[#1D1D1D]/50 font-medium">
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-primary group-hover:text-primary-light transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-sans text-xs text-[#1D1D1D]/65 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Action footer */}
                <div className="px-6 pb-6 pt-2">
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-light">
                    Read Article
                    <ArrowRight className="h-3 w-3"/>
                  </Link>
                </div>
              </article>))}
          </div>)}

      </div>
    </section>);
}
