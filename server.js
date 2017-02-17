const express = require('express');

const app = express();

app.lister(4000, () => {
	console.log('Listening on PORT 4000');
});
