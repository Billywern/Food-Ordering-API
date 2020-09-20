import { menuItem} from './restaurants'

export interface Order {
  orderId: string
  restaurantId: string
  name: string
  menu: menuItem
  deliverBy: string
  createdOn: string
}