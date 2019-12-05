import Singleton from "./Singleton";
import Food from "./Food";

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

    init() {
        let data = [
            { x: 450, y: 250, foodName: "虾", foodId: "13", picPath: '13', amount: 10 },

            { x: 350, y: 250, foodName: "饭", foodId: '1', picPath: '1', amount: 10 },
            { x: 350, y: 150, foodName: "海苔", foodId: '2', picPath: '2', amount: 10 },
            { x: 350, y: 50, foodName: "鲑鱼子", foodId: '3', picPath: '3', amount: 10 },

            { x: 250, y: 250, foodName: "鲑鱼", foodId: '4', picPath: '4', amount: 10 },
            { x: 250, y: 150, foodName: "5", foodId: '5', picPath: '5', amount: 10 },
            { x: 250, y: 50, foodName: "黄瓜", foodId: '6', picPath: '6', amount: 10 },

            { x: 150, y: 250, foodName: "扁口鱼", foodId: '7', picPath: '7', amount: 10 },
            { x: 150, y: 150, foodName: "8", foodId: '8', picPath: '8', amount: 10 },
            { x: 150, y: 50, foodName: "章鱼", foodId: '9', picPath: '9', amount: 10 },

            { x: 50, y: 250, foodName: "10", foodId: '10', picPath: '10', amount: 10 },
            { x: 50, y: 150, foodName: "11", foodId: '11', picPath: '11', amount: 10 },
            { x: 50, y: 50, foodName: "12", foodId: '12', picPath: '12', amount: 10 }
        ]
        data.forEach((v, i) => {
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
