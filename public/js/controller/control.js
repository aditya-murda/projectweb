/**
 * Created by ajou on 8/12/2016.
 */

var module=angular.module('myApp',[]);
var members;
//var table;
var isLoggin=false;



module.controller('myController',['$scope','$http','$window',function ($scope,$http,$window){
        $scope.user={};
        $scope.user.uname='';
        $scope.pass='';
        $scope.table = [];
        $scope.myLink= {'height':'30px'};

        $scope.loglayer=true;

        $scope.login = function (){

            console.log("masuk fungsi login");


            /*LOGIN AJAX*/
            $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data:{ uname:$scope.uname, pass:$scope.pass }
            })
                .success(function(data,status,headers,config){
                    console.log("success");
                    if(data && data.status){
                        console.log("login very success");
                        //pindah ke login
                        window.location='home';
                    }
                    else{
                        alert('Wrong username or password');
                    }
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                })
        }
        $scope.register = function (){

            console.log("masuk fungsi register");
            /*REGISTER AJAX*/
            $http({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data:{ uname:$scope.uname, pass:$scope.pass }
            })
                .success(function(data,status,headers,config){
                    console.log("success");

                    if(data.status){
                        console.log("register very success");
                        //pindah ke register
                        window.location='home';
                    }
                    else{
                        alert('registration failed!');
                    }
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                })
        }
    }]
);

