import React from 'react'
// import './App.css'
import GenAll from './GenAll'
import { ZeitProvider, CssBaseline } from '@zeit-ui/react'






function App() {
  
  return (
    <ZeitProvider> 
      <CssBaseline />
        <GenAll />
    </ZeitProvider>
  );
}

export default App;
