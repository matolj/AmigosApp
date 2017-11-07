angular.module('lndCtrl', [])
.controller('landingController', ['$scope', '$http', function ($scope, $http){
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
}])