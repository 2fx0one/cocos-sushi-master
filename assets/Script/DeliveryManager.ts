import DeliveryFood from "./DeliveryFood";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryManager extends cc.Component {

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(cc.Prefab)
    deliveryFood: cc.Prefab = null;

    onLoad() {
        [0,1].forEach(()=>{
            this.createDeliveryFood()
        })
    }

    createDeliveryFood() {
        let food:cc.Node = cc.instantiate(this.deliveryFood)
        food.parent = this.layoutNode
        return food.getComponent(DeliveryFood).init(this)     
    }
    

}
