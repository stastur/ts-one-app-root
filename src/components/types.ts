import { Reducer, Store } from 'redux'
import type { FC } from 'react'

export interface OneAppRoot<TProps> extends FC<TProps> {
  /**
   * see https://github.com/americanexpress/holocron/tree/main/packages/holocron-module-route#module-lifecycle-hooks
   */
  childRoutes: JSX.Element | JSX.Element[] | ((store: Store) => JSX.Element | JSX.Element[])

  /**
   * see https://github.com/americanexpress/holocron/blob/main/packages/holocron/docs/api/README.md#holocron-module-configuration
   */
  holocron: {
    name: string
    reducer?: Reducer
    loadModuleData?: ({
      store,
      fetchClient,
      ownProps,
      module,
    }: {
      store: Store
      fetchClient: unknown
      ownProps: unknown
      module: unknown
    }) => Promise<unknown>
    shouldModuleReload?: <T = TProps>(oldProps: T, newProps: T) => boolean
    mergeProps?: <TStateProps = unknown, TDispatchProps = unknown, TOwnProps = unknown>(
      stateProps: TStateProps,
      dispatchProps: TDispatchProps,
      ownProps: TOwnProps
    ) => TProps
    options?: boolean
  }

  /**
   * see https://github.com/americanexpress/one-app/blob/main/docs/api/modules/App-Configuration.md
   */
  appConfig: {
    provideStateConfig?: {
      [settingName: string]: {
        [side in 'client' | 'server']:
          | {
              [environment in 'development' | 'staging' | 'production' | 'local']: string
            }
          | boolean
      }
    }
    csp: string
    corsOrigins?: string[]
    pwa?: {
      serviceWorker: boolean
      recoveryMode: boolean
      escapeHatch: boolean
      scope: string
      webManifest: (clientConfig: unknown) => unknown
    }
    configureRequestLog?: (req: unknown, res: unknown) => unknown
    extendSafeRequestRestrictedAttributes?: {
      headers: string[]
      cookies: string[]
    }
    createSsrFetch?: (
      req: unknown,
      res: unknown
    ) => (fetch: unknown) => (fetchUrl: string, fetchOpts: unknown) => Promise<unknown>
    eventLoopDelayThreshold?: number
    errorPageUrl?: string
    requiredSafeRequestRestrictedAttributes?: {
      headers: string[]
      cookies: string[]
    }
  }
}
