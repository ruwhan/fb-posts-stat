var fbPostsDirectives = angular.module('fbPostsDirective', []);

fbPostsDirectives.directive('fbpostsList', [function() {

    var link = function(scope, el, attr) {
        // console.log(scope);
    };

    return {
        // restrict: 'E',
        scope: {
            posts: '=',
            paging: '='
        },
        templateUrl: "js/templates/fbposts/fbpostsList.html",
        link: link
    };
}]);