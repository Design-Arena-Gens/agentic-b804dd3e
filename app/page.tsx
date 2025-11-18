import AnimationExplorer from '@/components/AnimationExplorer';

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Animation Style Detail</h1>
        <p className="text-slate-300/80 mt-1">Interactive gallery of motion patterns with copyable code.</p>
      </header>
      <AnimationExplorer />
      <footer className="mt-10 text-xs text-slate-300/60">
        Built with Next.js, Tailwind, and Framer Motion.
      </footer>
    </div>
  );
}
