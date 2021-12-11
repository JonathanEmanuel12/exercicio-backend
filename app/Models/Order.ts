import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Product from 'App/Models/Product'

export default class Order extends BaseModel {

    @manyToMany(() => Product, {
        pivotTable: 'items'
    })
    public itens: ManyToMany<typeof Product>

    @column({ isPrimary: true })
    public id: number

    @column()
    public total: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
