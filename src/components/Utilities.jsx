import { eraAdj, eraNoun } from '../data/Namelist'
 export const downloadAll = () => {
    const element = document.createElement("a")
    const file = new Blob([document.getElementById('unedited').value], {type: 'application/json'})
    element.href = URL.createObjectURL(file)
    element.download = "korgen-results.json"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }
 export const downloadPersons = () => {
    const element = document.createElement("a")
    const file = new Blob([document.getElementById('allPersons').value], {type: 'application/json'})
    element.href = URL.createObjectURL(file)
    element.download = "korgen-person-list.json"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }
 export const randomEra = () => {
    let randNoun = eraNoun[getRandomInt(1, eraNoun.length)]
    randNoun = randNoun.charAt(0).toUpperCase() + randNoun.slice(1)
    let randAdj = eraAdj[getRandomInt(1, eraAdj.length)]
    randAdj = randAdj.charAt(0).toUpperCase() + randAdj.slice(1)
    return "Era of " + randAdj + " " + randNoun
}
  export const keyToValue = (numb, arr) => {
   let replace_map = arr
 
   return replace_map[numb]
 }

 export const compareNumbers = ((a, b) => a - b)

 export function refreshPage() {
    window.location.reload(false);
  }
  export const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
  
  export const weightedRandom = (min, max) => {
    let dice = getRandomInt(1, 10)
    if (dice <= 7) {
      return getRandomInt(min, max * 0.4)
    } else if (dice <= 9) {
      return getRandomInt(max * 0.4, max * 0.75)
    } else if (dice > 9) {
      return getRandomInt(max * 0.75, max)
    }
  }