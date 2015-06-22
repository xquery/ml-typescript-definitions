declare module Marklogic {
  export interface DocumentsByUri {
    [uri: string]: any
  }

  export interface ResultProvider<R> extends NodeJS.ReadWriteStream {
    result<U>(onFulfill: (value: R) => Promise<U>, onReject: (error: any) => Promise<U>, onProgress?: (note: any) => any): Promise<U>
    result<U>(onFulfill: (value: R) => Promise<U>, onReject?: (error: any) => U, onProgress?: (note: any) => any): Promise<U>
    result<U>(onFulfill: (value: R) => U, onReject: (error: any) => Promise<U>, onProgress?: (note: any) => any): Promise<U>
    result<U>(onFulfill?: (value: R) => U, onReject?: (error: any) => U, onProgress?: (note: any) => any): Promise<U>
  }

  export interface ConnectionParams {
    host?: string
    port?: number
    database: string
    user: string
    password: string
    authType?: string
    ssl?: string
    agent?: any
  }

  export interface Client {
    connectionParams: ConnectionParams

    eval: <U>(source: string, variables?: ServerExec.Variables, txid?: string) => ResultProvider<U>
    xqueryEval: <U>(source: string, variables?: ServerExec.Variables, txid?: string) => ResultProvider<U>
    invoke: <U>(path: string, variables?: ServerExec.Variables, txid?: string) => ResultProvider<U>

    createCollection: (collection: string, content: any) => ResultProvider<string[]>

    probeClient: (uri: string) => ResultProvider<boolean>

    queryCollection: (collection: string, query: any) => ResultProvider<Object[]>

    read: (uris: string|string[]) => ResultProvider<Object[]>

    remove: (uri: string) => ResultProvider<string>

    removeCollection: (collection: string) => ResultProvider<string>

    writeCollection: (collection: string, documents: DocumentsByUri) => ResultProvider<string[]>

    release: () => void

    setLogger: (logger: MLLog.Logger, isErrorFirst?: boolean) => void

    getLogger: () => MLLog.Logger
  }

  export function createDatabaseClient(connectionParams: ConnectionParams): Client

  export function queryBuilder()

  export function patchBuilder()

  export function valuesBuilder()
}

declare module MLLog {
  export interface Logger {
    debug: (...args: any[]) => void
    info: (...args: any[]) => void
    warn: (...args: any[]) => void
    error: (...args: any[]) => void
    silent: (...args: any[]) => void
  }

  export class DelegatingLogger implements Logger {
    setLevel: (level: string) => void
    debug: (...args: any[]) => void
    info: (...args: any[]) => void
    warn: (...args: any[]) => void
    error: (...args: any[]) => void
    silent: (...args: any[]) => void
  }

  export class ConsoleLogger implements Logger {
    debug: (...args: any[]) => void
    info: (...args: any[]) => void
    warn: (...args: any[]) => void
    error: (...args: any[]) => void
    silent: (...args: any[]) => void
  }
}

declare module MLRest {
  export interface OutputTransform {
    format: string,
    datatype: string,
    value: string
  }

  export interface Headers {
    [header: string]: string
  }

  export interface Options {
    method: string,
    path: string,
    headers?: Headers
  }

  export interface Data {
    content: string
  }

  export interface Operation {
    name: string
    client: Marklogic.Client
    logger: MLLog.Logger
    options: Options
    requestType: string
    responseType: string
    validStatusCodes?: string[]
    inlineAsDocument?: boolean
    requestBody?: string
    outputTransform?: (headers: Headers, data: Data) => OutputTransform
  }

  export function initClient(client: Marklogic.Client, inputParams: Marklogic.ConnectionParams): void
  export function setLoggerLevel(logger: MLLog.Logger, level: string): void
  export function createOperation(name: string, client: Marklogic.Client, options: Options, requestType: string, responseType: string): Operation
  export function startRequest<U>(operation: Operation): Marklogic.ResultProvider<U>
  export function marshal(data): any
}

declare module ServerExec {
  export interface Variables {
    [name: string]: number|string|boolean
  }

  export function serverJavaScriptEval<U>(source: string, variables: Variables, txid: string): Marklogic.ResultProvider<U>

  export function serverXQueryEval<U>(source: string, variables: Variables, txid: string): Marklogic.ResultProvider<U>

  export function serverInvoke<U>(path: string, variables: Variables, txid: string): Marklogic.ResultProvider<U>
}

declare module MLUtil {
  export function databaseParam(connectionParams: Marklogic.ConnectionParams, endpoint: string, separator: string)
}

declare module 'marklogic' {
  export = Marklogic
}

declare module 'marklogic/lib/mllog' {
  export = MLLog
}

declare module 'marklogic/lib/mlrest' {
  export = MLRest
}

declare module 'marklogic/lib/mlutil' {
  export = MLUtil
}
