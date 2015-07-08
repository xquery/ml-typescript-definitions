declare module xdmp {
  export function documentInsert(uri: string, content: any)

  export interface HttpOptions {

  }

  export function directory(dir:string, depth?:number):cts.ValueIterator<any>
  export function nodeUri(node:Node):string

  export function httpGet(uri: string, options: HttpOptions)
  export function httpPost(uri: string, options: HttpOptions, data: any)
  export function httpPut(uri: string, options: HttpOptions, data: any)
  export function httpDelete(uri: string, options: HttpOptions)

}

declare module cts {
  export interface DocumentNode {
    root:any
    toObject():any
  }

  export interface ValueIterator<T> extends Iterator<DocumentNode> {
    count: number
    clone(): ValueIterator<T>
    toArray(): T[]
  }

  export interface Reference {
  }

  export function pathReference(path: string):Reference

  export function values(reference: Reference):ValueIterator<string>

  export function frequency(value:string):number

  export function doc(uri:string): DocumentNode
}

declare module fn {
  export function doc(uri:string): cts.ValueIterator<any>
}

declare function declareUpdate(): void
