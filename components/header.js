import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link'

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

const Header = ({ title = 'HOOQS' }) => {
  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={styles.flex}>
            <Link style={{ color: '#fff' }} href={'/'}>
              HOOQS
            </Link>
          </Typography>
          <SearchBar />
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