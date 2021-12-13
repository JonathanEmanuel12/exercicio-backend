import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('orders', 'OrdersController').only(['store', 'show', 'index', 'destroy'])
  Route.put('orders/:id/addItems', 'OrdersController.updateAddItems')
  Route.put('orders/:id/removeItems', 'OrdersController.updateRemoveItems')
})
.namespace('App/Controllers/Http/Order')

