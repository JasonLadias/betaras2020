import { Box, Card, CardContent, CardHeader, Container, Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GeneralBarGraph from './GeneralBarGraph'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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

const GeneralData = () => {
  const classes = useStyles()
  const [generalStats, setGeneralStats] = useState([])
  const [overall, setOverall] = useState(0)
  const [bestSept, setBestSept] = useState(null)
  const [worstSept, setWorstSept] = useState(null)
  const [bestNov, setBestNov] = useState(null)
  const [worstNov, setWorstNov] = useState(null)

  useEffect(() => {
    let array = []
    axios.get('http://localhost:8080/weekly')
      .then((res) => {
        let sumWonJason = 0
        let sumPlayedJason = 0
        let sumWonSavvas = 0
        let sumPlayedSavvas = 0
        let sumWonMiltos = 0
        let sumPlayedMiltos = 0
        let sumWonByron = 0
        let sumPlayedByron = 0
        res.data.forEach((res) => {
          sumWonJason += res.wonJason
          sumPlayedJason += res.playedJason
          sumWonSavvas += res.wonSavvas
          sumPlayedSavvas += res.playedSavvas
          sumWonMiltos += res.wonMiltos
          sumPlayedMiltos += res.playedMiltos
          sumWonByron += res.wonByron
          sumPlayedByron += res.playedByron
          array = [
            ...array,
            {
              id: res.id,
              date: res.date,
              percentageJason: ((sumWonJason / sumPlayedJason) * 100).toFixed(1),
              percentageSavvas: ((sumWonSavvas / sumPlayedSavvas) * 100).toFixed(1),
              percentageMiltos: ((sumWonMiltos / sumPlayedMiltos) * 100).toFixed(1),
              percentageByron: ((sumWonByron / sumPlayedByron) * 100).toFixed(1)
            }
          ]
        })
        setGeneralStats(array)
        const over = ((Number(array[array.length - 1].percentageJason) + Number(array[array.length - 1].percentageSavvas) + Number(array[array.length - 1].percentageMiltos) + Number(array[array.length - 1].percentageByron)) / 4).toFixed(1)
        setOverall(over)
      })
    axios.get('http://localhost:8080/october')
      .then((res) => {
        setBestSept(res.data[3])
        setWorstSept(res.data[0])
      })
    axios.get('http://localhost:8080/november')
      .then((res) => {
        setBestNov(res.data[3])
        setWorstNov(res.data[0])
      })
  }, [])

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Box width='100%'><Typography variant='h6' align='center'>Oμαδικά ποσοστά: {overall} %</Typography></Box>
      <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
        <GeneralBarGraph stats={generalStats} />
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
        <Grid container className={classes.gridstats} spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card elevation={5}>
              <CardHeader title='Σεπτεμβριος - Οκτώβριος' />
              <CardContent>
                <Typography variant='h6'>Καλύτερος Παίκτης</Typography>
                <Typography variant='body'>{bestSept ? `${bestSept.name}: ${Number(bestSept.percentage).toFixed(1)}%` : ''}</Typography>
                <Typography variant='h6'>Χειρότερος Παίκτης</Typography>
                <Typography variant='body'>{worstSept ? `${worstSept.name}: ${Number(worstSept.percentage).toFixed(1)}%` : ''}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card elevation={5}>
              <CardHeader title='Νοέμβριος' />
              <CardContent>
                <Typography variant='h6'>Καλύτερος Παίκτης</Typography>
                <Typography variant='body'>{bestNov ? `${bestNov.name}: ${Number(bestNov.percentage).toFixed(1)}%` : ''}</Typography>
                <Typography variant='h6'>Χειρότερος Παίκτης</Typography>
                <Typography variant='body'>{worstNov ? `${worstNov.name}: ${Number(worstNov.percentage).toFixed(1)}%` : ''}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card elevation={5}>
              <CardHeader title='Δεκέμβριος' />
              <CardContent>
                <Typography variant='h6'>Καλύτερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
                <Typography variant='h6'>Χειρότερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card elevation={5}>
              <CardHeader title='Ιανουάριος' />
              <CardContent>
                <Typography variant='h6'>Καλύτερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
                <Typography variant='h6'>Χειρότερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card elevation={5}>
              <CardHeader title='Φεβρουάριος' />
              <CardContent>
                <Typography variant='h6'>Καλύτερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
                <Typography variant='h6'>Χειρότερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Card elevation={5}>
              <CardHeader title='Μάρτιος' />
              <CardContent>
                <Typography variant='h6'>Καλύτερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
                <Typography variant='h6'>Χειρότερος Παίκτης</Typography>
                <Typography variant='body'><br /></Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default GeneralData
