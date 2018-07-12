import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Head from 'next/head'
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TWO,
  PRIMARY_COLOR_THREE
} from './theme'

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {

    static async getInitialProps(ctx) {
      const { req } = ctx
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
      const subProps = await ComposedComponent.getInitialProps(ctx)

      return {
        ...subProps,
        userAgent
      }
    }

    render () {
      const { userAgent } = this.props
      // const Lato = 'lato, sans-serif'
      // const muiTheme = createMuiTheme({
      //   // typography: {
      //   //   fontFamily: Lato
      //   // },
      //   palette: {
      //     primary: {
      //       main: PRIMARY_COLOR
      //     },
      //     secondary: {
      //       main: PRIMARY_COLOR_TWO
      //     }
      //   }
      // })
      const muiTheme = createMuiTheme()

      return (
        <div>
          <Head>
            <title>HOOQS</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' />
            <style>
              
            </style>
          </Head>
          <MuiThemeProvider theme={muiTheme}>
            <ComposedComponent {...this.props} />
          </MuiThemeProvider>
        </div>
      )
    }

  }

  return HOC
}

export default withMaterialUI