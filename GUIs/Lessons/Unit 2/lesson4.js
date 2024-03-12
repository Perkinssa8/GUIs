const eventListeners = {};

class Looper {
  callbackQueue = [];

  constructor() {
    setInterval(this.checkForEvents, 1000);
  }

  checkForEvents = () => {
    if (this.callbackQueue.length > 0) {
      const callback = this.callbackQueue.shift()
      callback();
    }
  }
}

const looper = new Looper();

function registerEventListener(type, callback) {
  eventListeners[type] = callback;
}

function dispatchEvent(type) {
  if (eventListeners[type] !== undefined) {
    looper.callbackQueue.push(eventListeners[type]);
  }
}