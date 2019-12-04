// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import FoodContainer from "./FoodContainer";

const { ccclass, property } = cc._decorator;


@ccclass
export default class Food extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    // @property
    // text: string = 'hello';

    private foodContainer: FoodContainer = null
    public foodName: string = null
    public foodId: string = null
    public picPath: string = null
    private amount: number = null

    // LIFE-CYCLE CALLBACKS:

    public init(foodContainer: FoodContainer, foodId: string, foodName: string, picPath: string, amount: number) {

        this.foodContainer = foodContainer
        this.foodId = foodId
        this.foodName = foodName
        this.picPath = picPath
        this.amount = amount
        this.updateLabelDisplay()

        cc.loader.loadRes('foods/' + this.picPath, cc.SpriteFrame, (err, spriteFrame) => {
            this.getComponentInChildren(cc.Sprite).spriteFrame = spriteFrame
        })
        return this
    }

    updateLabelDisplay() {
        this.label.string = '' + this.amount
    }

    onclick(event, data) {
        console.log(data)
        console.log('this.amount', this.amount)
        if (this.amount > 0) {
            this.foodContainer.clickFood(this)
        }


    }

    addAmonut(amount: number) {
        this.amount += amount
        // console.log('add', this.amount)
        this.updateLabelDisplay()
    }

    subtractAmonut(amount: number) {
        this.amount -= amount
        // console.log('subtract', this.amount)
        this.updateLabelDisplay()
    }

    // 拿食物
    tackFood(): Food {
        this.subtractAmonut(1)
        return this
    }

    // 退回食物
    backFood(): Food {
        this.addAmonut(1)
        return this
    }
}
