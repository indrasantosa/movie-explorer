import { PRIMARY_COLOR } from '../shared/MUI/theme'

const Header = ({ title = 'HOOQS' }) => {
  const styles = {
    ...Styles.component,
    backgroundColor: PRIMARY_COLOR
  }

  return (
    <div style={styles}>
      {title}
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