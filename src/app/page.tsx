
import Bespoke from "@/components/Bespoke";
import BespokeMaterialShowcase from "@/components/Bespokematerial";
import Blogs from "@/components/Blogs";
import Brand from "@/components/Brand";
import BrandIntro from "@/components/Brandintro";
import CTA from "@/components/CallToAction";

import Collections from "@/components/Collections";
import GallerySection from "@/components/GallerySection";
import Hero from "@/components/Hero";
import Milestones from "@/components/Milestones";
import Quote from "@/components/Quote";
import SocialProof from "@/components/SocialProof";
import WhyChooseHeaven from "@/components/WhyChooseHeaven";


export default function Home() {
  return (
    <main>
     
      <Hero />
     
      <Brand/>
      <GallerySection/>
      <Collections/>
      <Bespoke/>
      <WhyChooseHeaven/>
      {/* <BespokeMaterialShowcase/> */}
      <SocialProof/>
      <Quote/>
      <Milestones/>
      <Blogs/>
      <CTA/>
      {/* <Bespoke/> */}
    </main>
  );
}