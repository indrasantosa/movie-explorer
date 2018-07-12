import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link'
import Router from 'next/router'

import SearchBar from '../components/searchBar'

import { PRIMARY_COLOR } from '../shared/MUI/theme'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

function onChange (e) {
  const value = e.target.value
  if (value) {
    Router.push({
      pathname: '/search',
      query: {
        search: value
      }
    })
  } else {
    Router.push({
      pathname: '/'
    })
  }
}

const Header = (props) => {
  const search = props.url.query.search

  return (
    <div className={styles.root} key={'headerBar'}>
      <AppBar position="static">
        <Toolbar>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={styles.flex}>
            <Link href={'/'}>
              <span style={{ color: '#fff' }}>HOOQS</span>
            </Link>
          </Typography>
          <SearchBar value={search} onChange={onChange} ref={this.searchBar} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const Styles = {
  component: {
    backgroundColor: PRIMARY_COLOR,
    color: '#fff',
    padding: 10
  }
}

export default Header