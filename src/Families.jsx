import React from 'react'
import { nameArr, familyNameArr } from './Namelist'
import { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import { useEffect } from 'react'
import Select from 'react-select'
import { Formik, Form, Field, FieldArray } from 'formik';

const Families = () => {
    const useMountEffect = (fun) => useEffect(fun, [])
    const [ famState, setFamState ] = useState({})
    const [ names, setNames ] = useState()
    const [ state, setState] = useState({})

    var d3 = require("d3-random")
    let random = d3.randomLogNormal(0.1, 1)
    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }
    // function weightedRandom(min, max) {
    //     return Math.round(max / (Math.random() * max + min));
    // }
    let famObj = []
    const generate = () => {

        for (let i = 0; i < familyNameArr.length; i++) {
            let loopFam = {}
            let familyPower = Math.round(random(1, 100) * 10)
            let familyName = familyNameArr[i]
            let familyId = i
            loopFam = {
                familyId: familyId,
                famName: familyName,
                power: familyPower,
                persons: []
            } 
            let number = loopFam.power
            let personArr = []
            let nameEnd = 676 - familyPower
            let firstNameNr = getRandomInt(0, nameEnd)
            for (let i = 0; i < number; i++) {
                let newName = nameArr[firstNameNr] 
                let personID = familyId + "" + i 
                personArr[i] = {
                    personID: personID,
                    firstName: newName
                }
                firstNameNr++
            }
            loopFam.persons = personArr
            famObj.push(loopFam)
        }
    
    // const generate = (obj) => {
    // }
    // useEffect(() => {
    //     generate()
    // })
    

    function comparePwr(a, b) {
        const famA = a.power
        const famB = b.power
        
        let comparison = 0
        if (famA > famB) {
            comparison= -1
        } else if (famA < famB) {
            comparison = 1
        }
        return comparison
    }
    Array.prototype.sortBy = function(p) {
        return this.slice(0).sort(function(a,b) {
          return (b[p] > a[p]) ? 1 : (b[p] < a[p]) ? -1 : 0;
        });
    }

    let sortedFamObj = famObj.sortBy('power')
    console.log(sortedFamObj)
    const rankOne = () => {
        let selectGroup = sortedFamObj.slice(0, 10)
        let remPosts = 44
        let i = 0
        do {
            let selectPerson = 0
            let found = false
            while (!found) {
                if (selectGroup[i].persons[selectPerson].rank !== "1A") {
                    selectGroup[i].persons[selectPerson].rank = "1A"
                    found = true
                } else if (selectGroup[i].persons[selectPerson].rank = "1A") {
                    selectPerson++
                }
            }
            remPosts--
            i++
            if (i >= selectGroup.length) {
                i = 0
            }
        } while (remPosts > 0)
    }
    // const rankOne = (group, groupSize, rankQuant, rankName) => {
    //     let selectGroup = group.slice(0, groupSize)
    //     let remPosts = rankQuant
    //     let i = 0
    //     do {
    //         let selectPerson = 0
    //         let found = false
    //         while (!found) {
    //             if (selectGroup[i].persons[selectPerson].rank !== rankName) {
    //                 selectGroup[i].persons[selectPerson].rank = rankName
    //                 found = true
    //             } else if (selectGroup[i].persons[selectPerson].rank = rankName) {
    //                 selectPerson++
    //             }
    //         }
    //         remPosts--
    //         i++
    //         if (i >= selectGroup.length) {
    //             i = 0
    //         }
    //     } while (remPosts > 0)
    // }

    // rankOne(sortedFamObj, 10, 44, "1A")
    
   // const assignPosts = (group, postData, postName) => {
    //   let selectGroup = group
    //   let remPosts = postData
    //   let i = 0
    //   let selectPerson = 0
    //   do {
    //       let found = false
    //       while (!found) {
    //         if  (!selectGroup[i] || selectGroup[i].length <= i) {
    //           i = 0
    //           selectPerson = 0
    //         } else if (!selectGroup[i].persons[selectPerson].office) {
    //               selectGroup[i].persons[selectPerson].office = postName
    //               selectPerson = 0
    //               found = true
    //         } else {
    //               selectPerson++
    //         }
    //       }
    //       remPosts--
    //       i++
    //       if (i >= selectGroup.length) {
    //           i = 0
    //       }
    //   } while (remPosts > 0)
    // }

    // let officeOne = [
    //   { rank: "13",
    //     posts: 8
    //   },
    //   { rank: "18",
    //     posts: 8
    //   }
    // ]

    // assignPosts(sortedFamObj, officeOne, "1")
    
    
    // function shuffleArray(array) {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1))
    //         [array[i], array[j]] = [array[j], array[i]]
    //     }
    // }
    // const shuffleArray = (array) => {
    //     const a = array.slice()
    //     for (let i = a.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1))
    //         [a[i], a[j]] = [a[j], a[i]]
    //     }
    //     return a
    // }
    
    function compare( a, b ) {
        if ( a.power < b.power ){
            return -1;
        }
        if ( a.power > b.power ){
            return 1;
        }
        return 0;
    }
        
    function compareName(a, b) {
        const famA = a.familyId
        const famB = b.familyId
        
        let comparison = 0
        if (famA > famB) {
            comparison= 1
        } else if (famA < famB) {
            comparison = -1
        }
        return comparison
    }
    console.log(famObj.sort(comparePwr))
    // let sortByPwr = famObj
    const sortById = famObj.sort(compareName)
}
    
    // function useInput(initialValue) {
    //     const [value, setValue] = useState(initialValue)

    //     function handleChange(e) {
    //         e.preventDefault()
    //         let options = e.target.options
    //         let value = []
    //         for (let i = 0, l = options.length; i < l; i++) {
    //             if (options[i].selected) {
    //                 value.push(options[i].value)
    //             }
    //         }
    //         setValue(value)
    //     }

    //     return [value,handleChange]
    // }

    // const [ selectState, setSelectState] = useInput('')

    let handleChange = (event) => {
        let options = event.target.value
        // let value = []
        // for (let i = 0, l = options.length; i < l; i++) {
        //     if (options[i].selected) {
        //         value.push(options[i].value)
        //     }
        // }
        setFamState(options)
    }
    let sortByPwr = null
    const handleClick = () => {
        sortByPwr = famObj
    }
    // let handleChange = selectedOption => {
    //     setFamState({ selectedOption })
    // }
    // const { selectedOption } = famState
    
    useMountEffect(generate)
    return (
    

        <div>
         <button onClick={handleClick}>Generate</button>
        
           <select name="fam" id="fam" onChange={handleChange}>
                {famObj.map((obj, index) => {
                    return <option value={index}>{obj.famName}</option>
                })}
            </select>
      
            <JsonToTable json={famObj[famState]} />
            <table>
            <thead>
                <tr>
                    <th colSpan="5">Top ten families</th>
                </tr>
            </thead>
            <tbody>
                
                    {famObj.slice(0, 10).map((obj) => {
                        return <tr><td>{obj.famName}</td><td>{obj.power}</td></tr>
                    })}
                

            </tbody>
            </table>
          {/* <Select
            value={selectedOption}
            onChange={handleChange}
            options={
                sortedFamObj.map((obj, index) => {
                    return {
                        label: obj.familyId,
                        value: obj.famName,
                        key: index
                    } 
                })
            }
        /> */}
           {/* <td>{JSON.stringify(sortedFamObj[0].famName)} {JSON.stringify(sortedFamObj[0].power)}</td>
                <td>{JSON.stringify(sortedFamObj[1].famName)} {JSON.stringify(sortedFamObj[1].power)}</td>
                <td>{JSON.stringify(sortedFamObj[2].famName)} {JSON.stringify(sortedFamObj[2].power)}</td> */}
                <tr>
                {/* <td><textarea defaultValue={JSON.stringify(sortedFamObj[0].persons)} /></td>
                <td><textarea defaultValue={JSON.stringify(sortedFamObj[1].persons)} /></td>
                <td><textarea defaultValue={JSON.stringify(sortedFamObj[2].persons)} /></td> */}
            </tr>
        </div>
    )
}

export default Families