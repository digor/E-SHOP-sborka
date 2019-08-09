let add = (cart, req) => {
    cart.contents.push (req.body); //объект товара внутри запроса
    return JSON.stringify (cart, null, 4)
}

let change = (cart, req) => {
    let find = cart.contents.find (el => el.id_product === +req.params.id)
    find.quantity++
    return JSON.stringify (cart, null, 4)
}

module.exports = {
    add, change
}
