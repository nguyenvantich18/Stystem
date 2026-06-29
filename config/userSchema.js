const mongoose = require("mongoose");

async function connectUserDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Kết nối MongoDB thành công");
    } catch (error) {
        console.log("Lỗi kết nối MongoDB:", error);
    }
}

module.exports = connectUserDB;