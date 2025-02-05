import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('products', 'ProductsController').only(['store', 'show', 'index', 'update', 'destroy'])
})
.middleware('auth')
.namespace('App/Controllers/Http/Product')

