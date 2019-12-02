import Sushi from "./Sushi";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Customer extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    @property(cc.Node)
    progressNode: cc.Node = null


    private progressBar: cc.ProgressBar = null

    private sushi: Sushi = null

    private orderSushi: string = '1_1_2'

    private anim: cc.Animation = null

    onLoad() {
        this.progressBar = this.progressNode.getComponent(cc.ProgressBar)
        this.anim = this.getComponent(cc.Animation);
    }

    start() {
    }

    update(dt) {
        // console.log(dt)
        // console.log(this.progressBar.progress)
        if (this.progressBar.progress > 1) {
            this.progressBar.progress = 0
        }
        // this.progressBar.progress += dt
    }
    isMySushi(sushi: Sushi) {
        return this.orderSushi == sushi.sushiId
    }

    // 吃完之后动画
    eatUp() {
        if (!this.eatSushi()) {
            this.sushi.node.destroy()
            this.sushi = null
        }
    }

    eatSushi(): boolean {
        if (this.sushi.takeOne()) {
            this.anim.play('customerEat')
            return true
        } else {
            return false
        }
    }

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        console.log('Customer on collision enter', this.sushi);
        let sushi: Sushi = other.node.getComponent(Sushi)
        if (!this.sushi && this.isMySushi(sushi)) {

            sushi.stopMove()

            this.sushi = sushi
            this.eatSushi()
        }
    }
}
