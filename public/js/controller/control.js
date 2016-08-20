/**
 * Created by ajou on 8/12/2016.
 */

var module=angular.module('myApp',[]);
var members;
//var table;
var isLoggin=false;



module.controller('myController',['$scope','$http','LoginChecker',function ($scope,$http, LoginChecker){
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
                    if(data && data.status=='1'){
                        console.log("login very success");
                    }
                    else{
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
                    if(data && data.status=='1'){
                        console.log("login very success");
                    }
                    else{
                    }
                })
                .error(function(data,status,headers,config){
                    console.log(status);
                })
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
