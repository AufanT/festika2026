export default function RootLoading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0F2A36 0%, #1A3A4D 50%, #0F2A36 100%)" }}
    >
      <div className="animate-fade-pulse flex items-center">
        <span className="font-[family-name:var(--font-space-grotesk)] text-6xl md:text-7xl font-extrabold tracking-tighter text-festika-peach">
          FEST
        </span>
        <span className="bg-festika-peach text-festika-teal px-3 md:px-4 py-1 ml-2 md:ml-3 font-[family-name:var(--font-space-grotesk)] text-6xl md:text-7xl font-extrabold tracking-tighter inline-flex items-center justify-center">
          IKA
        </span>
      </div>
    </div>
  );
}
