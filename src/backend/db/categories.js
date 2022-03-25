import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Marvel Gaming",
  },
  {
    _id: uuid(),
    categoryName: "Movie Clips",
  },
  {
    _id: uuid(),
    categoryName: "Fun Talk Shows",
  },
  {
    _id: uuid(),
    categoryName: "Trailers",
  },
];
