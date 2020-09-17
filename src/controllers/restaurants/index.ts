import app from '../../connect'
import { getListOfRestaurant } from '../../usecase/GetRestaurant'

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
  res.status(200).json({ data: [] } )
})