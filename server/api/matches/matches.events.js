/**
 * Matches model events
 */

'use strict';

import {EventEmitter} from 'events';
import Matches from './matches.model';
var MatchesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MatchesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Matches.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MatchesEvents.emit(event + ':' + doc._id, doc);
    MatchesEvents.emit(event, doc);
  }
}

export default MatchesEvents;
