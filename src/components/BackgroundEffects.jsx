import { useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const BackgroundEffects = ({ theme }) => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        number: { value: 52, density: { enable: true, area: 900 } },
        color: { value: ["#7c3aed", "#00e5ff", "#8b5cf6"] },
        opacity: {
          value: 0.55,
          anim: { enable: true, speed: 0.4, opacity_min: 0.18, sync: false },
        },
        size: { value: { min: 1, max: 4 } },
        move: {
          enable: true,
          speed: 1.2,
          direction: "bottom",
          random: true,
          outModes: "out",
        },
        links: {
          enable: true,
          distance: 120,
          color: "#0f172a",
          opacity: 0.14,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "repulse" },
        },
        modes: {
          grab: { distance: 170, links: { opacity: 0.2 } },
          repulse: { distance: 120 },
        },
      },
      background: {
        color: "#02050f",
        image:
          "radial-gradient(circle at 10% 10%, rgba(124,58,237,0.2), transparent 20%), radial-gradient(circle at 85% 0%, rgba(0,229,255,0.13), transparent 24%), linear-gradient(180deg, rgba(7,12,27,0.87) 0%, rgba(12,18,35,0.95) 100%)",
      },
    }),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.14),transparent_12%),radial-gradient(circle_at_bottom_right,_rgba(0,229,255,0.12),transparent_14%)]" />
      <Particles
        className="absolute inset-0"
        init={particlesInit}
        options={particleOptions}
      />
      <div className="absolute inset-x-4 bottom-14 hidden h-24 md:block bg-[radial-gradient(circle,_rgba(0,229,255,0.05),transparent_70%)] blur-3xl" />
      <div className="absolute left-8 top-24 h-28 w-28 rounded-full bg-lastz-purple/10 blur-3xl animate-float" />
      <div className="absolute right-10 top-32 h-20 w-20 rounded-full bg-cyan-400/10 blur-3xl animate-[float_7s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.42)_45%,rgba(17,24,39,0.92)_100%)]" />
    </div>
  );
};

export default BackgroundEffects;
