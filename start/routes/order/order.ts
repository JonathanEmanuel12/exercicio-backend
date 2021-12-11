import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('orders', 'OrdersController').only(['store', 'show', 'index'])
})
.namespace('App/Controllers/Http/Order')

