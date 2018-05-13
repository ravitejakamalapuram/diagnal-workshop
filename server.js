var express = require('express');
var app = express();
const fs = require('fs');
var obj1 = require('./API/CONTENTLISTINGPAGE-PAGE1');
var obj2 = require('./API/CONTENTLISTINGPAGE-PAGE2');
var obj3 = require('./API/CONTENTLISTINGPAGE-PAGE3');
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

app.use('/', express.static(__dirname));

app.get('/search/:text', function (req, res) {
    var result = movies.filter(o => {
        return (o.toLowerCase().indexOf(req.params.text.toLowerCase()) !== -1);
    })
    res.send(result);
});

app.listen(8080, function () { console.log('listening') });