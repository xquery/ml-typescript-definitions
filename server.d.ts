declare module xdmp {
  export function documentInsert(uri: string, content: any)

  export interface HttpOptions {

  }

  export function httpGet(uri: string, options: HttpOptions)
  export function httpPost(uri: string, options: HttpOptions, data: any)
  export function httpPut(uri: string, options: HttpOptions, data: any)
  export function httpDelete(uri: string, options: HttpOptions)

}

declare function declareUpdate(): void