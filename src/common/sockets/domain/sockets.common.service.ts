import { SendMessagePayload } from "@/common/sockets/api/sockets.repo";


export interface BaseSocketsService {
  ping(): Promise<void>;

  sendMessage({ id, data, type, kind }: SendMessagePayload): Promise<void>;
}
