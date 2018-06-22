class Dep {
    constructor () {
        this.subscribers = [] // The targets that are dependent, and should be
                              // run when notify() is called.
    }
    depend() { // This replaces our record function
        if (target && !this.subscribers.includes(target)) {
            // Only if there is a target & it's not already subscribed
            console.log(target)
            this.subscribers.push(target)
        }
    }
    notify() { //relaces replay function
        this.subscribers.forEach(sub => sub()) // Run our targets, our observers.
    }
}


let data = { price: 5, quantity: 2}
let target = null
let internalValue = data.price // Our initial value


Object.keys(data).forEach(key => { // We're running this for each item in data now
    let internalValue = data[key]
    
    // Each property gets a dependency instance
    const dep = new Dep()

    Object.defineProperty(data, key, {
        get() {
            dep.depend() // Remember the target we're running
            return internalValue
        },
        set(newVal) {
            internalValue = newVal
            dep.notify() //Re-run stored functions
        }
    })
})


function watcher(myFunc) {
    target = myFunc // Set as the active target
    target() // Call the target and it will add target for price and quantity in subscriber
    target = null // Reset the target
}

watcher(() => {total = data.price * data.quantity})