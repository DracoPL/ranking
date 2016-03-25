'use strict';

import mongoose from 'mongoose';

var MatchSchema = new mongoose.Schema({
  home: String,
  away: String,
  h_rank: Number,
  a_rank: Number,
  h_score: Number,
  a_score: Number,
  type: Number,
  h_points: Number,
  a_points: Number
});

export default mongoose.model('Match', MatchSchema);
