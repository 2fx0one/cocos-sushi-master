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
export default class Game extends cc.Component {

    @property(cc.Prefab)
    ricePreFab: cc.Prefab = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
   
        this.init();

    }

    init(){
        this.createFood(100, 100, "a")
        this.createFood(200, 200, "b")
    }

    createFood(x: number, y:number, name:string) {
        let food = cc.instantiate(this.ricePreFab)

        food.setPosition(cc.v2(x, y))

        food.getComponent('Food').init(this, name)

        this.node.addChild(food)

        return food;
    }

    start() {

    }

    // update (dt) {}
}
