import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async index({ response }: HttpContextContract) {
        const users = await User.query()

        if (!users) return response.notFound()

        return response.ok(users)
    }
    public async show({ request, response }: HttpContextContract) {
        const { id } = request.params()

        const user = await User.find(id)

        if (!user) return response.notFound()

        return response.ok(user)
    }
    public async update({ request, response }: HttpContextContract) {
        const { id } = request.params()
        const { name, email, password } = request.body()

        try {
            const user = await User.findOrFail(id)

            if(name) user.name = name
            if(email) user.email = email
            if(password) user.password = password

        
            return response.ok(await user.save())
        }
        catch(error) {
            return response.internalServerError(error.message)
        }
    }
    public async destroy({ request, response }: HttpContextContract) {
        const { id } = request.params()

        try {
            const user = await User.findOrFail(id)
            await user.delete()
            return response.ok(user)
        }
        catch(error) {
            return response.internalServerError(error.message)
        }
        
    }
    
}
