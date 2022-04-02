import styles from "./SingleVideo.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { SingleVideoIFrame } from "./SingleVideoIFrame";
import { Chip, NotFound, VideoList } from "components";

export const SingleVideo = ({
  singleVideo,
  sidepanVideos,
  isLiked,
  setIsLiked,
  status,
  chipText,
}) => {
  return (
    <>
      {status === "error" ? (
        <NotFound
          documentTitle="Video Not Found"
          textToShow="This video isn't available anymore"
        />
      ) : (
        <div
          className={classNames("flex", "m-auto", "p-3", styles.singleVideo)}
        >
          <div className={styles.iFrame_container}>
            {status === "loading" ? (
              <SingleVideoIFrame loading={true} />
            ) : (
              <SingleVideoIFrame
                video={singleVideo}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
              />
            )}
          </div>

          <div className="ml-2">
            {status === "loading" ? (
              <Chip loading={true} className="mb-2 mx-1" />
            ) : (
              <Chip
                textToShow={chipText}
                activeChip={chipText}
                className="mb-2 mx-1"
              />
            )}

            <VideoList videos={sidepanVideos} status={status} />
          </div>
        </div>
      )}
    </>
  );
};

SingleVideo.propTypes = {
  singleVideo: PropTypes.shape({
    _id: PropTypes.string,
    categoryName: PropTypes.string,
    creator: PropTypes.string,
    creatorLogo: PropTypes.shape({
      altText: PropTypes.string,
      url: PropTypes.string,
    }),
    isInWatchLater: PropTypes.bool,
    isLiked: PropTypes.bool,
    thumbnail: PropTypes.shape({
      altText: PropTypes.string,
      url: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    videoYTId: PropTypes.string,
  }),

  sidepanVideos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      categoryName: PropTypes.string,
      creator: PropTypes.string,
      creatorLogo: PropTypes.shape({
        altText: PropTypes.string,
        url: PropTypes.string,
      }),
      isInWatchLater: PropTypes.bool,
      isLiked: PropTypes.bool,
      thumbnail: PropTypes.shape({
        altText: PropTypes.string,
        url: PropTypes.string,
      }),
      title: PropTypes.string,
      description: PropTypes.string,
      videoYTId: PropTypes.string,
    })
  ),

  isLiked: PropTypes.bool,
  setIsLiked: PropTypes.func,
  status: PropTypes.string,
  chipText: PropTypes.string,
};

SingleVideo.defaultProps = {
  singleVideo: {
    _id: "",
    categoryName: "",
    creator: "",
    creatorLogo: {
      altText: "",
      url: "",
    },
    isInWatchLater: false,
    isLiked: false,
    thumbnail: {
      altText: "",
      url: "",
    },
    title: "",
    description: "",
    videoYTId: "",
  },

  sidepanVideos: [
    {
      _id: "",
      categoryName: "",
      creator: "",
      creatorLogo: {
        altText: "",
        url: "",
      },
      isInWatchLater: false,
      isLiked: false,
      thumbnail: {
        altText: "",
        url: "",
      },
      title: "",
      description: "",
      videoYTId: "",
    },
  ],

  isLiked: false,
  setIsLiked: () => {},
  status: "",
  chipText: "",
};
