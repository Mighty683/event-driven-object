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