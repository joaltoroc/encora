import { PaginateQuery } from './decorator';

export declare class Paginated<T> {
  data: T[];
  meta: PaginateQuery;
}
