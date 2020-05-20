import { nameArr, familyNameArr, rankPosts } from './Namelist'


export function refreshPage() {
  window.location.reload(false);
}


function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const weightedRandom = (min, max) => {
  let dice = getRandomInt(1, 10)
  if (dice <= 7) {
    return getRandomInt(min, max * 0.4)
  } else if (dice <= 9) {
    return getRandomInt(max * 0.4, max * 0.75)
  } else if (dice > 9) {
    return getRandomInt(max * 0.75, max)
  }
}

let famObj = []
for (let i = 0; i < familyNameArr.length; i++) {
  let loopFam = {}
  let familyPower = weightedRandom(1, 175)
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
    
    

// eslint-disable-next-line no-extend-native
Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (b[p] > a[p]) ? 1 : (b[p] < a[p]) ? -1 : 0
    })
}

export let sortedFamObj = famObj.sortBy('power')

function getPostArrs(map) {
  let map_array = new Array(map.length);
  var c = 0;
  for (const key in map) {
    var max = map[key];
    for (var i = 1; i <= max; i++) {
      map_array[c] = key;
      c++;
    }
  }
  return map_array
}
export let allPersonArr = []

export const assignRanks = (group, groupSize, rankQuant, rankName, postArr) => {
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
              selectGroup[i].persons[selectPerson].rank = rankName
              if (postArr.length > 0) { 
                selectGroup[i].persons[selectPerson].post = Number(postArr.pop())
              }
              selectPerson = 0
              found = true
              allPersonArr.push(selectGroup[i].persons[selectPerson])
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


assignRanks(sortedFamObj, 10, 24, 1, getPostArrs(rankPosts[0]))
assignRanks(sortedFamObj, 13, 13, 2, getPostArrs(rankPosts[1]))
assignRanks(sortedFamObj, 17, 50, 3, getPostArrs(rankPosts[2]))
assignRanks(sortedFamObj, 19, 70, 4, getPostArrs(rankPosts[3]))
assignRanks(sortedFamObj, 29, 84, 5, getPostArrs(rankPosts[4]))
assignRanks(sortedFamObj, 32, 31, 6, getPostArrs(rankPosts[5]))
assignRanks(sortedFamObj, 40, 67, 7, getPostArrs(rankPosts[6]))
assignRanks(sortedFamObj, 41, 52, 8, getPostArrs(rankPosts[7]))
assignRanks(sortedFamObj, 70, 123, 9, getPostArrs(rankPosts[8]))
assignRanks(sortedFamObj, 75, 78, 10, getPostArrs(rankPosts[9]))
assignRanks(sortedFamObj, 85, 218, 11, getPostArrs(rankPosts[10]))
assignRanks(sortedFamObj, 111, 111, 12, getPostArrs(rankPosts[11]))
assignRanks(sortedFamObj, 111, 326, 13, getPostArrs(rankPosts[12]))
assignRanks(sortedFamObj, 40, 46, 14, getPostArrs(rankPosts[13]))
assignRanks(sortedFamObj, 111, 383, 15, getPostArrs(rankPosts[14]))
assignRanks(sortedFamObj, 65, 68, 16, getPostArrs(rankPosts[15]))
assignRanks(sortedFamObj, 111, 543, 17, getPostArrs(rankPosts[16]))
assignRanks(sortedFamObj, 111, 122, 18, getPostArrs(rankPosts[17]))
assignRanks(sortedFamObj, 111, 2023, 19, getPostArrs(rankPosts[18]))

 

export const keyToValue = (numb, arr) => {
  let replace_map = arr

  return replace_map[numb]
}

export const downloadTxtFile = () => {
  const element = document.createElement("a");
  const file = new Blob([document.getElementById('results').value], {type: 'application/json'});
  element.href = URL.createObjectURL(file);
  element.download = "korgen-results.json";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

export const downloadContent = () => {
  const element = document.createElement("a");
  const file = new Blob([document.getElementById('allPersons').value], {type: 'application/json'});
  element.href = URL.createObjectURL(file);
  element.download = "korgen-person-list.json";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}
