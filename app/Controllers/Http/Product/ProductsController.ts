import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
    public async index({ response }: HttpContextContract) {
        const products = await Product.query()

        if (!products) return response.notFound()

        return response.ok(products)
    }
    public async store({ request, response }: HttpContextContract) {
        const { description, price } = request.body()

        try {
            const product = await Product.create({
                description,
                price
            })
            return response.ok(product)
        } catch (error) {
            return response.internalServerError(error.message)
        }
    }
    public async show({ request, response }: HttpContextContract) {
        const { id } = request.params()

        const product = await Product.find(id)

        if (!product) return response.notFound()

        return response.ok(product)
    }
    public async update({ request, response }: HttpContextContract) {
        const { id } = request.params()
        const { description, price } = request.body()

        try {
            const product = await Product.findOrFail(id)

            if(description) product.description = description
            if(price) product.price = price
        
            return response.ok(await product.save())
        }
        catch(error) {
            return response.internalServerError(error.message)
        }
    }
    public async destroy({ request, response }: HttpContextContract) {
        const { id } = request.params()

        try {
            const product = await Product.findOrFail(id)
            await product.delete()
            return response.ok(product)
        }
        catch(error) {
            return response.internalServerError(error.message)
        }
        
    }


}
