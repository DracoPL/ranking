'use strict';

import mongoose from 'mongoose';

var PlayerSchema = new mongoose.Schema({
  name: String,
  rank: Number
});

export default mongoose.model('Player', PlayerSchema);
