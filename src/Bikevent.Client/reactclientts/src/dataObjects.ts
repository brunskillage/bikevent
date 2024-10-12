export interface IPlannerRow {
  id: number;
  listId: string;
  name: string;
  order: number;
  size: number;
  dateCreated: string;
  dateModified: string;
  description: string;
  details1: string;
  details2: string;
  status: string;
  isImportant: boolean;
  isNotImportant: boolean;
  isUrgent: boolean;
  isNotUrgent: boolean;
}
export interface IPlanner {
  id: number;
  name: string;
}
