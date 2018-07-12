import React from 'react'
import 'isomorphic-fetch'
import getConfig from 'next/config'

import withLayout from '../shared/MUI/withLayout'

import Header from '../components/header'
import Poster from '../components/poster'

const { publicRuntimeConfig } = getConfig()
const { apiUrl, apiKey } = publicRuntimeConfig

class MovieDetail extends React.Component {
  static async getInitialProps({ req, query, pathname }) {
    console.log(query, pathname)
    const tvId = query.id

    const response = await fetch(`${apiUrl}/tv/${tvId}?api_key=${apiKey}`)
    const data = await response.json()

    const trailerResponse = await fetch(`${apiUrl}/tv/${tvId}/videos?api_key=${apiKey}`)
    const trailerData = await trailerResponse.json()

    return {
      tv: data,
      trailers: trailerData.results
    }
  }

  render () {
    return (
      <div>
        <div>
          <h1>{this.props.tv.original_name}</h1>
          <p>{this.props.tv.overview}</p>
          <a href={this.props.tv.homepage}></a>
          <div>
            <span>Genre: </span>
            {this.props.tv.genres.map(genre => genre.name).join(', ')}
          </div>
          <div>
            {this.props.tv.production_companies.map(company => company.name).join(', ')}
          </div>
          <div>
            {this.props.tv.seasons.map(season => {
              return (
                <div>
                  <span>Season {season.season_number}</span>
                  <p>{season.overview}</p>
                  <p>{season.air_date}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <h3>Trailers</h3>
          <div>
            {this.props.trailers.map(trailer => {
              if (trailer.site === 'YouTube') {
                return (
                  <iframe width="300" height="168" src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                )
              } else {
                return null
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default withLayout(MovieDetail)