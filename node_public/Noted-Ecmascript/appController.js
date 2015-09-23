console.log("Minmus Ho! Loaded");
var app = angular.module("appTranslate",["ngRoute"])

.controller('CtrlTranslate', ['$scope', '$http', 'service', '$location', function ($scope, $http, service, $location) {
    console.log('CtrlTranslate loaded');
    $scope.ObjMessage = {};
    var userFetch = function() {
        $http.get('/Bookmarks').success(function (response) {
            if (response[0].user.google) {
                $scope.ObjMessage.email = response[0].user.google.email;
                $scope.ObjMessage.relation = response[0].user._id;
                console.log($scope.ObjMessage.relation);
                }
            if (response[0].user.local) {
                $scope.ObjMessage.email =  response[0].user.local.username;
                $scope.ObjMessage.relation = response[0].user._id;
                console.log($scope.ObjMessage.relation);
                }
            refresh();
            });
        };


    var refresh = function(){
        $http.get('/Bookmarks/'+$scope.ObjMessage.relation).success(function(response){
            console.log($scope.ObjMessage.relation);
            console.log('=== refresh ===');
            console.log(response);
            console.log('=== refresh ===');
            $scope.bookmarks = response;
            $scope.ObjMessage.message = "";
            $scope.ObjMessage.result = "";
            });
        };


    //Translation
    userFetch();
    $scope.onTranslate = function(){
        if(!$scope.ObjMessage.message){
            alert("Please enter a message");
            return;}
        if(!$scope.ObjMessage.language || $scope.ObjMessage.language == 'select'){
            alert("Please select a language");
            return;}

        $scope.ObjMessage = service.translateItem($scope.ObjMessage);
    };

    //Add Bookmark
    $scope.addBookmark = function(){
        console.log($scope.ObjMessage.relation + ' creation');
        $http.post('/Bookmarks', $scope.ObjMessage).success(function(response){
            console.log(response);
            refresh();
            });
        };

    //Remove Bookmark
    $scope.removeBookmark = function(id){
        console.log(id + ' was sent to server');
        $http.delete('/Bookmarks/' + id).success(function(response){
            console.log(response + ' was deleted');
            refresh();
            });
        };




}]);








