export type User = {
    email: string
    token: string
    basket?: Basket
    roles?: string[]
}