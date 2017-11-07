angular.module('appRoutes', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider){

	 $urlRouterProvider.otherwise("/")
	 $locationProvider.html5Mode(true)

  	$stateProvider
    	.state('landing', {
      		url: "/",
      		templateUrl: "landing/landing.html",
      		controller: "landingController"
    	})
})