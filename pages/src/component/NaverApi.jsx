import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { responseEncoding } from 'axios';

// var express = require('express');

const NaverApi = () => {

   
    const [data, setData] = useState([]);




// var app = express();
// var client_id = 'YOUR_CLIENT_ID';
// var client_secret = 'YOUR_CLIENT_SECRET';
// app.get('/search/blog', function (req, res) {
//    var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // JSON 결과
// //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
//    var request = require('request');
//    var options = {
//        url: api_url,
//        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
//     };
//    request.get(options, function (error, response, body) {
//      if (!error && response.statusCode == 200) {
//        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
//        res.end(body);
//      } else {
//        res.status(response.statusCode).end();
//        console.log('error = ' + response.statusCode);
//      }
//    });
//  });
//  app.listen(3000, function () {
//    console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
//  });





































    // 쇼핑몰 api
    function Gift() {
        const abc = encodeURIComponent("모자")
        const shoppingData = async () => {
            const URL = "/v1/search/shop.json";
            const ClientID = "D4z2FcUbkf_ToGXADh0H";
            const ClientSecret = "9LjNdS8bM2";


            console.log(encodeURIComponent("모자"))
            console.log(decodeURIComponent("모자"))

            await axios
                .get(URL, {
                    responseEncoding: 'utf8',
                    params: {
                        query:(encodeURIComponent("모자"))
                    },
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept': 'application/json; charset=utf-8',
                        "X-Naver-Client-Id": ClientID,
                        "X-Naver-Client-Secret": ClientSecret,
                    },
                })
                .then((res) => { console.log(res) })
                .catch((e) => {console.log(e) });
        };
        shoppingData();
    }

            useEffect(() => {
               // Gift();
            }, []);
    // 쇼핑몰 api
    
    return (
        <>22</>
    );



}

export default NaverApi