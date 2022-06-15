export interface GetChangeLogByIdPayload {
  userId: string;
  page: number;
  perPage: number;
}

export interface ChangeLogElement {
  action: string;
  createdAt: Date | string;
}
