import { menuItem} from './restaurants'

export interface Order {
  orderId: string
  restaurantId: string
  name: string
  menu: menuItem
  createdOn: string
}