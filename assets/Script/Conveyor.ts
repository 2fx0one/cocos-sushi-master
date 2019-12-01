import Singleton from "./Singleton";
import Sushi from "./Sushi";

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

//传送带
@ccclass
export default class Conveyor extends cc.Component {


    private sushiList: cc.Node[] = []

    private speed :number = 2
    private resetX: number = 110

    onLoad () {
        Singleton.Instance.conveyor = this
        // this.resetX = this.node.x
    }

    start () {

    }

    addSushi(sushiNode: cc.Node){
        sushiNode.setPosition(cc.v2(-100, 0))
        // sushiNode.scaleX = 1
        // sushiNode.scaleY = 1
        this.node.addChild(sushiNode)
        this.sushiList.push(sushiNode)
        console.log(this.sushiList)
    }

    update (dt) {
        // this.node.x += 1 * this.speed
    //     console.log(this.node.x)
    //     if (this.node.x > this.resetX) {
    //         this.node.x -= this.resetX
    //     }
    }
}
