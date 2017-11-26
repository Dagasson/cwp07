const fs = require('fs');
const static = exports;
const extras = require("./extras");

static.defaulthtml = function (req, res, payload, cb) {
    fs.readFile('./public/index.html',(err,data) => {
        if(err)
        {
            cb({code: 404, message: 'Page not found'});
        }
        else
        {
            res.end(data);
          //  cb(null, extras.getResponse(extras.contentTypes["html"],data));
        }
    });
};

static.formhtml = function (req, res, payload, cb) {
    fs.readFile('./public/form.html',(err,data) => {
        if(err)
        {
            cb({code: 404, message: 'Page not found'});
        }
        else
        {
            res.end(data);
        }
    });
};

static.indexjs = function (req, res, payload, cb) {
    fs.readFile('./public/index.js',(err,data) => {
        if(err)
        {
            cb({code: 404, message: 'Page not found'});
        }
        else
        {
            res.end(data);
        }
    });
};

static.formjs = function (req, res, payload, cb) {
    fs.readFile('./public/form.js',(err,data) => {
        if(err)
        {
            cb({code: 404, message: 'Page not found'});
        }
        else
        {
            res.end(data);
        }
    });
};

static.sitecss = function (req, res, payload, cb) {
    fs.readFile('./public/site.css',(err,data) => {
        if(err)
        {
            cb({code: 404, message: 'Page not found'});
        }
        else
        {
            res.end(data);
        }
    });
};