import React from 'react'
import 'isomorphic-fetch'
import getConfig from 'next/config'

import Button from '@material-ui/core/Button'

import withLayout from '../shared/MUI/withLayout'
import Header from '../components/header'
import Poster from '../components/poster'

const { publicRuntimeConfig } = getConfig()
const { apiUrl, apiKey } = publicRuntimeConfig
const isServer = typeof window === 'undefined' ? true : false
const isClient = !isServer

class Index extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      displayedSeries: props.movies,
      nextPage: 2,
      isLoading: false
    }
  }

  _isScrollEnding = () => {
    const self = this
    if (self.refs.container.clientHeight - window.innerHeight - window.scrollY < 300) {
      return true
    } else {
      return false
    }
  }

  _checkLoadNextItem = () => {
    const self = this
    if (this._isScrollEnding() && !self.state.isLoading) {
      self._loadNextItem()
    }
  }

  componentDidMount () {
    const self = this
    if (isClient) {
      window.addEventListener('scroll', this._checkLoadNextItem)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._checkLoadNextItem)
  }

  _loadNextItem = async () => {
    this.setState({ isLoading: true })
    const response = await fetch(`${apiUrl}/discover/tv?page=${this.state.nextPage}&api_key=${apiKey}`)
    const data = await response.json()
    let newAggregatedData = this.state.displayedSeries.concat(data.results)
    this.setState({
      displayedSeries: newAggregatedData,
      isLoading: false,
      nextPage: this.state.nextPage + 1
    })
  }

  static async getInitialProps({ req }) {
    const response = await fetch(`${apiUrl}/discover/tv?api_key=${apiKey}`)
    const data = await response.json()
    return {
      movies: data.results
    }
  }

  render () {
    return (
      <div ref={'container'} style={Styles.container}>
        <div>
          <h2>Hot now</h2>
          {this.state.displayedSeries.map(item => {
            return (
              <div style={Styles.card} key={item.id}>
                <Poster key={item.id} href={{ pathname: `/tvs`, query: { id: item.id } }} as={`/tv/${item.id}`} image={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
              </div>
            )
          })}
        </div>
        <div>
          
        </div>
      </div>
    )
  }
}

export default withLayout(Index)

const Styles = {
  container: {
    maxWidth: 815,
    padding: 15,
    margin: 'auto'
  },
  card: {
    display: 'inline-block',
    margin: '0px 15px 15px 0px',
    cursor: 'pointer'
  }
}