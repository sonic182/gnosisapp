
let site = 'blog.mogollon.com.ve'
// let site = 'gnosisespaña.es'
let url = `https://public-api.wordpress.com/rest/v1.1/sites/${site}/`

let Http = {
	url: url,
	get: function(path, options){
		return fetch(`${url}${path}`, options)
	}
}

export default Http;
