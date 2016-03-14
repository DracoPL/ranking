/**
 * Player model events
 */

'use strict';

import {EventEmitter} from 'events';
var Player = require('./player.model');
var PlayerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PlayerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Player.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PlayerEvents.emit(event + ':' + doc._id, doc);
    PlayerEvents.emit(event, doc);
  }
}

export default PlayerEvents;
