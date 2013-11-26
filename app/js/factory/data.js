/**
 * Created with IntelliJ IDEA.
 * User: Anthony
 * Date: 11/3/13
 * Time: 1:24 PM
 * To change this template use File | Settings | File Templates.
 */

app.factory('dataFactory', function($q, $rootScope) {

    return {
        getCustomers: function() {


            var deferred = $q.defer();

            var commands = [];
            commands.push("Select *,REPLACE(GroupName,' ','_') as keyname,'CategoryEntities' as keyentity From [Group];");

            appmite.SqlLite.Fetch(commands,
                function(entitySets) {
                    var entities = appmite.SqlLite.FlattenEntities(entitySets['CategoryEntities']);
                    $rootScope.$apply(function() {
                        deferred.resolve(entities);
                    });

                }
                ,function(transaction, error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    }
});

//    var factory = {};
//
//    var customers = [{name:'MARGERINE',city:'Bion'},{name:'Joe',city:'Two'},{name:'Mary',city:'One'}];
//
//    factory.getCustomers = function() {
//
//        return customers;
//    }
//
//    return factory;