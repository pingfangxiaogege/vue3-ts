export interface IMenu {
  icon: string
  id: number
  last_modified_date_time: string
  name: string
  parent_id: number
  perms: string
  seq: number
  type: number
  url: string
  children: IMenu[]
}