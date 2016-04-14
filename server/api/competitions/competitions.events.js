/**
 * Competitions model events
 */

'use strict';

import {EventEmitter} from 'events';
var Competitions = require('./competitions.model');
var CompetitionsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompetitionsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Competitions.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompetitionsEvents.emit(event + ':' + doc._id, doc);
    CompetitionsEvents.emit(event, doc);
  }
}

export default CompetitionsEvents;
