const router = require('./router');
// const table = require('./routes.json');
const express = require('express');

const app = express();

router.init();

app.get('/reset', (req, res) => {
  router.flushCheckCache();
  res.sendStatus(200);
});

app.get(/.*/, (req, res) => {
  router.transform(req.path, (target) => {
    if (target) {
      console.log('Request received: Redirecting %s to %s', req.path, target);
      res.redirect(302, target);
    } else {
      console.error('Request received: Path not found! %s', req.path);
      res.status(404).send('Sorry, I couldn\'t find that. :(');
    }
  });
});


// start server
const server = app.listen(3001, () => {
  const port = server.address().port;
  console.log(`Server listening on port ${port}`);
});
