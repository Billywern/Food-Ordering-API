export interface Restaurant {
  restaurantId: string
  name: string
  operationHours: OperationHours
  offDays: string[]
  menu: menuItem[]
  isAvailable?: boolean
}

export interface OperationHours {
  startTime: string
  endTime: string
}

export interface menuItem {
  menuId: string
  name: string
  price: number
}
