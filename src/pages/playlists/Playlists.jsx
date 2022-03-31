import { ClearAllButton, PlayList } from "components";

export const Playlists = () => {
  return (
    <>
      <ClearAllButton textToShow="Remove All" />

      <div>
        <h1 className="fs-2 pl-4p5 pt-2">Created Playlists</h1>

        <PlayList className="p-4" />
      </div>
    </>
  );
};
