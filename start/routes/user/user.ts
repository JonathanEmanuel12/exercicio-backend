import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UsersController').only(['store', 'show', 'index', 'update', 'destroy'])
})
.namespace('App/Controllers/Http/User')

