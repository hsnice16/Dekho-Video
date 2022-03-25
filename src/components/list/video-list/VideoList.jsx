import styles from "./VideoList.module.css";
import { VideoCard } from "components";
import { getEmptyArrayOfObjects } from "utils";

export const VideoList = ({ filteredVideos }) => {
  return (
    <ul className={`p-4 ${styles.VideoList}`}>
      {filteredVideos.map((video) => (
        <li key={video._id}>
          <VideoCard video={video} />
        </li>
      ))}
    </ul>
  );
};
