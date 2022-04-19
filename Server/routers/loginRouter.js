import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import { db } from "../database/createConnection.js";
import mailer from "../mailer/mailer.js";
import crypto from "crypto";

router.get("/auth/logout/:id", (req, res) => {
    if(parseInt(req.params.id) === req.session.userID){
        req.session.destroy();
        res.sendStatus(200);
    } else{
        res.status(401).send({ message: "You must logout by clicking the button" })
    }
});

router.get("/api/resetpassword/:token", async (req, res) => {
    if(req.params.token === null) {
        res.status(401).send({});
        return;
    }

    const email = await db.get(`SELECT email FROM users WHERE passwordToken = ?`, [req.params.token]);

    if(email === undefined) {
        res.status(401).send({});
        return;
    }
    
    res.status(200).send({ data: email });
});

router.post("/login", async (req, res) => {
    const clientUser = req.body.clientUser;
    const serverUser = await db.get(`SELECT * FROM users WHERE email = ?`, [clientUser.email.toLowerCase()]);

    if (serverUser === undefined) {
        res.status(400).send({message: "Email doesn't exist"});
        return;
    }

    if(await bcrypt.compare(clientUser.password, serverUser.password)){
        const {password, address, passwordToken, ...responseUser} = serverUser;
        req.session.loggedIn = true;
        req.session.userID = serverUser.id;
        req.session.email = serverUser.email;
        res.status(200).send(responseUser);
    } else{
        res.status(401).send({ message: "Password doesn't match" });
    }
});

router.post("/forgotpassword", async (req, res) => {
    const serverUser = await db.get(`SELECT * FROM users WHERE email = ?`, [req.body.email]);

    if(serverUser === undefined) {
        res.status(200).send({});
        return;
    }

    const token = crypto.randomBytes(24).toString('hex');
    await db.run(`UPDATE users SET passwordToken = ? WHERE email = ?`, [token, req.body.email])

    mailer("Forgot Password", `<a href="http://localhost:5000/resetpassword/${token}">Click here to reset your password</a>`, req.body.email);
    res.status(200).send({});
});

router.patch("/api/resetpassword", async (req, res) => {
    if(req.params.token === null) {
        res.status(401).send({});
        return;
    }

    const user = await db.get(`SELECT email, passwordToken FROM users WHERE passwordToken = ?`, [req.body.token]);

    if(user.email === req.body.email && user.passwordToken === req.body.token) {
        const newPassword = await bcrypt.hash(req.body.newPassword, 12);
        await db.run(`UPDATE users SET password = ?, passwordToken = NULL WHERE email = ? AND passwordToken = ?`, [newPassword, req.body.email, req.body.token]);
        res.status(200).send({ message: "Password updated successfully" });
    }
});

export default router;