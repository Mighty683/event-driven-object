# Event Driver
Simple event driver object

## Usage 
```
npm install event-driven-object
```

```js
var eventEmmiter = require('event-driven-object')
```

You can add/remove custom events
```js
model.on('eventName', callback) // Subscribe to event with callback
```
```js
model.off('eventName') // Unsubscribe event listener
```
```js
model.emit('eventName', ...args) // emit event
```