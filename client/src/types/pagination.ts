export type MetaData = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
      this.items = items;
      this.metaData = metaData;
  }
}

// export type MetaData = {
//   currentPage: number
//   totalPages: number
//   pageSize: number
//   totalCount: number
// }

// export type PaginatedResponse<T> = {
//   items: T[]
//   metaData: MetaData
// }

// export const createPaginatedResponse = <T>(
//   items: T[],
//   metaData: MetaData
// ): PaginatedResponse<T> => ({
//   items,
//   metaData,
// })
