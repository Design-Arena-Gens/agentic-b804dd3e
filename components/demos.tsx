"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import clsx from 'classnames';

export function FadeDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex flex-col items-center gap-4">
      <button className="btn" onClick={() => setVisible(v => !v)}>{visible ? 'Hide' : 'Show'}</button>
      <div className="h-48 grid place-items-center w-full">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="w-40 h-40 rounded-xl bg-brand-500/30 border border-brand-400/30 grid place-items-center"
            >
              <span className="text-sm">Fade</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SlideDemo() {
  const [dir, setDir] = useState<'left' | 'right' | 'up' | 'down'>('right');
  const [t, setT] = useState(0);
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-2">
        {['left','right','up','down'].map(d => (
          <button key={d} className={clsx('btn text-xs', dir===d && 'bg-brand-600/50')} onClick={()=>setDir(d as any)}>{d}</button>
        ))}
      </div>
      <div className="relative w-full h-44 overflow-hidden card grid place-items-center">
        <motion.div
          key={dir+String(t)}
          initial={{ x: dir==='left'? -200 : dir==='right'? 200 : 0, y: dir==='up'? -120 : dir==='down'? 120 : 0, opacity:0 }}
          animate={{ x: 0, y: 0, opacity:1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          className="w-40 h-24 rounded-lg bg-brand-500/30 border border-brand-400/30 grid place-items-center"
          onAnimationComplete={()=>setT(x=>x+1)}
        >
          <span className="text-sm">Slide {dir}</span>
        </motion.div>
      </div>
    </div>
  );
}

export function ScaleSpringDemo() {
  const [scale, setScale] = useState(1);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {[0.8,1,1.2,1.4].map(s=> (
          <button key={s} className={clsx('btn text-xs', scale===s && 'bg-brand-600/50')} onClick={()=>setScale(s)}>{s}x</button>
        ))}
      </div>
      <motion.div
        animate={{ scale }}
        transition={{ type: 'spring', bounce: 0.45, duration: 0.6 }}
        className="w-40 h-40 rounded-full bg-brand-500/30 border border-brand-400/30 grid place-items-center"
      >
        <span className="text-sm">Spring</span>
      </motion.div>
    </div>
  );
}

export function FlipCardDemo() {
  const [flip, setFlip] = useState(false);
  return (
    <div className="grid place-items-center">
      <div className="[perspective:1000px]">
        <div className="relative w-60 h-36 cursor-pointer" onClick={()=>setFlip(f=>!f)}>
          <motion.div
            animate={{ rotateY: flip ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.6, 0.2, 1] }}
            className="absolute inset-0 card [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 grid place-items-center backface-hidden">Front</div>
            <div className="absolute inset-0 grid place-items-center rotate-y-180 backface-hidden">Back</div>
          </motion.div>
        </div>
      </div>
      <div className="text-xs text-slate-300/80 mt-2">Click to flip</div>
    </div>
  );
}

export function StaggerListDemo() {
  const items = Array.from({ length: 6 }, (_, i) => i + 1);
  const [show, setShow] = useState(true);
  return (
    <div className="flex flex-col gap-3 items-center">
      <button className="btn" onClick={()=>setShow(s=>!s)}>{show? 'Hide' : 'Show'}</button>
      <motion.ul
        initial={false}
        animate={{}}
        className="grid grid-cols-3 gap-3"
      >
        <AnimatePresence>
          {show && items.map(i => (
            <motion.li
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 220, damping: 20 }}
              className="w-20 h-16 grid place-items-center rounded-lg bg-brand-500/30 border border-white/10"
            >
              {i}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

export function ParallaxDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({x:0,y:0});
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({x: (e.clientX - r.left)/r.width - 0.5, y: (e.clientY - r.top)/r.height - 0.5});
    };
    el.addEventListener('mousemove', onMove);
    return ()=>el.removeEventListener('mousemove', onMove);
  },[]);
  return (
    <div ref={ref} className="relative overflow-hidden h-56 card">
      <motion.div className="absolute inset-0" animate={{ x: mouse.x*10, y: mouse.y*10 }}>
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-brand-500/20 blur-2xl"/>
        <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-brand-300/20 blur-2xl"/>
      </motion.div>
      <motion.div className="relative h-full grid place-items-center" animate={{ x: mouse.x*-10, y: mouse.y*-10 }}>
        <div className="text-center">
          <div className="text-2xl font-semibold">Parallax</div>
          <div className="text-xs text-slate-300/80">Move your mouse</div>
        </div>
      </motion.div>
    </div>
  );
}

export function BlobMorphDemo() {
  return (
    <div className="grid place-items-center h-56">
      <div className="w-44 h-44 bg-brand-500/30 border border-brand-400/40 animate-[blob-morph_8s_ease-in-out_infinite]"/>
    </div>
  );
}

export function TypewriterDemo() {
  const [step, setStep] = useState(0);
  const text = 'Animation Style Detail';
  useEffect(()=>{
    const id = setInterval(()=> setStep(s => Math.min(text.length, s+1)), 50);
    return ()=> clearInterval(id);
  },[]);
  return (
    <div className="grid place-items-center h-40">
      <div className="text-lg caret">
        {text.slice(0, step)}
      </div>
    </div>
  );
}

export function ScrollRevealDemo() {
  return (
    <div className="space-y-8 h-64 overflow-auto p-4 card">
      {Array.from({length:8}, (_,i)=> (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i*0.05 }}
          className="h-10 rounded-lg bg-white/5 border border-white/10 grid place-items-center"
        >
          Item {i+1}
        </motion.div>
      ))}
    </div>
  );
}
