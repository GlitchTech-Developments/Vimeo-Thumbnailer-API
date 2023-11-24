"use client";

import React, { useState } from "react";
import Button from "./button";
import ConsoleDisplay from "./display";

const Demo = () => {
  const [displayText, setDisplayText] = useState("waiting...");
  const [typeSpeed, setTypeSpeed] = useState(250);
  const [skipAnimation, setSkipAnimation] = useState(false);

  const fetcher = async () => {
    setSkipAnimation(false);

    const response = await fetch("/api/thumbnail/883608656/data");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json();

    if (response.status === 200) {
      setSkipAnimation(true);
      setDisplayText(JSON.stringify(data, null, 2));
    } else {
      setTypeSpeed(250);
      setDisplayText(
        JSON.stringify({
          status: response.status,
          message: "error during fetch call",
        }),
      );
    }
  };

  const clickHandler = () => {
    setTypeSpeed(250);
    setSkipAnimation(false);

    fetcher().catch((error) => {
      console.error(error);
      setDisplayText(JSON.stringify(error));
    });
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Button onClick={clickHandler}>Send Request</Button>
      <ConsoleDisplay
        textInput={displayText}
        skipAnimation={skipAnimation}
        typeSpeed={typeSpeed}
      />
    </div>
  );
};

export default Demo;
