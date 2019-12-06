import DeliveryFood from "./DeliveryFood";
import FoodEntity from "./entity/FoodEntity";
import Food from "./Food";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DeliveryManager extends cc.Component {

    @property(cc.Node)
    layoutNode: cc.Node = null;

    @property(cc.Prefab)
    deliveryFood: cc.Prefab = null;

    onLoad() {
        // [0,1].forEach(()=>{
        //     this.createDeliveryFood()
        // })
    }

    init(foodsInContainMap: { [key: string]: Food }) {

        let data = Object.keys(foodsInContainMap).map(k => foodsInContainMap[k]).concat()

        data.forEach((v,i)=>this.createDeliveryFood(v))
    }

    createDeliveryFood(food: Food) {
        let deliveryFood: cc.Node = cc.instantiate(this.deliveryFood)

        deliveryFood.parent = this.layoutNode
        return deliveryFood.getComponent(DeliveryFood).init(this, food)
    }


}
