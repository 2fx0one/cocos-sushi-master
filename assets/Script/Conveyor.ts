import Sushi from "./Sushi";

const {ccclass, property} = cc._decorator;

//传送带
@ccclass
export default class Conveyor extends cc.Component {


    private sushiMap: { [key: number]: Sushi } = {}
    private sushiAmount: number = 0

    private speed: number
    private resetX: number = 500

    private animation: cc.Animation = null
    private animState: cc.AnimationState = null
    // onLoad () {
    // }

    // start () {
    // }

    init(speed: number) {
        this.speed = speed
        this.animation = this.node.getComponentInChildren(cc.Animation)
        this.animState = this.animation.play('conveyor');
        this.animState.speed = this.speed * 0.5
    }

    addSushi(sushi: Sushi) {
        let index = this.sushiAmount++

        this.sushiMap[index] = sushi.init(this, index, -this.resetX, 0)
    }

    update(dt) {
        Object.keys(this.sushiMap).forEach(v => {
            let sushi: Sushi = this.sushiMap[v]
            if (sushi && sushi.step(this.speed) > this.resetX) {
                sushi.resetPosition(-this.resetX, 0)
            }
        })
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
    }

    removeSushi(sushiIndexInConveyor: string) {
        // this.sushiMap[sushiIndexInConveyor] = null
        delete this.sushiMap[sushiIndexInConveyor]
    }
}
