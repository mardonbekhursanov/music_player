const express = require("express");
const app = express();
require("dotenv").config();
const pool = require("./config");
const db = require("./models");
const { adminRegister } = require("./controllers");

// ================= CORS =================
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:5000", "http://localhost:3001"],
    credentials: true,
  })
);

require("colors");
const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
const path = require("path");

// ================= MIDDLEWARES =================
app.use(
  session({
    store: new pgStore({
      tableName: "user_session",
      pool,
    }),
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ================= SWAGGER =================
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Music Player API",
      version: "1.0.0",
      description: "Music Player Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000/v1/api",
        description: "Local server",
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication routes" },
      { name: "User", description: "User routes" },
      { name: "Admin", description: "Admin routes" },
      { name: "Songs", description: "Songs management" },
      { name: "Playlist", description: "Playlists management" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid",
        },
      },
    },
  },
  apis: ["./routes/**/*.js"],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ================= ROUTES =================
app.use("/v1/api/admin", require("./routes/admin.route"));
app.use("/v1/api/playlist", require("./routes/playlist.route"));
app.use("/v1/api/auth", require("./routes/auth.route"));
app.use("/v1/api/user", require("./routes/user.route"));
app.use("/v1/api/songs", require("./routes/songs.route"));

// ================= DEFAULT ROUTES =================
app.get("/", (req, res) => {
  res.redirect("/docs")
});

app.use((req, res) => {
  res.status(404).json({
    message: "NOT FOUND!",
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("\nSuccessfully database connected ✅".green);
  } catch (error) {
    console.log("Database not connected ❌");
  }

  await db.sequelize.sync({ force: false });
  await adminRegister();

  app.listen(PORT, () => {
    console.log(
      `\nServer is running on http://localhost:${PORT}`.cyan.bold
    );
  });
};

start();
