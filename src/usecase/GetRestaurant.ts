import restaurantData  from '../../database/restaurants.json'
import { Restaurants } from '../constant/restaurants'

export const getListOfRestaurant = (): GetRestaurantDataResponse => {
  if (!restaurantData) {
    return { data: [] }
  }
  return {data: restaurantData.restaurants}
}

interface GetRestaurantDataResponse {
  data: Restaurants[]
}
