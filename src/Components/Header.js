import { AppBar, Box, Container, Divider, IconButton, List, ListItem, ListItemText, SwipeableDrawer, Tab, Tabs, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles(theme => ({
  drawerIcon: {
    height: '50px',
    width: '50px'
  }
}))

const HeaderTabs = ({ tab, setTab }) => (
  <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
    <Tab label='Γενικα' component={Link} to='/' />
    <Tab label='Jason' component={Link} to='/jason' />
    <Tab label='Σαββας' component={Link} to='/savvas' />
    <Tab label='Μιλτος' component={Link} to='/miltos' />
    <Tab label='Βυρων' component={Link} to='/byron' />
  </Tabs>
)

const Drawer = ({openDrawer, setOpenDrawer, classes, iOS}) => (
  <>
    <SwipeableDrawer anchor='right' disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)} swipeAreaWidth={0} transitionDuration={500}>
      <List  disablePadding>
        <ListItem  onClick={() => setOpenDrawer(false)} divider button component={Link} to='/'>
          <ListItemText disableTypography className={classes.listText}>Γενικά</ListItemText>
        </ListItem>
        <Divider />
        <ListItem  onClick={() => setOpenDrawer(false)} divider button component={Link} to='/jason'>
          <ListItemText disableTypography className={classes.listText}>Jason</ListItemText>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItem} onClick={() => setOpenDrawer(false)} divider button component={Link} to='/savvas'>
          <ListItemText disableTypography className={classes.listText}>Σάββας</ListItemText>
        </ListItem>
        <Divider />
        <ListItem  onClick={() => setOpenDrawer(false)} divider button component={Link} to='/miltos'>
          <ListItemText disableTypography className={classes.listText}>Μίλτος</ListItemText>
        </ListItem>
        <Divider />
        <ListItem  onClick={() => setOpenDrawer(false)} divider button component={Link} to='/byron'>
          <ListItemText disableTypography className={classes.listText}>Βύρων</ListItemText>
        </ListItem>
        <Divider />
      </List>
    </SwipeableDrawer>
    <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple className={classes.drawerButton}>
      <MenuIcon className={classes.drawerIcon} />
    </IconButton>
  </>
)

const Header = () => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const theme = useTheme()
  const belowMedium = useMediaQuery(theme.breakpoints.down('md'))
  const [openDrawer, setOpenDrawer] = useState(false)
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <AppBar position='static' elevation={1}>
      <Container maxWidth='lg'>
        <Box
          display='flex'
          flexDirection='column'
          alignItems={belowMedium ? 'flex-end' : 'center'}
          width='100%'
        >
          {belowMedium ? <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} classes={classes} iOS={iOS}/> : <HeaderTabs tab={tab} setTab={setTab} />}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
