import Link from 'next/link'
import Router from 'next/router'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'

const episodeDetail = ({ episode, onSeeDetail }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Episode {episode.episode_number} : {episode.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <img style={{ height: 120 }} src={`https://image.tmdb.org/t/p/w500${episode.still_path}`} alt=""/>
        <Typography style={{ margin: '0px 0px 0px 15px' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>Summary</span> <br />
            <p>{episode.overview || 'No description available'}</p>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Staring</span> <br />
            <p>

            </p>
            {episode.guest_stars.map(star => {
              return `${star.name} as ${star.character}`
            }).join(', ')}
          </div>
        </Typography>

      </ExpansionPanelDetails>
    </ExpansionPanel>
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

export default episodeDetail