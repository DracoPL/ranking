/**
 * Standing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Standing from './standing.model';
var StandingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StandingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Standing.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StandingEvents.emit(event + ':' + doc._id, doc);
    StandingEvents.emit(event, doc);
  }
}

export default StandingEvents;
