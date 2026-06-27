import AllPromptsPageContent from "@/components/AllPromptsPageContent";
import { fetchPrompts } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function PromptsPage() {
  const prompts = await fetchPrompts();

  return <AllPromptsPageContent prompts={prompts} />;
}
