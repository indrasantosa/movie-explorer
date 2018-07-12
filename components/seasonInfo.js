import Link from 'next/link'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'

const SeasonInfo = ({ season }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{season.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <img style={{ height: 120 }} src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt=""/>
        <Typography style={{ margin: '0px 0px 0px 15px' }}>
          <span style={{ fontWeight: 'bold' }}>Summary</span> <br />
          {season.overview || 'No description available'}
          <p>{season.episode_count} episode(s)</p>
          <Button variant="contained" color="primary">See All</Button>
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

export default SeasonInfo