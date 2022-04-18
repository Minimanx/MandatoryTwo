import express from "express";
import "dotenv/config";
const app = express();

app.use(express.json());

import path from "path";
app.use(express.static(path.resolve("../client/public")));

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

function auth(req, res, next) {
    if (req.session.loggedIn === true) {
        next();
    } else {
        res.status(403).send({ message: "You must log in to view this site" });
    }
}

app.use("/auth", auth);

import cartRouter from "./routers/cartRouter.js";
app.use(cartRouter);
import loginRouter from "./routers/loginRouter.js";
app.use(loginRouter);
import plantsRouter from "./routers/plantsRouter.js";
app.use(plantsRouter);
import userRouter from "./routers/userRouter.js";
app.use(userRouter);


app.get("*", (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
});
