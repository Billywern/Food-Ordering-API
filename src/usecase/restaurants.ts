import moment from 'moment'
import restaurantData from '../../database/restaurants.json'
import { Restaurant, menuItem} from '../constant/restaurants'

export const getListOfRestaurant = (): GetRestaurantDataResponse => {
  if (!restaurantData) {
    return { data: [] }
  }
  let data: Restaurant[] = restaurantData.restaurants

  const newData = data.map((restaurantDetail) => {
    const now = moment()
    const currentDay = now.format("dddd")
    const currentTime = now.format("HHmm").toString()
    restaurantDetail.isAvailable = true
    if (!restaurantDetail.offDays.includes(currentDay) ||
      restaurantDetail.operationHours.startTime > currentTime ||
      restaurantDetail.operationHours.endTime < currentTime
    ) {
      restaurantDetail.isAvailable = false
    }
    return restaurantDetail
  })
  return {data: newData}
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
