import { makeAutoObservable } from "mobx";
import { BaseSidebarService } from "@/common/sidebar/domain/sidebar.common.service";


export class SidebarService implements BaseSidebarService {
  private _selectedItem: string;

  constructor() {
    this._selectedItem = '';

    makeAutoObservable(this);
  }

  get selectedItem(): string {
    return this._selectedItem;
  }

  set selectedItem(value: string) {
    this._selectedItem = value;
  }
}
