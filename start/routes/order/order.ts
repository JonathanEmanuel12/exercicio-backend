import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('orders', 'OrdersController').only(['store', 'show', 'index', 'destroy'])
  Route.put('orders/:id/addItems', 'OrdersController.updateAddItems')
  Route.put('orders/:id/removeItems', 'OrdersController.updateRemoveItems')
  Route.get('orders/user/:idUser', 'OrdersController.showOrdersUser')
})
.middleware('auth')
.namespace('App/Controllers/Http/Order')

