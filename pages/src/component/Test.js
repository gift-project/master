

var express = require('express');
var cors = require('cors'); // 크로스에러 해결법으로 *모든 경로에서 접근허용.
var app = express();

app.use(cors({
    origin: '*',
})); // 크로스에러 해결법으로 *모든 경로에서 접근허용.

var client_id = 'D4z2FcUbkf_ToGXADh0H';
var client_secret = '9LjNdS8bM2';

app.get('/search/blog', function (req, res) {

    var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query);

    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };

    var request = require('request');
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

app.listen(4000, function () {
    console.log('http://127.0.0.1:5000/search/blog?query=검색어 app listening on port 3000!');
});


// express , cors : 크로스에러땜에,  request












