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

app.controller('KnowYourPlaceController', function($scope, $http) {
    $scope.message = "";
    $scope.knowFriends = function() {
        var request = $http.get('/knowYourPlace/'+$scope.zipcode);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    };
});

// Controller that receives the checked inputs from "Find your Place" and outputs the businesses
app.controller('KnowYourPlaceController2', function($scope, $http) {
    console.log("controller activated")
    $scope.zipcode = "?????";
    $scope.Find = function(p) {
        //var request = $http.get('/findYourPlace?'+ $scope.p);
        console.log($scope.p);
        /*var handle = "";
        for (var key in $scope.p){
            var attrName = key;
            var attrValue = $scope.p[attrName];
            handle += attrName;
            console.log("key: " + attrName);
            console.log("value: " + attrValue);
        }*/
        //var request = $http.get('/knowYourPlace/'+ $scope.zipcode +'/'+ $scope.p.cuisine + '/'+$scope.p.pricerange +'/'+$scope.p.delivery +'/'+$scope.p.takeout +'/'+$scope.p.bars+'/'+$scope.p.clubs+'/'+$scope.p.casinos+'/'+$scope.p.rentprice+'/'+$scope.p.listprice+'/'+$scope.p.housevalue);
        console.log("find function activated in controller");



    }
});
// Controller that receives the checked inputs from "Find your Place" and outputs the businesses
app.controller('findYourPlaceController', function($scope, $http) {
    console.log("controller activated")
    $scope.Find = function(p) {
        //var request = $http.get('/findYourPlace?'+ $scope.p);
        console.log($scope.p);
        var request = $http.get('/findYourPlace/'+ $scope.p.delivery +'/'+ $scope.p.onedollarsign + '/'+$scope.p.twodollarsigns +'/'+$scope.p.threedollarsigns +'/'+$scope.p.fourdollarsigns +'/'+$scope.p.weekends +'/'+$scope.p.vegan+'/'+$scope.p.vegetarian+'/'+$scope.p.bars+'/'+$scope.p.clubs+'/'+$scope.p.casinos+'/'+$scope.p.cafes+'/'+$scope.p.noise+'/'+$scope.p.childcare+'/'+$scope.p.recreation+'/'+$scope.p.low+'/'+$scope.p.mid+'/'+$scope.p.high);
        console.log("find function activated in controller");
        request.success(function(data) {
            $scope.zipcode = data[0].postal_code;
            console.log(data[0].postal_code)
        });
        request.error(function(data) {
            console.log('err');
        });
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