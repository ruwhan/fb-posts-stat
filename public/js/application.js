var app = angular.module('fbPosts', [
    'ngRoute', 
    'fbPostsControllers', 
    'fbPostsDirective', 
    'highchartsDirectives', 
    'fbPostsServices', 
    'highchartsServices', 
    'infinite-scroll'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'js/partialViews/posts/index.html',
            controller: 'FbPostsIndexController'
        })
        .when('/details/:postId', {
            templateUrl: 'js/partialViews/posts/details.html',
            controller: 'FbPostsDetailsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);