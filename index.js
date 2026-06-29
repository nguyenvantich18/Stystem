const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const connectUserDB = require("./config//userSchema");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");
dotenv.config();

connectUserDB();

app.get("/",(req,res) => {
    res.render("home");
})

app.get("/login",(req,res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.send("Tài khoản không tồn tại");
        }

        if (user.password !== password) {
            return res.send("Sai mật khẩu");
        }

        res.send("Đăng nhập thành công");
    } catch (err) {
        console.log(err);
        res.send("Có lỗi xảy ra");
    }
});


app.listen(3000,() => {
    console.log(">>> app is runing in http://localhost:3000")
});