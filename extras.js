const fs = require('fs');
const extras = exports;

let sessionid=0;


extras.getid = function () {
    return Date.now() + sessionid++;
}

extras.save = function (data) {
   // console.log(data);
    fs.writeFileSync("articles.json", JSON.stringify(data), "utf8", (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("articles updated");
        }
    });
};

extras.logRequest = function (url, body, time) {
    let result = {
        "time" : time,
        "url" : url,
        "body" : body
    };
    let filename = extras.getCurrentLogFilename();
    fs.appendFile(filename, fs.existsSync(filename) ? "," + JSON.stringify(result, null, "\t") : "[" + JSON.stringify(result, null, "\t"),
        (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("log updated");
            }
        });
};

extras.getCurrentLogFilename = function () {
    return "Logs/" + new Date().toISOString().slice(0,10).replace(/-/g,"") + ".txt";
};

extras.send = function (req, res, payload, cb) {
    cb(null, JSON.parse(fs.readFileSync(extras.getCurrentLogFilename(), "utf8", (err) => {
        if (err) {
            console.error("Error occured during log read");
        }
    }) + "]"));
};

extras.getResponse = function (contentType, body) {
    return {
        "contentType" : contentType,
        "body"        : body
    }
};

extras.contentTypes = {
    'html'  : 'text/html',
    'js'    : 'text/javascript',
    'json'  : 'application/json',
    'css'   : 'text/css',
    'text'  : 'text/plain'
};