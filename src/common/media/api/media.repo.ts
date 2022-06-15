export interface CreateMediaByBase64Values {
  file_name: string;
  content: string | ArrayBuffer | null;
}

export interface CreateMediaByBase64Response {
  data: Array<Media>
}

export interface Media {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MediaRepository {
  createMediaByBase64(data: Array<CreateMediaByBase64Values>): Promise<CreateMediaByBase64Response>;
}
