// //Remember this in case we want to run it later
// function record() { // target = () => price*quantity
//     storage.push(target)
// } 

// function replay () { // on change run each of the functions from storage
//     storage.forEach( run => run())
// }

// target()
// price = 20
// console.log(total) // => 10
// record()
// replay()
// console.log(total) // => 40

class Dep {
    constructor () {
        this.subscribers = [] // The targets that are dependent, and should be
                              // run when notify() is called.
    }
    depend() { // This replaces our record function
        if (target && !this.subscribers.includes(target)) {
            // Only if there is a target & it's not already subscribed
            this.subscribers.push(target)
        }
    }
    notify() { //relaces replay function
        this.subscribers.forEach(sub => sub()) // Run our targets, our observers.
    }
}

const dep = new Dep()
let price = 5
let quantity = 2
let total = 0
let target =  () => { total = price * quantity }
dep.depend() // Add this target to our subscribers
target() // Run it to get the total

console.log(total) // => 10 >.. The right number
price = 20
console.log(total) // => 10 .. No longer the right number
dep.notify() //Run the subscribers
console.log(total) // => 40 .. Now the right number