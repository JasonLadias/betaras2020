import { Container } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GeneralBarGraph from './GeneralBarGraph'

const GeneralData = () => {
  const [generalStats, setGeneralStats] = useState([])

  useEffect(() => {
      let array = []
      axios.get(`http://localhost:8080/weekly`)
      .then((res) => {
        let sumWonJason = 0
        let sumPlayedJason = 0
        let sumWonSavvas = 0
        let sumPlayedSavvas = 0
        let sumWonMiltos = 0
        let sumPlayedMiltos = 0
        let sumWonByron = 0
        let sumPlayedByron = 0
        res.data.forEach((res) =>{
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
              percentageJason: ((sumWonJason / sumPlayedJason)*100).toFixed(1),
              percentageSavvas: ((sumWonSavvas / sumPlayedSavvas)*100).toFixed(1),
              percentageMiltos: ((sumWonMiltos / sumPlayedMiltos)*100).toFixed(1),
              percentageByron: ((sumWonByron / sumPlayedByron)*100).toFixed(1)
            }
          ]
        })
        setGeneralStats(array)})
  }, [])

  return(
    <Container maxWidth='lg'>
      <GeneralBarGraph stats={generalStats} />
    </Container>
  )
}

export default GeneralData
