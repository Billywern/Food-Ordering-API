import app from '../../connect'
import { getParticularResturantWithMenuId, getSingleRestaurant, getListOfRestaurant } from '../../usecase/restaurants'
import { getPastOrders, sendOrders } from '../../usecase/restaurantOrders'

export const RESTAURANTS_CONTROLLER_ROUTES = {
  RESTAURANTS_LIST: '/restaurants',
  RESTAURANTS_PAST_ORDERS: '/restaurants/past-orders',
  restaurants_ORDER: '/restaurants/order'
}
app.get(RESTAURANTS_CONTROLLER_ROUTES.RESTAURANTS_LIST, (_req, res) => {
  const restaurants = getListOfRestaurant()

  if (!restaurants) {
    res.status(400).json({ message: 'Data not found' })
  } else {
    res.status(200).json(restaurants) 
  }
})

app.get(RESTAURANTS_CONTROLLER_ROUTES.RESTAURANTS_PAST_ORDERS, (_req, res) => {
  const pastOrders = getPastOrders()
  if (!pastOrders.data) {
    res.status(400).json({message: 'Data not found'})
  } else {
    res.status(200).json(pastOrders)
  }
})

app.post(RESTAURANTS_CONTROLLER_ROUTES.restaurants_ORDER, async (req, res) => {
  const sendOrderRequest: SendOrderRequest = req.body
  const { restaurantId, menuIds, deliverBy } = sendOrderRequest

  if (!restaurantId || !deliverBy || !menuIds) {
    res.status(400).json({message: 'Missing request body'})
  }
  const restaurantDetails = getSingleRestaurant(restaurantId)
  if (!restaurantDetails.data || restaurantDetails.data.restaurantId !== restaurantId) {
    res.status(400).json({message: 'Restaurant not found.'})
  }

  const menuDetails = getParticularResturantWithMenuId(menuIds, restaurantDetails.data)
  if (!menuDetails.data || menuDetails.data.length === 0) {
    res.status(400).json({message: 'Menu not found.'})
  }
  const sendOrderStatus = await sendOrders(restaurantDetails.data, menuDetails.data, deliverBy)
  res.status(200).json({
    ...sendOrderStatus
  })
})

interface SendOrderRequest {
  restaurantId: string
  menuIds: string[]
  deliverBy: string
}
