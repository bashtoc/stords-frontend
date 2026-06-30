"use client";
import React, { use } from "react";

import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blogData";
import { usePost } from "@/lib/queries";
export default function BlogPostDetailPage({ params }) {
    const { id } = use(params);
    const { data: backendPost, isLoading } = usePost(id);
    const fallbackPost = BLOG_POSTS.find((p) => p.id === id || p.slug === id);
    const post = backendPost || fallbackPost;
    if (isLoading && !post) {
        return (<div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8">
        <p className="text-sm text-[#1D1D1D]/55">Loading article...</p>
      </div>);
    }
    if (!post) {
        return (<div className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-8">
        <h1 className="font-serif text-2xl font-bold text-primary">Article Not Found</h1>
        <p className="mt-2 text-sm text-[#1D1D1D]/60">The requested article could not be found.</p>
        <Link to="/blog" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-white">
          Back to Blog
        </Link>
      </div>);
    }
    // Custom detailed body text based on post ID
    const renderContent = () => {
        if (backendPost?.body?.length) {
            return backendPost.body.map((block, index) => {
                if (block.type === "heading") {
                    return <h2 key={index}>{block.text}</h2>;
                }
                if (block.type === "quote") {
                    return <blockquote key={index}>{block.text}</blockquote>;
                }
                return <p key={index}>{block.text}</p>;
            });
        }
        if (post.id === "benefits-of-batana-oil") {
            return (<>
          <p>
            For generations, the indigenous Tawira (literally meaning <em>&quot;people of beautiful hair&quot;</em>) of Honduras have been celebrated for their thick, healthy, and exceptionally long locks. Their secret? <strong>Batana Oil</strong>.
          </p>
          <h2>What is Batana Oil?</h2>
          <p>
            Extracted from the nut of the American palm tree (<em>Elaeis oleifera</em>), Batana Oil is a dense, yellow-brown butter-like oil. The extraction process is traditionally labor-intensive: palm nuts are wild-harvested, boiled to crack open the shells, and then boiled again to extract the pure oil concentrate.
          </p>
          <blockquote>
            &quot;The lipids in Batana Oil closely mimic the natural fatty acids found in human hair, allowing it to penetrate the hair shaft instead of sitting on top of it.&quot;
          </blockquote>
          <h2>The Chemical Makeup</h2>
          <p>
            Unlike mineral oils that coat the hair and block moisture, Batana Oil is rich in essential nutrients:
          </p>
          <ul>
            <li><strong>Oleic Acid (Omega-9):</strong> Restores softness and conditions rough cuticles.</li>
            <li><strong>Linoleic Acid (Omega-6):</strong> Nourishes the scalp, alleviating dry, flaky patches.</li>
            <li><strong>Natural Phytosterols:</strong> Minimizes oxidative stress to protect structural proteins.</li>
          </ul>
          <h2>How to Incorporate it</h2>
          <p>
            To reap the benefits, apply a small amount directly to your scalp and massage in circular motions to stimulate blood circulation. Run any excess oil through to the tips to seal in moisture after your standard washing and conditioning routine.
          </p>
        </>);
        }
        if (post.id === "prevent-hair-breakage") {
            return (<>
          <p>
            Hair breakage is one of the most common obstacles to retaining length. If your hair is shedding small, snapped fibers instead of full strands from the root, you are experiencing breakage.
          </p>
          <h2>Rule 1: Hydrate First, Seal Second</h2>
          <p>
            A common mistake is applying oil to dry hair hoping to hydrate it. <strong>Oil does not contain water.</strong> To hydrate your hair, you must apply water-based products (such as a hydrating mist or leave-in conditioner) first, then follow up with a premium oil blend like STORDS HydraGrow to lock that water inside.
          </p>
          <h2>Rule 2: Detangle from Tips to Roots</h2>
          <p>
            Never start combing from the scalp down. This pushes tangles together, causing structural snapping. Section your hair, apply a slip-enhancing mist, and gently comb starting at the tips, working your way upward.
          </p>
          <h2>Rule 3: Protect Curls Overnight</h2>
          <p>
            Standard cotton pillowcases absorb hair oils and create friction as you move. Switch to a double-lined Mulberry Satin sleep bonnet or silk pillowcase to keep your curls protected and retain moisture.
          </p>
          <h2>Rule 4: Avoid Scalp Sulfates</h2>
          <p>
            Sulfates strip the scalp of its natural sebum, leaving hair dry and brittle. Choose clean, sulfate-free formulations to keep the cuticle supple.
          </p>
        </>);
        }
        // Default science of moisture vs growth
        return (<>
        <p>
          Many search for hair growth serums, hoping for a magical formula. However, hair growth happens internally at the scalp level. The real bottleneck for most textures is <strong>length retention</strong>, which is achieved through proper moisture.
        </p>
        <h2>Moisture vs. Growth</h2>
        <p>
          <strong>Hair Growth:</strong> Refers to the cellular activity inside the hair follicle beneath the skin. This is guided by genetics, blood circulation, and overall body nutrition.
        </p>
        <p>
          <strong>Hair Moisture:</strong> Refers to the water levels inside the dead keratin structure (the hair shaft) protruding from your scalp. Without water, keratin becomes brittle and snaps easily.
        </p>
        <h2>The Role of Scalp Stimulation</h2>
        <p>
          To support growth, you must nourish the scalp skin. Sourcing ingredients like <strong>Rosemary Extract</strong> helps stimulate micro-circulation at the hair roots, ensuring follicles receive vital nutrients from the blood.
        </p>
        <h2>The Role of Sealing</h2>
        <p>
          Once the strand grows, you must protect it from drying out. A moisture sealer like Castor and Jojoba oil creates a hydrophobic barrier, preventing water evaporation. This prevents split ends, allowing you to retain every centimeter of growth.
        </p>
      </>);
    };
    return (<article className="mx-auto max-w-4xl px-6 py-12 sm:px-8">
      {/* Back button */}
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/60 hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4"/>
        Back to Blog Index
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <span className="inline-block rounded-full bg-[#F7F2EB] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
          {post.category}
        </span>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-4 items-center text-xs text-[#1D1D1D]/50 font-semibold pt-2 border-b border-[#E5DCD3]/30 pb-6">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4"/>
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4"/>
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden rounded-3xl mt-8 bg-accent border border-[#E5DCD3]/35">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" className="object-cover"/>
      </div>

      {/* Article Content body */}
      <div className="prose prose-neutral max-w-none mt-12 font-sans text-sm md:text-base text-[#1D1D1D]/85 leading-relaxed space-y-6">
        {renderContent()}
      </div>
    </article>);
}
