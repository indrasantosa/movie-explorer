import React from 'react'
import 'isomorphic-fetch'
import getConfig from 'next/config'

import Button from '@material-ui/core/Button'

import withLayout from '../shared/MUI/withLayout'
import Header from '../components/header'
import Poster from '../components/poster'

const { publicRuntimeConfig } = getConfig()
const { apiUrl, apiKey } = publicRuntimeConfig

class Index extends React.Component {
  static async getInitialProps({ req }) {
    const response = await fetch(`${apiUrl}/discover/tv?api_key=${apiKey}`)
    const data = await response.json()
    return {
      movies: data.results
    }
  }

  render () {
    return (
      <div>
        {/* <Header /> */}
        <Button variant="raised">
          MUI button
        </Button>
        {this.props.movies.map(item => {
          return (
            <Poster key={item.id} href={{ pathname: `/tvs`, query: { id: item.id } }} as={`/tv/${item.id}`} image={`url(https://image.tmdb.org/t/p/w500${item.poster_path}`} />
          )
        })}
      </div>
    )
  }
}

export default withLayout(Index)