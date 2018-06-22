let price = 5
let quantity = 2
let total = 0
let target = null
let storage = []

target = function () {
    total = price * quantity
}

//Remember this in case we want to run it later
function record() { // target = () => price*quantity
    storage.push(target)
} 

function replay () { // on change run each of the functions from storage
    storage.forEach( run => run())
}
target()
price = 20
console.log(total) // => 10
record()
replay()
console.log(total) // => 40