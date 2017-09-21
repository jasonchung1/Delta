
// Receives Events from some source and adds them to the queue.
// dequeued events are passed to a given map of listeners.
// used for game Events, ex collision, defeating a boss, activating a door, or other trigger events.
class EventQueue {
	constructor() {
		this.eventQueue = new Array();
	}
	enqueue(event) {
		if (event instanceof Event) {
			this.eventQueue.push(event); //add event to the end of the array
		} else {
			throw new TypeError(event + " is not an instance of Event.");
		}
	}
	
	//pass the next event in the queue to the EventListeners in the given ListenerMap.
	dequeue(listenerMap) {
		if (this.eventQueue.length > 0) {
			if (listenerMap instanceof ListenerMap) {
				let e = this.eventQueue.shift(); //remove event from the front of the array
				let listeners = listenerMap.getListeners(e.getEventFilter());
				listeners.forEach(function(listener) {
					listener.handleEvent(e);
				});
			} else {
				throw new TypeError("argument error: " + listenerMap);
			}
		}
	}
	
	clear() {
		this.eventQueue = new Array();
	}
}
