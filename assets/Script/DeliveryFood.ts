import DeliveryManager from "./DeliveryManager";
import Food from "./Food";
import Singleton from "./Singleton";
import Utils from "./common/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryFood extends cc.Component {

    private deliveryManager: DeliveryManager = null

    @property(cc.Sprite)
    bg: cc.Sprite = null

    @property(cc.Label)
    label: cc.Label = null

    // private price: number = null
    private food: Food = null

    init(deliveryManager: DeliveryManager, food: Food) {
        this.deliveryManager = deliveryManager;
        this.food = food
        // this.price = food.foodCostPrice
        this.label.string = this.food.foodCostPrice.toString()

        Utils.loadResImage(food.foodSmallPicPath, (err, spriteFrame: cc.SpriteFrame) => {
            this.bg.spriteFrame = spriteFrame
        })

        return this;
    }

    onclick(event, data) {
        this.deliveryManager.clickDeliveryFood(this)
    }

    notify() {
        this.food.deliveryNotify()
    }
    delivery() {
        console.log('delivery')
        this.food.deliveryFood(10)

    }
}
