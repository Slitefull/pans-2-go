import { SortTypes } from "@/common/constants/sortTypes";


const getInvertedSort = (sort: string): string => {
  if (sort === SortTypes.ASC) return SortTypes.DESC;
  return SortTypes.ASC;
}

export default getInvertedSort;
