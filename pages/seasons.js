import React from 'react'
import 'isomorphic-fetch'
import getConfig from 'next/config'

import withLayout from '../shared/MUI/withLayout'

import Poster from '../components/poster'
import SeasonInfo from '../components/seasonInfo'
import EpisodeDetail from '../components/episodeDetail'

const { publicRuntimeConfig } = getConfig()
const { apiUrl, apiKey } = publicRuntimeConfig

const Styles = {
  headerContainer: {
    position: 'relative',
    height: 500,
  },
  header: {
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
    const { tvId, seasonId } = query

    const response = await fetch(`${apiUrl}/tv/${tvId}/season/${seasonId}?api_key=${apiKey}`)
    const data = await response.json()

    return {
      season: data
    }
  }

  render () {
    return (
      <div>
        <div>
          <div style={Styles.headerContainer}>
            {/* <div style={{ ...Styles.backdrop, backgroundImage: `url(https://image.tmdb.org/t/p/w500${this.props.tv.backdrop_path})` }} /> */}
            <div style={Styles.header}>
              <div style={Styles.container}>
                <h1>{this.props.season.name}</h1>
                <img style={Styles.poster} src={`https://image.tmdb.org/t/p/w500${this.props.season.poster_path}`} alt=""/>
                <div style={Styles.movieDetailContainer}>
                  <p>{this.props.season.overview}</p>
                  <span>Released: {this.props.season.air_date}</span>
                  {/* <div>
                    <span>Genre: </span>
                    {this.props.tv.genres.map(genre => genre.name).join(', ')}
                  </div>
                  <div>
                    {this.props.tv.production_companies.map(company => company.name).join(', ')}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div style={Styles.container}>
            <h2>Episodes</h2>
            {this.props.season.episodes.map(episode => {
              return (
                <EpisodeDetail episode={episode} />
                // <div>
                //   <img src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt=""/>
                //   <h3>Episode {episode.episode_number} : {episode.name}</h3>
                //   <p>{episode.overview}</p>
                // </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default withLayout(MovieDetail)