declare namespace NGoogleMapsLoaderService {

  interface ILoadOptions{
    client?: string;
    key?: string;
    language?: string;
    libraries?: string[]
    timeout?: string;
    v?: string;
  }

  interface IWindowWithGoogle extends Window{
    google: any
  }

  export function loadGoogleMapsAPI(
    obj: ILoadOptions
  ): Promise<any>;

}

declare module 'MGoogleMapsLoader' {
  export = NGoogleMapsLoaderService;
}
