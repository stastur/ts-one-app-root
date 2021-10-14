declare namespace NodeJS {
  interface ProcessEnv {
    readonly ONE_CLIENT_CSP_REPORTING_URL: string
  }
}

declare const global: { BROWSER: boolean } & typeof globalThis

declare module '@americanexpress/one-app-router'
declare module '@americanexpress/one-app-ducks'
