import pastOrderData  from '../../database/pastOrders.json'
import { Order } from '../constant/orders'
import { menuItem, Restaurant } from '../constant/restaurants'
import fs from 'fs'

const uuid = require('uuid')

export const getPastOrders = (): GetPastOrdersResponse => {
  if (!pastOrderData) {
    return { data: [] }
  }
  return {data: pastOrderData.pastOrders}
}

export const sendOrders = async (restaurant?: Restaurant, chosenMenu?: Array<menuItem | unknown>, deliverBy?: string): Promise<SendOrdersResponse> => {
  let isOrdered = false
  if (!restaurant || !chosenMenu) {
    return { isOrdered }
  }
  let orders: Array<Order | unknown> = pastOrderData.pastOrders
  chosenMenu.map((value) => {
    const newOrder = {
      orderId: uuid.v4(),
      restaurantId: restaurant.restaurantId,
      name: restaurant.name,
      menu: value,
      deliverBy,
      createdOn: new Date().toString()
    }
    orders.push(newOrder)
  })
  try {
    await fs.promises.writeFile(`${process.cwd()}/database/pastOrders.json`, JSON.stringify({pastOrders: orders}))
    isOrdered = true
  } catch(error) {
    console.log('Error in updating file - ', error)
  }
  return { isOrdered }
}
interface GetPastOrdersResponse {
  data: Order[]
}

interface SendOrdersResponse {
  isOrdered: boolean
}
