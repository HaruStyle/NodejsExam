var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	if (req.cookies.auth){ // 로그인 정보가 있을 경우
		res.send("<h1>Login Sussess</h1>" +
			"<form method='POST' action='/logout'/>" +
			"<input type='submit' value='Logout'/>" +
			"</form>");
	} else { //로그인을 하지 않았으면 무조건 로그인 페이지로
		res.redirect('/login');
	}
});

app.get('/login',function(req,res){
	fs.readFile(__dirname+'/public/login.html',
		function(err, data){
			if(err){
				res.send(JSON.stringify(err));
			} else {
				res.send(data.toString());
			}
		});
});

app.post('/logout',function(req,res){
		res.clearCookie('auth');
		res.redirect('/login');
});

app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if(username == 'hong' && password == '1234'){
		res.cookie('auth',true);
		res.redirect('/');
	}else{
		res.redirect('/login');
	}
});


app.get('/a',function(req,res){
	res.send("<a href='/b'> Go to B</a>"+
		"<br><a href='/index.html'> Go to Home</a>");
});
app.get('/b',function(req,res){
	res.send("<a href='/a'> Go to A</a>");
});
app.get('/page/:id',function(req,res){
	var id = req.params.id;
	res.send('<h1>'+id+'Page</h1>');
});

/*app.use(function(req,res){
	//console.log(req);
	var name = req.query.name;
	var region = req.query.region;

	var agent = req.header('User-Agent');

	if (agent.toLowerCase().match(/chrome/)){
		res.send('<h1>Hello Chrome!!</h1>'+
			'name:'+name+'<br>region:'+region);
	}else{
		res.send('<h1>Hello other!!</h1>');
	}
	var object = {
		name:'Hong',
		age:30,
		marriage:false,
		friends:['Jhon','Sue'],
		job:{
			name:'salaryman',
			income:100
		}
	}
	//res.writeHead(200, { 'Content-Type':'text/html'});
	//res.end('<h1>Hello,Express</h1>');
	//express 는 아래와같이 send만 써도 된다
	res.send(JSON.stringify(object));
});
*/
app.listen(52273, function(){
	console.log('Server running....');
});
