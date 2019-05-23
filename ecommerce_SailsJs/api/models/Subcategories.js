/**
 * Subcategories.js
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
      unique: true
    },
    category_id:{
      type:'integer'
    },
    name:{
      type:'string',

    },
    description:{
      type:'string'
    },
  attribute :{
    collection : 'attribute',
    via : 'sub'
  },
  postings :{
    collection : 'posting',
    via : 'subPost'
  },

  },
  tableName: 'subcategories'
};

