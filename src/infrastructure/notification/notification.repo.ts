import { HeaderAppearance } from "@/ui-kit/components/modal/modal.component";

export type ModalAppearance = HeaderAppearance;

export enum ModalType {
  ALERT,
  CONFIRM,
}

interface AlertModal {
  id: number;
  type: ModalType.ALERT;
  title?: string;
  appearance?: HeaderAppearance;
  text: string;
}

interface ConfirmModal<T> {
  id: number;
  type: ModalType.CONFIRM;
  title?: string;
  appearance?: HeaderAppearance;
  text: string;
  onResult: (result: T) => void;
  onClose: () => void;
  resultOptions: Array<ResultButton<T>>;
}

export interface ResultButton<T> {
  label: string;
  type: "outline" | "main";
  value: T;
}

export type Modal<T> = AlertModal | ConfirmModal<T>;
