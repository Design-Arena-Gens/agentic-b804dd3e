"use client";
import { useMemo, useState } from 'react';
import { ANIMATIONS } from '@/lib/animations';
import CodeBlock from './CodeBlock';
import clsx from 'classnames';

export default function AnimationExplorer() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(ANIMATIONS[0].id);
  const selected = useMemo(() => ANIMATIONS.find(a => a.id === selectedId)!, [selectedId]);

  const filtered = useMemo(() =>
    ANIMATIONS.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.tags.some(t => t.includes(query.toLowerCase())))
  , [query]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
      <aside className="card p-4 max-h-[70vh] overflow-auto">
        <div className="flex items-center gap-2 mb-3">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 ring-brand-500/50"
            placeholder="Search animations..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
        </div>
        <ul className="space-y-1">
          {filtered.map(a => (
            <li key={a.id}>
              <button
                className={clsx('w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent', selectedId===a.id && 'bg-white/10 border-white/10')}
                onClick={()=>setSelectedId(a.id)}
              >
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-slate-300/70">{a.description}</div>
                <div className="mt-1 flex gap-1 flex-wrap">
                  {a.tags.map(t=> <span key={t} className="badge">{t}</span>)}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="space-y-4">
        <section className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{selected.title}</h2>
              <p className="text-sm text-slate-300/80">{selected.description}</p>
            </div>
          </div>
          <div className="bg-black/20 rounded-lg border border-white/10 p-6">
            <selected.Demo />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <CodeBlock title="React" language="tsx" code={selected.code.react} />
          {selected.code.css && <CodeBlock title="CSS" language="css" code={selected.code.css} />}
        </section>

        <section className="card p-4">
          <h3 className="font-medium mb-3">Style details</h3>
          <ul className="container-prose list-disc pl-5 space-y-1">
            <li><b>Easing</b>: easeInOut, spring(bounce), custom cubic-bezier for nuanced motion.</li>
            <li><b>Timing</b>: duration for temporal feel; short (150?250ms) for UI, longer for page.</li>
            <li><b>Physics</b>: stiffness/damping/bounce model natural acceleration and settling.</li>
            <li><b>Dimensionality</b>: combine opacity with position/scale; add perspective for 3D depth.</li>
            <li><b>Stagger</b>: 30?80ms per item for list choreography; avoid synchronous onslaught.</li>
            <li><b>Focus</b>: keep motion subtle; reduce distance, increase blur for background elements.</li>
            <li><b>Accessibility</b>: honor prefers-reduced-motion; avoid continuous motion when possible.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
