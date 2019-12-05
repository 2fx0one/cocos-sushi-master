import Sushi from "./Sushi";

const {ccclass, property} = cc._decorator;

//传送带
@ccclass
export default class Conveyor extends cc.Component {


    // private sushiList: cc.Node[] = []

    private speed :number = 2
    private resetX: number = 110

    // onLoad () {
        // Singleton.Instance.conveyor = this
        // this.resetX = this.node.x
    // }

    // start () {

    // }

    addSushi(sushi: Sushi){
        sushi.node.setPosition(cc.v2(-500, 0))
        // sushiNode.scaleX = 1
        // sushiNode.scaleY = 1
        this.node.addChild(sushi.node)
        // this.sushiList.push(sushiNode)
        // console.log(this.sushiList)
    }

    // update (dt) {
        // this.node.x += 1 * this.speed
    //     console.log(this.node.x)
    //     if (this.node.x > this.resetX) {
    //         this.node.x -= this.resetX
    //     }
    // }
}
