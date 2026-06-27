import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUS";
import AllPromptsSection from "@/components/AllPromptsSection";
import TopCreators from "@/components/TopCreators";
import CustomerReviewsSection from "@/components/CustomerReviews";
import PlatformStats from "@/components/Stats";
import FaqSection from "@/components/FAQ";
import { fetchPrompts } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function Home() {

  const prompts = await fetchPrompts();

  // Aggregate prompts by creator to compute top creators
  const creatorMap = {};
  let totalCopiesSum = 0;
  const categorySet = new Set();

  for (const prompt of prompts) {
    const key = prompt.creatorEmail;
    if (!creatorMap[key]) {
      creatorMap[key] = {
        name: prompt.creatorName,
        email: prompt.creatorEmail,
        promptCount: 0,
        totalCopies: 0,
        totalRating: 0,
      };
    }
    creatorMap[key].promptCount += 1;
    creatorMap[key].totalCopies += prompt.copyCount || 0;
    creatorMap[key].totalRating += prompt.rating || 0;

    totalCopiesSum += prompt.copyCount || 0;
    if (prompt.category) categorySet.add(prompt.category);
  }

  const creators = Object.values(creatorMap).map((c) => ({
    ...c,
    avgRating: c.totalRating / c.promptCount,
  }));

  // Sort by score: promptCount * avgRating + totalCopies
  creators.sort((a, b) => {
    const scoreA = a.promptCount * a.avgRating + a.totalCopies;
    const scoreB = b.promptCount * b.avgRating + b.totalCopies;
    return scoreB - scoreA;
  });

  // Compute platform stats
  const stats = {
    totalPrompts: prompts.length,
    totalCreators: Object.keys(creatorMap).length,
    totalCategories: categorySet.size,
    totalCopies: totalCopiesSum,
  };

  return (
    <>
      <HeroSection />
      <AllPromptsSection prompts={prompts} />
      <PlatformStats stats={stats} />
      <WhyChooseUs />
      <TopCreators creators={creators} />
      <CustomerReviewsSection />
      <FaqSection />
    </>
  );
}
