import Customer from "../Customer";

export default class CustomerSeat {
    // x: number = null;
    // y: number = null;
    // taken: boolean = false;
    position: cc.Vec2;
    customer: Customer = null;


    constructor(position: cc.Vec2) {
        this.position = position;
        // this.y = y;
        // this.taken = taken;
    }
    //
    // take(customer: Customer) {
    //     this.customer = customer;
    //     customer.seat = this
    // }
    //
    // leave() {
    //     this.customer.seat = null;
    //     this.customer = null;
    // }
}