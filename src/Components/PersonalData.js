import React, { useState, useEffect } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import axios from 'axios'
import savvas from '../Assets/savvas.jpg'
import jason from '../Assets/jason.jpg'
import byron from '../Assets/byron.jpg'

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%'
  },
  media: {
    height: '300px'
  },  
  container: {
    padding: '24px 6px',
    overflow: 'hidden'
  }
}))

const PersonalData = ({ name, url }) => {
  const classes = useStyles()
  const theme = useTheme()
  const belowMedium = useMediaQuery(theme.breakpoints.down('md'))

  const [bestLeague, setBestLeague] = useState(null)
  const [worstLeague, setWorstLeague] = useState(null)
  const [bestTeam, setBestTeam] = useState(null)
  const [worstTeam, setWorstTeam] = useState(null)
  const [image, setImage] = useState(savvas)

  useEffect(() => {
    let array
    axios.get(`http://localhost:8080/${url}/league`)
      .then((res) => {
        setWorstLeague(res.data[0])
        setBestLeague(res.data[res.data.length-1])
      })
      .catch((err) => {
        console.log(err)
      })
      array = []
      axios.get(`http://localhost:8080/${url}/team`)
      .then((res) => {
        setWorstTeam(res.data[0])
        setBestTeam(res.data[res.data.length-1])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(bestTeam)
  console.log(worstLeague)

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Box
        display='flex'  
        flexDirection='row'
        flexWrap='wrap'
        width='100%'
      >
        <Box width={belowMedium?'100%':'30%'}>
          <Card className={classes.card}>
            <CardMedia 
              component='img'
              alt='Jason'
              className={classes.media}
              image={image}
              title='Jason'
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align='center'>
                {name}
              </Typography>
              <Typography gutterBottom variant="body1" align='left'>
                Καλύτερο προτάθλημα: {bestLeague ? `${bestLeague.league} ${bestLeague.percentage}`: null} 
              </Typography>
              <Typography gutterBottom variant="body1" align='left'>
                Χειρότερο προτάθλημα: {worstLeague ? `${worstLeague.league} ${worstLeague.percentage}` : null}
              </Typography>
              <Typography gutterBottom variant="body1" align='left'>
                Καλήτερη ομάδα: {bestTeam ? `${bestTeam.team} ${bestTeam.percentage}` : null }
              </Typography>
              <Typography gutterBottom variant="body1" align='left'>
                Χειρότερη ομάδα: {worstTeam ? `${worstTeam.team} ${worstTeam.percentage}` : null}
              </Typography>
            </CardContent>
          </Card>
        </Box> 
        <Box width={belowMedium?'100%':'70%'}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={4}>
            
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>

            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>

            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
  )
}

export default PersonalData