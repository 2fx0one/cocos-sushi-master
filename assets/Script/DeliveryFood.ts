import DeliveryManager from "./DeliveryManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryFood extends cc.Component {
    
    private deliveryManager: DeliveryManager = null
    
    @property(cc.Sprite)
    bg: cc.Sprite = null

    @property(cc.Label)
    label: cc.Label = null

    private price: number = null

    init(deliveryManager: DeliveryManager, foodName, price) {
        this.deliveryManager = deliveryManager
        return this;
    }

    onclick() {
        console.log('onclick')
    }

}
