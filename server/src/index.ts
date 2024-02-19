import express from 'express';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    res.json({
        content: 'Hello World !',
    });
});

app.get('/generate', async (req, res) => {});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
