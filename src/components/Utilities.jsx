
 export const downloadAll = () => {
    const element = document.createElement("a")
    const file = new Blob([document.getElementById('results').value], {type: 'application/json'})
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