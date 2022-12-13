module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {

    // duplicity error
    if (err.code && err.code === 11000) {
      res.status(409).json({ errorMessages: ['El registro ya se encuentra presente'] })
    }

    //nesting error
    if (err.name === 'ValidationError') {
      let errorMessages = Object.values(err.errors).map(el => el.message)
      res.status(400).json({ errorMessages })
    }

    console.log(err)

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res
        .status(500)
        .json({ errorMessages: ["Error interno, vuelve a intentarlo"] })
    }

  });
};
