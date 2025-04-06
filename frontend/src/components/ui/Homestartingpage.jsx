import React, { useState, useEffect } from "react";

function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Scalable", "Efficient"];

  const [animationClass, setAnimationClass] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      // Start slide-out
      setAnimationClass("slide-out");

      setTimeout(() => {
        // Change word & slide it in
        setWordIndex((prev) => (prev + 1) % words.length);
        setAnimationClass("slide-in");
      }, 1000); // Match this to animation duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[500px] bg-black text-white overflow-hidden">
      <h1 className="text-8xl font-bold mb-4 text-center">Event Management</h1>

      <div className="h-20 relative overflow-hidden flex items-center justify-center mb-4 w-full">
        <span
          key={wordIndex}
          className={`absolute text-7xl font-bold bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-transparent bg-clip-text animate-${animationClass}`}
        >
          {words[wordIndex]}
        </span>
      </div>

      <p className="text-xl mb-8 text-center max-w-3xl">
        Eventtia’s all-in-one event management platform guarantees a seamless
        attendee experience, optimizes event planning and boosts ROI.
      </p>
      <button className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition">
        Get Started
      </button>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes slide-out {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        .animate-slide-in {
          animation: slide-in 1s ease forwards;
        }

        .animate-slide-out {
          animation: slide-out 1s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
