import { useEffect, useMemo, useState } from "react";

function Blinker() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span className={show ? "" : "opacity-0"}>|</span>;
}

function SmoothEffect({ words, index, alwaysVisibleCount }) {
  return (
    <div className="flex flex-wrap whitespace-pre">
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={`transition-opacity duration-300 ease-in-out ${
            wordIndex < index ? "opacity-100" : "opacity-0"
          }`}
        >
          {word}
          {wordIndex < words.length && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
}

function NormalEffect({ text, index, alwaysVisibleCount }) {
  return (
    <>
      {text.slice(0, Math.max(index, Math.min(text.length, alwaysVisibleCount ?? 1)))}
    </>
  );
}

function CursorWrapper({ visible, children, waiting }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setOn((prev) => !prev);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!visible || (!on && !waiting)) return null;

  return children;
}

function Type({
  text,
  repeat,
  cursor,
  delay,
  grow,
  className,
  alwaysVisibleCount,
  smooth,
  waitTime = 1000,
  onComplete,
  hideCursorOnComplete,
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const words = useMemo(() => text.split(/\s+/), [text]);
  const total = smooth ? words.length : text.length;

  useEffect(() => {
    let interval;
    const startTyping = () => {
      setIndex((prevDir) => {
        if (direction === -1 && prevDir === 0) clearInterval(interval);
        else if (direction === 1 && prevDir === total - 1) clearInterval(interval);
        return prevDir + direction;
      });
    };
    interval = setInterval(startTyping, delay);
    return () => clearInterval(interval);
  }, [total, direction, delay]);

  useEffect(() => {
    let timeout;
    if (index >= total && repeat) {
      timeout = setTimeout(() => setDirection(-1), waitTime);
    }
    if (index <= 0 && repeat) {
      timeout = setTimeout(() => setDirection(1), waitTime);
    }
    return () => clearTimeout(timeout);
  }, [index, total, repeat, waitTime]);

  useEffect(() => {
    if (index === total && !repeat) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [index, total, repeat, onComplete]);

  const waitingNextCycle = index === total || index === 0;

  return (
    <div className={`relative font-mono ${className}`}>
      {!grow && <div className="invisible">{text}</div>}
      <div className={!grow ? "absolute inset-0 h-full w-full" : ""}>
        {smooth ? (
          <SmoothEffect
            words={words}
            index={index}
            alwaysVisibleCount={alwaysVisibleCount ?? 1}
          />
        ) : (
          <NormalEffect
            text={text}
            index={index}
            alwaysVisibleCount={alwaysVisibleCount ?? 1}
          />
        )}
        <CursorWrapper
          waiting={waitingNextCycle}
          visible={Boolean(!smooth && cursor && (!hideCursorOnComplete || !isComplete))}
        >
          {cursor}
        </CursorWrapper>
      </div>
    </div>
  );
}

export default function TypingText({
  text,
  repeat = true,
  cursor = <Blinker />,
  delay = 32,
  className,
  grow = false,
  alwaysVisibleCount = 1,
  smooth = false,
  waitTime,
  onComplete,
  hideCursorOnComplete = false,
}) {
  return (
    <Type
      key={text}
      delay={delay}
      waitTime={waitTime ?? 1000}
      grow={grow}
      repeat={repeat}
      text={text}
      cursor={cursor}
      className={className}
      smooth={smooth}
      alwaysVisibleCount={alwaysVisibleCount}
      onComplete={onComplete}
      hideCursorOnComplete={hideCursorOnComplete}
    />
  );
}
