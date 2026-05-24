const themeOptions = [
  { id: "purple", label: "Neon Purple" },
  { id: "blue", label: "Cyber Blue" },
  { id: "red", label: "Dark Red" },
  { id: "black", label: "Midnight Black" },
];

const ThemeSwitcher = ({ theme, onChange }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {themeOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={`interactive rounded-3xl border px-4 py-3 text-left text-sm transition ${
            theme === option.id
              ? "border-cyan-400/40 bg-cyan-400/10 text-white shadow-glow"
              : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-cyan-300/20 hover:bg-slate-900"
          }`}
        >
          <p className="font-semibold">{option.label}</p>
          <p className="mt-1 text-[0.8rem] text-slate-400">
            Switch style preset
          </p>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
