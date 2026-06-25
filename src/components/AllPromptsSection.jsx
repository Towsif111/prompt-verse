import AllPromptsCard from "./AllPromptsCard";

export default function AllPromptsSection({ prompts = [] }) {
  return (
    <section id="all-prompts" className="container-shell py-16">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">
          Explore
        </p>
        <h2 className="mt-2 text-4xl font-black">All Prompts</h2>
        <p className="mt-3 text-default-500">
          Browse our curated collection of AI prompts crafted by the community
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {prompts.map((prompt, index) => (
          <AllPromptsCard
            key={prompt._id}
            prompt={prompt}
            eagerImage={index < 3}
          />
        ))}
      </div>

      {prompts.length === 0 ? (
        <p className="text-center text-sm text-default-500">
          No prompts found.
        </p>
      ) : null}
    </section>
  );
}
