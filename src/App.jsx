import React from 'react'
// import './App.css'
import { ZeitProvider, CssBaseline } from '@zeit-ui/react'
import Information from './Information'






function App() {
  
  return (
    <ZeitProvider> 
      <CssBaseline />
        <Information />
    </ZeitProvider>
  );
}

export default App;
