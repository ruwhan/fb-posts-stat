var fbPostsServices = angular.module('fbPostsServices', ['ngResource']);

fbPostsServices.factory('FbPosts', ['$resource', '$http', function($resource, $http) {
    var Posts = function() {
        var me = this;
        me.paging = {};
        me.api = $resource('/posts/fb/:id');
        me.posts = [];
        me.busy = true;
    }

    Posts.prototype.init = function() {
        var me = this;

        me.api.get({}, function(data, responseHeader) {

            me.paging = data.paging;
            for (var i = 0; i < data.data.length; i++) {
                // console.log(data.data[i].id);
                me.posts.push(data.data[i]);
            };

            // console.log(temp);
            me.busy = false;
        });
    }

    Posts.prototype.loadMore = function() {
        var me = this;
        if (me.busy) {
            return
        };

        me.busy = true;
        $http.post('/posts/more', { nextUrl: me.paging.next })
            .success(function(data, status, headers, config) {
                // console.log(me.paging);
                me.paging = data.paging;
                for (var i = 0; i < data.data.length; i++) {
                    me.posts.push(data.data[i]);
                };
                // console.log(temp);
                me.busy = false;
            })
            .error(function(data, status, headers, config) {
                console.error(data);
                me.busy = false;
            });
    }
    return Posts;
}]);