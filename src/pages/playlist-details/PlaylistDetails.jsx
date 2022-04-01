import { ClearAllButton, VideoList } from "components";

export const PlaylistDetails = () => {
  return (
    <>
      <ClearAllButton textToShow="Delete Playlist" />

      <div>
        <h1 className="fs-2 pl-5 pt-2">Sangeet Playlist</h1>

        <VideoList status="loading" className="p-4" />
      </div>
    </>
  );
};
