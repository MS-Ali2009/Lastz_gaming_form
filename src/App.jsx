import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import useKonamiCode from './hooks/useKonamiCode';
import { Toaster as ToastProvider } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);
  const [easterEggActive, setEasterEggActive] = useState(false);

  useKonamiCode(() => {
    setEasterEggActive(true);
    toast("TERMINAL OVERRIDE ACTIVATED", {
      icon: '🔐',
      style: {
        background: '#7c3aed',
        color: '#fff',
        fontFamily: 'Orbitron'
      }
    });
    setTimeout(() => setEasterEggActive(false), 5000);
  });

  return (
    <SoundProvider>
      <ThemeProvider>
        {easterEggActive && (
          <motion.div 
            className="fixed inset-0 z-[100] pointer-events-none border-[20px] border-neonPurple/30"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: 10 }}
          />
        )}
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <>
              <Background />
              <CustomCursor />
              <Header />
              <main className="relative z-10 pt-20 pb-20 px-4">
                <FeedbackForm />
              </main>
              <ToastProvider position="bottom-right" 
                toastOptions={{
                  style: {
                    background: '#1e293b',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'Rajdhani, sans-serif'
                  }
                }}
              />
            </>
          )}
        </AnimatePresence>
      </ThemeProvider>
    </SoundProvider>
  );
}

export default App;
