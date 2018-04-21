
window.addMultipleListener = function addListenerMulti(element, eventNames, listenerFunction, useCapture = false) {
  const events = eventNames.split(' ');
  for (let event of events) {
    element.addEventListener(event, listenerFunction, useCapture);
  }
}
