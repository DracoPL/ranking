'use strict';

import mongoose from 'mongoose';

// import Player from '../player/player.model';
// import Competition from '../competitions/competitions.model';

var MatchesSchema = new mongoose.Schema({
  competition: {
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  home: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    score: mongoose.Schema.Types.Mixed
  },
  away: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    score: mongoose.Schema.Types.Mixed
  },
  round: Number,
  played: { type: Boolean, default: false }
  // hKo: Number,
  // hTd: Number,
  // hScore: Number,
  // aKo: Number,
  // aTd: Number,
  // aScore: Number
});

export default mongoose.model('Matches', MatchesSchema);
