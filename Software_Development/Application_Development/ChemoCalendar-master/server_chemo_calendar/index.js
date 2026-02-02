import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config.js';
import user from './src/routes/user.js';
import event from './src/routes/event.js';
import { createAdmin, createHospital } from './src/utils/index.js';
import cycle from './src/routes/cycle.js';
import hospital from './src/routes/hospital.js';
import note from './src/routes/note.js';
import path from 'path';
import { fileURLToPath } from 'url';

const m_options = {
    poolSize: 10,
    connectTimeoutMS: 200000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
    socketOptions : {
        socketTimeoutMS : 300000
    },
};

mongoose.connect(config.mongodb, m_options, function (err) {
    if (err) {
        console.log("Mongo Error " + err);
    } else {
        console.log("MongoDB Connection Established");
    }
});

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../client_chemo_calendar/build')));

app.listen(8080, () => { console.log('Neene_NODE_Server running on port 8080') });
const whitelist = config.corsWhitelist;
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
};

//app.use(cors(corsOptions));
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/user', user);
app.use('/api/event', event);
app.use('/api/cycle', cycle);
app.use('/hospital', hospital);
app.use('/api/note', note);
app.get('/api/status', (req, res) => {
    res.status(200).send("API is up and running");
});

createAdmin();
createHospital();
