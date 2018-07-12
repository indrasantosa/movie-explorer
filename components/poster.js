import Link from 'next/link'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const Poster = ({ image, href = '#', as = '/' }) => {
  const componentStyle = {
    ...Styles.poster
  }

  return (
    <Link href={href} as={as} prefetch>
      <Card style={Styles.poster}>
        <CardMedia
          style={Styles.poster}
          image={image}
          title="Contemplative Reptile"
        />
      </Card>
    </Link>
  )
}

const Styles = {
  poster: {
    height: 270,
    width: 180,
    display: 'inline-block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }
}

export default Poster