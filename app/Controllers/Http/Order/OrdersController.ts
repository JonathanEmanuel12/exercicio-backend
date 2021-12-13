import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'

export default class OrdersController {

    public async store({ request, response }: HttpContextContract) {
        try {
            const idsProduct = this.convertToArray(request.body())
            const order = await Order.create({
                total: 0.00
            })
            await order.related('items').attach(idsProduct)
            const products = await order.related('items').query()
            const responseObject = this.createResponseObject(order.id, products)

            order.total = responseObject.total
            await order.save()


            return response.ok(responseObject)
        }
        catch (error) {
            return response.internalServerError(error.message)
        }
    }

    public async index({ response }: HttpContextContract) {
        try {
            const orders = await Order.query()
            const responseObject = Array()
            for (let i = 0; i < orders.length; i++) {
                const products = await orders[i].related('items').query()
                responseObject.push(this.createResponseObject(orders[i].id, products))
            }
            return response.ok(responseObject)
        }
        catch(error) {
            return response.internalServerError(error.message)
        }
    }

    public async show({ request, response }: HttpContextContract) {
        const { id } = request.params()

        try {
            const order = await Order.findOrFail(id)
            const products = await order.related('items').query()
            const responseObject = this.createResponseObject(order.id, products)
            return response.ok(responseObject)
        }
        catch(error) {
            return response.internalServerError(error.message)
        }
    }

    public async destroy({ request, response }) {
        const { id } = request.params()

        try {
            const order = await Order.findOrFail(id)
            order.delete()
            return response.ok(order)
        }
        catch(error) {
            return response.internalServerError(error.message)
        }
    }

    public async updateAddItems({ request, response }: HttpContextContract) {
        const { id } = request.params()

        try {
            const idsProduct = this.convertToArray(request.body())

            const order = await Order.findOrFail(id)
            await order.related('items').attach(idsProduct)
            const products = await order.related('items').query()
            const responseObject = this.createResponseObject(order.id, products)

            return response.ok(responseObject)
        }
        catch (error) {
            response.internalServerError(error.message)
        }
    }
    public async updateRemoveItems({ request, response }: HttpContextContract) {
        const { id } = request.params()

        try {
            const idsProduct = this.convertToArray(request.body())

            const order = await Order.findOrFail(id)
            await order.related('items').detach(idsProduct)
            const products = await order.related('items').query()
            const responseObject = this.createResponseObject(order.id, products)

            return response.ok(responseObject)
        }
        catch (error) {
            response.internalServerError(error.message)
        }
    }

    private createResponseObject(orderId: number, products: Array<Product>): Record<string, any> {
        const responseObject = {
            id: orderId,
            items: Array(),
            total: 0
        }
        for (let i = 0; i < products.length; i++) {

            const { id, description, price } = products[i]
            responseObject.items.push({
                id,
                description,
                price
            })
            responseObject.total += price
        }

        return responseObject
    }
    private convertToArray(object: Record<string, any>): Array<number> {
        const idsProduct = Array<number>()
        for (const atributo in object) {
            if (Object.prototype.hasOwnProperty.call(object, atributo)) {
                idsProduct.push(object[atributo])
            }
        }
        return idsProduct

    }
}
