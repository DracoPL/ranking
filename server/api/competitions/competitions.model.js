'use strict';

import mongoose from 'mongoose';

var CompetitionsSchema = new mongoose.Schema({
  name: String,
  type: String,
  players: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String
    }
  ]
});

export default mongoose.model('Competitions', CompetitionsSchema);
