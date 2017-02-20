const fs = require('fs');
var util = require('util');
var request = require('request');
var moment = require('moment');
var _ = require('lodash');

var log_file = fs.createWriteStream(process.cwd() + '/randomuser.log', {flags : 'a'});

log = function(d) {
  log_file.write(util.format(d) + '\n');
};


function getRandomUserData(results, callback) {
    var options = {
        uri: 'https://randomuser.me/api/?nat=us&results=' + results,
        method: 'GET'
    };
    var res = '';
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res = body;
        } else {
            res = 'Not Found';
        }
        callback(res);
    });
}

function filterData(data, callback) {
    var user = data.results;
    var total = data.info.results;

    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;

    _.chain(user).map(function(v, i) {
        var age = moment().diff(moment(_.get(v, 'dob'), "YYYY-MM-DD HH:mm:ss"), 'years', false);
        if (age < 15) a++;
        else if (age > 16 && age < 30) b++;
        else if (age > 31 && age < 60) c++;
        else d++;
    }).value();

    var ageGroup = {
        A: a,
        B: b,
        C: c,
        D: d
    };

    var gender = _(user)
        .countBy('gender')
        .map((val, key) => {
            return {
                name: key,
                count: _.floor(((val / total) * 100), 2)
            }
        })
        .keyBy('name')
        .mapValues('count');

    var postal = _(user)
        .countBy('location.postcode')
        .map((val, key) => {
            return {
                name: key,
                count: val
            }
        })
        .sortBy('count')
        .reverse()
        .take(5)
        .keyBy('name')
        .mapValues('count');


    var result = {
        "user-count": _.size(user), //total
        status: "success",
        sexDistribution: gender,
        ageDistribution: ageGroup,
        topLocation: postal
    }

    callback(result);
}

module.exports = {
    get: function(count, callback) {
        getRandomUserData(count, function(resp) {
          fs.truncate(process.cwd() + '/randomuser.log', 0, function(){log(resp);})
            filterData(JSON.parse(resp), function(data) {
                callback(data);
            });
        });
    }
}
