import { userData } from "./userData";
export interface usersList {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: userData[];
}
