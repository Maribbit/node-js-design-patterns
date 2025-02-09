export class TaskQueue {
    constructor (concurrency) {
      this.concurrency = concurrency
      this.running = 0
      this.queue = []
    }
  
    pushTask (task) {
      this.queue.push(task)
      process.nextTick(this.next.bind(this))
      return this
    }
  
    next () {
      console.log(`next() executed. Currently running ${this.running} tasks`)
      while (this.running < this.concurrency && this.queue.length) {
        const task = this.queue.shift()
        task(() => {
          this.running--
          process.nextTick(this.next.bind(this))
        })
        this.running++
      }
    }
  }