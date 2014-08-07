var https = require('https');

module.exports.graph = function(path, accessToken, version, fields, method, callback) {

    var hostname = 'graph.facebook.com',
        reqPath = path,
        reqMethod = 'GET',
        ver = 'v1.0',
        cb = callback;

    if (path.charAt(0) !== '/') {
        reqPath = '/' + path;
    }

    // reqPath += "?access_token=" + accessToken;

    if (version && typeof version === 'string') {
        ver = version;
    };

    reqPath = "/" + ver + reqPath + "?access_token=" + accessToken + "&"

    if (fields && typeof fields === 'string') {
        reqPath += "&fields=" + fields
    };

    if (method && typeof method === 'string') {
        reqMethod = method;
    };

    if (typeof fields === 'function') {
        cb = fields;
    };

    if (typeof method === 'function') {
        cb = method;
    };

    if (typeof version === 'function') {
        cb = version;
    };

    var fbReq = https.request({
        hostname: 'graph.facebook.com',
        method: reqMethod,
        path: reqPath
    }, function(fbRes) {
        // fbRes.setEncoding('utf8');

        var output = '';

        fbRes.on('data', function(chunk) {
            output += chunk;
        });

        fbRes.on('end', function() {
            if (cb) {
                var outputJson = JSON.parse(output);

                if (outputJson.created_time) {
                    var strCreatedTime = outputJson.created_time;
                    outputJson.created_time = Date.parse(strCreatedTime);
                };

                if (outputJson.updated_time) {
                    var strUpdatedTime = outputJson.updated_time;
                    outputJson.updated_time = Date.parse(strUpdatedTime);
                };

                cb(outputJson);  
            };
        });
    });

    fbReq.on('error', function(err) {
        console.error(err);
    });

    fbReq.end();
    // for (var i = 0; i < req.user.providers.length; i++) {
    //     if (req.user.providers[i].name === 'facebook') {
    //         // return res.render('home/postLogin', { accessToken: req.user.providers[i].currentAccessToken });
    //         var fbReq = https.request({
    //             hostname: 'graph.facebook.com',
    //             method: 'GET',
    //             path: '/v2.0/me/feed?fields=&access_token=' + req.user.providers[i].currentAccessToken 
    //             // path: '/v2.0/me/friends?access_token=CAACEdEose0cBAMcroSN4Xaxw2KWa30bgHDwlJKIOdocgLZAUfHgZBgNCClKz2E6XZBBDa5nmwCWuxZBOVrnRbVMoIRbbdfSGsQJ5Mhs0lLB6Y1hUG04s3mbnDgqcEANmVSibHDtktXlWI78lrsftnCevs1R5Nd8vRvxev58DrerFMwimKW1zacioJFt2oNbVVwFYi1JqbQZDZD'
    //         }, function(fbRes) {
    //             var output = '';
    //             fbRes.setEncoding('utf8');
    //             console.log("log the data");
                
    //             fbRes.on('data', function(chunk) {
    //                 console.log(chunk.length);
    //                 output += chunk;
    //             });

    //             fbRes.on('end', function() {
    //                 return res.render('home/postLogin', { data: output });
    //             });

    //         });
            
    //         fbReq.on('error', function(err) {
    //             console.error(err);
    //         });

    //         fbReq.end();

    //         break;
    //     };
    // };
}

module.exports.graphGetByUrl = function(url, callback) {
    var hostname = 'graph.facebook.com';
    var path = url.replace('https://graph.facebook.com', '');
    console.log('path ' + path);

    var fbReq = https.request({
        hostname: hostname,
        method: 'GET',
        path: path
    }, function(fbRes) {
        var outputStr = '';

        fbRes.on('data', function(chunk) {
            outputStr += chunk;
        });

        fbRes.on('end', function() {
            outputJson = JSON.parse(outputStr);

            if (outputJson.created_time) {
                var createdTimeStr = outputJson.created_time;
                outputJson.created_time = Date.parse(createdTimeStr);
            }; 

            if (outputJson.updated_time) {
                var updatedTimeStr = outputJson.updated_time;
                outputJson.updated_time = Date.parse(updated_time);
            };

            if (callback) {
                callback(outputJson);
            };
        });
    });

    fbReq.on('error', function(err) {
        console.error(err);
    });

    fbReq.end();
}