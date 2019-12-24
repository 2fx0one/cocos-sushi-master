import Sushi from "./Sushi";
import RecipeData from "./entity/RecipeData";

const {ccclass, property} = cc._decorator;

//传送带
@ccclass
export default class SushiConveyor extends cc.Component {


    // private sushiMap: { [key: number]: Sushi } = {}
    private sushiAmount: number = 10

    private speed: number
    private resetX: number = 700

    private animation: cc.Animation = null
    private animState: cc.AnimationState = null

    @property(cc.Prefab)
    sushiPrefab: cc.Prefab = null

    private sushiPool: cc.NodePool

    onLoad() {
        this.sushiPool = new cc.NodePool()
        let initCount = 10;
        for (let i = 0; i < initCount; ++i) {
            let sushi:cc.Node = cc.instantiate(this.sushiPrefab) // 创建节点
            this.sushiPool.put(sushi) // 通过 put 接口放入对象池
        }
    }

    // start () {
    // }

    init(speed: number) {
        this.speed = speed
        // this.animation = this.node.getComponentInChildren(cc.Animation)
        // this.animState = this.animation.play('conveyor');
        // this.animState.speed = this.speed * 0.5
    }

    createSushi(recipeData: RecipeData): Sushi {

        const sushiNode: cc.Node = this.sushiPool.size()>0 ? this.sushiPool.get() : cc.instantiate(this.sushiPrefab)

        sushiNode.parent = this.node

        let begin = cc.v2(-this.resetX, 0)
        let end = cc.v2(this.resetX, 0)
        return sushiNode.getComponent(Sushi).createSushi(this, recipeData, this.speed, begin, end)

        // console.log('Chef 做好了 ==>> ' , sushi.sushiId, sushi.sushiName)
        //
        // return sushiNode

    }

    putSushiNodeToPool(node: cc.Node) {
            this.sushiPool.put(node)
    }

    // addSushi(sushi: Sushi) {
    //     let index = this.sushiAmount++
    //     this.sushiMap[index] = sushi.init(this)
    // }

    // update(dt) {
        // Object.keys(this.sushiMap).forEach(v => {
        //     let sushi: Sushi = this.sushiMap[v]
        //     if (sushi && sushi.step(this.speed) > this.resetX) {
        //         sushi.resetPosition(-this.resetX, 0)
        //     }
        // })
        // this.sushiList.forEach((v, i) => {
        //     if (v.step(this.speed) > this.resetX) {
        //         v.resetPosition(-this.resetX, 0)
        //     }
        // })
        // this.node.x += 1 * this.speed
        // console.log(this.node.x)
        // if (this.node.x > this.resetX) {
        //     this.node.x -= this.resetX
        // }
    // }

    removeSushi(sushi: Sushi) {
        // this.sushiMap[sushiIndexInConveyor] = null
        // delete this.sushiMap[sushiIndexInConveyor]
        this.putSushiNodeToPool(sushi.node)
    }
}
