import Singleton from "./Singleton";
import Food from "./Food";
import FoodEntity from "./entity/FoodEntity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FoodContainer extends cc.Component {



    @property(cc.Prefab)
    foodPreFab: cc.Prefab = null

    //拥有的所有食物 放在容器里面
    public foodsInContainMap: { [key: string]: Food } = {}

    private  foodPool: cc.NodePool

    onLoad() {
        // this.init()
        this.foodPool = new cc.NodePool();
        let initCount = 20;
        for (let i = 0; i < initCount; ++i) {
            let food:cc.Node = cc.instantiate(this.foodPreFab) // 创建节点
            this.foodPool.put(food) // 通过 put 接口放入对象池
        }
    }

    init(foodDataList: FoodEntity[]) {
        foodDataList.forEach((foodEntity, i) => {
            this.foodsInContainMap[foodEntity.foodId] = this.createFood(foodEntity)
        })
    }

    createFood(foodEntity: FoodEntity): Food {
        let food: cc.Node = this.foodPool.size()>0 ? this.foodPool.get() : cc.instantiate(this.foodPreFab)
        food.parent = this.node
        food.setPosition(cc.v2(foodEntity.x, foodEntity.y))
        return food.getComponent(Food).init(this, foodEntity)
    }

    // putFoodNodeToPool(node: cc.Node) {
    //         this.foodPool.put(node)
    // }

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
