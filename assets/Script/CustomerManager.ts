import Customer from "./Customer";
import SushiMenu from "./SushiMenu";
import Recipe from "./Recipe";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomerManager extends cc.Component {


    @property(cc.Prefab)
    customerPrefab: cc.Prefab = null;

    // @property
    // text: string = 'hello';

    private sushiMenu: SushiMenu = null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.init()
    }

    init(sushiMenu: SushiMenu) {
        this.sushiMenu = sushiMenu
        // let data = [
        //     -400, -200, 0, 200, 400
        // ]
        for (let i = -420; i <= 500 ; i+=150) {
            const foodNode = cc.instantiate(this.customerPrefab)
            foodNode.setPosition(cc.v2(i, 180))
            foodNode.getComponent(Customer).init(this)
            this.node.addChild(foodNode)
        }
        // data.forEach((v,i)=>{
        //     const foodNode = cc.instantiate(this.customerPrefab)
        //     foodNode.setPosition(cc.v2(v, 180))
        //     this.node.addChild(foodNode)
        // })


    }

    getRandomRecipe(): Recipe {
        return this.sushiMenu.getRandomRecipe()
    }


    // start () {

    // }

    // update (dt) {}
    customerFinished(customer: Customer) {
        customer.node.destroy()

    }
}
