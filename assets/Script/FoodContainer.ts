import Singleton from "./Singleton";
import Food from "./Food";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FoodContainer extends cc.Component {



    @property(cc.Prefab)
    foodPreFab: cc.Prefab = null

    //拥有的所有食物 放在容器里面
    private foodsInContainMap: { [key: string]: Food } = {}

    onLoad() {
        Singleton.Instance.foodContainer = this
        this.init()
    }

    init() {
        let data = [
            { x: 450, y: 250, foodDisPlayName: "13", foodId: "13" },
            { x: 350, y: 250, foodDisPlayName: "1", foodId: "1" },
            { x: 350, y: 150, foodDisPlayName: "2", foodId: "2" },
            { x: 350, y: 50, foodDisPlayName: "3", foodId: "3" },

            { x: 250, y: 250, foodDisPlayName: "1", foodId: "4" },
            { x: 250, y: 150, foodDisPlayName: "2", foodId: "5" },
            { x: 250, y: 50, foodDisPlayName: "3", foodId: "6" },

            { x: 150, y: 250, foodDisPlayName: "4", foodId: "7" },
            { x: 150, y: 150, foodDisPlayName: "5", foodId: "8" },
            { x: 150, y: 50, foodDisPlayName: "6", foodId: "9" },

            { x: 50, y: 250, foodDisPlayName: "7", foodId: "10" },
            { x: 50, y: 150, foodDisPlayName: "8", foodId: '11' },
            { x: 50, y: 50, foodDisPlayName: "9", foodId: "12" }
        ]
        data.forEach((v, i) => {
            this.foodsInContainMap[v.foodId] = this.createFood(v.x, v.y, v.foodId, v.foodDisPlayName)
        })
    }

    createFood(x: number, y: number, foodId: string, foodName: string): Food {
        const foodNode = cc.instantiate(this.foodPreFab)
        this.node.addChild(foodNode)
        foodNode.setPosition(this.getPosition(x, y))

        return foodNode.getComponent(Food).init(this, foodId, foodName, 10)
    }

    getPosition(x: number, y: number) {
        return cc.v2(x, y);
    }

    clickFood(food: Food) {
        Singleton.Instance.game.clickFood(food)
    }
}
