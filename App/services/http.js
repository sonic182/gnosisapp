
let site = 'blog.mogollon.com.ve'
// let site = 'gnosisespaña.es'
let url = `https://public-api.wordpress.com/rest/v1.1/sites/${site}/`

let Http = {
	get (path, options){
		let uri = `${url}${path}`
		console.log('uri')
		console.log(uri)
		return fetch(uri, options)
	},
	urlParams (url, params) {
		var esc = encodeURIComponent;
		var query = Object.keys(params)
			.map(k => esc(k) + '=' + esc(params[k]))
    	.join('&');
		return `${url}?${query}`;
	}

}

export default Http;
