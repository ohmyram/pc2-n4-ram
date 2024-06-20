import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const KEY = process.env.KEY;

app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ username }, KEY, { expiresIn: '30m' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

app.get('/verify', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
        return res.status(200).json({ message: 'Token válido', username: decoded.username });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
