import RecipeData from "./entity/RecipeData";
import Singleton from "./Singleton";
import Utils from "./common/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SushiMenu extends cc.Component {


    private recipes: { [key: string]: RecipeData } = {}

    public recipeList: RecipeData[] = null

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
            new RecipeData('饭团', '2饭+1苔', '01', ['1', '1', '2'], ['01', '01', '01']),
            new RecipeData('军舰', '1饭+1鲑鱼子', '02', ['1', '3'], ['02', '02', '02']),
            new RecipeData('军舰', '1饭+2苔+1鲑鱼子', '03', ['1', '2', '2', '3'], ['03', '03', '03']),
            new RecipeData('寿司', ' 2饭+1苔+1鲑', '04', ['1', '1', '2', '4'], ['04', '04', '04']),
            new RecipeData('寿司', ' 1饭+2苔+1瓜', '05', ['1', '2', '2', '6'], ['05', '05', '05']),
            new RecipeData('寿司', ' 1饭+2苔+1虾', '06', ['1', '2', '2', '13'], ['06', 'none', '06']),
            new RecipeData('卷寿司', ' 1饭+1苔+1瓜', '07', ['1', '2', '6'], ['07', '07', '07']),

            new RecipeData('anago 鳗鱼寿司', ' 1饭+1苔+2鳗', '08', ['1', '2', '12', '12'], ['08', '08', '08']),
            new RecipeData('章鱼寿司', ' 2饭+2苔+2章', '09', ['1', '1', '2', '2', '9', '9'], ['09', '09', '09']),
            new RecipeData('扁口鱼寿司', ' 2饭+1苔+1扁口', '10', ['1', '1', '2', '7'], ['10', '10', '10']),
            new RecipeData('hamachi 鰤鱼寿司', ' 2饭+1苔+1鰤', '11', ['1', '1', '2', '10'], ['11', '11', '11']),
            new RecipeData('tai鲷鱼寿司', ' 3饭+1苔+2鲷', '12', ['1', '1', '1', '2', '11', '11'], ['12', '12', '12']),
            new RecipeData('鯖鱼寿司', ' 1饭+2苔+2鯖', '13', ['1', '2', '2', '8', '8'], ['13', '13', '13']),
            new RecipeData('SPECIAL', ' 4饭+3苔+1鲷+1瓜', '14', ['1', '1', '1', '1', '2', '2', '2', '6', '11'], ['01', '07', '12']),
            new RecipeData('蟹棒寿司', ' 2饭+2苔+1蟹', '15', ['1', '1', '2', '2', '14'], ['15', '15', '15']),
            new RecipeData('玉子烧寿司', ' 1饭+2苔+1玉', '16', ['1', '2', '2', '15'], ['16', '16', '16']),
            new RecipeData('卷寿司', ' 1饭+1苔+1玉', '17', ['1', '2', '15'], ['17', '17', '17']),
            new RecipeData('手卷寿司', ' 3饭+2苔+1鯖+1瓜', '18', ['1', '1', '1', '2', '2', '12', '6'], ['none', '18', 'none']),
        ]

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
        let i = Utils.getRandomInt(0, this.recipeList.length)
        console.log(i)

        return this.recipeList[i]
    }

    // start() {
    //
    // }

    // update (dt) {}
}
