export default class FoodData {
    x: number
    y: number
    foodName: string
    foodId: string
    // picPath: string
    foodSmallPicPath: string
    foodInContainerPicPath: string
    amount: number //初始个数

    foodCostPrice: number //食物购买价格

    constructor(x: number, y: number, foodName: string, foodId: string, picPath: string, amount: number, foodCostPrice: number) {
        this.x = x;
        this.y = y;
        this.foodName = foodName
        this.foodId = foodId
        // this.picPath = picPath
        this.foodSmallPicPath =  `image/foods-small/${picPath}`
        // this.foodInContainerPicPath = `image/foods-in-container/${picPath}`
        this.foodInContainerPicPath = `image/foods-small/${picPath}`
        this.amount = amount
        this.foodCostPrice = foodCostPrice
    }

}