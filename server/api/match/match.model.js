'use strict';

import mongoose from 'mongoose';

var MatchSchema = new mongoose.Schema({
  home: String,
  away: String,
  hRank: Number,
  aRank: Number,
  hScore: Number,
  aScore: Number,
  type: Number,
  hPoints: Number,
  aPoints: Number
});

export default mongoose.model('Match', MatchSchema);
