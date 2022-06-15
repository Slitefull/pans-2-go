export enum SocketsUserTypes {
  Client = "client",
  Clients = "clients",
  Admins = "admins",
}

export interface SendMessagePayload {
  id?: string;
  data: string;
  type: SocketsUserTypes;
  kind: "success" | "warning" | "error";
}

export interface SocketsRepository {
  ping(): Promise<string>;

  sendMessage({ id, data, type, kind }: SendMessagePayload): Promise<string>;
}
