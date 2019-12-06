import DeliveryFood from "./DeliveryFood";
import FoodEntity from "./entity/FoodEntity";
import Food from "./Food";
import Singleton from "./Singleton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryManager extends cc.Component {

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(cc.Prefab)
    deliveryFoodPrefab: cc.Prefab = null;

    @property(cc.Node)
    confirmNode: cc.Node = null

    private currentDeliveryFood: DeliveryFood = null

    onLoad() {
        // [0,1].forEach(()=>{
        //     this.createDeliveryFood()
        // })
    }

    init(foodsInContainMap: { [key: string]: Food }) {

        let data = Object.keys(foodsInContainMap).map(k => foodsInContainMap[k]).concat()

        data.forEach((v, i) => this.createDeliveryFood(v))
    }

    private createDeliveryFood(food: Food) {
        let deliveryFood: cc.Node = cc.instantiate(this.deliveryFoodPrefab)

        deliveryFood.parent = this.layoutNode
        return deliveryFood.getComponent(DeliveryFood).init(this, food)
    }

    clickDeliveryFood(deliveryFood: DeliveryFood) {
        this.currentDeliveryFood = deliveryFood
        this.showConfirmWin(deliveryFood.node.position)
    }

    clickClose() {
        this.closeDeliveryWin()
    }

    clickConfirm(event, data) {
        // console.log(data)
        this.closeConfirmWin()
        switch (data) {
            case 'free':
                Singleton.Instance.game.deliveryFood(this.currentDeliveryFood, data)
                return this.closeDeliveryWin()
            case 'express':
                Singleton.Instance.game.deliveryFood(this.currentDeliveryFood, data)
                return this.closeDeliveryWin()
            case 'close':
                return
            default:
                return
        }
    }

    //
    // freeDelivery (){
    //     this.currentDeliveryFood.delivery()
    // }
    //
    // expressDelivery() {
    //     this.currentDeliveryFood.delivery()
    // }

    reset() {
        this.closeConfirmWin()
        this.currentDeliveryFood = null
    }

    showDeliveryWin() {
        this.node.active = true
        this.reset()
    }

    closeDeliveryWin() {
        this.node.active = false
    }

    showConfirmWin(position) {
        position.y -= 100
        this.confirmNode.position = position
        this.confirmNode.active = true
    }

    closeConfirmWin() {
        this.confirmNode.active = false
    }

}
