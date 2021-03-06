import { v4 as uuid } from "uuid";

/**
 * getEmptyArrayOfObjects - function to get empty array of Objects
 *
 * @param {number} arrayLength - length of the empty array
 * @returns new empty array of given length
 */
const getEmptyArrayOfObjects = (arrayLength) => {
  return new Array(arrayLength).fill(0).map((_) => ({ _id: uuid() }));
};

export { getEmptyArrayOfObjects };
