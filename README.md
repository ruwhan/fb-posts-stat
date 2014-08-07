fb-posts-statistics
===================

Basic dashboard app for your facebook posts statistics, built using my own MEAN stack (using [generator-express]), [Highcharts] &amp; [ng-infiniteScroll] (Angular) plugin.

MongoDB only used to store necessary data from Facebook.

Requirements
------------
Expecting you already know how to use required tools below:
* [npm]
* [bower]
* [grunt]
* [MongoDB]
* Facebook account
* Facebook app (to obtain Facebook's clientID & clientSecret)

Guide
-----
First of all, run npm and bower inside this project folder after cloning this project.
```sh
npm install
```
then
```sh
bower install
```

Make sure you have MongoDB installed and running, and grunt installed globally in your machine, then you can run this app using Grunt.
```sh
grunt
```

To Do:
------
* Add 'from' and 'to' date text/title in the chart
* Add monthly statistic using Highcarts's stacked barchart
* Realtime update
* Post to Facebook from this app
* Minification
* etc (not sure for now :D )

[generator-express]:https://github.com/petecoop/generator-express
[Highcharts]:http://www.highcharts.com/
[ng-infiniteScroll]:http://binarymuse.github.io/ngInfiniteScroll/
[npm]:https://www.npmjs.org/
[bower]:bower
[grunt]:http://gruntjs.com/
[MongoDB]: http://www.mongodb.org/
