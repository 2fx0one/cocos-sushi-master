export default class FoodEntity {
    x: number
    y: number
    foodName: string
    foodId: string
    picPath: string
    amount: number

    constructor(x: number, y: number, foodName: string, foodId: string, picPath: string, amount: number) {
        this.x = x;
        this.y = y;
        this.foodName = foodName
        this.foodId = foodId
        this.picPath = picPath
        this.amount = amount
    }

}