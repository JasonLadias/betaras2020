import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GeneralData from './Components/GeneralData'
import Header from './Components/Header'
import PersonalData from './Components/PersonalData'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={() => <GeneralData />} />
        <Route exact path='/jason' component={() => <PersonalData name='Jason' url='jason' />} />
        <Route exact path='/savvas' component={() => <PersonalData name='Σάββας' url='savvas' />} />
        <Route exact path='/miltos' component={() => <PersonalData name='Μίλτος' url='miltos' />} />
        <Route exact path='/byron' component={() => <PersonalData name='Βύρων' url='byron' />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
