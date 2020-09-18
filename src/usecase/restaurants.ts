import restaurantData from '../../database/restaurants.json'
import { Restaurant, menuItem} from '../constant/restaurants'

export const getListOfRestaurant = (): GetRestaurantDataResponse => {
  if (!restaurantData) {
    return { data: [] }
  }
  let data = restaurantData.restaurants
  return {data}
}

export const getSingleRestaurant = (restaurantId: string): GetSingleRestaurantDataResponse => {

  const restaurantDetails = restaurantData.restaurants.find((value) => value.restaurantId === restaurantId)

  return {
    data: restaurantDetails
  }
}

export const getParticularResturantWithMenuId = (menuIds: string[], restaurant?: Restaurant): GetParticularResturantWithMenuIdResponse => {

  if (!restaurant || !menuIds) {
    return {
      data: []
    }
  }
  const menuDetails = menuIds.map((chosenMenuId) => {
    return restaurant.menu.find((value) => value.menuId === chosenMenuId)
  }).filter((value) => value)

  if (!menuDetails) {
    return {
      data: []
    }
  }

  return {
    data: menuDetails
  }
} 

interface GetRestaurantDataResponse {
  data?: Restaurant[]
}

interface GetSingleRestaurantDataResponse {
  data?: Restaurant
}

interface GetParticularResturantWithMenuIdResponse {
  data?: Array<menuItem | unknown>
}
