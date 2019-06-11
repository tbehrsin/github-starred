
import express from 'express';
import fetch from 'node-fetch';

require('dotenv').config();

const app = express();

app.get('/api/oauth/callback', async (req, res, next) => {
  try {
    const { code } = req.query;

    const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_SERVER_GITHUB_SECRET}&code=${code}`, {
      method: 'POST',
      headers: {
        accept: 'application/json'
      }
    });
    const json = await response.json();

    res.cookie('accessToken', json.access_token);
    res.set('Content-Type', 'text/html');
    res.send(`
      <script>
        location.href = '/';
      </script>
    `);
  } catch (error) {
    next(error);
  }
});

const listener = app.listen(process.env.REACT_SERVER_PORT, () => {
  process.stderr.write(`Listening on port ${listener.address().port}\n`);
});
