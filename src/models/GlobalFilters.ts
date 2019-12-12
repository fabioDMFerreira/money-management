import { Tag } from 'models/Tag';

export interface GlobalFilters {
  startDate?: string;
  endDate?: string;
  tags?: string[];
  credit?: number[];
  debit?: number[];
  description?: string;
  wallet?: string;
}
