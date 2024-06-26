const mongoose = require('mongoose');
const init = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected")).catch(err => console.error(err));
}

module.exports = { init }