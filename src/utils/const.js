const stockMine = [...Array(6).keys()].map(index => ({ label: String.fromCharCode(70 - index), value: 'mine-0' + index })).reverse()

const stockTag = {
  'A': 'green',
  'B': 'blue',
  'C': 'purple',
  'D': 'orange',
  'E': 'pink',
  'F': 'red'
}

export { stockMine, stockTag }
