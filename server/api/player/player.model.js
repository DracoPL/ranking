'use strict';

import mongoose from 'mongoose';

var PlayerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  rank: {type: Number}
});

export default mongoose.model('Player', PlayerSchema);
