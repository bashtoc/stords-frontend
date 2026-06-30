import React from "react";
import Hero from "@/components/Hero";
import HairProblems from "@/components/HairProblems";
import AboutBatana from "@/components/AboutBatana";
import Ingredients from "@/components/Ingredients";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BenefitsTimeline from "@/components/BenefitsTimeline";
import Testimonials from "@/components/Testimonials";
import FAQAccordion from "@/components/FAQAccordion";
import BlogSection from "@/components/BlogSection";
export default function Home() {
    return (<div className="w-full">
      <Hero />
      <HairProblems />
      <AboutBatana />
      <Ingredients />
      <BeforeAfterSlider />
      <BenefitsTimeline />
      <Testimonials />
      <FAQAccordion />
      <BlogSection />
    </div>);
}
