import React, { useState, useEffect} from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

 
const BarGraph = ({ stats }) => {
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
      setWidth(500)
    } else if (belowLarge) {
      setHeight(400)
      setWidth(700)
    } else if (belowXL) {
      setHeight(500)
      setWidth(900)
    } else if (aboveXL) {
      setHeight(500)
      setWidth(900)
    }
  }, [aboveXL,belowXL,belowLarge, belowMedium, belowSmall])

  return (
      <AreaChart
        data={stats}
        height={height}
        width={width}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area dataKey="percentage" fill="#8884d8" />
      </AreaChart>
  )
}

export default BarGraph