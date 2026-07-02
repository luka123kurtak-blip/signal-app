export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
        connected ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300",
      ].join(" ")}
    >
      <span
        className={[
          "h-2 w-2 rounded-full",
          connected ? "bg-emerald-400" : "animate-pulse bg-amber-400",
        ].join(" ")}
      />
      {connected ? "Підключено" : "Підключення…"}
    </div>
  );
}
