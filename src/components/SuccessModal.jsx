import { motion } from "framer-motion";

const SuccessModal = ({ title, message, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="secret-overlay max-w-xl rounded-[2rem] border border-cyan-400/20 bg-slate-950/90 p-8 text-center shadow-[0_0_120px_rgba(0,229,255,0.2)]"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/70">
          Protocol activated
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 inline-flex rounded-full border border-cyan-400/40 bg-lastz-cyan/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-lastz-cyan/15"
        >
          Close console
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;
