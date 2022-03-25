import styles from "./Chip.module.css";

export const Chip = ({ textToShow, activeChip, handleChipClick }) => {
  return (
    <span
      className={`cursor-ptr fw-bold inline-block mx-1 px-1 py-0p5 text-center ${
        styles.Chip
      } ${activeChip === textToShow ? styles.ActiveChip : ""}`}
      onClick={handleChipClick}
    >
      {textToShow}
    </span>
  );
};
