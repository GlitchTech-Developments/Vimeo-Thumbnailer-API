"use client";

import { useEffect, useState } from "react";

interface ConsoleDisplayProps {
  textInput: string;
  skipAnimation?: boolean;
  typeSpeed?: number;
}

const ConsoleDisplay = ({
  textInput,
  skipAnimation,
  typeSpeed,
}: ConsoleDisplayProps) => {
  const [displayText, setDisplayText] = useState("");

  const inputTextLoop = (
    inputText: string,
    typeSpeed: number,
    skipAnimation: boolean,
  ) => {
    if (skipAnimation) {
      setDisplayText(inputText);
      return;
    }

    const textArray = String(inputText).split("");
    let textTyping = "";

    textArray.forEach((char, index) => {
      setTimeout(() => {
        textTyping = textTyping.slice(0, -1);
        textTyping += char;
        textTyping += "_";
        setDisplayText(textTyping);
      }, typeSpeed * index);
    });

    return textTyping;
  };

  useEffect(() => {
    inputTextLoop(textInput, typeSpeed ?? 250, skipAnimation ?? false);
  }, [textInput, typeSpeed]);

  return (
    <pre className="w-lg min-h-64 h-auto flex-wrap overflow-y-auto rounded-lg border-2 bg-black p-2 font-mono text-gray-100">
      {displayText && displayText !== "" ? (
        <>
          {displayText.replace(/_/g, "")}
          <span className="animate-pulse">_</span>
        </>
      ) : (
        "waiting..."
      )}
    </pre>
  );
};

export default ConsoleDisplay;
