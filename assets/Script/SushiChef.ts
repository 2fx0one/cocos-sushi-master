import Sushi from "./Sushi";
import RecipeData from "./entity/RecipeData";
import Food from "./Food";

const { ccclass, property } = cc._decorator;

// SushiManager
@ccclass
export default class SushiChef extends cc.Component {


    @property(cc.Prefab)
    sushiPrefab: cc.Prefab = null

    private sushiPool: cc.NodePool

    onLoad() {
        this.sushiPool = new cc.NodePool()
        let initCount = 7;
        for (let i = 0; i < initCount; ++i) {
            let sushi:cc.Node = cc.instantiate(this.sushiPrefab) // 创建节点
            this.sushiPool.put(sushi) // 通过 put 接口放入对象池
        }
    }

    init() {

    }

    createSushi(recipeData: RecipeData): Sushi {

        const sushiNode: cc.Node = this.sushiPool.size()>0 ? this.sushiPool.get() : cc.instantiate(this.sushiPrefab)

        return sushiNode.getComponent(Sushi).init(recipeData)
        //
        // console.log('Chef 做好了 ==>> ' , sushi.sushiId, sushi.sushiName)
        //
        // return sushiNode

    }

    putSushiNodeToPool(node: cc.Node) {
        this.sushiPool.put(node)
    }

}
