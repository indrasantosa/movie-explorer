import withMUI from '../shared/MUI/withMUI'
import Header from '../components/header'

const Index = ({ title = 'Hello from next.js'}) => {
  return (
    <div>
      <Header />
      {title}
    </div>
  )
}

export default withMUI(Index)