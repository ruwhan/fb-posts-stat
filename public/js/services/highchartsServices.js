var highchartsServices = angular.module('highchartsServices', []);

highchartsServices.factory('Highcharts', function() {
    var Highcharts = function(selector, options, series) {
        var me = this;
        me.selector = selector;
        me.options = options;
        if (!series) {
            me.series = [];
            return;
        };
        me.series = series;
    }

    Highcharts.prototype.getSeries = function() {
        var me = this;
        return me.series;
    }

    Highcharts.prototype.addSeries = function(series) {
        var me = this;
        for (var i = 0; i < series.length; i++) {
            series.unshift(series[i]);
        }
    }

    Highcharts.prototype.draw = function() {
        var me = this;

        $(me.selector).highcharts(me.options);   
    }

    Highcharts.prototype.redraw = function(series) {
        var me = this;
        me.series = series;

        if (me.series) {
            me.options.series = me.series;
        }

        $(me.selector).highcharts(me.options);
    }

    return Highcharts;
});