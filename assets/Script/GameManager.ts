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
export default class NewClass extends cc.Component {

    @property([cc.Button])
    rice: cc.Button[] = [];

    @property(cc.Prefab)
    ricePrefab: cc.Prefab = null

    @property(cc.Canvas)
    canvas: cc.Canvas = null
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let rice = cc.instantiate(this.ricePrefab)
        rice.x = 100
        this.node.parent.addChild(rice)
        // this.canvas.add(rice)
        

    }
    onTouchFood(event, customEventData) {
        console.log('xx', event,  customEventData)
    }

    // update (dt) {}
}
