var highchartsDirectives = angular.module('highchartsDirectives', []);

highchartsDirectives.directive('lineChart', ['Highcharts', function(Highcharts) {
    var buildSeries = function(posts) {
        var localSeries = [];
        var comparedDate;
        var comparedDateStr;
        var tempDate;
        var tempDateStr;

        for (var i = 0; i < posts.length; i++) {
            if (!comparedDate && !comparedDateStr) {
                comparedDate = new Date(posts[i].created_time);
                comparedDateStr = comparedDate.getFullYear() + '-' + comparedDate.getMonth() + '-' + comparedDate.getDate();
                var ms = Date.parse(comparedDateStr);
                localSeries.unshift([ms, 1]);
                continue;
            }

            tempDate = new Date(posts[i].created_time);
            tempDateStr = tempDate.getFullYear() + '-' + tempDate.getMonth() + '-' + tempDate.getDate();

            if (tempDateStr === comparedDateStr) {
                localSeries[0][1] = ++localSeries[0][1];
            }
            else {
                var ms = Date.parse(tempDateStr);
                localSeries.unshift([ms, 1]);
            }

            comparedDateStr = tempDateStr;
        }

        return [{
            name: "Posts Stats",
            data: localSeries
        }];

        // return localSeries;
    };

    var link = function(scope, el, attr) {

        var chart = new Highcharts('#chart', {
            chart: {
                type: 'spline',
                zoomType: 'x'
            },
            title: {
                text: 'Facebook Activity Stats'
            },
            subtitle: {
                text: 'Irregular time data in Highcharts JS'
            },
            xAxis: {
                type: 'datetime',
                minRange: 30 * 24 * 3600000
            },
            yAxis: {
                title: {
                    text: 'Activity count'//'Snow depth (m)'
                },
                min: 0
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y}'
            },
            series: [{
                name: 'Posts Stats',
                data: [
                ]
            }]
        });

        scope.$watchCollection('data', function(oldVal, newVal) {
            var series = buildSeries(scope.data);
            chart.redraw(series);
        });
    }

    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'js/templates/highcharts/chartContainer.html',
        link: link
    }
}]);

highchartsDirectives.directive('pieChart', ['Highcharts', function(Highcharts) {
    var buildSeries = function(posts) {
        var data = [];
        var items = {};
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            if (!items[post.type]) {
                items[post.type] = 1.0;
            }
            else {
                ++items[post.type];
            }
        }
        var keys = Object.keys(items);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var percentage = (items[key] / posts.length) * 100.0;
            data.push([key, percentage]);
        }

        return [{
            type: 'pie',
            name: 'Posts stat',
            data: data
        }];
    }

    var link = function(scope, el, attr) {
        
        // Build the chart series
        var chart = new Highcharts('#chart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Your facebook posts statistics'//'Browser market shares at a specific website, 2014'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Posts stat',
                data: []
            }]
        });

        scope.$watchCollection('data', function(oldVal, newVal) {
            var series = buildSeries(scope.data);
            chart.redraw(series);
        });
    }

    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'js/templates/highcharts/chartContainer.html',
        link: link
    }
}]);