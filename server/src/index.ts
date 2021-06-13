import cors from 'cors';
import express from 'express';

import { SubscribeRouter } from './routes/subscribe';

import mongoose from 'mongoose';

const uri = "mongodb+srv://admin:admin@cluster0.l7oil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('db connected'));

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());


app.use('/api/subscribes', SubscribeRouter);

app.listen(PORT, () => {
    console.log('App running');
});