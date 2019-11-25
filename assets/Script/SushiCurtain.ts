import Singleton from "./Singleton";

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
export default class SushiCurtain extends cc.Component {

    @property([cc.Node])
    foods: cc.Node[] = [];

    private foodIndex: number = 0

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    private anim: cc.Animation = null
    private animState: cc.AnimationState = null

    foodsAmount() {
        return this.foodIndex;
    }

    onLoad() {
        Singleton.Instance.curtain = this
        this.anim = this.getComponent(cc.Animation);
        // this.label = this.getComponent(cc.Label);

    }

    onClickFoodBack(event, data) {
        Singleton.Instance.game.backFood()
    }

    onClickCurtain(event, data) {
        console.log('onClickCurtain')

        if (this.foodIndex === 0) {
            return;
        }
        // console.log(data)

        // if (this.animState==null) {
        //     this.animState = this.anim.play('curtain');
        // }

        if (this.animState == null || this.animState.isPlaying == false) {
            this.animState = this.anim.play('curtain');
        }

        // console.log(this.animState.isPlaying)


    }

    sushiCompleted() {
        console.log('sushiCompleted!')
        this.foods.forEach((v,i)=>{
            v.getComponent(cc.Sprite).spriteFrame = null
        })
        Singleton.Instance.game.sushiCompleted(this)
    }

    // update (dt) {}
    addFood(sf: cc.SpriteFrame) {
        let t: cc.Node = this.foods[this.foodIndex++]
        // console.log(t)
        // console.log(t.getComponent(cc.Sprite))
        t.getComponent(cc.Sprite).spriteFrame = sf

    }

    backFood() {
        console.log('curtain.backFood')
        if (this.foodIndex > 0) {
            let t: cc.Node = this.foods[--this.foodIndex]
            console.log(t)
            t.getComponent(cc.Sprite).spriteFrame = null
        }
    }
}
