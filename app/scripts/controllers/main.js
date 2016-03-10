'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('MainCtrl', function ($scope) {
   
	$scope.d3Data = [
		{name: "Greg", value:98},
		{name: "Ari", value:96},
		{name: "Loser", value: 48},
		{name: "Raja", value: 31},
		{name: "Loser1", value: 48},
		{name: "Raja1", value: 31},
		{name: "Loser2", value: 48},
		{name: "Raja2", value: 31}
	];
	$scope.d3OnClick = function(item){
		$scope.d3Data = $scope.generateData();
		console.log("------------------d3OnClick--------------------");
		//return $scope.d3Data;
	};

	$scope.generateData = function() {

	    var data = [
	      {name: "Locke",    value: Math.floor(Math.random() * 1000)},
	      {name: "Reyes",    value: Math.floor(Math.random() * 1000)},
	      {name: "Ford",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jarrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "Shephard", value: Math.floor(Math.random() * 1000)},
	      {name: "Kwerwerwon",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jawewrrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "Shqwerephard", value: Math.floor(Math.random() * 1000)},
	      {name: "Kwasdawwon",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jarasdasdrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "qwa", value: Math.floor(Math.random() * 1000)},
	      {name: "zz",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jaxxxrrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "Shevvvn",     value: Math.floor(Math.random() * 1000)},
	      {name: "Ksswerwerwon",     value: Math.floor(Math.random() * 1000)},/*
	      {name: "Jawsewrrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "Shqswerephard", value: Math.floor(Math.random() * 1000)},
	      {name: "Kwssasdawwon",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jarssasdasdrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "qwssa", value: Math.floor(Math.random() * 1000)},
	      {name: "sszz",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jassxxxrrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "Shssevvvn",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jaxffxxrrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "Shfffevvvn",     value: Math.floor(Math.random() * 1000)},
	      {name: "Kssffwerwerwon",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jawffsewrrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "Shqsffwerephard", value: Math.floor(Math.random() * 1000)},
	      {name: "Kwssfffasdawwon",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jarssffasdasdrah",   value: Math.floor(Math.random() * 1000)},
	      {name: "qwsffsa", value: Math.floor(Math.random() * 1000)},
	      {name: "sszfffz",     value: Math.floor(Math.random() * 1000)},
	      {name: "Jasfffsxxxrrah",   value: Math.floor(Math.random() * 1000)},*/
	      {name: "Shsfffsevvvn",     value: Math.floor(Math.random() * 1000)}
	    ];
	    return data;
	  }

  });