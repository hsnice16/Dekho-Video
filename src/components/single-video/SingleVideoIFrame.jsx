import PropTypes from "prop-types";
import { useLiked, useModal, useToast, useUser, useWatchLater } from "context";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";
import { AddToPlaylistIcon, LikedIcon, OutlinedLikedIcon } from "assets";
import { Button } from "components";

export const SingleVideoIFrame = ({ video, loading, isLiked, setIsLiked }) => {
  const { toggleModal } = useModal();
  const { userState } = useUser();
  const { handleAddMoreToasts } = useToast();
  const { postLiked, deleteSpecificLiked } = useLiked();
  const { isVideoInWatchLater } = useWatchLater();
  const { _id, creator, creatorLogo, title, description, videoYTId } = video;

  useScrollToTop(title);
  useDocumentTitle(title);

  const handleLikeClick = () => {
    if (userState.isUserAuthTokenExist) {
      if (isLiked) {
        deleteSpecificLiked(_id);
      } else {
        postLiked({ video });
      }

      setIsLiked((prevValue) => !prevValue);
    } else {
      handleAddMoreToasts({
        msg: "Liked",
        type: "public_liked",
      });
    }
  };

  const handleSaveClick = () => {
    if (userState.isUserAuthTokenExist) {
      const toggleForVideo = isVideoInWatchLater(_id)
        ? { ...video, isInWatchLater: true }
        : { ...video };
      toggleModal(toggleForVideo);
    } else {
      handleAddMoreToasts({
        type: "public_save",
      });
    }
  };

  return loading ? (
    <>
      <span></span>
      <iframe
        width="100%"
        height="500"
        src=""
        title="YouTube video player"
        frameBorder="0"
      ></iframe>
    </>
  ) : (
    <>
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoYTId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>

      <div className="flex flex-direction-col py-1">
        <h1 className="fs-2">{title}</h1>

        <div className="ml-auto mt-1">
          <Button onClick={handleLikeClick} className="btn btn-rounded py-0p5">
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
          <Button onClick={handleSaveClick} className="btn btn-rounded py-0p5">
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

SingleVideoIFrame.propTypes = {
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
  isLiked: PropTypes.bool,
  setIsLiked: PropTypes.func,
};

SingleVideoIFrame.defaultProps = {
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
  isLiked: false,
  setIsLiked: () => {},
};
