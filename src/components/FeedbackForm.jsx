import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Send,
  Shield,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import SubmissionCounter from "./SubmissionCounter";
import toast from "react-hot-toast";
import axios from "axios";

const FeedbackForm = () => {
  const { themeData } = useTheme();
  const { playSound } = useSound();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    playSound("submit");

    // Send data to Google Apps Script
    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbwyr1SNvZQ-mFmyOYeGZBy2BBpalUEajA-zFnm4GHiRBzKzxg8h-NVGVLP8rDPZEYQa/exec",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data.status === "success") {
        setSubmitted(true);
        playSound("success");
        toast.success("Feedback Transmitted Successfully");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Transmission Failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "allianceName",
      label: "Alliance Name",
      type: "text",
      placeholder: "Enter Alliance [e.g. LZT]",
      required: true,
    },
    {
      name: "ign",
      label: "In-Game Name",
      type: "text",
      placeholder: "Enter your IGN",
      required: true,
    },
    {
      name: "powerLevel",
      label: "Power Level",
      type: "number",
      placeholder: "Current Power (Optional)",
    },
    {
      name: "role",
      label: "Role in Alliance",
      type: "select",
      options: ["R5", "R4", "R3", "R2", "R1"],
      required: true,
    },
    {
      name: "problems",
      label: "Season 1 Problems",
      type: "textarea",
      placeholder: "What problems did you face during Season 1?",
      required: true,
    },
    {
      name: "affectedMost",
      label: "Most Impactful Situation",
      type: "textarea",
      placeholder: "Which event or situation affected you the most?",
      required: true,
    },
    {
      name: "communication",
      label: "Server Communication",
      type: "textarea",
      placeholder: "Was communication good or poor? Why?",
      required: true,
    },
    {
      name: "improvements",
      label: "Season 2 Improvements",
      type: "textarea",
      placeholder: "What should Lastz improve before Season 2?",
      required: true,
    },
    {
      name: "unity",
      label: "Unity Suggestion",
      type: "textarea",
      placeholder: "Suggestion for better unity between alliances?",
      required: true,
    },
    {
      name: "enjoyed",
      label: "Best Part of Season 1",
      type: "textarea",
      placeholder: "What did you enjoy most about Season 1?",
      required: true,
    },
    {
      name: "heard",
      label: "Voice Status",
      type: "select",
      options: ["Yes, definitely", "Somewhat", "No, not really"],
      required: true,
    },
    {
      name: "leadership",
      label: "Management Suggestions",
      type: "textarea",
      placeholder: "Suggestions for leadership or server management",
    },
    {
      name: "concerns",
      label: "Migration/Season 2 Concerns",
      type: "textarea",
      placeholder: "Any concerns about migration or Season 2 preparation?",
    },
    {
      name: "finalMessage",
      label: "Final Message",
      type: "textarea",
      placeholder: "Final message to Lastz leadership",
    },
  ];

  if (submitted) {
    return (
      <motion.div
        className="max-w-2xl mx-auto glass-panel p-12 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="w-20 h-20 bg-neonCyan/20 rounded-full flex items-center justify-center mx-auto mb-6 text-neonCyan shadow-[0_0_30px_rgba(0,229,255,0.3)]">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-orbitron font-bold mb-4">
          Transmission Complete
        </h2>
        <p className="text-blueGray text-lg mb-8 font-rajdhani">
          Feedback Successfully Delivered to Lastz Leadership. <br /> Your
          contribution helps secure our future in Season 2.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-neon-cyan">
          Send Another Report
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <SubmissionCounter />

      <motion.div
        className="glass-panel p-8 md:p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-neonPurple/30 rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-neonCyan/30 rounded-bl-2xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-8">
          <div className="h-0.5 w-12 bg-neonPurple" />
          <h2 className="text-2xl font-orbitron font-bold tracking-tight">
            System Feedback
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.slice(0, 4).map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="label-futuristic">
                  {field.label}{" "}
                  {field.required && <span className="text-cyberRed">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    {...register(field.name, { required: field.required })}
                    className="input-glow w-full appearance-none bg-deepNavy/10"
                    onMouseEnter={() => playSound("hover")}
                  >
                    <option value="">Select Role</option>
                    {field.options.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-deepNavy text-white"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name, { required: field.required })}
                    className={`input-glow w-full ${errors[field.name] ? "border-cyberRed/50 focus:border-cyberRed" : ""}`}
                    onMouseEnter={() => playSound("hover")}
                  />
                )}
                {errors[field.name] && (
                  <span className="text-[10px] text-cyberRed font-orbitron uppercase tracking-widest mt-1 block">
                    Required Field
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-8 mt-12">
            {formFields.slice(4).map((field) => (
              <div key={field.name} className="space-y-2 group">
                <div className="flex items-center gap-2 mb-2">
                  <ChevronRight
                    size={14}
                    className="text-neonPurple group-focus-within:translate-x-1 transition-transform"
                  />
                  <label className="label-futuristic mb-0">
                    {field.label}{" "}
                    {field.required && <span className="text-cyberRed">*</span>}
                  </label>
                </div>
                {field.type === "select" ? (
                  <select
                    {...register(field.name, { required: field.required })}
                    className="input-glow w-full"
                    onMouseEnter={() => playSound("hover")}
                  >
                    <option value="">Choose Option</option>
                    {field.options.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-deepNavy text-white"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <textarea
                    placeholder={field.placeholder}
                    rows="3"
                    {...register(field.name, { required: field.required })}
                    className={`input-glow w-full resize-none ${errors[field.name] ? "border-cyberRed/50 focus:border-cyberRed" : ""}`}
                    onMouseEnter={() => playSound("hover")}
                  />
                )}
                {errors[field.name] && (
                  <span className="text-[10px] text-cyberRed font-orbitron uppercase tracking-widest mt-1 block">
                    This information is critical
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5 mt-12">
            <div className="flex items-center gap-3 text-blueGray text-[10px] font-orbitron tracking-widest uppercase">
              <Shield size={16} className="text-neonCyan" />
              <span>Secure Encrypted Transmission</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative overflow-hidden px-10 py-4 rounded-lg font-orbitron font-bold text-sm tracking-[0.3em] uppercase transition-all duration-300 ${
                isSubmitting
                  ? "bg-white/10 text-white/50 cursor-not-allowed"
                  : "bg-neonPurple text-white hover:bg-neonPurple/80 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
              }`}
            >
              <div className="relative z-10 flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                    <span>Transmit Feedback</span>
                  </>
                )}
              </div>

              {/* Button shimmer effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[45deg] -translate-x-full group-hover:animate-shimmer" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackForm;
