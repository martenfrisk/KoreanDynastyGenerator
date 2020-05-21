import React from 'react'
import { nameArr, familyNameArr, rankPosts, rankList, departList } from '../data/Namelist'
import { getRandomInt, weightedRandom, keyToValue } from './Utilities'
import { Button } from '@zeit-ui/react'

let famObj = []
export let newFamObj = []

function getPostArrs(map) {
  let map_array = new Array(map.length)
  var c = 0
  for (const key in map) {
    var max = map[key]
    for (var i = 1; i <= max; i++) {
      map_array[c] = key
      c++
    }
  }
  return map_array
}

// eslint-disable-next-line no-extend-native
Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (b[p] > a[p]) ? 1 : (b[p] < a[p]) ? -1 : 0
    })
}
export const Generator = (props) => {

  function assignAll() {
    famObj = []
    newFamObj = []
    for (let i = 0; i < familyNameArr.length; i++) {
      let loopFam = {}
      let familyPower = weightedRandom(1, 175)
      let familyName = familyNameArr[i]
      let familyId = i + 99
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
        let personID = familyId + '' + i 
        personID = Number(personID)
        personArr[i] = {
          personID: personID,
          firstName: newName,
          famName: familyName
        }
        firstNameNr++
      }
      loopFam.persons = personArr
      famObj.push(loopFam)
    }
      
  newFamObj = famObj.sortBy('power')

  

const assignRanks = (group, groupSize, rankQuant, rankName, postArr) => {
  let selectGroup = group.slice(0, groupSize)
  let remPosts = rankQuant
  let i = 0
  let selectPerson = 0
  do {
      let found = false
      while (!found) {
        if (i >= groupSize) {
          i = 0
        } else if  (selectPerson >= selectGroup[i].power) {
          i++
        } else if (!selectGroup[i].persons[selectPerson].rank && !selectGroup[i].persons[selectPerson].post) {
              selectGroup[i].persons[selectPerson].rank = keyToValue(rankName, rankList)
              if (postArr.length > 0) { 
                selectGroup[i].persons[selectPerson].post = keyToValue(Number(postArr.pop()), departList)
              }
              selectPerson = 0
              found = true
        } else {
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
assignRanks(newFamObj, 10, 24, 1, getPostArrs(rankPosts[0]))
assignRanks(newFamObj, 13, 13, 2, getPostArrs(rankPosts[1]))
assignRanks(newFamObj, 17, 50, 3, getPostArrs(rankPosts[2]))
assignRanks(newFamObj, 19, 70, 4, getPostArrs(rankPosts[3]))
assignRanks(newFamObj, 29, 84, 5, getPostArrs(rankPosts[4]))
assignRanks(newFamObj, 32, 31, 6, getPostArrs(rankPosts[5]))
assignRanks(newFamObj, 40, 67, 7, getPostArrs(rankPosts[6]))
assignRanks(newFamObj, 41, 52, 8, getPostArrs(rankPosts[7]))
assignRanks(newFamObj, 70, 123, 9, getPostArrs(rankPosts[8]))
assignRanks(newFamObj, 75, 78, 10, getPostArrs(rankPosts[9]))
assignRanks(newFamObj, 85, 218, 11, getPostArrs(rankPosts[10]))
assignRanks(newFamObj, 111, 111, 12, getPostArrs(rankPosts[11]))
assignRanks(newFamObj, 111, 326, 13, getPostArrs(rankPosts[12]))
assignRanks(newFamObj, 40, 46, 14, getPostArrs(rankPosts[13]))
assignRanks(newFamObj, 111, 383, 15, getPostArrs(rankPosts[14]))
assignRanks(newFamObj, 65, 68, 16, getPostArrs(rankPosts[15]))
assignRanks(newFamObj, 111, 543, 17, getPostArrs(rankPosts[16]))
assignRanks(newFamObj, 111, 122, 18, getPostArrs(rankPosts[17]))
assignRanks(newFamObj, 111, 2023, 19, getPostArrs(rankPosts[18]))

console.log(newFamObj)
  }

  function both() {
    assignAll()
    props.clickFunc()
  }

  return (
    <>
    <Button onClick={both}>Generate</Button>
    </>
  )
}
// Generator()

export var newPersArr
if (newPersArr) {
newFamObj.map((obj) => 
  obj.persons.map((x) =>  newPersArr.push(x))
)
newPersArr.sortBy('firstName')
}