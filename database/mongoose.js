const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shawncockburn', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports.mongoose = mongoose;