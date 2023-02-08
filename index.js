const express = require('express');
const accountRouter = require('./routes/account.routes');
const boxRouter = require('./routes/box.routes');
const userRouter = require('./routes/user.routes');
const userBoxes = require('./routes/userBoxes.routes');
const cardRouter = require('./routes/card.routes');
const feedbackRouter = require('./routes/feedback.routes')
const cors = require('cors')
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors(),express.json());

app.use(express.json());
app.use('/',cors(), accountRouter);
app.use('/',cors(), boxRouter);
app.use('/',cors(), userBoxes)
app.use('/',cors(), cardRouter)
app.use('/',cors(), feedbackRouter)
app.use('/account',cors(), userRouter);
app.get('/', (req, res) => {
  res.send(`Copy this link to see server settings:
    https://app.diagrams.net/?src=about#G1ijDBrWag4UfjRtG6K1ovRU0qZ8VHgfhg`);
});

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
