import RecipeEntity from "./entity/RecipeEntity";
import Singleton from "./Singleton";
import Utils from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SushiMenu extends cc.Component {


    private recipes: { [key: string]: RecipeEntity } = {}

    public recipeList: RecipeEntity[] = null

    // onLoad() {
    // }

    init() {
        // {
        //     '1_1_2': ['01', '01', '01'],
        //     '1_3': ['02', '02', '02'],
        //     '1_2_3_3': ['03', '03', '03'],
        //     '1_1_2_4': ['04', '04', '04'],
        //     '1_2_2_6': ['05', '05', '05'],
        //     '1_2_6': ['07', '07', '07'],
        //     '1_1_2_2_9_9': ['09', '09', '09'],
        //     '1_1_2_2_8_8': ['10', '10', '10']
        // }
        //寿司菜单
        this.recipeList = [
            // { sushiName: 'basic', picPath: '01', inputFoodId: ['1', '1', '2'], outputSushiId: ['01', '01', '01'] }
            new RecipeEntity('饭团', '2饭+1海苔', '01', ['1', '1', '2'], ['01', '01', '01']),
            new RecipeEntity('军舰', '1饭+1鲑鱼子', '02', ['1', '3'], ['02', '02', '02']),
            new RecipeEntity('军舰', '1饭+2海苔+1鲑鱼子', '03', ['1', '2', '2', '3'], ['03', '03', '03']),
            new RecipeEntity('寿司', ' 2饭+1海苔+1鲑鱼', '04', ['1', '1', '2', '4'], ['04', '04', '04']),
            new RecipeEntity('寿司', ' 1饭+2海苔+1黄瓜', '05', ['1', '2', '2', '6'], ['05', '05', '05']),
            new RecipeEntity('寿司', ' 1饭+2海苔+1虾', '06', ['1', '2', '2', '13'], ['06', '06', '06']),
            new RecipeEntity('卷寿司', ' 1饭+1海苔+1黄瓜', '07', ['1', '2', '6'], ['07', '07', '07']),

            new RecipeEntity('anago 鳗鱼寿司', ' 1饭+1海苔+2鳗鱼', '08', ['1', '2', '12', '12'], ['08', '08', '08']),
            new RecipeEntity('章鱼寿司', ' 2饭+2海苔+2章鱼', '09', ['1', '1', '2', '2', '9', '9'], ['09', '09', '09']),
            new RecipeEntity('扁口鱼寿司', ' 2饭+1海苔+1扁口鱼', '10', ['1', '1', '2', '7'], ['10', '10', '10']),
            new RecipeEntity('hamachi 鰤鱼寿司', ' 2饭+1海苔+1鰤鱼', '11', ['1', '1', '2', '10'], ['11', '11', '11']),
            new RecipeEntity('tai鲷鱼寿司', ' 3饭+1海苔+2鲷鱼', '12', ['1', '1', '1', '2', '11', '11'], ['12', '12', '12']),
            new RecipeEntity('鯖鱼寿司', ' 1饭+2海苔+2鯖鱼', '13', ['1', '2', '2', '8', '8'], ['13', '13', '13']),
            new RecipeEntity('SPECIAL', ' 4饭+3海苔+1鲷鱼+1黄瓜', '14', ['1', '1', '1', '1', '2','2','2', '6', '11'], ['01', '07', '12']),
        ]

        this.recipeList.forEach((v, i) => {
            // this.recipes[i] = v
            this.recipes[v.sushiId] = v
        })
        return this
    }

    getRecipe(foodList: string[]): RecipeEntity {
        console.log(foodList)
        let recipe = this.recipes[foodList.sort().join('_')];

        return recipe || new RecipeEntity('shit', 'shit', '', [], ['none', 'shit', 'none']);
    }

    getRandomRecipe(): RecipeEntity {
        let i = Utils.getRandomInt(0, this.recipeList.length)
        console.log(i)

        return this.recipeList[i]
    }

    // start() {
    //
    // }

    // update (dt) {}
}
