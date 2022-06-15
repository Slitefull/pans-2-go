import { action, makeAutoObservable } from "mobx";
import { BaseThankYouService } from "@/common/thank-you/domain/thank-you.common.service";


export class ThankYouService implements BaseThankYouService {
  private _title: string;
  private _subTitle: string;
  private _buttonText: string;
  private _buttonHandler: (() => void) | null;

  constructor() {
    this._title = '';
    this._subTitle = '';
    this._buttonText = '';
    this._buttonHandler = null;

    makeAutoObservable(this);
  }

  @action
  reset() {
    this._title = '';
    this._subTitle = '';
    this._buttonText = '';
    this._buttonHandler = null;
  }

  get title(): string {
    return this._title;
  }

  get subTitle(): string {
    return this._subTitle;
  }

  get buttonHandler(): (() => void) | null {
    return this._buttonHandler;
  }

  get buttonText(): string {
    return this._buttonText;
  }

  set buttonText(value: string) {
    this._buttonText = value;
  }

  set buttonHandler(value: (() => void) | null) {
    this._buttonHandler = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set subTitle(value: string) {
    this._subTitle = value;
  }
}
