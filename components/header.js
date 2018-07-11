import AppBar from 'material-ui/AppBar'

const Header = ({ title = 'HOOQS' }) => {
  return (
    <AppBar title={title} showMenuIconButton={false} />
  )
}

export default Header