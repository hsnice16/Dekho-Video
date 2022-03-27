import styles from "./SingleVideoPage.module.css";
import { VideoCard } from "components";
import { getEmptyArrayOfObjects } from "utils";
import { AddToPlaylistIcon, OutlinedLikedIcon } from "assets";

export const SingleVideoPage = () => {
  return (
    <>
      <div className={`flex m-auto p-3 ${styles.singleVideoPage}`}>
        <div className={`${styles.iFrame_container}`}>
          <iframe
            width="100%"
            height="500px"
            src="https://www.youtube.com/embed/VOLKJJvfAbg"
            title="YouTube video player"
            frameBorder="0"
          ></iframe>

          <div className="flex flex-direction-col py-1">
            <h1 className="fs-2">
              Bekhayali Full Song | Kabir Singh | Shahid K,Kiara A|Sandeep Reddy
              Vanga | Sachet-Parampara | Irshad
            </h1>

            <div className="ml-auto">
              <button className="btn btn-rounded py-0p5">
                <OutlinedLikedIcon /> Like
              </button>
              <button className="btn btn-rounded py-0p5">
                <AddToPlaylistIcon /> Save
              </button>
            </div>
          </div>

          <div className="flex mt-1">
            <img
              loading="lazy"
              className="card-horizontal-img shadow-unset"
              src="https://yt3.ggpht.com/DzaZaTX6gdgjjPI_vkNc2dPbI794UroI9fTAunua0fa7lukDj5NDkjfhS5-w2KXuvXS02r92=s48-c-k-c0x00ffffff-no-rj"
              alt=""
            />

            <div>
              <h2 className="card-head fs-1p5 mt-0p5">Marvel Entertainment</h2>
              <p className="card-text fs-1p5">
                Presenting Bekhayali full video, a song that evokes the emotion
                of heartbreak & love at once! The Bollywood movie Kabir Singh is
                starring Shahid Kapoor and Kiara Advani. The film is directed by
                Sandeep Reddy Vanga.
              </p>
            </div>
          </div>
        </div>

        <ul className="ml-2">
          {getEmptyArrayOfObjects(4).map(({ _id }) => (
            <li key={_id}>
              <VideoCard loading={true} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
