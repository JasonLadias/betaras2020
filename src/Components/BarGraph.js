import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, ComposedChart
} from 'recharts'

const BarGraph = ({ stats }) => {
  const theme = useTheme()
  const aboveXL = useMediaQuery(theme.breakpoints.up('xl'))
  const belowXL = useMediaQuery(theme.breakpoints.down('xl'))
  const belowLarge = useMediaQuery(theme.breakpoints.down('lg'))
  const belowMedium = useMediaQuery(theme.breakpoints.down('md'))
  const belowSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const belowXS = useMediaQuery(theme.breakpoints.down('xs'))
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (belowXS) {
      setHeight(300)
      setWidth(350)
    } else if (belowSmall) {
      setHeight(300)
      setWidth(700)
    } else if (belowMedium) {
      setHeight(300)
      setWidth(600)
    } else if (belowLarge) {
      setHeight(400)
      setWidth(800)
    } else if (belowXL) {
      setHeight(500)
      setWidth(900)
    } else if (aboveXL) {
      setHeight(500)
      setWidth(1000)
    }
  }, [aboveXL, belowXL, belowLarge, belowMedium, belowSmall])

  return (
    <ComposedChart
      data={stats}
      height={height}
      width={width}
      margin={{
        top: 10, right: 0, left: 0, bottom: 10
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='id' />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Legend />
      <Area dataKey='overallPercentage' fill='#8884d8' />
      <Bar dataKey='percentage' barSize={5} fill='#8884d8' />
    </ComposedChart>
  )
}

export default BarGraph
