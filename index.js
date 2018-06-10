EventEmiter.prototype.on = function (eventName, callback) {
  this._events[eventName] = {
    callback: callback
  }
}

EventEmiter.prototype.off = function (eventName) {
  if (this._events[eventName]) {
    delete this._events[eventName]
  }
}

EventEmiter.prototype.emit = function (eventName) {
  if (this._events[eventName] && this._events[eventName].callback instanceof Function) {
    this._events[eventName].callback.apply(this, Array.from(arguments).slice(1))
  }
}

EventEmiter.prototype.getEventList = function () {
  return this._events
}

function EventEmiter () {
  this._events = {}
}

module.exports = EventEmiter
