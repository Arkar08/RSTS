/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAdvertising } from "@/hooks/useAdvertising";
import { useEffect, useState, useRef } from "react";

const SliceText = () => {
  const { queryAdvertising } = useAdvertising();
  const { data: advertising, isSuccess,isError } = queryAdvertising;
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (isSuccess && advertising) {
      setLists(advertising.data);
    }
  }, [isSuccess, advertising]);

  //   const texts = [
  //     "Fast and Reliable Service Affordable Prices Every Day Affordable Prices Every Day Affordable Prices Every Day",
  //     "Affordable Prices Every Day Affordable Prices Every Day Affordable Prices Every Day Affordable Prices Every Day Affordable Prices Every Day Affordable Prices Every Day",
  //     "24/7 Customer Support",
  //     "Your Satisfaction, Our Priority",
  //   ];

  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const newWidths = spanRefs.current.map((el) => el?.offsetWidth ?? 0);
    setWidths(newWidths);
  }, [lists.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lists.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [lists.length]);

  const translateX = widths.slice(0, index).reduce((a, b) => a + b, 0);

  return (
    <div>
      {lists.length > 0 && !isError ? (
        <div className="flex justify-center items-center h-12 bg-black">
          <div
            ref={containerRef}
            className="relative overflow-hidden h-10 mt-4"
            style={{ width: widths[index] ? `${widths[index]}px` : "auto" }}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {lists.map((text: any, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    spanRefs.current[i] = el;
                  }}
                  className="flex-shrink-0 text-center text-sm text-white px-2"
                >
                  {text?.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SliceText;
