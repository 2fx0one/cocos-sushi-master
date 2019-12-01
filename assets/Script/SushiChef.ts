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

    private recipes: {[key: string]: string} = {
        "1_1_2": "1_1_1"
    }

    onLoad() {
        Singleton.Instance.sushichef = this

    }

    init() {
        // let data = [
        //     {sushiId: 1, name: "普通寿司", index: "1_1_2", num: 2 }
        // ]
    }

    makeSushi(game: Game, foodInCurtain: string[]): Sushi{

        const sushiNode: cc.Node = cc.instantiate(this.sushiPrefab)
        // sushiNode.setPosition(cc.v2(200, 200))
        // game.node.addChild(sushiNode)

        const foods = foodInCurtain.sort()
        const recipe = this.recipes[foods.join('_')];
        
        let sushi: Sushi = sushiNode.getComponent(Sushi).init(game, recipe.split('_'))

        Singleton.Instance.conveyor.addSushi(sushiNode)

        return sushi

    }

}
