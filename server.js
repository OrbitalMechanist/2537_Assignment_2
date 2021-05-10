'use strict';
var http = require('http');
const express = require('express');
const app = express();
const fs = require("fs");
const mysql = require('mysql');
const bodyParser = require('body-parser');


app.use('/script', express.static('./script'));
app.use('/css', express.static('./css'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {

    fs.readFile("./index.html", function (error, pgRes) {
        if (error) {
            res.writeHead(404);
            res.write("UH-OH 404");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(pgRes);
        }
        res.end();
    });
});

app.get('/request-db', function (req, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        multipleStatements: true
    });
    let query = "USE assignment2; SELECT * FROM member";
    connection.connect();
    connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        }
        console.log(results);

    });

    console.log('received database request');
    res.setHeader('Content-Type', 'application/json');
    connection.query(query, function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.send({ msg: results });
    });
    console.log("sent database");
});


app.post('/add-member-db', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'assignment2'
    });
    connection.connect();

    console.log(req.body);
    console.log("First Name:", req.body.first_name);
    
    connection.query("INSERT INTO member (first_name, last_name, email, vehicle, verified) VALUES (?, ?, ?, ?, ?);",
        [req.body.first_name, req.body.last_name, req.body.email, req.body.model, req.body.verified],
        function (error, results, fields) {
            if (error) {
                throw error;
            }
            res.send({ status: "success"});
        });
    connection.end();
    
});

app.post('/modify-member-db', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'assignment2'
    });
    connection.connect();

    let fieldToUse = req.body.field;

    let queryExpr = ";";

    queryExpr = "UPDATE member SET " + fieldToUse + " = ? WHERE ID = ?;"

    connection.query(queryExpr,
        [req.body.data, req.body.target_id],
        function (error, results, fields) {
            console.log('Rows returned are: ', results);
            if (error) {
                throw error;
            }
            console.log(error);
            res.send({ status: "success" });
        });
    connection.end();


})

var port = 451;

app.listen(port, function () {
    console.log('Ready at port ' + port);
});