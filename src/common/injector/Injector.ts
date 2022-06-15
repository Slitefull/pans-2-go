export class Injector {
  private map: Map<any, any> = new Map();

  public get<T>(key: string): T {
    return this.map.get(key);
  }

  public set<T>(key: string, value: T): void {
    this.map.set(key, value);
  }
}

export const injector = new Injector();

declare global {
  interface Window {
    injector: Injector;
  }
}

window.injector = injector;
