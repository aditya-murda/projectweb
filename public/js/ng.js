/**
 * Created by ajou on 8/20/2016.
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
       /* $http({
            //POST ga bisa dimunculin di dalam client view
            method: 'GET',
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
            })
        $http({
            //POST ga bisa dimunculin di dalam client view
            method: 'GET',
            url: 'http://localhost:3000/table'
        })
            .success(function(data,status,headers,config){
                console.log("success");
                if(data){
                    $scope.table=data;
                }
                else{
                }
            })
            .error(function(data,status,headers,config){
                console.log(status);
            })*/
        $scope.coba=function(){
            alert("tes berhasil");
        }
        $scope.login = function (){

            if(LoginChecker.checkUser($scope.username,$scope.password,members)){
                alert("Login Successful");
                $scope.isLoggin = true;
                $scope.myLink={'height':'140px'};
                console.log(isLoggin);
            }else{
                alert("Wrong username of password");
            }
        }
        $scope.html=function(){
            alert($scope.table[0].contents1);
        }
        $scope.css=function(){
            alert($scope.table[0].contents2);
        }
        $scope.java=function(){
            alert($scope.table[1].contents1);
        }
        $scope.ang=function(){
            alert($scope.table[2].contents1);
        }
        $scope.node=function(){
            alert($scope.table[3].contents1);
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
module.directive('loginShow',function(){
    return{
        link: function(scope,element,attrs){
            scope.$watch('isLoggin', function(){

                if(scope.isLoggin){
                    element.removeClass('show');
                    element.addClass('hide');
                    console.log("isLoggin= benar udh benar");
                }
                else{
                    element.removeClass('hide');
                    element.addClass('show');
                }
            })
        }
    }
})
