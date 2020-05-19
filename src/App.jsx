import React, { useState } from 'react'
// import './App.css'
import GenAll from './GenAll'
import Infobox from './Infobox'
import { ZeitProvider, CssBaseline, Spacer, Text, Button, Card, Row } from '@zeit-ui/react'
import * as Icon from '@zeit-ui/react-icons'






function App() {
  const [themeType, setThemeType] = useState('light')
  const switchThemes = () => {
    setThemeType(lastThemeType => lastThemeType === 'dark' ? 'light' : 'dark')
  }
  const darkMode = () => {
    if (themeType === 'dark') {
      return 'Lighter'
    } else {
      return 'Darker'
    }
  }
  return (
    <ZeitProvider theme={{ type: themeType }}> 
      <CssBaseline />
        <Row 
          justify="center"
          style={{ marginTop: "20px"}}
        >
          <Text h1>Korean Dynasty Generator</Text>
        </Row>
        <Row 
          justify="center"
          // style={{ marginBottom: "-30px"}}
        >
          <Button 
            onClick={switchThemes} 
            size="auto" 
            icon={<Icon.Sun />} 
            type="secondary" 
            ghost 
            style={{ textTransform: "lowercase", border: "none"}}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you want it {darkMode()}
          </Button>
        </Row>
        <GenAll />
    </ZeitProvider>
  );
}

export default App;
