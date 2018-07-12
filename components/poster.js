import Link from 'next/link'

const Poster = ({ image, href = '#', as = '/' }) => {
  const componentStyle = {
    ...Styles.poster,
    backgroundImage: `${image})`
  }

  return (
    <Link href={href} as={as} prefetch>
      <div style={componentStyle} />
    </Link>
  )
}

const Styles = {
  poster: {
    height: 360,
    width: 240,
    display: 'inline-block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }
}

export default Poster