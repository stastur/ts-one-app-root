import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks'
import { Route } from '@americanexpress/one-app-router'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import type { Dispatch } from 'redux'
import type { ChangeEvent } from 'react'

import { OneAppRoot } from './types'
import { Counter } from './Counter'
import { appConfig } from '../appConfig'

import i18nResource from '../../locale/en-CA.json'

interface TSOneAppRootProps {
  localeName: string
  languageData: typeof i18nResource

  moduleLoadStatus: 'loading' | 'loaded' | 'error'
  moduleState: unknown

  switchLanguage: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const TsOneAppRoot: OneAppRoot<TSOneAppRootProps> = ({ switchLanguage, languageData, localeName }) => {
  const locales = ['en-US', 'en-CA', 'es-MX']

  if (!languageData.greeting) {
    return null
  }

  return (
    <IntlProvider locale={localeName} messages={languageData}>
      <div>
        <span id="greeting-message">
          <h1>
            <FormattedMessage id="greeting" />
          </h1>
        </span>

        <div>
          <Counter />
        </div>

        <div id="locale">
          <label htmlFor="locale-selector">
            <p>Choose a locale:</p>
            <select name="locale" id="locale-selector" onChange={switchLanguage}>
              {locales.map(locale => (
                <option key={locale} value={locale}>
                  {locale}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </IntlProvider>
  )
}

TsOneAppRoot.childRoutes = [<Route path="/" />]

if (!global.BROWSER) {
  TsOneAppRoot.appConfig = appConfig
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchLanguage: ({ target }: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateLocale(target.value))
    dispatch(loadLanguagePack('ts-one-app-root', { fallbackLocale: 'en-US' }))
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: any) => {
  const localeName = state.getIn(['intl', 'activeLocale'])
  const languagePack = state
    .getIn(['intl', 'languagePacks', localeName, 'ts-one-app-root'], fromJS({}))
    .toJS()

  return {
    languageData: languagePack?.data || {},
    localeName,
  }
}

TsOneAppRoot.holocron = {
  name: 'ts-one-app-root',

  loadModuleData: ({ store: { dispatch } }) =>
    dispatch(loadLanguagePack('ts-one-app-root', { fallbackLocale: 'en-US' })),
}

export default connect(mapStateToProps, mapDispatchToProps)(TsOneAppRoot)
