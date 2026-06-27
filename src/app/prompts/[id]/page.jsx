import { notFound } from "next/navigation";
import PromptDetailClient from "./PromptDetailClient";
import { fetchPrompts } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function PromptDetailPage({ params }) {
  const { id } = await params;

  const prompts = await fetchPrompts();
  const prompt = prompts.find((p) => p._id === id);

  if (!prompt) return notFound();

  return <PromptDetailClient prompt={prompt} />;
}
