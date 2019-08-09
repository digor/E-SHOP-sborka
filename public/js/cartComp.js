let cartItem = {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Product image">
                        <div class="product-desc">
                            <p class="product-title">{{ cartItem.product_name }}</p>
                            <p class="product-quantity">К-во: {{ cartItem.quantity }}</p>
                            <p class="product-single-price">$ {{ cartItem.price }} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{ cartItem.quantity * cartItem.price }}</p>
                        <button @click="$parent.removeProduct (cartItem)" class="del-btn" :data-id="cartItem.id_product">&times;</button>
                    </div>
                </div> `
}

let cart = {
    props: [],
    data () {
        return {
           cartItems: [],
           imgCart: 'https://placehold.it/100x80',
           cartUrl: '/getBasket.json',
           showCart: false
        }
    },
    methods: {
        addProduct (product) {
            let find = this.cartItems.find (el => el.id_product === product.id_product)
            if (find) {
                this.$parent.putJSON (`/api/cart/${find.id_product}`, {quantity: 1})
                    .then (data => {
                        if (data.result) {
                            find.quantity ++
                        }
                    })
            } else {
                let prod = Object.assign ({quantity: 1}, product)
                this.$parent.postJSON ('/api/cart', prod)
                    .then (data => {
                        this.cartItems.push (prod)
                    })
            }
        },
        removeProduct (product) {
            if(product.quantity > 1){
                this.$parent.putJSON(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result){
                            product.quantity--
                        }
                    })
            } else {
                this.$parent.deleteJSON(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if(data.result){
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }
        }
    },
    template: ` <div>
                    <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                    <div class="cart-block" v-show="showCart">
                        <cart-item
                        v-for="product of cartItems"
                        :key="product.id_product"
                        :img="imgCart"
                        :cartItem="product"
                        ></cart-item>
                    </div>
                </div>`,
    components: {
        'cart-item': cartItem
    },
    mounted () {
        this.$parent.getJSON(`/api/cart`)
			.then (data => {
				for (let el of data.contents) {
					this.cartItems.push (el)
				}
		})
    }
}