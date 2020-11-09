import { AppBar, Box, Container, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [tab, setTab] = useState(0)
  return(
    <AppBar position='static' elevation={1}>
      <Container maxWidth='lg'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          width='100%'
        >
          <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
            <Tab label='Γενικα' component={Link} to='/' />
            <Tab label='Jason' component={Link} to='/jason' />
            <Tab label='Σαββας' component={Link} to='/savvas' />
            <Tab label='Μιλτος' component={Link} to='/miltos' />
            <Tab label='Βυρων' component={Link} to='/byron' />
        </Tabs>
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header