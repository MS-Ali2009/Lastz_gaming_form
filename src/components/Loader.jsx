import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSound } from "../context/SoundContext";


const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(
    "Initializing Lastz Feedback Terminal...",
  );
  const { playSound } = useSound();
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    playSound("startup");

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onCompleteRef.current?.(), 1000);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    const statusUpdates = [
      "Establishing neural link...",
      "Accessing alliance database...",
      "Encrypting feedback channel...",
      "Synchronizing with Season 1 data...",
      "Ready for transmission.",
    ];

    let currentStatus = 0;
    const statusInterval = setInterval(() => {
      if (currentStatus < statusUpdates.length) {
        setStatus(statusUpdates[currentStatus]);
        currentStatus++;
      } else {
        clearInterval(statusInterval);
      }
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-darkSlate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="relative mb-12">
        <motion.div
          className="text-6xl md:text-8xl font-orbitron font-black tracking-tighter glitch-text text-neonPurple"
          data-text="LASTZ"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          LASTZ
        </motion.div>
        <motion.div
          className="absolute -inset-4 border border-neonPurple/20 rounded-lg"
          animate={{
            boxShadow: [
              "0 0 10px rgba(124, 58, 237, 0)",
              "0 0 30px rgba(124, 58, 237, 0.4)",
              "0 0 10px rgba(124, 58, 237, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <div className="w-64 md:w-96 relative">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-neon-gradient shadow-[0_0_10px_rgba(0,229,255,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex justify-between items-center font-orbitron text-[10px] tracking-widest text-blueGray">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {status}
          </motion.span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Futuristic Grid background for loader */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
