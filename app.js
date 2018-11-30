const  express = require('express'),
            request = require('request');
            app = express(),
            bodyParser = require('body-parser'),
            port = process.env.PORT;


var resultobj ;
if (port == null || port == "") {
  port = 3000;
}

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//===================================
//                  ROUTES
//===================================
app.get('/', (req, res) =>   res.render('home') );

app.get('/result', function(req, res) {
    let searchTerm = req.query.search;
    let page = Number(req.query.page) ? Number(req.query.page) : 1;
    let apiURL = "http://www.omdbapi.com/?apikey=thewdb&s="+searchTerm+"&page="+page ;
    request(apiURL, function (error, response, body) {
        if (error)
            res.send('ERROR:', error);
        else {
            console.log('Status Code:', response && response.statusCode);
            resultobj = JSON.parse(body);
            resultobj.searchTerm = searchTerm;
            resultobj.currentPage = page;
            res.render('results' , {resultobj : resultobj});
        }
    });
});

app.listen(port, () => console.log(`Movie API App listening on port ${port}!`));
