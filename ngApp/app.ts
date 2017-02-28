namespace compuframes {

    angular.module('compuframes', ['ui.router', 'ngResource', 'ngMaterial', 'ngMessages','ui.bootstrap', 'ngAria', 'ngAnimate', 'ngMessages']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: compuframes.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: compuframes.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('frames',{
                url:'/frames',
                templateUrl: '/ngApp/views/frames.html',
                controller: compuframes.Controllers.FrameController,
                controllerAs: "controller"
            })
            .state('signUp',{
                url:'/signUp',
                templateUrl: '/ngApp/views/signUp.html',
                controller: compuframes.Controllers.SignUpController,
                controllerAs: "controller"
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    

}
