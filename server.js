var express = require('express');
var app = express();
const fs = require('fs');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var obj1 = require('./www/API/CONTENTLISTINGPAGE-PAGE1');
var obj2 = require('./www/API/CONTENTLISTINGPAGE-PAGE2');
var obj3 = require('./www/API/CONTENTLISTINGPAGE-PAGE3');
var movies = [];

obj1['page']['content-items']['content'].map(o => {
    movies.push(o.name);
});
obj2['page']['content-items']['content'].map(o => {
    movies.push(o.name);
});
obj3['page']['content-items']['content'].map(o => {
    movies.push(o.name);
});

movies = removeDuplicateUsingSet(movies);

function removeDuplicateUsingSet(arr) {
    let unique_array = Array.from(new Set(arr))
    return unique_array
}

app.use('/', express.static(__dirname + '/www'));

// app.get('/', function(req, res){
//     res.sendFile(express.static(__dirname +'/dist/diangnal-workshop/index.html'));
// });

app.get('/search/:text', function (req, res) {
    var result = movies.filter(o => {
        return (o.toLowerCase().indexOf(req.params.text.toLowerCase()) !== -1);
    })
    res.send(result);
});

app.listen(port, ip);