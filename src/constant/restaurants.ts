export interface RestaurantsResp {
  restaurants: Restaurants[]
}
export interface Restaurants {
  restaurantId: string
  name: string
  operationHours: OperationHours
  offDays: string[]
  menu: menuItem[]
}

interface OperationHours {
  startTime: string
  endTime: string
}

interface menuItem {
  menuId: string
  name: string
  price: number
}