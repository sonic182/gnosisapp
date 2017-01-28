
// let site = 'https://studio182.es/blog'
// let site = '114824088'
let site = 'xn--gnosisespaa-beb.es'
// let site = 'gnosisespaña.es'
let url = `https://public-api.wordpress.com/rest/v1.1/sites/${site}/`

let Http = {
	get (path, options={}){
		let uri = `${url}${path}`

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
