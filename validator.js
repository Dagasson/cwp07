const validator = exports;

validator.isValid=function(req)
{
	if(req.title!==undefined&&req.text!==undefined&&req.date!==undefined
	&&req.author!==undefined&&validator.iscommentsValid(req.comments)) return true;
}

validator.iscommentsValid = function (comments) {//??
    comments.forEach((value) => {
        if (!validator.isCommentValid(value))
            return false;
    });
    return true;
};

validator.isCommentValid = function (req) {
    return Number.isInteger(req.articleId) && req.text !== undefined
        && req.date !== undefined && req.author !== undefined;
};