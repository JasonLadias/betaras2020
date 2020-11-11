import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const GeneralBarGraph = ({ stats }) => {
  const theme = useTheme()
  const aboveXL = useMediaQuery(theme.breakpoints.up('xl'))
  const belowXL = useMediaQuery(theme.breakpoints.down('xl'))
  const belowLarge = useMediaQuery(theme.breakpoints.down('lg'))
  const belowMedium = useMediaQuery(theme.breakpoints.down('md'))
  const belowSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (belowSmall) {
      setHeight(300)
      setWidth(350)
    } else if (belowMedium) {
      setHeight(300)
      setWidth(700)
    } else if (belowLarge) {
      setHeight(400)
      setWidth(1000)
    } else if (belowXL) {
      setHeight(500)
      setWidth(1000)
    } else if (aboveXL) {
      setHeight(500)
      setWidth(1000)
    }
  }, [aboveXL, belowXL, belowLarge, belowMedium, belowSmall])

  return (
    <LineChart
      data={stats}
      height={height}
      width={width}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='id' />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='percentageJason' stroke='#ff0000' />
      <Line type='monotone' dataKey='percentageSavvas' stroke='#66ff66' />
      <Line type='monotone' dataKey='percentageMiltos' stroke='#8884d8' />
      <Line type='monotone' dataKey='percentageByron' stroke='#000000' />
    </LineChart>
  )
}

export default GeneralBarGraph
