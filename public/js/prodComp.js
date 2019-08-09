let product = {
    props: ['product', 'img'],
    template: `
                <div class="product-item">
                    <img :src="img" alt="Product image">
                    <div class="desc">
                        <h3> {{ product.product_name }} </h3>
                        <p>{{ product.price }} $</p>
                        <button class="buy-btn" @click="$root.$refs.cart.addProduct (product)">Купить</button>
                    </div>
            </div>
    `
}

let products = {
    props: [],
    data () {
        return {
            filtered: [],
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: `/catalogData.json`
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
        <div class="products">
              <product
              v-for="product of filtered"
              :key="product.id_product"
              :img="imgCatalog"
              :product="product"
              ></product>  
        </div>
    `,
    components: {
        product
    },
    mounted () {
        this.$parent.getJSON(`/api/products`)
			.then (data => {
				for (let el of data) {
					this.products.push (el)
					this.filtered.push (el)
				}
		})
    }
}