export interface IPagination<T> {
  data: Array<T>;
  total: number;
  page: null;
  totalPages: null;
}