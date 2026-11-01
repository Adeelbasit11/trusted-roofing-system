const https = require('https');

const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=roofer&srnamespace=6&srlimit=10&format=json';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data.slice(0, 500));
  });
});
