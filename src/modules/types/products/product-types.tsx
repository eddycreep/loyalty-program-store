export interface Item {
    id: number,
    item_code: string,
    store_code: string,
    group_num: string,
    selling_incl_1: number,
    selling_incl_2: number,
    description_1: string,
    unit_size: string
    physical_item: 1,
    category_main: string,
    category_sub: string,
    category_last: string,
    sales_tax_type: string,
    purchase_tax_type: string,
    image: string
    net_mass: string
    tax_description: string,
    tax_value: string
}

export type ItemsResponse = Item[]