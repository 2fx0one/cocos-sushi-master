import FoodData from "./FoodData";
import RecipeData from "./RecipeData";

// 关卡数据
export default class StageData {
    customerSeatAmount: number = null //顾客数量座位数量
    customerSeatInterval: number = null //顾客座位间隔
    closedCountSecond:number = null //餐厅倒计时300秒
    foodDataList: FoodData[] = null
    recipeList: RecipeData[] = null


    constructor(customerSeatAmount:number,customerSeatInterval:number, closedCountSecond: number, foodDataList: FoodData[], recipeList: RecipeData[]) {
        this.customerSeatAmount = customerSeatAmount;
        this.customerSeatInterval = customerSeatInterval;
        this.closedCountSecond = closedCountSecond;
        this.foodDataList = foodDataList;
        this.recipeList = recipeList;
    }
}