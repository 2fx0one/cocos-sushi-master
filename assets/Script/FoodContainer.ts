import Singleton from "./Singleton";
import Food from "./Food";
import FoodEntity from "./entity/FoodEntity";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FoodContainer extends cc.Component {



    @property(cc.Prefab)
    foodPreFab: cc.Prefab = null

    //拥有的所有食物 放在容器里面
    private foodsInContainMap: { [key: string]: Food } = {}

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
        foodDataList.forEach((v, i) => {
            this.foodsInContainMap[v.foodId] = this.createFood(v.x, v.y, v.foodId, v.foodName, v.picPath, v.amount)
        })
    }

    createFood(x: number, y: number, foodId: string, foodName: string, picPath: string, amount: number): Food {
        let food: cc.Node = this.foodPool.size()>0 ? this.foodPool.get() : cc.instantiate(this.foodPreFab)
        food.parent = this.node
        food.setPosition(cc.v2(x, y))
        return food.getComponent(Food).init(this, foodId, foodName, picPath, amount)
    }

    putFoodNodeToPool(node: cc.Node) {
            this.foodPool.put(node)
    }

    clickFood(food: Food) {
        Singleton.Instance.game.foodContainerTakeFood(food)
    }

    backFood(food: Food) {
        if (food) {
            this.putFoodNodeToPool(food.node)
            food.backFood()
        }
    }
}
