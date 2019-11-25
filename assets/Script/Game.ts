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

const {ccclass, property} = cc._decorator;

import Singleton from './Singleton'
import SushiCurtain from "./SushiCurtain";
import SpriteFrame = cc.SpriteFrame;


@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    ricePreFab: cc.Prefab = null

    //拥有的所有食物组件
    private foodSpriteFrameMap: { [key: string]: cc.SpriteFrame } = {}
    private foodMap: { [key: string]: Food } = {}

    //板子上的食物
    private foodInCurtain: string[] = []
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Singleton.Instance.game = this
        this.init()
    }

    init() {

        let data = [
            {x: 265, y: 260, foodName: "1_rice"},
            {x: 265, y: 160, foodName: "2_seaweed"},
            {x: 265, y: 60, foodName: "3_salmon_roe"},

            {x: 165, y: 260, foodName: "4_salmon_fillet"},
            {x: 165, y: 160, foodName: "5"},
            {x: 165, y: 60, foodName: "6"},

            {x: 65, y: 260, foodName: "7"},
            {x: 65, y: 160, foodName: "8"},
            {x: 65, y: 60, foodName: "9"}
        ]


        data.forEach((v, i) => {
            this.foodMap[v.foodName] = this.createFood(v.x, v.y, v.foodName)
        })
    }

    createFood(x: number, y: number, foodName: string): Food {
        let food = cc.instantiate(this.ricePreFab)

        // food.setPosition(cc.v2(x - this.node.width * 0.5, y - this.node.height * 0.5))
        food.setPosition(this.getPosition(x, y))

        let foodComponent: Food = food.getComponent('Food');

        cc.loader.loadRes('foods/' + foodName, cc.SpriteFrame, (err, spriteFrame)=>{
            console.log(spriteFrame)
            // let sf:cc.SpriteFrame = spriteFrame
            // console.log('xx', sf.name)
            // this.foodSpriteFrameMap[sf.name] = sf
            foodComponent.init(this, foodName, spriteFrame, 10)
        })


        this.node.addChild(food)

        return foodComponent;
    }

    getPosition(x: number, y: number) {
        return cc.v2(x, y);
    }


    clickFood(food: Food) {
        if (this.foodInCurtain.length < 9) {
            this.foodInCurtain.push(food.foodName)
            this.foodMap[food.foodName].tackFood()
            console.log(this.foodInCurtain)
        }
    }


    makeSushi(foods: string[]) {
        console.log("==== make sushi ====")
        console.log(foods)
    }

    sushiCompleted(curtain: SushiCurtain) {
        this.makeSushi(this.foodInCurtain)
        this.foodInCurtain = []
        console.log('sushi complete => ', this.foodInCurtain)
    }

    backFood() {
        console.log('return food')
        if (this.foodInCurtain.length > 0) {
            let t = this.foodInCurtain.pop();
            this.foodMap[t].backFood()
        }
    }
}
