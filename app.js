
/**
 * Module dependencies.
 */
var express = require('express');
var store = require('./routes/store');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/public');
  app.set('view engine', 'jade');
/*
app.set('views', __dirname + '/views');
*/
app.engine('html', require('ejs').renderFile);


//app.use(express.staticProvider(__dirname + '/public'));
  app.use(express.static(__dirname + '/public'));

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));

});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/', store.home);
app.post('/', store.home_post_handler);
// display the list of item
app.get('/items', store.items);
// show individual item
app.get('/item/:id', store.item);

// show general pages
app.get('/page', store.page);

app.get('/logout', function(req, res) {
    // delete the session variable
    delete req.session.username;
    // redirect user to homepage
    res.redirect('/');
});

app.get('/login_shopper', function(req,res) {
   res.render('login_shopper.html');
});

app.get('/contact', function(req,res) {
   res.render('contact.html');
});

app.get('/about', function(req,res) {
   res.render('about.html');
});

app.get('/home_shopper', function(req,res) {
   res.render('home_shopper.html');
});

app.get('/product_shopper', function(req,res) {
   res.render('product_shopper.html');
});

app.get('/product_customer', function (req,res){

   res.render('product_customer.html');
/*   
   res.render(‘product_customer.ejs’, {
	layout:false
   });
*/
});

app.get('/product_supplier', function (req,res){
    res.render('product_supplier.html');
});


app.listen(8080);

