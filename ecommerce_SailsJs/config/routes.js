/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'post /register' : 'UserController.register',
  'post /social_register' : 'UserController.socialRegistration',
  'post /login' : 'UserController.login',
  'post /verify-email' : 'UserController.verifyEmail',
  'post /forget-password' : 'UserController.forgetPassword',
  'get /get-categories' : 'CategoriesController.getCategories',
  'post /get-subcategories' : 'CategoriesController.getSubcategories',
  

  
  'post /get-attributes':'CategoriesController.getAttributes',

  'post /updatePassword':'UserController.updatePass',
  'post /get-profile':'UserController.userProfile',
  'post /updateProfile':'UserController.updateProfile',

   'post /create-post' :'PostingsController.savepostings',

   'post /by-post' :'PostingsController.postingsByPostId',
   'post /by-category' :'PostingsController.postingsByCategory',
   'post /by-subcategory' :'PostingsController.postingsBySubCategory',
   'post /all-post' :'PostingsController.allPosts',
   'post /by-id' :'PostingsController.postingsByemail',
    'post /ifexist' :'UserController.ifExist',
    'post /active' :'PostingsController.postingsStatus',
    'post /deletePost' :'PostingsController.deletePost',
    'post /search' :'PostingsController.search',
    'post /updatePost' :'PostingsController.updatePost',
    'get /all_users' :'UserController.users',

                   //Admin routes

    'get /user-list' :'AdminController.allusers',
    'get /all-admins' :'AdminController.allAdmins',
    'post /delete-user': 'AdminController.deleteuser',
    'post /admin-details' : 'AdminController.adminDetails',
    'post /update-admin' :'AdminController.updateAdmin',
    'post /update-adminPass' :'AdminController.updateAdminPass',
    'post /create-admin' :'AdminController.createAdmin',
    'post /admin-update-user' : 'AdminController.updateUser',


    'get /post-list' : 'AdminController.allPost',
    'post /delete-post' : 'AdminController.deletepost',
    'get /admin-posts' : 'AdminController.adminAllPost',


    'get /all-subcategory' : 'CategoriesController.getAllsubcategories',
     'get /all-attributes' : 'CategoriesController.getAllattributes',


    'post /insert-category' : 'CategoriesController.insertCategory',
    'post /insert-subcategory' : 'CategoriesController.insertSubCategory',
   'post /insert-attribute':'CategoriesController.insertAttribute',

    'post /update-category' : 'CategoriesController.updateCategories',
    'post /update-subcategory' : 'CategoriesController.updateSubCategories',
    'post /update-attribute' : 'CategoriesController.updateAttributes',

    'post /delete-category' : 'CategoriesController.deleteCategories',
    'post /delete-subcategory' : 'CategoriesController.deleteSubCategories',
    'post /delete-attribute' : 'CategoriesController.deleteAttributes',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
