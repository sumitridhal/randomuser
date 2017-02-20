//
const moment = require('moment');
var ramdomuser = require('../services/ramdomuser');

module.exports = {
    get: function(req, res) {
      const search = ((req.query).count) || 20;
        ramdomuser.get(search,function(data) {
            res.send(data);
        });
    }
}
