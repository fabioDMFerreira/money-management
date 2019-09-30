import { Tag } from "models/Tag";

export interface GlobalFilters {
  startDate?: string,
  endDate?: string,
  tags?: Tag[],
  credit?: number[],
  debit?: number[],
  description?: string,
  wallet?: string,
};
