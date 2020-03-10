import FoodData from "./FoodData";
import RecipeData from "./RecipeData";

// 关卡数据
export default class StageEntity {
    customerSeatAmount: number = null //顾客数量座位数量
    customerSeatInterval: number = null //顾客座位间隔
    customerWaitTime: number = null //顾客等待时间
    restaurantClosedSecond:number = null //餐厅倒计时300秒
    foodDataList: FoodData[] = null
    recipeList: RecipeData[] = null


    constructor(customerSeatAmount:number,customerSeatInterval:number, customerWaitTime:number,restaurantClosedSecond: number, foodDataList: FoodData[], recipeList: RecipeData[]) {
        this.customerSeatAmount = customerSeatAmount;
        this.customerSeatInterval = customerSeatInterval;
        this.customerWaitTime = customerWaitTime;
        this.restaurantClosedSecond = restaurantClosedSecond;
        this.foodDataList = foodDataList;
        this.recipeList = recipeList;
    }
}