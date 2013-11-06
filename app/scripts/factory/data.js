/**
 * Created with IntelliJ IDEA.
 * User: Anthony
 * Date: 11/3/13
 * Time: 1:24 PM
 * To change this template use File | Settings | File Templates.
 */

app.factory('dataFactory', function() {
    var factory = {};
    var customers = [{name:'MARGERINE',city:'Bion'},{name:'Joe',city:'Two'},{name:'Mary',city:'One'}];
    factory.getCustomers = function() {
        return customers;
    }

    return factory;
});