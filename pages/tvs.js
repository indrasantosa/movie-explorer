import React from 'react'
import 'isomorphic-fetch'
import getConfig from 'next/config'

import withLayout from '../shared/MUI/withLayout'

import Poster from '../components/poster'
import SeasonInfo from '../components/seasonInfo'

const { publicRuntimeConfig } = getConfig()
const { apiUrl, apiKey } = publicRuntimeConfig

const Styles = {
  headerContainer: {
    position: 'relative',
    height: 500,
  },
  header: {
    color: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 500,
    width: '100%',
    WebkitFilter: 'saturate(2) brightness(40%)'
  },
  container: {
    maxWidth: 800,
    margin: 'auto',
    padding: 20
  },
  poster: {
    height: 200,
    float: 'left'
  },
  movieDetailContainer: {
    margin: '0px 0px 0px 160px',
    minHeight: 215
  }
}

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
          <div style={Styles.headerContainer}>
            <div style={{ ...Styles.backdrop, backgroundImage: `url(https://image.tmdb.org/t/p/w500${this.props.tv.backdrop_path})` }} />
            <div style={Styles.header}>
              <div style={Styles.container}>
                <h1>{this.props.tv.original_name}</h1>
                <img style={Styles.poster} src={`https://image.tmdb.org/t/p/w500${this.props.tv.poster_path}`} alt=""/>
                <div style={Styles.movieDetailContainer}>
                  <p>{this.props.tv.overview}</p>
                  <a href={this.props.tv.homepage}></a>
                  <div>
                    <span>Genre: </span>
                    {this.props.tv.genres.map(genre => genre.name).join(', ')}
                  </div>
                  <div>
                    {this.props.tv.production_companies.map(company => company.name).join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={Styles.container}>
            <h3>Trailers</h3>
            <div>
              {this.props.trailers.map(trailer => {
                if (trailer.site === 'YouTube') {
                  return (
                    <iframe width="250" height="148" src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
          
          <div style={Styles.container}>
            <h3>Seasons</h3>
            {this.props.tv.seasons.map(season => {
              return (
                <SeasonInfo season={season} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default withLayout(MovieDetail)