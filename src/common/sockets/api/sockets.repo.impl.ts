import { api } from "@/common/api";
import { SendMessagePayload, SocketsRepository } from "@/common/sockets/api/sockets.repo";


export class HttpSocketsRepository implements SocketsRepository {
  async ping(): Promise<string> {
    const response = await api.get<string>("/socket/ping");
    return response.data;
  }

  async sendMessage({ id, data, type, kind }: SendMessagePayload): Promise<string> {
    return api.post("/socket/send", {
      event: "events",
      id,
      data,
      type,
      kind,
    });
  }
}
