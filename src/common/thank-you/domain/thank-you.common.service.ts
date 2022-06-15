export interface BaseThankYouService {
  title: string;
  subTitle: string;
  buttonHandler: (() => void) | null;

  reset(): void;
}
