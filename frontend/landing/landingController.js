angular.module('lndCtrl', ['ngAnimate', 'toastr', 'angular-loading-bar'])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
 }])
.controller('landingController', ['$scope', '$http','toastr', function ($scope, $http, toastr){
	$scope.team = [
		{
			picture: "landing/img/team/01.jpg",
			name: "Mate Oljica",
			proffesion: "mag.edu. IT"
		},
		{
			picture: "landing/img/team/02.jpg",
			name: "Mateo Čakarun",
			proffesion: "mag.edu. Ec"
		},
		{
			picture: "landing/img/team/03.jpg",
			name: "Šime Oljica",
			proffesion: "woodMaster"
		}
	]

	$scope.sendEmail = function(emailContent){
		$http.post('/api/sendEmail', emailContent)
		.then(function(response){
			toastr.success(response.data.message)
		})
		.catch(function(err){
			toastr.error(err.data)
		})
	}
}])