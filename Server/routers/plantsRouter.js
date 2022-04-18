import { Router } from "express";
const router = Router();
import { db } from "../database/createConnection.js";

router.get("/api/plants", async (req, res) => {
    const plants = await db.all(`SELECT * FROM products`);
    res.status(200).send({ data: plants });
});

router.get("/api/plants/popular", async (req, res) => {
    const plants = await db.all(`SELECT * FROM products ORDER BY popularity DESC LIMIT 4`);
    res.status(200).send({ data: plants });
});

router.get("/api/plants/:id", async (req, res) => {
    const plant = await db.get(`SELECT * FROM products WHERE id = ?`, [req.params.id]);
    res.status(200).send({ data: plant });
});

export default router;