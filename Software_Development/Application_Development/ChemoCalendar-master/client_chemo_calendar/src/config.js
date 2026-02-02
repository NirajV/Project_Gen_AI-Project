var basePath = `${window.location.protocol}//${window.location.hostname}`;
var config = {
    development: {
        backendAPI: `http://localhost:8080/api`,
    },
    production: {
        backendAPI: `${basePath}:8080/api`
    }
}

export default config[process.env.NODE_ENV];
