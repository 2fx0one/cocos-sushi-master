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
import SpriteFrame = cc.SpriteFrame;


@ccclass
export default class Game extends cc.Component {


    @property(cc.Prefab)
    ricePreFab: cc.Prefab = null

    // @property(cc.Node)
    // curtain: cc.Node = null

    //拥有的所有食物 放在容器里面
    // private foodSmallSpriteFrameMap: { [key: string]: cc.SpriteFrame } = {}
    // private foodSpriteFrameMap: { [key: string]: cc.SpriteFrame } = {}
    private foodsInContainMap: { [key: string]: Food } = {}

    //板子上的食物
    // private foodInCurtain: string[] = []
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Singleton.Instance.game = this

        let data = [
            { x: 265, y: 260, foodName: "1" },
            { x: 265, y: 160, foodName: "2" },
            { x: 265, y: 60, foodName: "3" },

            { x: 165, y: 260, foodName: "4" },
            { x: 165, y: 160, foodName: "5" },
            { x: 165, y: 60, foodName: "6" },

            { x: 65, y: 260, foodName: "7" },
            { x: 65, y: 160, foodName: "8" },
            { x: 65, y: 60, foodName: "9" }
        ]

        // let nameList: string[] = data.map(v => v.foodName)

        // nameList.forEach((v,i)=>{
        //     cc.loader.loadRes('foods-small/' + v, (err, spriteFrame) => {
        //         this.foodSmallSpriteFrameMap[v] = spriteFrame
        //     })
        // })
        //
        // nameList.forEach((v,i)=>{
        //     cc.loader.loadRes('foods/' + v, (err, spriteFrame) => {
        //         this.foodSpriteFrameMap[v] = spriteFrame
        //     })
        // })

        this.init(data)
    }

    init(data) {

        // let data = [
        //     {x: 265, y: 260, foodName: "1"},
        //     {x: 265, y: 160, foodName: "2"},
        //     {x: 265, y: 60, foodName: "3"},
        //
        //     {x: 165, y: 260, foodName: "4"},
        //     {x: 165, y: 160, foodName: "5"},
        //     {x: 165, y: 60, foodName: "6"},
        //
        //     {x: 65, y: 260, foodName: "7"},
        //     {x: 65, y: 160, foodName: "8"},
        //     {x: 65, y: 60, foodName: "9"}
        // ]

        // cc.loader.loadResArray(data.map(x=>'foods-small/' + x.foodName), (err, resourceList)=>{
        //     console.log('resourceList', resourceList.map(x=>x.name))
        // })

        data.forEach((v, i) => {
            this.foodsInContainMap[v.foodName] = this.createFood(v.x, v.y, v.foodName)
        })
    }

    createFood(x: number, y: number, foodName: string): Food {
        let food = cc.instantiate(this.ricePreFab)

        // food.setPosition(cc.v2(x - this.node.width * 0.5, y - this.node.height * 0.5))
        food.setPosition(this.getPosition(x, y))

        let foodComponent: Food = food.getComponent('Food');

        cc.loader.loadRes('foods/' + foodName, cc.SpriteFrame, (err, spriteFrame) => {
            // console.log(spriteFrame)
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
        // 点击食物，首先帘子需要有空位，且帘子卷的动画已经结束才行。
        console.log('Singleton.Instance.curtain.foodIndex', Singleton.Instance.curtain.foodsAmount())

        // 放到帘子上 放成功了
        if (Singleton.Instance.curtain.addFood(food.foodName)){
            //从格子里面拿食物
            this.foodsInContainMap[food.foodName].tackFood()
        }
    }


    sushiCompleted(curtain: SushiCurtain) {

        console.log('sushi complete => ', curtain)
    }

    backFood() {
        console.log('game.backFood')
        if (Singleton.Instance.curtain.foodsAmount() > 0) {
            let name = Singleton.Instance.curtain.backFood()
            this.foodsInContainMap[name].backFood()
        }
    }
}
