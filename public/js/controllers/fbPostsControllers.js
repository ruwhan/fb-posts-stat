var fbPostsControllers = angular.module('fbPostsControllers', ['infinite-scroll']);

fbPostsControllers.controller('FbPostsIndexController', ['$scope', 'FbPosts', function($scope, FbPosts) {
    var fbPosts = new FbPosts();

    $scope.posts = fbPosts.posts;
    $scope.paging = fbPosts.paging;
    $scope.fbPosts = fbPosts;
    
    fbPosts.init();
}]);

fbPostsControllers.controller('FbPostsDetailsController', ['$scope', '$routeParams', 'FbPosts', function($scope, $routeParams, FbPosts) {
    var postId = $routeParams.postId;

    FbPosts.api.get({ id: postId }, function(value, responseHeader) {
        $scope.post = value;
    });
}]);