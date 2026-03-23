type IPifyCreditsStatusProps = {
  status: "ok" | "warning" | "stopped" | "unknown";
};

export function IPifyCreditsStatus({ status }: IPifyCreditsStatusProps) {
  const dotColorClass =
    status === "ok"
      ? "bg-emerald-400"
      : status === "warning"
        ? "bg-orange-400"
        : "bg-red-400";

  const text =
    status === "ok"
      ? "IPify credits available"
      : status === "warning"
        ? "IPify credits available (Half of Ipify credits used)"
        : status === "stopped"
          ? "Sorry, Ipify api free credits are too low so we stopped the service"
          : "Unable to determine IPify credit status";

  return (
    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 text-xs text-white">
      <span className={`h-2.5 w-2.5 rounded-full ${dotColorClass}`} aria-hidden />
      {text}
    </p>
  );
}

