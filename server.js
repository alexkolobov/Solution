const addon = require('./build/Release/addon');
var fs = require('fs');
var formidable = require('formidable');
var http = require('http');
var util = require('util');
var os = require('os');
var port = 8080;
var usrList = []; // список win пользователей 
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
        // сохранение всех пользователей win
        if (os.type() == 'Windows_NT' && usrList.indexOf(os.hostname()) == -1) {
            console.log('Win user ' + os.hostname() + ' identified.');
            usrList.push(os.hostname());
        }
    }
    else if (req.method.toLowerCase() == 'post') {
        processFields(req, res);
    }
});
function displayForm(res) {
    fs.readFile('Scripts/main.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}
function processFields(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        //res.write(util.inspect(fields.name).substring(1, fields.name.length+1)); // проверка значения с веб-страницы
        var target = util.inspect(fields.name).substring(1, fields.name.length + 1);
        var i = 0; // индекс пользователя
        var f = 1; // результат сравнения имен 0 -> строки равны
        while (i < usrList.length && f != 0) {
            f = addon.compare(usrList[i], target);
            i++;
        }
        if (!f)
            res.write('Пользователь есть');
        else {
            res.write('Такого пользователя нет');
        }
        res.end();
    });
}
server.listen(port);
console.log("Server listening on " + port);
//# sourceMappingURL=server.js.map