import { db } from "./createConnection.js";

const firstTime = true;

if(firstTime) {
    db.exec("DROP TABLE IF EXISTS users");
    db.exec("DROP TABLE IF EXISTS products");
    db.exec("DROP TABLE IF EXISTS carts");
}

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    name TEXT,
    address TEXT,
    password TEXT,
    passwordToken TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    water TEXT,
    sun TEXT,
    image TEXT,
    popularity INTEGER
)`);

db.exec(`CREATE TABLE IF NOT EXISTS carts (
    amount INTEGER,
    userID INTEGER,
    productID INTEGER,
    FOREIGN KEY(userID) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(productID) REFERENCES products(id) ON DELETE CASCADE
)`);

if(firstTime) {
    db.run(`INSERT INTO users (email, name, address, password) VALUES ('123@abc.com', 'Johan Schwennesen', 'Citronvej 4', '$2b$12$flyZd8du/MF2kK4EbWqKTOB.o331Obzmd8LbpN1dg/4LOq56cwCqu')`);
    db.run(`INSERT INTO users (email, name, address, password) VALUES ('abc@123.com', 'Carl Cederskog', 'Citronvej 4', '$2b$12$TphLhXFv/5uhhF4kvHjL/.Tnz/u7nREiSKplof4lzoSfDENskQq8q')`);
    db.run(`INSERT INTO users (email, name, address, password) VALUES ('johanschwennesen@gmail.com', 'Carl Cederskog', 'Citronvej 4', '$2b$12$TphLhXFv/5uhhF4kvHjL/.Tnz/u7nREiSKplof4lzoSfDENskQq8q')`);

    db.run(`INSERT INTO products (name, description, price, water, sun, image, popularity) VALUES ('Arabica', 'Such a nice plant!! Wow!', '49.50', 'Low', 'High', 'arabica.jpg', 0)`);
    db.run(`INSERT INTO products (name, description, price, water, sun, image, popularity) VALUES ('Black Velvet', 'Such a nice plant!! Wow!', '59.50', 'Medium', 'Low', 'blackvelvet.jpg', 0)`);
    db.run(`INSERT INTO products (name, description, price, water, sun, image, popularity) VALUES ('Dragon Scale', 'Such a nice plant!! Wow!', '39.00', 'High', 'Medium', 'dragonscale.jpg', 0)`);
    db.run(`INSERT INTO products (name, description, price, water, sun, image, popularity) VALUES ('Yucatan Princess', 'Such a nice plant!! Wow!', '65.90', 'Medium', 'Low', 'yucatanprincess.jpg', 0)`);
    db.run(`INSERT INTO products (name, description, price, water, sun, image, popularity) VALUES ('Placeholder', 'Placeholder description', '10.00', 'Low', 'Low', 'placeholder.jpg', 0)`);
    for (let i = 0; i < 40; i++) {
        db.run(`INSERT INTO products (name, description, price, water, sun, image, popularity) VALUES ('Placeholder', 'Placeholder description', '10.00', 'Low', 'Low', 'placeholder.jpg', 0)`);
    }
}
