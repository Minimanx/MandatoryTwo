import { Router } from "express";
const router = Router();
import { db } from "../database/createConnection.js";
import mailer from "../mailer/mailer.js";


router.get("/auth/cart", async (req, res) => {
    const cart = await db.all(`SELECT carts.amount, products.id, products.name, products.price, products.image FROM carts INNER JOIN products ON products.id=carts.productID WHERE userID = ?`, [req.session.userID]);
    res.status(200).send({ data: cart });
});

router.get("/auth/cart/checkout", async (req, res) => {
    const cart = await db.all(`SELECT carts.amount, products.id, products.name, products.price, products.image FROM carts INNER JOIN products ON products.id=carts.productID WHERE userID = ?`, [req.session.userID]);
    const user = await db.get(`SELECT name, email, address FROM users WHERE id = ?`, req.session.userID);

    let htmlString = "<ul>";
    htmlString += cart.map((product) => { return `<li>${product.id}. ${product.name} - ${product.amount} x ${parseFloat(product.price).toFixed(2)}dkk - ${(parseFloat(product.price) * product.amount).toFixed(2)}dkk</li>`}).join(' ');
    htmlString += "</ul>";
    htmlString += "<h2>Total: ";
    htmlString += cart.reduce((sum, product) => { return parseFloat(sum) + parseFloat(product.price) * product.amount }, 0).toFixed(2);
    htmlString += "</h2>";
    htmlString += `<h2>Delivered to: ${user.address}</h2>`;

    mailer("Order confirmation", `<h1>Thank you, ${user.name}, for your purchase!</h1>` + htmlString, req.session.email);

    await db.run(`DELETE FROM carts WHERE userID = ?`, req.session.userID);

    cart.forEach((product) => {
        db.run(`UPDATE products SET popularity = popularity + 1 WHERE id = ?`, [product.id]);
    });
    
    res.status(200).send({ message: "Thank your for your purchase" });
});

router.post("/auth/cart", async (req, res) => {
    const product = await db.get(`SELECT * FROM carts WHERE userID = ? AND productID = ?`, [req.session.userID, req.body.productID]);

    if(product !== undefined) {
        await db.run(`UPDATE carts SET amount = ? WHERE userID = ? AND productID = ?`, [++product.amount, req.session.userID, req.body.productID]);
    } else {
        await db.run(`INSERT INTO carts(amount, userID, productID) VALUES(?, ?, ?)`, [1, req.session.userID, req.body.productID]);
    }

    res.status(200).send({ message: "Successfully added product to cart" });
});

router.delete("/auth/cart/:id/all", async (req, res) => {
    await db.run(`DELETE FROM carts WHERE productID = ? AND userID = ?`, [req.params.id, req.session.userID]);
    res.status(200).send({ message: "Product succesfully removed from cart" });
});

router.delete("/auth/cart/:id", async (req, res) => {
    const product = await db.get(`SELECT * FROM carts WHERE productID = ? AND userID = ?`, [req.params.id, req.session.userID]);

    if(product.amount === 1) {
        await db.run(`DELETE FROM carts WHERE productID = ? AND userID = ?`, [req.params.id, req.session.userID]);
    } else {
        await db.run(`UPDATE carts SET amount = ? WHERE userID = ? AND productID = ?`, [--product.amount, req.session.userID, req.params.id]);
    }
    
    res.status(200).send({ message: "Product succesfully removed from cart" });
});



export default router;