import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUS";
import AllPromptsSection from "@/components/AllPromptsSection";

export default async function Home() {
  const res = await fetch('http://localhost:5000/all-promts');
  const prompts = await res.json();

  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <AllPromptsSection prompts={prompts} />
    </>
  );
}
