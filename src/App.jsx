import React from 'react'
import { ZeitProvider, CssBaseline } from '@zeit-ui/react'
import Information from './components/Information'

function App() {
  return (
    <ZeitProvider> 
      <CssBaseline />
        <Information />
    </ZeitProvider>
  )
}
export default App
