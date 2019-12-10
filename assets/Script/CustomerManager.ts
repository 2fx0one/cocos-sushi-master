import Customer from "./Customer";
import SushiMenu from "./SushiMenu";
import RecipeData from "./entity/RecipeData";
import Singleton from "./Singleton";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomerManager extends cc.Component {


    @property(cc.Prefab)
    customerPrefab: cc.Prefab = null;

    // @property
    // text: string = 'hello';

    // private sushiMenu: SushiMenu = null

    private customerPool: cc.NodePool

    public customerAmount: number = 0 //客户总数

    onLoad() {
        // this.init()
        this.customerPool = new cc.NodePool();
        let initCount = 8;
        for (let i = 0; i < initCount; ++i) {
            let customer = cc.instantiate(this.customerPrefab) // 创建节点
            this.customerPool.put(customer) // 通过 put 接口放入对象池
        }
    }

    init() {
        for (let i = -420; i <= 500; i += 150) {
            this.createCustomer(i, 180)
        }

    }

    createCustomer(x, y) {
        this.customerAmount += 1
        let customer: cc.Node = this.customerPool.size() > 0 ? this.customerPool.get() : cc.instantiate(this.customerPrefab)
        // if (this.customerPool.size() > 0) {
        //     customer = this.customerPool.get()
        // } else {
        //     customer =  cc.instantiate(this.customerPrefab)
        // }
        customer.parent = this.node
        customer.setPosition(cc.v2(x, y))
        return customer.getComponent(Customer).init(this)
    }

    putCustomerNodeToPool(customer: cc.Node) {
        this.customerAmount -= 1
        this.customerPool.put(customer)
    }

    getRandomRecipe(): RecipeData {
        return Singleton.Instance.game.customerManagerGetRandomRecipe()
    }

    // start () {

    // }

    // update (dt) {}
    customerFinished(customer: Customer) {
        this.putCustomerNodeToPool(customer.node)
        Singleton.Instance.game.customerFinished(customer)
    }
}
