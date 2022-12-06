module.exports = app => {

    const listsRoutes = require("./lists.routes");
    app.use("/api/lists", listsRoutes)

    const authRoutes = require("./auth.routes");
    app.use("/api/auth", authRoutes)

    const uploadRoutes = require("./upload.routes");
    app.use("/api/upload", uploadRoutes)

}