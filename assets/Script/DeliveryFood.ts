import DeliveryManager from "./DeliveryManager";
import Food from "./Food";
import Singleton from "./Singleton";
import Utils from "./common/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryFood extends cc.Component {

    private deliveryManager: DeliveryManager = null

    @property(cc.Sprite)
    foodSprite: cc.Sprite = null

    @property(cc.Button)
    button: cc.Button = null

    @property(cc.Label)
    label: cc.Label = null

    // private price: number = null
    private food: Food = null

    foodCostPrice: number = null



    init(deliveryManager: DeliveryManager, food: Food) {
        this.deliveryManager = deliveryManager;
        this.food = food
        this.foodCostPrice = food.foodCostPrice
        // this.price = food.foodCostPrice
        this.label.string = '$ ' + this.food.foodCostPrice.toString()

        Utils.loadResImage(food.foodSmallPicPath, (err, spriteFrame: cc.SpriteFrame) => {
            this.foodSprite.spriteFrame = spriteFrame
        })
        this.button.interactable = true
        return this;
    }

    onclick(event, data) {
        this.deliveryManager.clickDeliveryFood(this)
    }

    notify() {
        this.food.deliveryNotify()
    }
    delivery() {
        // console.log('delivery')
        cc.loader.loadRes('audio/deliveryArrival', cc.AudioClip,  (err, clip) => {
            cc.audioEngine.play(clip, false, 0.4)
        })
        this.food.deliveryFood(10)

    }

    checkBtnInteractable(score: number) {
        this.button.interactable = score >= this.food.foodCostPrice
    }
}
