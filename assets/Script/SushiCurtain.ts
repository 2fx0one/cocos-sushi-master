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

const { ccclass, property } = cc._decorator;

@ccclass
export default class SushiCurtain extends cc.Component {

    @property([cc.Node])
    foods: cc.Node[] = [];

    //板子上的食物
    foodInCurtain: string[] = []

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

    sushiScrollColumn1() {
        console.log('1')

        let target = [0, 3, 6]
        this.foods.filter((v, i) => target.indexOf(i)>=0)
            .forEach((v, i) => {
                v.getComponent(cc.Sprite).spriteFrame = null
            })
    }

    sushiScrollColumn2() {
        console.log('2')
        let target = [1, 4, 7]
        this.foods.filter((v, i) => target.indexOf(i)>=0)
            .forEach((v, i) => {
                v.getComponent(cc.Sprite).spriteFrame = null
            })

    }
    sushiScrollColumn3() {
        console.log('3')
        let target = [2, 5, 8]
        this.foods.filter((v, i) => target.indexOf(i)>=0)
            .forEach((v, i) => {
                v.getComponent(cc.Sprite).spriteFrame = null
            })

    }

    sushiCompleted() {
        console.log('sushiCompleted!')
        this.foods.forEach((v, i) => {
            v.getComponent(cc.Sprite).spriteFrame = null
        })
        this.foodIndex = 0

        this.makeSushi()
        Singleton.Instance.game.sushiCompleted(this)
    }

    makeSushi() {
        console.log("==== make sushi ====")
        console.log(this.foodInCurtain)
        this.foodInCurtain = []
    }


    // update (dt) {}
    addFood(foodName: string, sf: cc.SpriteFrame) {
        this.foodInCurtain.push(foodName)
        let t: cc.Node = this.foods[this.foodIndex++]
        // console.log(t)
        // console.log(t.getComponent(cc.Sprite))
        t.getComponent(cc.Sprite).spriteFrame = sf

    }

    backFood(): string {
        console.log('curtain.backFood')
        if (this.foodsAmount() > 0) {
            let t: cc.Node = this.foods[--this.foodIndex]
            // console.log(t)
            t.getComponent(cc.Sprite).spriteFrame = null
            return this.foodInCurtain.pop();
        }
        return ''
    }
}
