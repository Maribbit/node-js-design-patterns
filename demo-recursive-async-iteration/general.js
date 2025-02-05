/**
 * This is an exercise to build a generalized function for this kind of pattern.
 * Given the instructions in JSDoc, we shall implement this function.
 */

/**
 * A generalized function to iterate over an array while applying an asynchronous operation
 * 
 * @param {Array<any>} collection - The actual dataset we want to iterate over
 * @param {Function} iteratorCallback - The function to execute over every item. It receives two arguments: the current item and a callback to call when the operation is complete.
 * @param {Function} finalCallback - The function that gets executed when all the items are processed
 */
function iterateSeries(collection, iteratorCallback, finalCallback) {
    function iterate(index) {
        if (index === collection.length) {
            return finalCallback()
        }
        const param = collection[index]
        iteratorCallback(param, () => iterate(index + 1))
    }
    iterate(0)
}

const collection = [1, 2, 3]

const iteratorCallback = (item, cb) => {
    console.log(`Task ${item}`)
    setTimeout(cb, 1000)
}

const finalCallback = () => {
    console.log('All tasks executed.')
}

iterateSeries(collection, iteratorCallback, finalCallback)