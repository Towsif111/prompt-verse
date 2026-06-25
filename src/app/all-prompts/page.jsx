
import AllPromptsSection from "@/components/AllPromptsSection";

export default async function PromptsPage() {
  const res = await fetch('http://localhost:5000/all-promts');
  console.log(res.statusText);
  const prompts = await res.json();

  return <AllPromptsSection prompts={prompts} />;
}