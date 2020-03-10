import Customer from "./Customer";
import SushiMenu from "./SushiMenu";
import RecipeData from "./entity/RecipeData";
import Singleton from "./Singleton";
import Utils from "./common/Utils";
import CustomerSeat from "./entity/CustomerSeat";

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

    customerWaitTime: number = 0

    private customPositionList: CustomerSeat[]

    // private customerList: Customer[] = []

    onLoad() {
        // this.init()
        this.customerPool = new cc.NodePool();
        let initCount = 10;
        for (let i = 0; i < initCount; ++i) {
            let customer = cc.instantiate(this.customerPrefab) // 创建节点
            this.customerPool.put(customer) // 通过 put 接口放入对象池
        }
    }

    makeSeatPosition(seatAmount: number, seatInterval: number): CustomerSeat[] {
        let positionList: CustomerSeat[] = []
        let seatWidth = 100
        // let seatInterval = customerSeatInterval

        //座位大小加间隔 总宽度
        let total = seatAmount * seatWidth + (seatAmount - 1) * seatInterval

        for (let i = 0; i < seatAmount; i++) {
            // let x = i * (seatWidth + seatInterval) - total / 2 + seatInterval
            positionList.push(
                new CustomerSeat(
                    i * (seatWidth + seatInterval) - total / 2 + seatInterval,
                    0,
                    false)
            )
        }
        this.customPositionList = positionList;
        console.log(this.customPositionList)
        return this.customPositionList
    }

    findFreeSeatPosition(): CustomerSeat {
        let freePositionList = this.customPositionList.filter((seat)=>!seat.taken)
        if (freePositionList.length == 0) {
            return null
        } else {
            // freePositionList[0].taken = true
            return freePositionList[0]

        }
    }

    //每8秒一位客人 客人耐心为80秒
    init(seatAmount: number, seatInterval: number, customerWaitTime) {
        this.customerWaitTime = customerWaitTime

        this.makeSeatPosition(seatAmount, seatInterval)

        this.schedule(() => {
            let seat = this.findFreeSeatPosition();
            if (seat) {
                this.createCustomer(seat)
            }
            // this.createCustomer(x, 0)
        }, 8, cc.macro.REPEAT_FOREVER, 1)

        // let seatWidth = 100
        // // let seatInterval = customerSeatInterval
        //
        // //座位大小加间隔 总宽度
        // let total = seatAmount * seatWidth + (seatAmount - 1) * seatInterval
        //
        // for (let i = 0; i < seatAmount; i++) {
        //     let x = i * (seatWidth + seatInterval) - total / 2 + seatInterval
        //     this.scheduleOnce(() => {
        //         this.createCustomer(x, 0)
        //     }, Utils.getRandomInt(3, 5))
        // }
    }

    createCustomer(seat: CustomerSeat) {
        this.customerAmount += 1
        let node: cc.Node = this.customerPool.size() > 0 ? this.customerPool.get() : cc.instantiate(this.customerPrefab)
        node.parent = this.node
        node.setPosition(cc.v2(seat.x, seat.y))
        return this.takeSeat(node.getComponent(Customer).init(this, seat))
    }

    putCustomerNodeToPool(customer: cc.Node) {
        this.customerAmount -= 1
        this.customerPool.put(customer)
    }

    //customer get 
    customerGetRandomRecipe(): RecipeData {
        return Singleton.Instance.game.customerManagerGetRandomRecipe()
    }

    customerLeave(customer: Customer, customerImpatient: boolean = false) {
        this.leaveSeat(customer)
        this.putCustomerNodeToPool(customer.node)
        Singleton.Instance.game.customerLeave(customer, customerImpatient)
    }

    takeSeat(customer: Customer) {
        customer.seat.taken = true
        return customer
    }

    leaveSeat(customer: Customer) {
        customer.seat.taken = false
        return customer
    }
}
