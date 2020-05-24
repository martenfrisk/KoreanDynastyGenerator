import React, { useEffect } from 'react'

import { Button, Textarea, Grid, useInput, Text, Spacer } from '@zeit-ui/react'
import { eraAdj, eraNoun } from '../data/Namelist'
import { getRandomInt } from './Utilities'
import * as Icon from '@zeit-ui/react-icons'



export const Era = () => {
    const { state, setState, reset, bindings } = useInput()
    
    const randomEra = () => {
        let randNoun = eraNoun[getRandomInt(1, eraNoun.length)]
        randNoun = randNoun.charAt(0).toUpperCase() + randNoun.slice(1)
        let randAdj = eraAdj[getRandomInt(1, eraAdj.length)]
        randAdj = randAdj.charAt(0).toUpperCase() + randAdj.slice(1)
        return "Era of " + randAdj + " " + randNoun
    }
    useEffect(() => setState(randomEra), [])
    return (
        <>
        <Text small>
        Enter your era name here
        </Text>
            <Textarea {...bindings} width="100%" status="success" style={{fontSize: "3em", height: "1.5em"}} />
        <Spacer y={0.5} />
        <Button size="large"  iconRight={<Icon.Shuffle />}
                onClick={() => setState(randomEra)}
        >
            Random Era name
        </Button>
        <Spacer y={0.5} />
        </>
    )
  }