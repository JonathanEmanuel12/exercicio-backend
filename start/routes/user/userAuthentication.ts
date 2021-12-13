import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('users', 'Authentication Controller.store')
    Route.post('users/login', 'AuthenticationController.userAuthenticate')
})
.namespace('App/Controllers/Http/User')