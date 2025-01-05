const pathMappings = {
    "/update-student" : (subject, object) => `${subject} updated record of the student '${object}'`,
    "/admit-student" : (subject, object) => `${subject} admitted a new student '${object}'`,
};

module.exports = { pathMappings };