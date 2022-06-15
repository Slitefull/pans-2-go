export type ExceptionHandler = (data: ErrorData) => boolean;

export type ErrorData = {
  [key: string]: number | string | null;
} | null;

export interface BaseExceptionService {
  subscribe(
    domain: string,
    code: number,
    handler: ExceptionHandler
  ): () => void;
}
