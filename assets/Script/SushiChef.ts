import Singleton from "./Singleton";
import Sushi from "./Sushi";
import Game from "./Game";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SushiChef extends cc.Component {


    @property(cc.Prefab)
    sushiPrefab: cc.Prefab = null

    private recipes: {[key: string]: string[]} = {
        '1_1_2': ['01','01','01'],
        '1_3': ['02', '02', '02'],
        '1_2_3_3': ['03', '03', '03'],
        '1_1_2_4': ['04', '04', '04'],
        '1_2_2_6': ['05', '05', '05'],
        '1_2_6': ['07', '07', '07'],
        '1_1_2_2_9_9': ['09', '09', '09'],
        '1_1_2_2_8_8': ['10', '10', '10']
    }

    onLoad() {
        Singleton.Instance.sushichef = this
    }

    init() {
        // let data = [
        //     {sushiId: 1, name: "普通寿司", index: "1_1_2", num: 2 }
        // ]
    }

    getRecipe(foodInCurtain: string[]): string[] {
        //排序
        const foods = foodInCurtain.sort()
        let recipe = this.recipes[foods.join('_')];

        // if (!recipe) {
        //     recipe = [ 'none', 'shit', 'none']
        // }
        return recipe || [ 'none', 'shit', 'none'];
    }

    makeSushi(game: Game, foodInCurtain: string[]): cc.Node{

        const sushiNode: cc.Node = cc.instantiate(this.sushiPrefab)

        let recipe = this.getRecipe(foodInCurtain)

        
        let sushi: Sushi = sushiNode.getComponent(Sushi).init(game, recipe)

        // Singleton.Instance.conveyor.addSushi(sushiNode)

        return sushiNode

    }

}
