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

class Search extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      displayedSeries: props.movies,
      nextPage: 2,
      isLoading: false,
      isSearching: false
    }
  }

  componentWillReceiveProps (nextProps, nextState) {
    // If there is a differnce 1
    if (this.searchTimeout) {
      this.searchTimeout()
    }
    if (nextProps.url && this.props.url.query.search !== nextProps.url.query.search) {
      const self = this
      this.searchTimeout = setTimeout(() => {
        self._doNewSearch(nextProps.url.query.search)
      }, 1000)
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
    if (this.searchTimeout) {
      this.searchTimeout()
    }
    window.removeEventListener('scroll', this._checkLoadNextItem)
  }

  _doNewSearch = async (newSearchTerm) => {
    this.setState({ isLoading: true })
    const response = await fetch(`${apiUrl}/search/tv?query=${newSearchTerm}page=1&api_key=${apiKey}`)
    const data = await response.json()
    let newAggregatedData = this.state.displayedSeries.concat(data.results)
    this.setState({
      displayedSeries: newAggregatedData,
      isLoading: false,
      nextPage: 2
    })
  }

  _loadNextItem = async () => {
    this.setState({ isLoading: true })
    const response = await fetch(`${apiUrl}/search/tv?query=${this.props.url.query.search}&page=${this.state.nextPage}&api_key=${apiKey}`)
    const data = await response.json()
    let newAggregatedData = this.state.displayedSeries.concat(data.results)
    this.setState({
      displayedSeries: newAggregatedData,
      isLoading: false,
      nextPage: this.state.nextPage + 1
    })
  }

  static async getInitialProps({ req, query }) {
    const { search } = query
    const response = await fetch(`${apiUrl}/search/tv?query=${search}&api_key=${apiKey}`)
    const data = await response.json()
    return {
      movies: data.results
    }
  }

  _renderContentContainer = () => {
    if (this.state.isLoading) {

    } else if (this.state.displayedSeries.length > 0) {
      return this.state.displayedSeries.filter(o => o.poster_path).map(item => {
        return (
          <div style={Styles.card} key={item.id}>
            <Poster key={item.id} href={{ pathname: `/tvs`, query: { id: item.id } }} as={`/tv/${item.id}`} image={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
          </div>
        )
      })
    } else {
      return (
        <div>
          <h3>There is no result</h3>
        </div>
      )
    }
    
  }

  render () {
    return (
      <div ref={'container'} style={Styles.container}>
        <div>
          <h2>Search Result</h2>
          {this._renderContentContainer()}
        </div>
        <div>
          
        </div>
      </div>
    )
  }
}

export default withLayout(Search)

const Styles = {
  container: {
    maxWidth: 800,
    margin: 'auto'
  },
  card: {
    display: 'inline-block',
    margin: '0px 15px 15px 0px',
    cursor: 'pointer'
  }
}