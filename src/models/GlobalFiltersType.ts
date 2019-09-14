import { Tag } from "models/ITag";

export type GlobalFiltersType = {
  startDate?: string,
  endDate?: string,
  tags?: Tag[],
  credit?: number[],
  debit?: number[],
  description?: string
};
