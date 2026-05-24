import React, { createContext, useContext, useState, useCallback } from "react";

const SoundContext = createContext();

// Defined outside the component so the reference is always stable
const soundMap = {
  hover: "/sounds/hover.wav",
  click: "/sounds/click.wav",
  submit: "/sounds/submit.wav",
  success: "/sounds/success.wav",
  startup: "/sounds/startup.wav",
};

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const playSound = useCallback(
    (soundName) => {
      if (isMuted) return;
      const soundSrc = soundMap[soundName];
      if (!soundSrc) return;

      try {
        const audio = new Audio(soundSrc);
        audio.volume = 0.18;
        audio.play().catch(() => {});
      } catch (e) {
        // Audio may be blocked until user interaction.
      }
    },
    [isMuted],
  );

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
