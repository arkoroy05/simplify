import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CycleText(text) {
  const words = ["Doubts", "Queries", "Definations", "Explanations"];
  const [index, setIndex] = useState(0);

  const total = words.length;
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 2000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div>
      <span className="font-mono text-lg sm:text-2xl font-bold">
        Your one stop solution for 
        <AnimatePresence mode="wait">
          <motion.h1
            key={`words_${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.08 }}
            className="inline-block font-mono text-xl text-blue-700"
          >
            &quot;{words[index]}&quot;
          </motion.h1>
        </AnimatePresence>
        
      </span>
    </div>
  );
}
