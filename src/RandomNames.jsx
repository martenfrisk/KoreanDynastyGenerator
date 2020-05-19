import React, { useState } from 'react';
import './App.css';
import { nameArr } from './Namelist';

const Generate = () => {
    const [ number, setNumber ] = useState(0)
    const [ nameQuant, setNameQuant ] = useState(0)
    const [ names, setNames ] = useState()
    const [ familyName, setFamilyName ] = useState()
    const [ unique, setUnique ] = useState(false)
  
    const handleInputChange = (e) => setFamilyName(e.currentTarget.value)
  
    function getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      setNumber(Math.floor(Math.random() * (max - min)) + min)
    }
  
    const generator = (e) => {
      e.preventDefault()
      let newArr = []
      let highestNumb = 675 - nameQuant
      getRandomInt(1, highestNumb)
      let numbEnd = number+nameQuant
      let currNumb = number
      
      if (unique) { 
          for (let i = number; currNumb < numbEnd; i++) {
            let newName = familyName + " " + nameArr[i]  
            newArr.push(newName)
            currNumb++
          }
        } else {
          for (let i = 0; i < nameQuant; i++) {
            let randomNumb = () => {
              let min = Math.ceil(0)
              let max = Math.floor(675)
              return Math.floor(Math.random() * (max - min)) + min
            }
            console.log(randomNumb)
            let newName = familyName + " " + nameArr[randomNumb()]
            newArr.push(newName)
          }      
        }
      setNames(newArr.toString())
    }
  
    const resetResults = () => {
      setNameQuant(0)
      setNames([])
      setFamilyName("")
      setUnique(false)
    }
  
    return (
      <div>    
        <form onSubmit={generator}>
  
          <label>Only unique names:&nbsp;
            <input 
              type="radio" 
              label="Only unique names" 
              checked={unique} 
              onClick={() => setUnique(!unique)}
            />
          </label>
          <br />
          <label>Family name:&nbsp;
            <input 
              type="text" 
              name="familyname"
              value={familyName}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>Number of persons&nbsp;
            <input 
              type="number" 
              value={nameQuant}
              onChange={event => setNameQuant(event.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      {/* <button onClick={generator}>Click</button>  */}
      {/* 
      getRandomInt(1, 676-nameQuant), getRandomInt+nameQuant  
      */}
      <br />
      <br />
        <textarea name="results" defaultValue={names} />
      <br />
        <button onClick={() => resetResults()}> 
          Reset all fields
        </button>
      </div>
      )
  }

export default Generate