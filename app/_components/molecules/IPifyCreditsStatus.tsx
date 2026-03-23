type IPifyCreditsStatusProps = {
  hasCredits: boolean;
};

export function IPifyCreditsStatus({ hasCredits }: IPifyCreditsStatusProps) {
  return (
    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 text-xs text-white">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          hasCredits ? "bg-emerald-400" : "bg-red-400"
        }`}
        aria-hidden
      />
      {hasCredits
        ? "IPify credits available"
        : "IPify credits exhausted"}
    </p>
  );
}

