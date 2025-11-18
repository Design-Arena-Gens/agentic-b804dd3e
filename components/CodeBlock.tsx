"use client";
import { useState } from 'react';
import clsx from 'classnames';

type CodeBlockProps = {
  code: string;
  language?: 'tsx' | 'css' | 'js' | 'html';
  title?: string;
};

export default function CodeBlock({ code, language = 'tsx', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="code">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs text-slate-300/80">{title ?? language.toUpperCase()}</div>
        <button
          className={clsx('btn px-2 py-1 text-xs', copied && 'bg-emerald-600/40 border-emerald-500/40')}
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="whitespace-pre-wrap leading-5 text-slate-200/90"><code>{code}</code></pre>
    </div>
  );
}
