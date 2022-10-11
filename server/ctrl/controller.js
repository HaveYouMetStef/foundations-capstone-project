const fragrances = require('../db.json')

let id = 6

module.exports = {
    getFragrances: (req,res) => {
        res.status(200).send(fragrances)
    },
    createFragrance: (req, res) => {
        let { rating } = req.body
        req.body.id = id
        req.body.rating = +rating
        console.log(req.body)
        fragrances.push(req.body)
        res.status(200).send(fragrances)
        id++
     },
     updateFragrance: (req,res) => {
        const { id } = req.params
        const { type } = req.body
        const index = fragrances.findIndex((fragrances) => fragrances.id === +id)
        if ((type === 'plus' && fragrances[index].rating < 5)) {
            fragrances[index].rating++
     } else if (type === 'minus' && fragrances[index].rating > 0) {
        fragrances[index].rating--
     }
     res.status(200).send(fragrances)
},
    deleteFragrance: (req, res) => {
        const {id} = req.params
        const index = fragrances.findIndex((element) => element.id === +req.params.id)
        fragrances.splice(index, 1)
        res.status(200).send(fragrances)
    }
}