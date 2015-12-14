require('angular');
require('angular-route');
require('angular-resource');
var app = angular.module('app',['ngRoute','ngResource']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})
		.when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactController'
        })
		.otherwise({
			redirectTo: '/home'
		})
});

app.controller('MainController', function ($scope, Users) {
    $scope.message = 'dude its main Controller';
    $scope.subState = false;

    $scope.changeState = function () {
        $scope.subState = true;
    };
    var promiseUser = Users.getUsers();
    promiseUser.then(function (response) {
        $scope.users = response;     
    }, function (error) {
        alert('Error occured....:(');
    });

});

app.controller('SubController', function ($scope, Users) {
    $scope.message = 'dude its sub Controller';
    var promiseUser = Users.getUsers();
    promiseUser.then(function (response) {
        $scope.users = response;     
    }, function (error) {
        alert('Error occured....:(');
    });

});

/* factory or service which makes only one actual API call, even its called multiple times.
*/
app.service('Users', function ($http, $q) {
    var cache;
    function getUsers() {
        var deferred = $q.defer();
        if (cache) {
            deferred.resolve(cache);
        } else {
            $http.get('http://www.mocky.io/v2/564dbe320f00007523d4e20c')
                .success(function (response) {
                    cache = response;
                    deferred.resolve(cache);
                }).error(function (reason) {
                    deferred.reject(reason);
                });
        }
        return deferred.promise;
    };

    function clearCache() {
        cache = null;
    };
    return {
        getUsers: getUsers,
        clearCache: clearCache
    };
});


