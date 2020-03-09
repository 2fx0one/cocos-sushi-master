import FoodData from "./FoodData";
import RecipeData from "./RecipeData";

// 关卡数据
export default class StageData {
    customerSeat: number = null //招待顾客数量
    closedCountSecond:number = null //餐厅倒计时300秒
    foodDataList: FoodData[] = null
    recipeList: RecipeData[] = null


    constructor(customerSeat:number, closedCountSecond: number, foodDataList: FoodData[], recipeList: RecipeData[]) {
        this.customerSeat = customerSeat;
        this.closedCountSecond = closedCountSecond;
        this.foodDataList = foodDataList;
        this.recipeList = recipeList;
    }
}