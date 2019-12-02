import Singleton from "./Singleton";
import Recipe from "./Recipe";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SushiMenu extends cc.Component {


    private recipes: { [key: string]: Recipe } = {}


    onLoad () {
        Singleton.Instance.sushiMenu = this
        this.init()
    }

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
        let sushiData = [
            // { sushiName: 'basic', picPath: '01', inputFoodId: ['1', '1', '2'], outputSushiId: ['01', '01', '01'] }
            new Recipe('饭+菜', '01', ['1', '1', '2'], ['01', '01', '01']),
            new Recipe('饭+鲑鱼子', '02', ['1', '3'], ['02', '02', '02']),
        ]

        sushiData.forEach((v, i) => {
            this.recipes[v.sushiId] = v
        })
    }

    getRecipe(foodList: string[]): Recipe {
        let recipe = this.recipes[foodList.sort().join('_')];

        return recipe || new Recipe('shit', '', [], ['none', 'shit', 'none']);
    }

    start () {

    }

    // update (dt) {}
}
