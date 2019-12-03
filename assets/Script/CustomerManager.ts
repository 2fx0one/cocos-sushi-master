const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomerManager extends cc.Component {

    @property(cc.Prefab)
    customerPrefab: cc.Prefab = null;

    // @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init()
    }

    init() {
        const foodNode = cc.instantiate(this.customerPrefab)
        foodNode.setPosition(cc.v2())
        this.node.addChild(foodNode)
    }

    start () {

    }

    // update (dt) {}
}
