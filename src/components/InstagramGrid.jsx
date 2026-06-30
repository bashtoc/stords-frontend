import React from "react";

export default function InstagramGrid() {
    const posts = [
        { image: "/hydragrow_bottle.png", alt: "HydraGrow luxury bottle on cream surface" },
        { image: "/hair_model.png", alt: "Healthy hydrated coils" },
        { image: "/ingredients_hero.png", alt: "Raw Batana and rosemary flat lay" },
        { image: "/hair_model.png", alt: "Close up definition of natural curls" },
        { image: "/hydragrow_bottle.png", alt: "Applying dropper drops of hair oil" },
        { image: "/ingredients_hero.png", alt: "Aesthetic skincare vanity setup" },
    ];
    return (<section className="bg-[#FCFBF8] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center justify-center gap-1.5">
            <svg className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            Social Presence
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl mt-2">
            Share Your Journey
          </h2>
          <p className="mt-4 font-sans text-sm text-[#1D1D1D]/60">
            Follow us on Instagram <a href="#" className="font-bold text-primary hover:underline">@stords.haircare</a> for styling tips, community transformations, and brand updates.
          </p>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, idx) => (<a key={idx} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl bg-accent border border-[#E5DCD3]/30">
              <img src={post.image} alt={post.alt} className="w-full h-full object-cover" className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg className="h-6 w-6 mx-auto fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span className="text-[10px] font-bold tracking-wider uppercase block mt-2">
                    View Post
                  </span>
                </div>
              </div>
            </a>))}
        </div>

      </div>
    </section>);
}
