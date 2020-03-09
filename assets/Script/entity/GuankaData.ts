import FoodData from "./FoodData";
import RecipeData from "./RecipeData";

export default class GuankaData {
    closedCountSecond:number = 300 //倒计时300秒
    foodDataList: FoodData[] = null
    recipeList: RecipeData[] = null


    constructor(closedCountSecond: number, foodDataList: FoodData[], recipeList: RecipeData[]) {
        this.closedCountSecond = closedCountSecond;
        this.foodDataList = foodDataList;
        this.recipeList = recipeList;
    }
}