import DeliveryManager from "./DeliveryManager";
import Food from "./Food";
import Utils from "./common/Utils";
import FoodData from "./entity/FoodData";

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
    foodData: FoodData = null

    foodCostPrice: number = null



    init(deliveryManager: DeliveryManager, foodData: FoodData) {
        this.deliveryManager = deliveryManager;
        this.foodData = foodData
        this.foodCostPrice = foodData.foodCostPrice
        // this.price = food.foodCostPrice
        this.updateFoodCostPriceLabel()

        Utils.loadResImage(this.foodData.foodSmallPicPath, (err, spriteFrame: cc.SpriteFrame) => {
            this.foodSprite.spriteFrame = spriteFrame
        })
        this.button.interactable = true
        return this;
    }

    updateFoodCostPriceLabel() {
        this.label.string = '$ ' + this.foodData.foodCostPrice.toString()
    }

    onclick(event, data) {
        this.deliveryManager.clickDeliveryFood(this)
    }

    checkBtnInteractable(score: number) {
        this.button.interactable = score >= this.foodData.foodCostPrice
    }
}
