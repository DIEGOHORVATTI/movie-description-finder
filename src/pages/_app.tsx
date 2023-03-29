// i18n
import '../locales/i18n'

// highlight
import '@Utils/highlight'

// scroll bar
import 'simplebar/src/simplebar.css'

// lightbox
import 'react-image-lightbox/style.css'

// map
import 'mapbox-gl/dist/mapbox-gl.css'

// editor
import 'react-quill/dist/quill.snow.css'

// slick-carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

// fullcalendar
import '@fullcalendar/common/main.min.css'
import '@fullcalendar/daygrid/main.min.css'

import cookie from 'cookie'
// next
import { NextPage } from 'next'
import Head from 'next/head'
import App, { AppProps, AppContext } from 'next/app'
//
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
// redux
import { store, persistor } from '../redux/store'
// utils
import { getSettings } from '@Utils/settings'
import { SettingsValueProps } from '@Components/settings/type'
// contexts
import { SettingsProvider } from '../contexts/SettingsContext'
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext'
// theme
import ThemeProvider from '../theme'
// components
import Settings from '@Components/settings'
import { ChartStyle } from '@Components/chart'
import RtlLayout from '@Components/RtlLayout'
import ProgressBar from '@Components/ProgressBar'
import ThemeColorPresets from '@Components/ThemeColorPresets'
import NotistackProvider from '@Components/NotistackProvider'
import ThemeLocalization from '@Components/ThemeLocalization'
import MotionLazyContainer from '@Components/animate/MotionLazyContainer'

// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version

import { AuthProvider } from '../contexts/JWTContext'
// import { AuthProvider } from '../contexts/AwsCognitoContext';
// import { AuthProvider } from '../contexts/Auth0Context';
// import { AuthProvider } from '../contexts/FirebaseContext';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

interface MyAppProps extends AppProps {
  settings: SettingsValueProps
  Component: NextPageWithLayout
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, settings } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CollapseDrawerProvider>
                <SettingsProvider defaultSettings={settings}>
                  <ThemeProvider>
                    <NotistackProvider>
                      <MotionLazyContainer>
                        <ThemeColorPresets>
                          <ThemeLocalization>
                            <RtlLayout>
                              <ChartStyle />
                              <Settings />
                              <ProgressBar />
                              {getLayout(<Component {...pageProps} />)}
                            </RtlLayout>
                          </ThemeLocalization>
                        </ThemeColorPresets>
                      </MotionLazyContainer>
                    </NotistackProvider>
                  </ThemeProvider>
                </SettingsProvider>
              </CollapseDrawerProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </AuthProvider>
    </>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context)

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
  )

  const settings = getSettings(cookies)

  return {
    ...appProps,
    settings
  }
}