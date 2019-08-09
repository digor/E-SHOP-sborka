//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/digor/GB-Online-Store/master/responses';

let app = new Vue ({
	el: '#app',
	data: {
	},
	methods: {
		getJSON (url) {
			return fetch (url)
				.then (result => result.json ())
				.catch (error => {
					this.$refs.err.setError (error)
					console.log (error)
			})
		},
		postJSON (url, data) {
			return fetch (url, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify (data)
			})
			.then (result => result.json ())
			.catch (error => {
				this.$refs.err.setError (error)
				console.log (error)
			})	
		},
		putJSON (url, data) {
			return fetch (url, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify (data)
			})
			.then (result => result.json ())
			.catch (error => {
				this.$refs.err.setError (error)
				console.log (error)
			})	
		},
		deleteJSON(url){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(result => result.json())
                .catch (error => {
                    this.$refs.err.setError (error)
                    console.log (error)
                })
        }
	},
	mounted () {},
	components: {
		products, cart, error, 'filter-el' : filterEl
	}
})