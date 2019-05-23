/**
 * Categories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  //migrate:'alter',
  attributes: {

  
  	id:{
  		type:'integer',
  		autoincrement:true,
       primaryKey: true,
    
  	},
  	name:{
  		type:'string',
      unique: true,
       
  	},
  	description:{
  		type:'string'
  	},
    postings:{
    collection : 'posting',
    via : 'CatPost'
  },
  },
 	 tableName: 'categories'
};

