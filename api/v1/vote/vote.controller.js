const express = require('express');
const squel = require("squel");
const router = express.Router();
const connection = require('../../../configs/db_config');
//
//
//retrieve all themes list
 /**
 * @api {get} v1/vote/theme View all themes
 * @apiName ThemeView
 * @apiGroup Vote
 *
 * @apiSuccess {Int} themeId  Id of theme.
 * @apiSuccess {String} themeName  Theme`s name.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "themeId": 1,
 *        "themeName": "newName"
 *     }
 *
 *
 * @apiError Internal server error.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "msg": 'Internal Error'
 *       "error" : 'err'
 *     }
 */
router.get('/theme', function(req, res, next) {
	//query string
	let selectAll = squel.select()
        .from("themes")
        .toString();
	//query work
	 connection.query(selectAll, function (err, data) {
    if (err){
				return res.status(500).send({msg : 'Internal error ' ,error: err});
		}
		else{
			  res.status(200).send(data);
		}
  });
});
//add theme
	/**
	* @api {post} v1/vote/theme Add new theme
	* @apiName ThemePost
	* @apiGroup Vote
	*
	* @apiParam {String} themeName for body parameter.
	*
	* @apiSuccess {String} error  Eror check passed succesfuly.
	* @apiSuccess {Int} themeId Theme`s ID.
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*     {
	*     "error": null,
	*     "themeId": 10
     }
	*
	* @apiError Internal server error.
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 500 Internal Server Error
	*     {
	*       "error" : 'err'
	*     }
	*/
router.post('/theme', function(req, res) {
	//query string
	if( req.body.themeName == undefined || req.body.themeName.length == 0){
			return res.status(500).send('No theme name provided!');
	}
	else if (req.body.themeName.length > 1024){
			return res.status(500).send('Too much symbols');
	}
	let insert = squel.insert()
							 .into("themes")
							 .set("themeName", req.body.themeName)
							 .toString();
  //query work
	connection.query(insert, function (err, data) {
    if (err){
	  	return res.status(500).send({error: err});
		}
		else{
	    return res.status(200).send({error: null, themeId : data.insertId, name : req.body.themeName});
		}
  	});
});
//vote - YES
/**
* @api {post} v1/vote/theme/:themeId/yes  Vote 'yes' for theme
* @apiName ThemeVoteYes
* @apiGroup Vote
*
* @apiParam {Id} themeId from parameter
*
* @apiSuccess {String} response Check if everything is fine.
* @apiSuccess {String} vote Check if User voted Yes
* @apiSuccess {Int} themeId Theme`s id User has voted for
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
    "response": "OK",
    "vote": "yes",
    "themeId": "1"
}
*
* @apiError Internal server error.
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Internal Server Error
*     {
*       "error" : 'err'
*     }
*/
router.post('/theme/:themeId/yes', function(req, res){
	//query string
	let insert = squel.insert()
							 .into("votes")
							 .set("themeId", req.params.themeId)
							 .set("yes",true)
							 .set("no",false)
							 .toString();
	//query Work
	connection.query(insert, function (err, data) {
    if (err){
	  	return res.status(500).send({error: err});
		}
		else{
	    return res.status(200).send({response : 'OK', vote : 'yes', themeId : req.params.themeId});
		}
  	});
	//return res.status(200).send('heil');
});
//vote - NO
/**
* @api {post} v1/vote/theme/:themeId/no  Vote 'no' for theme
* @apiName ThemeVoteNo
* @apiGroup Vote
*
* @apiParam {Id} themeId from parameter
*
* @apiSuccess {String} response Check if everything is fine.
* @apiSuccess {String} vote Check if User voted No
* @apiSuccess {Int} themeId Theme`s id User has voted for
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
    "response": "OK",
    "vote": "No",
    "themeId": "1"
}
*
* @apiError Internal server error.
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Internal Server Error
*     {
*       "error" : 'err'
*     }
*/
router.post('/theme/:themeId/no', function(req, res){
	//query string
	let insert = squel.insert()
							 .into("votes")
							 .set("themeId", req.params.themeId)
							 .set("yes",false)
							 .set("no",true)
							 .toString();
	//query Work
	connection.query(insert, function (err, data) {
    if (err){
	  	return res.status(500).send({error: err});
		}
		else{
	    return res.status(200).send({response : 'OK', vote : 'no', themeId : req.params.themeId});
		}
  	});
	//return res.status(200).send('heil');
});
//theme - get all votes
/**
* @api {get} v1/theme/:themeId View all votes for selected theme
* @apiName ThemeViewSelected
* @apiGroup Vote
*

* @apiSuccess {String} themeName  Theme`s name.
* @apiSuccess {JSON} vote  Object with vote counters.
* @apiSuccess {Int} yes Quantity of 'yes' votes.
* @apiSuccess {Int} no Quantity of 'no' votes.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
    "name": "newName",
    "vote": {
        "yes": 8,
        "no": 4
    }
}
*
*
* @apiError Internal server error.
* @apiErrorExample Error-Response:
*     HTTP/1.1 500 Internal Server Error
*     {
*       "msg": 'Internal Error'
*       "error" : 'err'
*     }
*/
router.get('/theme/:themeId', function(req, res){
	// join method - альтернативный вариант
	// данный вариант подойдет если нам надо получить все темы + посчитать с ними кол-во голосов за и против
	//**
	//	select themes.*, sum(votes.yes = true) as yesCount, sum(votes.no = true) as noCount
	//	from themes left join votes
	//	on themes.themeId = votes.themeId
	//	group by themes.themeId
	//	order by yesCount;
	//**
	//неоптимальный вариант
	//let yesCountQuery = "select sum(yes = 1) from votes where (themeId = "+ req.params.themeId +")"
	//let noCountQuery = "select sum(no = 1) from votes where (themeId = "+ req.params.themeId +")"
	//let selectAll = squel.select()
	//				        .field("themeId")
	//				        .from("themes")
	//				        .where("themeId = "+req.params.themeId+")
	//				        .toString();
	//query - отпимизированный вариант
	let query = `select themes.*, sum(votes.yes = true) as yesCount, sum(votes.no = true) as noCount
							from themes left join votes
							ON themes.themeId = votes.themeId
							where themes.themeId = `+req.params.themeId+`;`
	//query Work
	connection.query(query, function (err, data) {
    if (err){
	  	return res.status(500).send({error: err});
		}
		else{
	    return res.status(200).send({ name : data[0].themeName, vote : { yes : data[0].yesCount, no : data[0].noCount }});
		}
  	});
});
module.exports = router;
