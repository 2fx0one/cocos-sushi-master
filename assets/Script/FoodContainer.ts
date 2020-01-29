import Singleton from "./Singleton";
import Food from "./Food";
import FoodData from "./entity/FoodData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FoodContainer extends cc.Component {
    notifyFood(foodData: FoodData) {
        this.foodsInContainMap[foodData.foodId].resetDeliveryProgressBar()
    }
   
    deliveryFood(foodData: FoodData) {
        this.foodsInContainMap[foodData.foodId].deliveryFood(foodData.amount)
    }

    @property(cc.Prefab)
    foodPreFab: cc.Prefab = null

    @property(cc.Node)
    layoutNode: cc.Node = null

    //拥有的所有食物 放在容器里面
    foodsInContainMap: { [key: string]: Food } = {}

    private foodPool: cc.NodePool

    onLoad() {
        // this.init()
        this.foodPool = new cc.NodePool();
        let initCount = 20;
        for (let i = 0; i < initCount; ++i) {
            let food: cc.Node = cc.instantiate(this.foodPreFab) // 创建节点
            this.foodPool.put(food) // 通过 put 接口放入对象池
        }
    }

    init(foodDataList: FoodData[]) {
        foodDataList.forEach((foodData, i) => {
            this.foodsInContainMap[foodData.foodId] = this.createFood(foodData)
        })
        return this
    }

    createFood(foodData: FoodData): Food {
        let food: cc.Node = this.foodPool.size() > 0 ? this.foodPool.get() : cc.instantiate(this.foodPreFab)
        food.parent = this.layoutNode
        // food.setPosition(cc.v2(foodData.x, foodData.y))
        return food.getComponent(Food).init(this, foodData)
    }

    clickFood(food: Food) {
        Singleton.Instance.game.foodContainerTakeFood(food)
    }

    backFood(food: Food) {
        if (food) {
            // this.putFoodNodeToPool(food.node)
            food.backFood()
        }
    }
}
