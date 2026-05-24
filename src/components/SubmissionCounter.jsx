import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const SubmissionCounter = () => {
  const [count, setCount] = useState(247); // Initial dummy count

  useEffect(() => {
    // Simulate periodic updates
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setCount(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md mb-8 mx-auto w-fit"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neonCyan/20 text-neonCyan">
        <Activity size={20} className="animate-pulse" />
      </div>
      <div>
        <div className="text-[10px] font-orbitron text-white/60 uppercase tracking-[0.2em] leading-none mb-1">
          Live Transmission Status
        </div>
        <div className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-neonCyan drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]"
          >
            {count}
          </motion.span>
          <span className="text-sm text-white/50 tracking-widest uppercase">Reports Received</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SubmissionCounter;
