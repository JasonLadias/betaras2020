import React, { useState, useEffect } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import axios from 'axios'
import savvas from '../Assets/savvas.jpg'
import jason from '../Assets/jason.jpg'
import byron from '../Assets/byron.jpg'
import { Histogram, DensitySeries, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';
import BarGraph from './BarGraph'


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
  },
  gridstats: {
    overflow: 'hidden',
    width: '100%'
  }
}))


const PersonalData = ({ name, url }) => {
  const classes = useStyles()
  const theme = useTheme()
  const belowSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [bestLeague, setBestLeague] = useState(null)
  const [worstLeague, setWorstLeague] = useState(null)
  const [bestTeam, setBestTeam] = useState(null)
  const [worstTeam, setWorstTeam] = useState(null)
  const [statsPerWeek, setStatsPerWeek] = useState([])
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
      array = []
      axios.get(`http://localhost:8080/${url}/weekly`)
      .then((res) => {
        let sumWon = 0
        let sumPlayed = 0
        res.data.forEach((res) =>{
          sumWon += res.won
          sumPlayed += res.played
          array = [
            ...array,
            {
              id: res.id,
              date: res.date,
              percentage: ((sumWon / sumPlayed)*100).toFixed(1)
            }
          ]
        })
        setStatsPerWeek(array)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Box
        display='flex'  
        flexDirection='row'
        flexWrap='wrap'
        width='100%'
      >
        <Box width={belowSmall?'100%':'30%'}>
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
              <Grid container direction='row' justify='space-between' className={classes.gridstats}>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="body1" align='left'>
                    Καλύτερο προτάθλημα:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="h6" align='left'  >
                    {bestLeague ? `${bestLeague.league} => ${Number(bestLeague.percentage*100).toFixed(1)}%`: null} 
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction='row' justify='space-between' className={classes.gridstats}>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="body1" align='left'>
                    Χειρότερο προτάθλημα:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="h6" align='left'>
                    {worstLeague ? `${worstLeague.league} => ${Number(worstLeague.percentage*100).toFixed(1)}%` : null}                
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction='row' justify='space-between' className={classes.gridstats}>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="body1" align='left'>
                    Καλύτερη ομάδα:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="h6" align='left'>
                    {bestTeam ? `${bestTeam.team} => ${Number(bestTeam.percentage*100).toFixed(1)}%` : null }
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction='row' justify='space-between' className={classes.gridstats}>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="body1" align='left' >
                    Χειρότερη ομάδα:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={12} >
                  <Typography gutterBottom variant="h6" align='left'>
                    {worstTeam ? `${worstTeam.team} => ${Number(worstTeam.percentage*100).toFixed(1)}%`: null} 
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box> 
        <Box width={belowSmall?'100%':'70%'}>
          <Grid container direction='row' justify='space-between'>
            <Grid item xl={12}>
              <BarGraph stats={statsPerWeek}/>
            </Grid>
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