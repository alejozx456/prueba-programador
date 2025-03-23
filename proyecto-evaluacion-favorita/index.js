import express from 'express'
import { PORT, JWT_SECRET } from './config.js'
import { UserRepository } from './user-repository.js'
import { TransactionRepository } from './transaction-repository.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json()) //usar middleware para parsear el body de las peticiones
app.use(cookieParser()) //usar middleware para parsear las cookies de las peticiones
app.use(cors(
    {
        origin: 'http://localhost:4200',
        credentials: true
    }
)) //utilizar cors para poder conectarse a la api desde la app de angular

const authMiddleware = (req, res, next) => {
    const token = req.cookies.session_token;
    if (!token) return res.status(401).json({ message: 'No tienes autorización' });

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data; // Guarda la info del usuario en req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserRepository.login({ username, password });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('session_token', token, { httpOnly: true }) //no de puede buscar en la consola
           .json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const id = await UserRepository.create({ username, password });
        res.json({ idUsuario: id }); //devolver el id del usuario
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('session_token')
    .json({ message: 'Sesión cerrada' });
});

app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Ruta protegida', user: req.user });
});

app.get('/transaction/:id', async(req,res)=>{
    try {
        const transaction=await TransactionRepository.getTransactionById({idTransaction:req.params.id})
        res.json({transaction})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.post('/transaction', async (req, res) => {
    try {
        const { idTransaction, idUser } = req.body;
        const id = await TransactionRepository.createTransaction({ idTransaction, idUser });
        res.json({ idTransaction: id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/transactionsbyuser/:id', async (req, res) => {
    try {
        const transactions = await TransactionRepository.getTransactionsByUser({ idUser: req.params.id });
        res.json({ transactions });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});


app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
});

