export function LiquidBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[#EAF1FA] dark:bg-[#050C1B] transition-colors duration-500"
    >
      {/* Subtle architectural base gradient */}
      <div
        className="absolute inset-0 opacity-90 dark:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 18% 12%, rgba(56, 189, 248, 0.22), transparent 48%), radial-gradient(circle at 84% 22%, rgba(99, 102, 241, 0.22), transparent 50%), radial-gradient(circle at 52% 88%, rgba(20, 184, 166, 0.18), transparent 54%)',
        }}
      />

      {/* Smooth GPU-composited radial liquid light orbs (no heavy software blur filter) */}
      <div
        className="animate-liquid-a absolute -top-36 -left-28 h-[560px] w-[560px] rounded-full opacity-60 dark:opacity-45 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.42) 0%, rgba(37, 99, 235, 0.16) 42%, transparent 70%)',
        }}
      />
      <div
        className="animate-liquid-b absolute top-1/4 -right-32 h-[600px] w-[600px] rounded-full opacity-55 dark:opacity-40 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(129, 140, 248, 0.4) 0%, rgba(14, 165, 233, 0.14) 44%, transparent 72%)',
        }}
      />
      <div
        className="animate-liquid-a absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-50 dark:opacity-35 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(45, 212, 191, 0.36) 0%, rgba(59, 130, 246, 0.1) 46%, transparent 70%)',
        }}
      />
    </div>
  );
}
