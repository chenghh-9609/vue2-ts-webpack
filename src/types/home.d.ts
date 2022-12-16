export interface User {
  id?: number;
  name: string;
  password: string;
}
export interface Column {
  prop: string;
  label: string;
  width?: string;
}
export interface State {
  tableData: User[];
  columns: Column[];
  userForm: User;
  showEditDialog: boolean;
}