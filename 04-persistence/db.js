const mongoose = require('mongoose');

const uri =
  'mongodb+srv://startek591:Github123@cluster0.y3kquic.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connecting to mongodb database');
  } catch (error) {
    console.error(error);
  }
}

connect();

module.exports = mongoose;
