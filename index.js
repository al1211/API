const bodyparse = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());

app.set('view engine', 'ejs');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anil@1234',
    database: 'Nodee'
})
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
})
app.get('/', (req, res) => {
    res.render('insert');
})
app.post('/insert', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var sql = `INSERT INTO user (user_name,user_email,user_password) VALUES ('${name}', '${email}','${password}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send("<h1>data send..</h1>");
    })
})
app.get('/show', function (req, res) {
    var sql = "SELECT * FROM `user` ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.render('show', { user: result });
    })
})
app.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    var sql = `DELETE FROM user WHERE user_id=${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect('/show');
    });

});
app.get('/edit/:id',function(req,res){
    var id = req.params.id;
    var sql = `SELECT * FROM user WHERE user_id=${id}`;
    con.query(sql,function(err,result){
        if(err) throw err;
        res.render('edit',{user:result}); 
    });
});
app.post('/update/:id',function(req,res){
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var sql = `UPDATE user SET user_name = '${name}', user_email='${email}',user_password='${password}' WHERE user_id= '${id}'`;
    con.query(sql,function(err,result){
    if(err) throw err;
    res.redirect('/show');
    });
});
app.get('/login',function(req,res){
    res.render('login');
})
app.listen(8000);