import RecipeData from "./entity/RecipeData";
import Utils from "./common/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SushiMenu extends cc.Component {


    private recipes: { [key: string]: RecipeData } = {}

    public recipeList: RecipeData[] = null

    // onLoad() {
    // }

    init(recipeList: RecipeData[]) {

        //寿司菜单
        this.recipeList = recipeList

        this.recipeList.forEach((v, i) => {
            // this.recipes[i] = v
            this.recipes[v.sushiId] = v
        })
        return this
    }

    getRecipe(foodList: string[]): RecipeData {
        console.log(foodList)
        let recipe = this.recipes[foodList.sort().join('_')];

        return recipe || new RecipeData('shit', 'shit', '', [], ['none', 'shit', 'none']);
    }

    getRandomRecipe(): RecipeData {
        // let i = Utils.getRandomInt(0, 2)
        let i = Utils.getRandomInt(0, this.recipeList.length)
        // console.log(i)

        return this.recipeList[i]
    }

    // start() {
    //
    // }

    // update (dt) {}
}
