import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({request, response}: HttpContextContract){
    const {id} = request.body()

    console.log(id)

    const users = await User.query()

    if(!users) return response.notFound()

    return response.ok(users)
  }
  public async store({request, response}: HttpContextContract){
    const {name, email, password} = request.body()

    try{
      const user = await User.create({
        name,
        email,
        password
      })
      return response.ok(user)
    } catch(error){
      return response.internalServerError(error.message)
    }
  }

  public async show({request, response}: HttpContextContract){
    const {id} = request.params()

    const user = await User.find(id)

    if(!user) return response.notFound()

    return response.ok(user)
  }
}
