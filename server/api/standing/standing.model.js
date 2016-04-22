'use strict';

import mongoose from 'mongoose';

var StandingSchema = new mongoose.Schema({
  competition: {
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  player: {
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  round: Number,
  score: mongoose.Schema.Types.Mixed
});

export default mongoose.model('Standing', StandingSchema);
