const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const animesRouter = require("./routes/animes.routes");
const authenticationRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const PORT = process.env.PORT || 8080;
const app = express();

require("./config/passport.config")(passport);

app.use(cors());
app.use(express.json());

// app.use("/api", passport.authenticate("jwt", { session: false }), animesRouter);

app.use("/api", animesRouter);
app.use("/api", authenticationRouter);
app.use("/api", userRouter);

const server = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:jx8lmu23@animes.f5ujx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => {
      console.log(`Server started - port:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

server();
