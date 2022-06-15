import { ErrorData } from "@/common/contracts/exception/exception.common.repo";

export type DomainErrorTree<T> = {
  [domain: string]: {
    [code: string]: T;
  };
};

export type DefaultBehaviourBody =
  | string
  | {
      title: string;
      message: string;
    };

export type BaseError =
  | {
      domain: string;
      code: number;
      data: ErrorData;
    }
  | undefined;
