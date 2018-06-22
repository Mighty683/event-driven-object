const { strictEqual } = require('assert')
const EventEmitter = require('../index.js')

let testFun, testFunResult
function PrepareTestFun () {
  testFunResult = {
    called: false,
    args: undefined
  }
  testFun = function () {
    testFunResult = {
      called: true,
      args: arguments
    }
  }
}
let DoTest = function (callback) {
  PrepareTestFun()
  callback()
}
// Listen/emit Test
DoTest(function () {
  let model = new EventEmitter()
  model.on('event', testFun)
  strictEqual(testFun, model.getEventList()['event'].callback)
  model.emit('event', 2, 2)
  strictEqual(testFunResult.called, true)
})

// Remove listener Test
DoTest(function () {
  let model = new EventEmitter()
  model.on('event', testFun)
  model.off('event')
  model.emit('event', 2, 2)
  strictEqual(testFunResult.called, false)
  strictEqual(model.getEventList()['event'], undefined)
})


// Listen to another object
DoTest(function () {
  let model = new EventEmitter()
  let model2 = new EventEmitter()
  model.listenTo(model2, 'event', testFun)
  model2.emit('event')
  strictEqual(testFunResult.called, true)
})

// should listen only to proper event
DoTest(function () {
  let model = new EventEmitter()
  let model2 = new EventEmitter()
  model.listenTo(model2, 'event2', testFun)
  model2.emit('event')
  strictEqual(testFunResult.called, false)
})

// Should remove listener
DoTest(function () {
  let model = new EventEmitter()
  let model2 = new EventEmitter()
  model.listenTo(model2, 'event', testFun)
  model.stopListenTo(model2, 'event')
  model2.emit('event')
  strictEqual(testFunResult.called, false)
})

