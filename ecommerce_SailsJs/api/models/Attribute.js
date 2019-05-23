/**
 * Attribute.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
autoCreatedAt: true,
autoUpdatedAt: true,
///migration:'alter',

 
  attributes: {

  	 id:{
      type:'integer',
      autoincrement:true,
       primaryKey: true,
      unique: true
    },
    name:{
    	type:'string'
    },
    description:{
    	type:'string',

    },
    type:{
      type:'string',

    },
    sub:{
    model : 'subcategories'
  }
  


  },
  tableName: 'attributes'
};

