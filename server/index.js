const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const guard = require('express-jwt-permissions');
const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://buga-shelter.ru',
  issuerBaseURL: 'https://dev-80xzdwqjue78uvuv.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/challenges', guard.check(['read:challenges']), function (req, res) {
    res.send({
        challegne1: 'This is first challenge', 
        challenge2: 'This is second challenge'
    });
});

app.listen(port);

console.log('Running on port ', port);