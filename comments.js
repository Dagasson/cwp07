const http=require('http');
const fs = require('fs');
let news=require("./articles.json");
let extras=require("./extras.js");
let validator=require("./validator.js");
const comments = exports;

comments.create=function(req,res,payload,cb)
{
	if(validator.isCommentValid(payload)){
		let index = news.findIndex(article => article.id === payload.articleId);
	if(index!==-1)
	{
		payload.id=extras.getid();
		news[index].comments.push(payload);
		let commentIndex=news[index].comments.length;
		cb(null, news[index].comments[commentIndex-1]);
		extras.save(news);
	}
	else
		cb({code: 405, message: 'Article not found'});
	}
	else
		cb({code: 405, message: 'Article not found'});
}

comments.delete=function(req, res, payload, cb)
{
	let index=news.findIndex(ind=>ind.id===payload.id);
	 if (index !== -1) {
        let com_index = news[index].comments.findIndex(comment => comment.id === payload.articleId);
        if (com_index !== -1) {
            news[index].comments.splice(com_index, 1);
            cb(null, news);
            extras.save(news);
        }
        else {
            cb({code: 406, message: 'Comment not found'});
        }
    }
    else {
        cb({code: 405, message: 'Article not found'});
    }
	
	
	
	
}


