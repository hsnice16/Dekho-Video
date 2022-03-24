import styles from "./VideoList.module.css";
import { VideoCard } from "components";
import { getEmptyArrayOfObjects } from "utils";

export const VideoList = () => {
  return (
    <ul className={`${styles.VideoList}`}>
      {getEmptyArrayOfObjects(10).map(({ _id }) => (
        <li key={_id}>
          <VideoCard />
        </li>
      ))}
    </ul>
  );
};
