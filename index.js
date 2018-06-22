var id = 0

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
  Object.keys(this._listeners).forEach(function (listener) {
    let callback = this._listeners[listener][eventName]
    if (callback) {
      callback()
    }
  }.bind(this))
}

EventEmiter.prototype.listenTo = function (object, eventName, callback) {
  if (object._listeners[this._listenId]) {
    object._listeners[this._listenId][eventName] = callback
  } else {
    object._listeners[this._listenId] = {
      [eventName]: callback
    }
  }
}

EventEmiter.prototype.stopListenTo = function (object, eventName) {
  if (object._listeners[this._listenId]) {
    delete object._listeners[this._listenId][eventName]
  }
}

EventEmiter.prototype.getEventList = function () {
  return this._events
}

function EventEmiter () {
  this._listenId = id++;
  this._events = {}
  this._listeners = {}
}

module.exports = EventEmiter
