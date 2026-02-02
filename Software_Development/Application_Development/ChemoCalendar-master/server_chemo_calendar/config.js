/* NEENE ADMIN CONFIG 

// 1. adminBaseUrl: API-HUWATS URL
// 2. playerBaseUrl: API-PLAYER URL
*/ 

const config = {
	development: {
    mongodb: "mongodb://localhost/chemo",
    corsWhitelist: ['http://localhost:3000']
	},
	production: {
		mongodb: "mongodb://localhost/chemo",
    	corsWhitelist: ['http://localhost:3000']
	}
}

export default config[process.env.NODE_ENV?process.env.NODE_ENV:'development'];
