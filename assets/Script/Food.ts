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

import Game from "./Game";

@ccclass
export default class Food extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;


    // @property
    // text: string = 'hello';

    private game: Game = null
    public foodName: string = ''
    private amount: number = 9

    // LIFE-CYCLE CALLBACKS:

    public init(game: Game, foodName: string, sf: cc.SpriteFrame, amount: number) {
        // console.log(this.node.parent.getComponent(cc.Sprite))
        // const button = this.getComponent(cc.Button);
        // console.log(button)
        console.log(sf)
        const sprite: cc.Sprite = this.getComponentInChildren(cc.Sprite)
        sprite.spriteFrame = sf
        console.log(sprite.spriteFrame)
        // console.log(this.getComponentsInChildren(cc.Sprite))
        this.game = game
        this.foodName = foodName
        this.amount = amount
        this.updateLabelDisplay()
    }

    updateLabelDisplay() {
        this.label.string = '' + this.amount
    }

    onclick(event, data) {
        console.log(this.foodName)
        // console.log(this.game)
        // console.log(event)
        console.log(data)
        this.game.clickFood(this)


    }

    addAmonut(amount: number) {
        this.amount += amount
        console.log('add', this.amount)
        this.updateLabelDisplay()
    }

    subtractAmonut(amount: number) {
        this.amount -= amount
        console.log('subtract', this.amount)
        this.updateLabelDisplay()
    }

    // 退回食物
    tackFood() {
        this.subtractAmonut(1)
    }

    // 退回食物
    backFood() {
        this.addAmonut(1)
    }
}
