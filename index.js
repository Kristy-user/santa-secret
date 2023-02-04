const express = require('express');
const accountRouter = require('./routes/account.routes');
const boxRouter = require('./routes/box.routes');
const userRouter = require('./routes/user.routes');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use('/', accountRouter);
app.use('/', boxRouter);
app.use('/account', userRouter);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
