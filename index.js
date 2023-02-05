const express = require('express');
const accountRouter = require('./routes/account.routes');
const boxRouter = require('./routes/box.routes');
const userRouter = require('./routes/user.routes');
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const app = express();

const corsOptions = {
  origin: ['http://localhost:8080']
}
app.use(express.json());
app.use('/',cors(corsOptions), accountRouter);
app.use('/',cors(corsOptions), boxRouter);
app.use('/account',cors(corsOptions), userRouter);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
