import Sushi from "./Sushi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Customer extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    private hasFood = false

    private orderSushi: string = '01_01_01'

    start () {

    }

    // update (dt) {}
    isMySushi(sushi: Sushi) {
        return this.orderSushi == sushi.getName()
    }

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        let sushi: Sushi = other.node.getComponent(Sushi)
        if (!this.hasFood && this.isMySushi(sushi)) {

            console.log('Customer on collision enter');
            sushi.stopMove()
            // self.node.zIndex += 1
            // console.log(other.node.zIndex)
            // console.log(self.node.zIndex)
            // other.node.parent = null
            // this.node.addChild(other.node)
            // other.node.
            other.node.y += 50
            this.hasFood = true
        }
    }
}
