const http=require('http');
const fs = require('fs');
let news=require("./articles.json");
let validator=require("./validator.js");
let extras=require("./extras.js");
const articles=exports;

const sortFieldDefault = "date";
const sortOrderDefault = "desc";
const pageDefault = 1;
const limitDefault = 10;
const includeDepsDefault = true;

articles.readall=function(req,res,payload,cb)
{
	let sortField = payload.sortField === undefined ? sortFieldDefault : payload.sortField;
    let sortOrder = payload.sortOrder === undefined ? sortOrderDefault : payload.sortOrder;
    let page      = payload.page === undefined ? pageDefault : payload.page;
    let limit     = payload.limit === undefined ? limitDefault : payload.limit;
    let includeDeps = payload.includeDeps === undefined ? includeDepsDefault : payload.includeDeps;

    let response = {
        "items" : news.sort((a, b) => {
            switch (sortField) {
                case "id" : {
                    if (a.id > b.id) return sortOrder === "asc" ? 1 : -1;
                    if (a.id === b.id) return 0;
                    if (a.id < b.id) return sortOrder === "asc" ? -1 : 1;
                }
                case "title" : {
                    if (a.title > b.title) return sortOrder === "asc" ? 1 : -1;
                    if (a.title === b.title) return 0;
                    if (a.title < b.title) return sortOrder === "asc" ? -1 : 1;
                }
                case "text" : {
                    if (a.text > b.text) return sortOrder === "asc" ? 1 : -1;
                    if (a.text === b.text) return 0;
                    if (a.text < b.text) return sortOrder === "asc" ? -1 : 1;
                }
                case "date" : {
                    if (a.date > b.date) return sortOrder === "asc" ? 1 : -1;
                    if (a.date === b.date) return 0;
                    if (a.date < b.date) return sortOrder === "asc" ? -1 : 1;
                }
                case "author" : {
                    if (a.author > b.author) return sortOrder === "asc" ? 1 : -1;
                    if (a.author === b.author) return 0;
                    if (a.author < b.author) return sortOrder === "asc" ? -1 : 1;
                }
            }
        }).slice((page - 1) * limit, (page - 1) * limit + limit).filter((article) => {
            if (includeDeps) return true;
            if (!includeDeps) return article.comments.length === 0;

        }),
        "meta" : {
            "page" : page,
            "pages" : Math.round(news.length/limit),
            "count" : news.length,
            "limit" : limit
        }
    };
	cb(null, response);
}

articles.read=function(req,res,payload,cb)
{
	 let index = news.findIndex(article => article.id === payload.id);
    if(index !== -1)
    {
        cb(null,news[index]);
    }
    else{
        cb({code : 405, message : 'Article not found'});
    }
}

articles.create=function(req, res, payload,cb)
{
	if(validator.isValid(payload)){
	payload.id=extras.getid();
	news.push(payload);
	cb(null, payload);
	extras.save(news);
	}
	else cb({code:405, message:'Article is not valid'});
}	

articles.update = function (req,res,payload,cb) 
{
    if (validator.isValid(payload)) {
        let index = news.findIndex(article => article.id === payload.id);
        if (index !== -1) {
            news[index] = payload;
            cb(null, payload);
            extras.save(news);
        }
        else {
            cb({code: 405, message: 'Article not found'});
        }
    }
    else {
        cb({code: 400, message: 'Request invalid'});
    }
};

articles.delete=function(req,res,payload,cb)
{
	let index=news.findIndex(article=>article.id===payload.id)
	if(index!==-1)
	{
		news.splice(index,1);
		cb(null, news);
		extras.save(news);
	}
	else cb({code: 405, message: 'Article not found'});
}
	