var express = require('express');
var bodyParser =require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));

var users = [];
app.get('/user', function(req,res){
    res.send(JSON.stringify(users));
});
app.get('/user/:id', function(req,res){
    var select_index = -1;
    for (var i = 0 ; i < users.length; i++){
        var obj = users[i];
        if (obj.id == Number(req.params.id)){
            select_index = i;
            break;
        }
    }
    if (select_index == -1){
        res.send(JSON.stringify({}));
    } else {
        res.send(JSON.stringify(users[select_index]));
    }
});
app.post('/user', function(req,res){
    console.log(req.body.name);
    console.log(req.body.age);
    var name = req.body.name;
    var age = Number(req.body.age);
    var obj = {id:users.length+1, name:name, age:age};
    users.push(obj);
    res.send(JSON.stringify({result:true,api:'add user info'}));
});
app.put('/user/:id', function(req,res){
    var select_index = -1;
    for (var i = 0 ; i < users.length; i++){
        var obj = users[i];
        if (obj.id == Number(req.params.id)){
            select_index = i;
            break;
        }
    }
    if (select_index == -1){
        res.send(JSON.stringify({result:false}));
    } else {
        var name = req.body.name;
        var age = Number(req.body.age);
        var obj = {id:Number(req.params.id),
            name:name,age:age};
        users[select_index] = obj;
        res.send(JSON.stringify({result:true}));
    }
});
app.delete('/user/:id', function(req,res){
    var select_index = -1;
    for (var i = 0 ; i < users.length; i++){
        var obj = users[i];
        if (obj.id == Number(req.params.id)){
            select_index = i;
            break;
        }
    }
    if (select_index == -1){
        res.send(JSON.stringify({result:false}));
    } else {
        users.splice(select_index,1);
        res.send(JSON.stringify({result:true}));
    }

});
app.listen(52273, function(){
    console.log('Server running....');
});