// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";

const { ccclass, property } = cc._decorator;


@ccclass
export default class Food extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    // @property
    // text: string = 'hello';

    private game: Game = null
    public foodName: string = null
    public foodId: string = null
    private amount: number = 9

    // LIFE-CYCLE CALLBACKS:

    public init(game: Game, foodId: string, foodName: string, amount: number) {

        this.game = game
        this.foodName = foodName
        this.foodId = foodId
        this.amount = amount
        this.updateLabelDisplay()

        cc.loader.loadRes('foods/' + foodId, cc.SpriteFrame, (err, spriteFrame) => {
            this.getComponentInChildren(cc.Sprite).spriteFrame = spriteFrame
        })
        return this

        // console.log(this.node.parent.getComponent(cc.Sprite))
        // const button = this.getComponent(cc.Button);
        // console.log(button)
        // console.log(sf)
        // const sprite: cc.Sprite = this.getComponentInChildren(cc.Sprite)
        // sprite.spriteFrame = sf
        // console.log(sprite.spriteFrame)
        // console.log(this.getComponentsInChildren(cc.Sprite))
    }

    updateLabelDisplay() {
        this.label.string = '' + this.amount
    }

    onclick(event, data) {
        // console.log(this.foodName)
        // console.log(this.game)
        // console.log(event)
        console.log(data)
        console.log('this.amount', this.amount)
        if (this.amount > 0) {
            this.game.clickFood(this.foodId)
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
    tackFood(): string {
        this.subtractAmonut(1)
        return this.foodId
    }

    // 退回食物
    backFood(): string {
        this.addAmonut(1)
        return this.foodId
    }
}
