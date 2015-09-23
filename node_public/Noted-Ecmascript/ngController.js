console.log("Fortune Cookie Angular Loaded");
var appFortune = angular.module("appFortune",["ngRoute"]);
var addError = false;
appFortune.controller('appController',['$scope', '$http', function($scope, $http){
    console.log("Hello from the controller");

    var refresh = function(){
        console.log(addError);

        $http.get('/fortuneList').success(function(response){
            Translate = function(){
                $.ajax({
                    type:'GET',
                    url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20150917T145626Z.f8b4963111e4dbb9.fb04e6d38874dec7b8c7fd81a16d64c677caaad7&lang=en-ru&text=Hello.',
                    dataType: 'JSON',
                    success: function(data){
                        console.log(data);
                        return data
                    }
                })
            };
            var returnT = Translate();
            console.log(returnT);



            console.log("I received the data I requested");
            $scope.fortuneList = response;
            $scope.fortune = "";
        });
    };


    refresh();
    $scope.addFortune = function(){
        if(addError == false) {
            console.log($scope.fortune);
            $http.post('/fortuneList',$scope.fortune).success(function(response) {
                console.log(response);
                refresh();
            })
        }else {
            alert('please clear before adding a new record')
        }
    };


    $scope.removeFortune = function(id){
        console.log(id + ' set to be removed');
        $http.delete('/fortuneList/' + id).success(function(response){
            console.log(response);
            refresh();
        })
    };


    $scope.editFortune = function(id) {
        console.log(id + ' set to be edited');
        $http.get('/fortuneList/' + id).success(function(response){
            $scope.fortune = response;
            addError = true;
        })
    };


    $scope.updateFortune = function(){
        console.log($scope.fortune._id + ' is set to be updated');
        $http.put('/fortuneList/' + $scope.fortune._id, $scope.fortune).success(function(response){
            addError = false;
            refresh();
        })
    };

    $scope.clearFortune = function() {
        $scope.fortune = '';
        addError = false;
    }

}]);
