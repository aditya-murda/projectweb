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

