import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UsersController').only(['show', 'index', 'update', 'destroy'])

})
.middleware('auth')
.namespace('App/Controllers/Http/User')
