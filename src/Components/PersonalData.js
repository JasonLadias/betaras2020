import React, { useState, useEffect } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import axios from 'axios'
import savvas from '../Assets/savvas.jpg'
import jason from '../Assets/jason.jpg'
import byron from '../Assets/byron.jpg'
import miltos from '../Assets/miltos.jpg'
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

  const [stats, setStats] = useState(null)
  const [seriStats, setSeriStats] = useState([])
  const [bestLeague, setBestLeague] = useState(null)
  const [worstLeague, setWorstLeague] = useState(null)
  const [bestTeam, setBestTeam] = useState(null)
  const [worstTeam, setWorstTeam] = useState(null)
  const [statsPerWeek, setStatsPerWeek] = useState([])
  const [image, setImage] = useState(null)

  useEffect(() => {
    switch (url) {
      case 'jason':
        setImage(jason)
        break
      case 'savvas':
        setImage(savvas)
        break
      case 'byron':
        setImage(byron)
        break
      case 'miltos':
        setImage(miltos)
        break  
      default:
        break
    }
  }, [])

  useEffect(() => {
    let array
    axios.get(`http://localhost:8080/${url}`)
      .then((res) => {
        setStats(res.data[0].percentage)
      })
      .catch((err) => {
        console.log(err)
      })
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
        let seriWon = 0
        let seriPlayed = 0
        res.data.forEach((res) =>{
          sumWon += res.won
          sumPlayed += res.played
          array = [
            ...array,
            {
              id: res.id,
              date: res.date,
              overallPercentage: ((sumWon / sumPlayed)*100).toFixed(1),
              percentage: ((res.won / res.played)*100).toFixed(1)
            }
          ]
        })
        setStatsPerWeek(array)
        let cnt = 6
        let newArray = []
        while( cnt > 0) {
          seriWon += res.data[res.data.length - cnt].won
          seriPlayed += res.data[res.data.length - cnt].played
          newArray = [
            ...newArray,
            {
              id: res.data[res.data.length - cnt].id,
              date: res.data[res.data.length - cnt].date,
              overallPercentage: ((seriWon / seriPlayed)*100).toFixed(1)
            }
          ]
          cnt--
        }
        setSeriStats(newArray)
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
                {`${name} - ${stats ? Number(stats).toFixed(1) + '%': null}`} 
              </Typography>
              <Grid container direction='row' justify='space-between' className={classes.gridstats}>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="body1" align='left'>
                    Καλύτερο προτάθλημα:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <Typography gutterBottom variant="h6" align='left'  >
                    {bestLeague ? `${bestLeague.league} => ${Number(bestLeague.percentage*100).toFixed(1)}% => ${bestLeague.won} / ${bestLeague.played}`: null} 
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
                    {worstLeague ? `${worstLeague.league} => ${Number(worstLeague.percentage*100).toFixed(1)}% => ${worstLeague.won} / ${worstLeague.played}` : null}                
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
                    {bestTeam ? `${bestTeam.team} => ${Number(bestTeam.percentage*100).toFixed(1)}% => ${bestTeam.totalWins} / ${bestTeam.cnt}` : null }
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
                    {worstTeam ? `${worstTeam.team} => ${Number(worstTeam.percentage*100).toFixed(1)}% => ${worstTeam.totalWins} / ${worstTeam.cnt}`: null} 
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box> 
        <Box width={belowSmall?'100%':'70%'}>
          <Grid container direction='row' justify='space-between'>
            <Grid item xl={12}>
              <Box width='100%'><Typography variant='h6' align='center'>Αθροιστικά ποσοστά</Typography></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='100%'><BarGraph stats={statsPerWeek}/></Box>
            </Grid>
            <Grid item xl={12}>
              <Box width='100%'><Typography variant='h6' align='center'>Τελευταία ποσοστά</Typography></Box>
              <Box display='flex' flexDirection='column' alignItems='center' width='100%'><BarGraph stats={seriStats}/></Box>
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