
 export const downloadTxtFile = () => {
    const element = document.createElement("a")
    const file = new Blob([document.getElementById('results').value], {type: 'application/json'})
    element.href = URL.createObjectURL(file)
    element.download = "korgen-results.json"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }
  
  export const downloadContent = (id, fileName) => {
    const element = document.createElement("a")
    const file = new Blob([document.getElementById(id).value], {type: 'application/json'})
    element.href = URL.createObjectURL(file)
    element.download = fileName
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