import PropTypes from "prop-types";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";
import { AddToPlaylistIcon, LikedIcon, OutlinedLikedIcon } from "assets";
import { Button } from "components";

export const SingleVideo = ({ video, loading }) => {
  const { creator, creatorLogo, isLiked, title, description, videoYTId } =
    video;

  useScrollToTop(title);
  useDocumentTitle(title);

  return loading ? (
    <iframe
      width="100%"
      height="500px"
      src=""
      title="YouTube video player"
      frameBorder="0"
    ></iframe>
  ) : (
    <>
      <iframe
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${videoYTId}`}
        title="YouTube video player"
        frameBorder="0"
      ></iframe>

      <div className="flex flex-direction-col py-1">
        <h1 className="fs-2">{title}</h1>

        <div className="ml-auto mt-1">
          <Button className="btn btn-rounded py-0p5">
            {isLiked ? (
              <>
                <LikedIcon /> Liked
              </>
            ) : (
              <>
                <OutlinedLikedIcon /> Like
              </>
            )}
          </Button>
          <Button className="btn btn-rounded py-0p5">
            <AddToPlaylistIcon /> Save
          </Button>
        </div>
      </div>

      <div className="flex mt-1">
        <img
          loading="lazy"
          className="card-horizontal-img shadow-unset"
          src={creatorLogo.url}
          alt={creatorLogo.altText}
        />

        <div>
          <h2 className="card-head fs-1p5 mt-0p5">{creator}</h2>
          <p className="card-text fs-1p5">{description}</p>
        </div>
      </div>
    </>
  );
};

SingleVideo.propTypes = {
  video: PropTypes.shape({
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
  loading: PropTypes.bool,
};

SingleVideo.defaultProps = {
  video: {
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
  loading: false,
};
