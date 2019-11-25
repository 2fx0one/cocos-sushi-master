// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Food from "./Food";

const { ccclass, property } = cc._decorator;

import Singleton from './Singleton'
import SushiCurtain from "./SushiCurtain";
@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    ricePreFab: cc.Prefab = null

    private foodInCurtain: string[] = []
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Singleton.Instance.game = this
        this.init();
    }

    init() {

        let foodList = [
            { x:265, y:260, name:"1"},
            { x:265, y:160, name:"2"},
            { x:265, y:60, name:"3"},

            { x:165, y:260, name:"4"},
            { x:165, y:160, name:"5"},
            { x:165, y:60, name:"6"},

            { x:65, y:260, name:"7"},
            { x:65, y:160, name:"8"},
            { x:65, y:60, name:"9"}
        ]

        
        foodList.forEach((v, i)=>{
            this.createFood(v.x, v.y, v.name)
        })
    }

    createFood(x: number, y: number, name: string) {
        let food = cc.instantiate(this.ricePreFab)

        // food.setPosition(cc.v2(x - this.node.width * 0.5, y - this.node.height * 0.5))
        food.setPosition(this.getPosition(x, y))

        food.getComponent('Food').init(this, name, 10)

        this.node.addChild(food)

        return food;
    }

    getPosition(x: number, y: number) {
        return cc.v2(x, y);
    }

    makeSushi(foods: string[]){
        console.log("==== make sushi ====")
        console.log(foods)
    }

    clickFood(food: Food) {
        this.foodInCurtain.push(food.typeName)
        console.log(this.foodInCurtain)
    }

    clickCurtain(curtain: SushiCurtain){
        this.makeSushi(this.foodInCurtain)
        this.foodInCurtain = []
        console.log('sushi complete => ', this.foodInCurtain)
    }
}
