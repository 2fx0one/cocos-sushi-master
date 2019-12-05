import Singleton from "./Singleton";
import Food from "./Food";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Curtain extends cc.Component {

    @property([cc.Node])
    foods: cc.Node[] = [];

    //板子上的食物
    foodInCurtain: Food[] = []

    private foodIndex: number = 0

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    private anim: cc.Animation = null
    private animState: cc.AnimationState = null

    private canAddFood: boolean = true

    private speed: number = 1

    foodsAmount() {
        return this.foodIndex;
    }

    onLoad() {
        this.anim = this.getComponent(cc.Animation);
        // this.label = this.getComponent(cc.Label);
    }

    init(speed: number){
        this.speed = 2
        // console.log('Curtain')
    }

 

    //开始卷帘子
    onClickCurtain(event, data) {
        console.log('onClickCurtain')

        if (this.foodIndex === 0) {
            return;
        }

        if (this.animState == null || this.animState.isPlaying == false) {
            this.animState = this.anim.play('curtain');
            // console.log(this.animState.speed)
            this.animState.speed = this.speed
            this.canAddFood = false
        }
    }

    cleanUpCurtain(target: number[]) {
        target.forEach((v, i) => {
            this.foods[v].getComponent(cc.Sprite).spriteFrame = null
        })
    }

    sushiScrollColumn1() {
        // console.log('1')
        this.cleanUpCurtain([0, 3, 6])
    }

    sushiScrollColumn2() {
        // console.log('2')
        this.cleanUpCurtain([1, 4, 7])
    }

    sushiScrollColumn3() {
        // console.log('3')
        this.cleanUpCurtain([2, 5, 8])
    }

    sushiCompleted() {
        // console.log('sushiCompleted!')

        //可添加食物状态
        this.canAddFood = true

        this.foods.forEach((v, i) => {
            v.getComponent(cc.Sprite).spriteFrame = null
        })

        // this.makeSushi()
        Singleton.Instance.game.curtainScrollCompleted(this.foodInCurtain.map((v, i)=>v.foodId))

        //制作完成 清空该区域
        this.foodIndex = 0
        this.foodInCurtain = []
    }

    isCanAddFood(): boolean {
        //帘子上食物小于9, 卷动动画已经结束
        return this.foodIndex < 9 && this.canAddFood
    }

    addFood(food: Food) {
        if (this.isCanAddFood()) {
            this.foodInCurtain.push(food)
            let t: cc.Node = this.foods[this.foodIndex++]
            cc.loader.loadRes('foods-small/' + food.picPath, cc.SpriteFrame, (err, spriteFrame) => {
                t.getComponent(cc.Sprite).spriteFrame = spriteFrame
            })
        }
    }

    onClickFoodBack(event, data) {
        Singleton.Instance.game.curtainBackFood(this.popLastFood())
    }

    popLastFood(): Food {
        if (this.foodIndex > 0) { //帘子上有食物才能退回
            let t: cc.Node = this.foods[--this.foodIndex]
            t.getComponent(cc.Sprite).spriteFrame = null
            return this.foodInCurtain.pop();
        }
    }
}
