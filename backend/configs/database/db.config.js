const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4mza5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  )
  .then(() => console.log("Connexion database OK"))
  .catch((err) => console.log(`erreur de connexion => ${err.message}`));
