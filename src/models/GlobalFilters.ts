import { Tag } from "models/Tag";

export type GlobalFilters = {
  startDate?: string,
  endDate?: string,
  tags?: Tag[],
  credit?: number[],
  debit?: number[],
  description?: string
};
