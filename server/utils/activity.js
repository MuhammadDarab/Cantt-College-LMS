const { pathMappings } = require("../constants");

function recordActivity(req, res, next) {
    const { user, body, path } = req;

    if (pathMappings[path]) {
        // const activityTitle = pathMappings[path]?.(user.name, body.track.name);
    }
    next();
};

module.exports = {
    recordActivity
};