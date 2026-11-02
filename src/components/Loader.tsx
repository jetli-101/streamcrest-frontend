"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Hard work beats talent when talent doesn't work hard. - Tim Notke",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Opportunities don't happen. You create them. - Chris Grosser",
  "The best way to predict the future is to create it. - Peter Drucker",
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "Quality is not an act, it is a habit. - Aristotle",
];

export default function Loader() {
  const [message, setMessage] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white">
      <Loader2 className="h-10 w-10 animate-spin text-green-600" />
      <div className="my-3 flex animate-bounce items-center justify-center">
        <span className="text-medium ml-2 font-bold text-green-600">
          Streamcrest
        </span>
      </div>
      <p className="max-w-xs rounded-lg px-4 py-2 text-center text-xs text-gray-600">
        {message}
      </p>
      <div className="my-2 h-1 w-48 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full animate-[progress_2s_linear_infinite] bg-green-600"></div>
      </div>
    </div>
  );
}
