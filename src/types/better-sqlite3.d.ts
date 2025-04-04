declare module 'better-sqlite3' {
  interface RunResult {
    changes: number;
    lastInsertRowid: number;
  }

  interface Statement {
    run(...params: any[]): RunResult;
    get(...params: any[]): any;
    all(...params: any[]): any[];
    iterate(...params: any[]): IterableIterator<any>;
    bind(...params: any[]): Statement;
    pluck(toggle?: boolean): Statement;
    raw(toggle?: boolean): Statement;
  }

  interface DatabaseOptions {
    readonly?: boolean;
    fileMustExist?: boolean;
    timeout?: number;
    verbose?: (...params: any[]) => void;
  }

  class Database {
    constructor(filename: string, options?: DatabaseOptions);
    prepare(source: string): Statement;
    transaction<T extends (...args: any[]) => any>(fn: T): T;
    exec(sql: string): void;
    close(): void;
  }

  export default Database;
}
