import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthenticationController {

    public async store({ request, response }: HttpContextContract) {
        const { name, email, password } = request.body()

        try {
            const user = await User.create({
                name,
                email,
                password
            })
            return response.ok(user)
        } catch (error) {
            return response.internalServerError(error.message)
        }
    }
    public async userAuthenticate({ request, response, auth }: HttpContextContract) {
        const { email, password } = request.body()
        console.log(email + " : " + password)
        try {
            const token = await auth.attempt(email, password)
            console.log(token)
            response.ok(token)
        }
        catch(error) {
            response.unauthorized(error.message)
        }
    }
}
