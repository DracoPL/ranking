'use strict';

import mongoose from 'mongoose';

var CompetitionsSchema = new mongoose.Schema({
  name: String,
  type: String,
  players: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
    }
  ],
  rounds: [Number],
  currentRound: { type: Number, default: 1 },
  started: { type: Boolean, default: false }
});

export default mongoose.model('Competitions', CompetitionsSchema);
