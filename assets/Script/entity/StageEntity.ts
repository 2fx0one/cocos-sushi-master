import FoodData from "./FoodData";
import RecipeData from "./RecipeData";
import GameData from "../data/GameData";


// 关卡数据
export default class StageEntity {
    level: number = null //等级
    // customerSeatAmount: number = null //顾客数量座位数量 有玩家升级决定
    // customerSeatInterval: number = null //顾客座位间隔
    // customerWaitTime: number = null //顾客等待时间
    // restaurantClosedSecond: number = null //餐厅倒计时300秒
    start1: number
    start2: number
    start3: number
    foodDataList: FoodData[] = null
    recipeList: RecipeData[] = null


    constructor(
        level: number,
        // customerSeatAmount: number,
        // customerSeatInterval: number,
        // customerWaitTime: number,
        // restaurantClosedSecond: number,
        start1: number,
        start2: number,
        start3: number,
        foodDataList: FoodData[], recipeList: RecipeData[]) {
        this.level = level;
        // this.customerSeatAmount = customerSeatAmount;
        // this.customerSeatInterval = customerSeatInterval;
        // this.customerWaitTime = customerWaitTime;
        // this.restaurantClosedSecond = restaurantClosedSecond;
        // this.passScore = passScore
        this.foodDataList = foodDataList;
        this.recipeList = recipeList;
    }
}