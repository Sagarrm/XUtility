var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var replace = require("str-replace");
var storage = require('node-persist');
var error_imports = require('../models/models.js').errorimport;
var users = require('../models/models.js').users;
var magento_categories = require('../models/models.js').magentocategories;
var MongoClient = require('mongodb');
var allCategoriesArray = magento_categories.find();
var allCategories = [];
var mainCategories = [];
var pro = [];
var collectionOne = [];

storage.initSync();

router.get('/', function (req, res) {

	displayData(req, res);

});

router.post('/', function (req, res) {

	var associativeArray = new Object();
	var ass = [];
	var conn = mongoose.connection;
	var	mag_cat_query;
	var allprodsArray_1;
	var cookieSet;
	var isCookiePresent = false;
	cookieSet = req.cookies;
	//console.log("iN post All Cookies :  ", cookieSet);

	if(cookieSet['storeValue'] == undefined || cookieSet['storeValue'] == ""){
		allprodsArray_1 = error_imports.find().limit(10);
	}
	else{
		var lim = parseInt(cookieSet['showLimit']);
		allprodsArray_1 = error_imports.find({"store_name":cookieSet['storeValue']}).limit(lim);
	}
	
/*for(var cookieName in cookieSet){
		console.log("In for loop");
		if(cookieName == 'storeValue'){
			console.log("In first if");
			isCookiePresent = true;
			if(cookieSet[cookieName] == ""){
				allprodsArray_1 = error_imports.find().limit(10);
			}
			else{
				//allprodsArray_1 = error_imports.find({"store_name":cookieSet[cookieName]}).limit(10);
				var lim = parseInt(cookieSet['showLimit']);
				allprodsArray_1 = error_imports.find({"store_name":cookieSet[cookieName]}).limit(lim);
			}
		
		}
	}
*/


	allprodsArray_1.exec(function(){})
	.then(function(prods1){
		prods1.forEach(function(prod1){
			var selectedCategory = '';
			var id = prod1._id;
				suffix_1 = 'mainCategory_' + id;
				suffix_2 = 'primaryCategory_' + id;
				suffix_3 = 'secondaryCategory_' + id;
				suffix_4 = 'subCategory_' + id;
				suffix_5 = 'newTag_' + id;

			if(req.body[suffix_1]!=null && req.body[suffix_1]!='' && req.body[suffix_1]!=undefined){
				selectedCategory = selectedCategory +'/'+ req.body[suffix_1];
				if(req.body[suffix_2]!=null && req.body[suffix_2]!='' && req.body[suffix_2]!=undefined){
					selectedCategory = selectedCategory +'/'+ req.body[suffix_2];
					if(req.body[suffix_3]!=null && req.body[suffix_3]!='' && req.body[suffix_3]!=undefined){
						selectedCategory = selectedCategory +'/'+req.body[suffix_3];
						if(req.body[suffix_4]!=null  && req.body[suffix_4]!='' && req.body[suffix_4]!=undefined){
							selectedCategory = selectedCategory +'/'+req.body[suffix_4];
						}
					}
			}

			console.log("Selected cat before append : "+ selectedCategory);
				if(selectedCategory && req.body[suffix_5]!=undefined){
					console.log("In if");
					associativeArray[id] = selectedCategory + '|' + prod1.category_hierarchy + '|' + prod1.category_hierarchy + '|' + prod1.product_name + '|' + prod1.sku_number;
				}
				else if(req.body[suffix_5]==undefined){
					console.log("In else");
					associativeArray[id] = selectedCategory + '|' + prod1.category_hierarchy + '|' + prod1.product_name + '|' + prod1.sku_number;
				}
				console.log("Final final string: "+associativeArray[id]);
			}
		});
		return associativeArray;
	})
	.then(function(assoArray){
		var promiseArray = [];
		var tempPromiseArray = [];
		var selected_category,
			category_hierarchy,
			category_hierarchy_1,
			product_name,
			sku,
			product_url;
		for(var name in assoArray){

			combinedStringArray = assoArray[name].split("|");

			if((combinedStringArray.length) - 1 == 4)
			{
				selected_category = combinedStringArray[0];
				category_hierarchy = combinedStringArray[1];
				category_hierarchy_1 = combinedStringArray[0].replace(/[^A-Z0-9]+/ig, "-");
				category_hierarchy_1 = category_hierarchy_1.replace("-","");
				product_name = combinedStringArray[3].replace(/[^A-Z0-9]+/ig, "-");
				sku = combinedStringArray[4];
			}
			else if((combinedStringArray.length) - 1 == 3)
			{
				selected_category = combinedStringArray[0];
				category_hierarchy_1 = combinedStringArray[0].replace(/[^A-Z0-9]+/ig, "-");
				category_hierarchy_1 = category_hierarchy_1.replace("-","");
				product_name = combinedStringArray[2].replace(/[^A-Z0-9]+/ig, "-");
				sku = combinedStringArray[3];
			}

			product_url = category_hierarchy_1 + '/' + product_name + '/' + sku + '.html';
			product_url = product_url.toLowerCase();
			console.log("product_url: "+ product_url);

			console.log("cat hirarchy: "+category_hierarchy);
            promiseArray.push({prodid:name,category:selected_category,category_hierarchy:category_hierarchy,selected_category:selected_category,product_url:product_url});
			tempPromiseArray.push({prodid:name,category:selected_category,category_hierarchy:category_hierarchy,selected_category:selected_category,product_url:product_url});

       }

	   	/*	tempPromiseArray.forEach(function(doc){
			if(doc.category_hierarchy!= undefined){
				console.log("Updating magento categories!!!  "+ doc.category_hierarchy);

				var tempStr = doc.category;

				var cursor = conn.collection('magento_categories').find({"categories":tempStr});

				conn.collection('magento_categories').find({"categories":tempStr}).snapshot().forEach( function (record) {
					if(record.values == "" || record.values == undefined){
						record.values = doc.category_hierarchy;
					}
					else{
						record.values = record.values +" | "+doc.category_hierarchy;
					}

					conn.collection('magento_categories').save(record);
				});
			}
		});
		*/

		Promise.map(promiseArray, function(singleObj) {
			
				return magento_categories.find({"categories":singleObj.category}).exec(function(err,rescat){
					if(err)
						return console.log(err);
					rescat.forEach(function(c){
						singleObj.category = c.parent_category_ids;
					});
				}).then(function(){
						return singleObj;
				})
		})
		.then(function(assoArrayasdfsd){
			if(assoArrayasdfsd.length == 0)
			{
					console.log("Empty array: ");
					displayData(req, res)
			}
				
			else{
			
		var processedItems=0;
		 Promise.map(assoArrayasdfsd, function(sss) {
			 //var processedItems=0;
			console.log("Product url from array: "+sss.product_url);
				var o_id = new MongoClient.ObjectID(sss.prodid);
				console.log("product_url::::::::::: "+sss.product_url);

				var newCatHirarchy = replace.all( "/" ).ignoringCase().from(sss.selected_category).with( ">" );

				newCatHirarchy = newCatHirarchy.replace(">","");
				console.log("newCatHirarchy:: "+newCatHirarchy);


				var newCatName = replace.all( "/" ).ignoringCase().from(sss.selected_category).with( " " );
				newCatName = newCatName.replace(" ","");



				return conn.collection('error_import').findAndModify({_id:o_id},[['_id',1]],{ $set: {"product_category_ids":sss.category,"product_url":sss.product_url}},{new:true},
				function(e, result){
					console.log("result:: "+result);
						 conn.collection('product_import').insert({"tags":result.value.tags + " " + newCatName,

										
										"category_hierarchy":newCatHirarchy,
										"wildcard":result.value.wildcard,
										"import_type":result.value.import_type,
										"product_id":result.value.product_id,
										"product_name":result.value.product_name,
										"discount_currency":result.value.discount_currency,
										"price_currency":result.value.price_currency,
										"discount_price":result.value.discount_price,
										"product_url":result.value.product_url,
										"actual_price":result.value.actual_price,
										"product_availability":result.value.product_availability,
										"size":result.value.size,
										"retailer_url":result.value.retailer_url,
										"short_description":result.value.short_description,
										"long_description":result.value.long_description,
										"brand":result.value.brand,
										"category_name":newCatName,
										"source":result.value.source,
										"color":result.value.color,
										"product_image":result.value.product_image,
										"gender":result.value.gender,
										"product_pixel":result.value.product_pixel,
										"store_name":result.value.store_name,
										"sku_number":result.value.sku_number,
										"merchant_id":result.value.merchant_id,
										"product_url":result.value.product_url,
										"product_category_ids":result.value.product_category_ids},
										function(e, result1){
											var objid = new MongoClient.ObjectID(result.value._id);
						 conn.collection('error_import').deleteOne({"_id":o_id}, function(e, result){
							console.log("delete block01");
							processedItems = processedItems + 1;
							console.log("Counter : "+processedItems);
							if(processedItems==assoArrayasdfsd.length)
							{
								console.log("Counter reached ");
								displayData(req, res)
							}
							
								//return '123';
						})
				})
				})
		})
		}
		})
		
		/*assoArrayasdfsd.forEach(function(sss){
				console.log("Product url from array: "+sss.product_url);
				var o_id = new MongoClient.ObjectID(sss.prodid);
				console.log("product_url::::::::::: "+sss.product_url);

				var newCatHirarchy = replace.all( "/" ).ignoringCase().from(sss.selected_category).with( ">" );

				newCatHirarchy = newCatHirarchy.replace(">","");
				console.log("newCatHirarchy:: "+newCatHirarchy);


				var newCatName = replace.all( "/" ).ignoringCase().from(sss.selected_category).with( " " );
				newCatName = newCatName.replace(" ","");



				conn.collection('error_import').findAndModify({_id:o_id},[['_id',1]],{ $set: {"product_category_ids":sss.category,"product_url":sss.product_url}},{new:true},function(err,result) {
					if ( err )
						console.warn(err);
					else{

						conn.collection('product_import').insert({"tags":result.value.tags + " " + newCatName,

										"category_hierarchy":newCatHirarchy,
										"wildcard":result.value.wildcard,
										"import_type":result.value.import_type,
										"product_id":result.value.product_id,
										"product_name":result.value.product_name,
										"discount_currency":result.value.discount_currency,
										"price_currency":result.value.price_currency,
										"discount_price":result.value.discount_price,
										"product_url":result.value.product_url,
										"actual_price":result.value.actual_price,
										"product_availability":result.value.product_availability,
										"size":result.value.size,
										"retailer_url":result.value.retailer_url,
										"short_description":result.value.short_description,
										"long_description":result.value.long_description,
										"brand":result.value.brand,
										"category_name":newCatName,
										"source":result.value.source,
										"color":result.value.color,
										"product_image":result.value.product_image,
										"gender":result.value.gender,
										"product_pixel":result.value.product_pixel,
										"store_name":result.value.store_name,
										"sku_number":result.value.sku_number,
										"merchant_id":result.value.merchant_id,
										"product_url":result.value.product_url,
										"product_category_ids":result.value.product_category_ids});

						var objid = new MongoClient.ObjectID(result.value._id);
						conn.collection('error_import').deleteOne({"_id":objid});
						console.log("After delete");
						}
				});
			})*/
			//setTimeout(function() {
			//	displayData(req, res);
			//		}, 2000);
	})
	})

	function toArray(_Object){
       var _Array = new Array();
       for(var name in _Object){
               _Array[name] = _Object[name];
       }
       return _Array;
	}

function displayData(req, res){

console.log("In dispaly function!!!");
	var allprodsArray;
	var allStores;
	var allStoreArray = [];
	var cookieSet;
	cookieSet = req.cookies;
	//console.log("iN GET All Cookies :  ", cookieSet);

	console.log("Cookie storename value: "+cookieSet['storeValue']);
	
	if(cookieSet['storeValue'] == undefined || cookieSet['storeValue'] == ""){
		allprodsArray = error_imports.find().limit(10);
	}
	else{
		var lim = parseInt(cookieSet['showLimit']);
		allprodsArray = error_imports.find({"store_name":cookieSet['storeValue']}).limit(lim);
	}
		
/*	for(var cookieName in cookieSet){
		console.log("In for loop: ");
		if(cookieName == 'storeValue'){
			var isCookiePresent = true;
			console.log("In first if: ");
			if(cookieSet[cookieName] == ""){
				allprodsArray = error_imports.find().limit(10);
			}
			else{
				
				//allprodsArray = error_imports.find({"store_name":cookieSet[cookieName]}).limit(10);
				var lim = parseInt(cookieSet['showLimit']);
				allprodsArray = error_imports.find({"store_name":cookieSet[cookieName]}).limit(lim);
			}
		}	
	}
*/

		var allproducts = [];
		var products = [];

		error_imports.find().distinct('store_name', function(error, stores) {
			sttrs = stores;
			console.log("No of stores: "+sttrs.length);
		});
	
		allprodsArray.exec(function(err,prods){
		
		if(err)
			return console.log(err);
		prods.forEach(function(prod){
			console.log("Check");
	//	Promise.map(prods, function(err,prod) {
			var elem = new Object();
			elem["id"] = prod._id
			elem["tags"] = prod.id;
			elem["category_hierarchy"] = prod.category_hierarchy;
			elem["wildcard"] = prod.wildcard;
			elem["prod_id"] = prod.prod_id;
			elem["import_type"] = prod.import_type;
			elem["product_name"] = prod.product_name;
			elem["discount_currency"] = prod.discount_currency;
			elem["price_currency"] = prod.price_currency;
			elem["prod_url"] = prod.prod_url;
			elem["actual_price"] = prod.actual_price;
			elem["prod_availability"] = prod.prod_availability;
			elem["size"] = prod.size;
			elem["retailer_url"] = prod.retailer_url;
			elem["short_description"] = prod.short_description;
			elem["category_name"] = prod.category_name;
			elem["source"] = prod.source;
			elem["color"] = prod.color;
			elem["discount_type"] = prod.discount_type;
			elem["product_image"] = prod.product_image;
			elem["gender"] = prod.gender;
			elem["prod_pixel"] = prod.prod_pixel;
			elem["store_name"] = prod.store_name;
			elem["sku_number"] = prod.sku_number;
			elem["merchant_id"] = prod.merchant_id;
			elem["error_state"] = prod.error_state;

			allproducts.push(elem);
			pro = allproducts;

		});
	//res.render('index.html',{products:pro});
	})
	
		var sttrs;
		var totalNoOfProducts;
		var queryTotalNoOfProducts;
		

	
	/*var queryTotalNoOfProducts = error_imports.find({"store_name":cookieSet['storeValue']}).count();
	queryTotalNoOfProducts.exec(function(err,totalPrds){
		totalNoOfProducts = totalPrds;
		console.log("totalNoOfProducts:: "+totalNoOfProducts);
		
	});
	*/
	if(cookieSet['storeValue'] == undefined || cookieSet['storeValue'] == ""){
		queryTotalNoOfProducts = error_imports.find().count();
	}
	else{
		queryTotalNoOfProducts = error_imports.find({"store_name":cookieSet['storeValue']}).count();
	}
	queryTotalNoOfProducts.exec(function(err,totalPrds){
		totalNoOfProducts = totalPrds;
		console.log("totalNoOfProducts:: "+totalNoOfProducts);
		if(totalNoOfProducts == 0)
		{
			console.log("Truncating array");
			pro.length = 0;
		}
		else{
			console.log("Non-empty array");
		}
		
	});
		
	

	setTimeout(function() {
		pro.forEach(function(temp_product){
		console.log("Products before sending to html:  "+temp_product.sku_number);
		})
		res.render('index.html',{products:pro,strs:sttrs,totalNoOfProds:totalNoOfProducts});
	}, 2000);
	
	}
module.exports = router;
