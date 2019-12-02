import Singleton from "./Singleton";
import Sushi from "./Sushi";
import Game from "./Game";
import Recipe from "./Recipe";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SushiChef extends cc.Component {


    @property(cc.Prefab)
    sushiPrefab: cc.Prefab = null

    onLoad() {
        Singleton.Instance.sushichef = this
        this.init()
    }

    init() {

    }

    makeSushi(recipe: Recipe): cc.Node {

        const sushiNode: cc.Node = cc.instantiate(this.sushiPrefab)

        let sushi: Sushi = sushiNode.getComponent(Sushi).init(recipe.sushiId, recipe.sushiName, recipe.outputPicPathList)

        console.log('Chef 做好了 ==>> ' , sushi.sushiId, sushi.sushiName)

        return sushiNode

    }

}
