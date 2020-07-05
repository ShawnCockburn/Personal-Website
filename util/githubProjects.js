const fetch = require('node-fetch');

const apiUrl = "https://api.github.com/users/ShawnCockburn/repos";
const projects = async () => {
    return await (await fetch(apiUrl)).json();
};


module.exports.projects = projects;