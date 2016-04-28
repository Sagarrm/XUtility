var mongoose = require('mongoose');


var usersSchema =  new mongoose.Schema({
	id: Number,
	username: String,
	password: String,
	email:String},
	{collection: 'Users'});
	
var errorimportSchema =  new mongoose.Schema({
	id: Number,
	tags : String ,
	category_hierarchy : String,
	wildcard : String,
	product_id : String,
	import_type : String,
	product_name : String,
	discount_currency : String,
	price_currency : String,
	product_url : String,
	actual_price : String,
	product_availability : String,
	size : String,
	retailer_url : String,
	short_description : String,
	category_name : String,
	source : String,
	color : String,
	discount_type : String,
	product_image : String,
	gender : String,
	product_pixel : String,
	store_name : String,
	sku_number : String,
	merchant_id : String,
	error_state : String},
	{collection: 'error_import'});

var magentoCategoriesSchema =  new mongoose.Schema({
	_id: Number,
	categories: String,
	values: String,
	parent_category_ids:[String]},
	{collection: 'magento_categories'});	

var users = mongoose.model('users', usersSchema);	

var errorimport = mongoose.model('errorImport', errorimportSchema);

var magentocategories = mongoose.model('magentocategory', magentoCategoriesSchema);

module.exports = {
  users: users,
  errorimport: errorimport,
  magentocategories: magentocategories
}