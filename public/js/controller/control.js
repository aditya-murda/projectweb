/**
 * Created by ajou on 8/12/2016.
 */

var module=angular.module('myApp',[]);
var members;
//var table;
var isLoggin=false;



module.controller('myController',['$scope','$http','LoginChecker',function ($scope,$http, LoginChecker){
        $scope.user={};
        $scope.user.username='';
        $scope.table = [];
        $scope.myLink= {'height':'30px'};

        $scope.loglayer=true;

      /*  $http({
            //POST ga bisa dimunculin di dalam client view
            method: 'POST',
            url: 'http://localhost:3000/login'
        })
            .success(function(data,status,headers,config){
                console.log("success");
                if(data){
                    members=data;
                }
                else{
                }
            })
            .error(function(data,status,headers,config){
                console.log(status);
            })*/

        $scope.login = function (){
            console.log("masuk fungsi login");
/*
            if(LoginChecker.checkUser($scope.username,$scope.password,members)){
                alert("Login Successful");
                $scope.isLoggin = true;
                $scope.myLink={'height':'140px'};
                console.log(isLoggin);
            }else{
                alert("Wrong username of password");
            }*/
        }
    $scope.register = function (){
        console.log("masuk fungsi register");
        /*
         if(LoginChecker.checkUser($scope.username,$scope.password,members)){
         alert("Login Successful");
         $scope.isLoggin = true;
         $scope.myLink={'height':'140px'};
         console.log(isLoggin);
         }else{
         alert("Wrong username of password");
         }*/
    }


    }]
);
module.service('LoginChecker',function(){

    this.checkUser = function (username,password,member){
        /*console.log("members: " + member[0].password);*/
        var check=false;

        for (var i=0;i<member.length;i++){
            if(username==member[i].id && password==member[i].password){
                check= true;
            }
            console.log("Username " + i + " = " + member[i].id);
            console.log("username input= " + username);
        }
        return check;
    }
})

