import Image from "next/image";

const AllPromptsCard = ({ prompt }) => {
  const {
    title,
    description,
    category,
    aiTool,
    difficulty,
    thumbnail,
    copyCount,
    rating,
  } = prompt;

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800/60 bg-neutral-900/60 shadow-xl shadow-black/20 backdrop-blur-sm transition hover:border-neutral-700">

      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-transparent" />
      </div>

      <div className="space-y-3 p-4">
        <h2 className="line-clamp-1 text-lg font-bold text-white">
          {title}
        </h2>

        <p className="line-clamp-2 text-sm text-neutral-400">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-lime-300/10 px-3 py-1 text-xs text-lime-200">
            {category}
          </span>

          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
            {aiTool}
          </span>

          <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
            {difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-800 pt-3">
          <div>
            <p className="text-sm text-neutral-300">
              ⭐ {rating}
            </p>

            <p className="text-xs text-neutral-500">
              {copyCount} Copies
            </p>
          </div>

          <button className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-lime-300 hover:text-lime-200">
            View Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPromptsCard;
