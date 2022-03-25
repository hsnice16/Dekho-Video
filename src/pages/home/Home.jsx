import React, { useState } from "react";
import styles from "./Home.module.css";
import { Chip, VideoList } from "components";

export const Home = () => {
  const [activeChip, setActiveChip] = useState("All");
  const handleChipClick = (selectedChip) => {
    setActiveChip(selectedChip);
  };

  return (
    <main>
      <ul
        className={`align-i-ctr flex py-1p5 px-4 ${styles.CategoryChipContainer}`}
      >
        {["All", "Trailers", "Clips", "Movies", "Talks"].map((category) => (
          <li>
            <Chip
              textToShow={category}
              activeChip={activeChip}
              handleChipClick={() => {
                handleChipClick(category);
              }}
            />
          </li>
        ))}
      </ul>

      <VideoList />
    </main>
  );
};
