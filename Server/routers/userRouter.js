import { Router } from "express";
const router = Router();
import { db } from "../database/createConnection.js";
import bcrypt from "bcrypt";
import mailer from "../mailer/mailer.js";


router.get("/auth/account", async (req, res) => {
    const user = await db.get(`SELECT email, name, address FROM users WHERE id = ?`, [req.session.userID]);
    res.status(200).send({ data: user });
});

router.post("/signup", async (req, res) => {
    if(req.body.password.length < 8) {
        res.status(400).send({ message: "Password is too short" });
        return;
    }
    if(!/\S+@\S+\.\S+/.test(req.body.email)) {
        res.status(400).send({ message: "Email must be valid" });
        return;
    }
    const emailExists = await db.get(`SELECT email FROM users WHERE email = ?`, [req.body.email.toLowerCase()]);
    if(emailExists === undefined) {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await db.run(`INSERT INTO users(email, name, address, password) VALUES(?, ?, ?, ?)`, [req.body.email.toLowerCase(), req.body.name, req.body.address, hashedPassword]);
        mailer("Account Created", "<h1>You created an account!<h1>", req.body.email);
        res.status(200).send({});
    } else {
        res.status(400).send({ message: "Email already exists" });
    }
    
});

export default router;