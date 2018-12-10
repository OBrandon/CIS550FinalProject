var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('mainController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var request = $http.get('/data/'+$scope.email);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log('err');
            });
        }; 
        $scope.KnowYourPlace = function() {
            var request = $http.get('/knowYourPlace/');
        };
        $scope.FindYourPlace = function() {
            var request = $http.get('/findYourPlace/');
        };
});

// Controller that receives the checked inputs from "Find your Place" and outputs the businesses
app.controller('findYourPlaceController', function($scope, $http) {
    console.log("hi")
    $scope.message = "";
    $scope.Find = function() {
        var request = $http.get('/findYourPlace/'+ $scope.preferences);
        console.log($scope.preferences)
        console.log("hello!")
    console.log("controller activated")
    $scope.zipcode = "?????";
    $scope.Find = function(p) {
        var request = $http.get('/findYourPlace?'+ $scope.p);
        console.log($scope.p)
        console.log("find function activated in controller")



    };
});

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js

app.controller('insertController', function($scope, $http) {
    $scope.message = "";
    $scope.Insert = function() {
        var request = $http.get('/insert/'+$scope.login+'/'+$scope.name+'/'+$scope.sex+'/'+$scope.RelationshipStatus+'/'+$scope.Birthyear);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    };
});

app.controller('friendsController', function($scope, $http) {
    $scope.message = "";
    $scope.DisplayFriends = function() {
        var request = $http.get('/friends/'+$scope.login);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    };
    $scope.GoBack = function() {
        var request = $http.get('/goback/');
    }
});

app.controller('familyController', function($scope, $http) {
    $scope.init = function() {
        var request = $http.get('/initfamily/');
        request.success(function(data) {
            $scope.names = data;
        });
        request.error(function(data){
            console.log('err');
        });
    };
    $scope.init();
    $scope.DisplayFamily = function(selectedLogin) {
        console.log(selectedLogin);
        var request = $http.get('/family/'+$scope.selectedLogin.login);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    };
});