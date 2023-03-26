const { Router } = require('express')
const { CartManager } = require('../Daos/CartDaos/CartDaos')

const router = Router()

let cartManager = new CartManager
router.post('/', async(req,res) => {
    const resp = await cartManager.createCart({productos: []})
    res.send(resp)
} )
router.post('/:cid/productos/:pid', async(req,res) => {
    const {cid, pid} = req.params
    const resp = await cartManager.addProductInCart(parseInt(cid), parseInt(pid))
    res.send(resp)
} )
router.post('/:cid', async(req,res) => {
    const {cid} = req.params
    const resp = await cartManager.getCartById((parseInt(cid)))
    res.send(resp)
} )


module.exports = { 
    router
}