export default class CustomerSeat {
    x: number = null;
    y: number = null;
    taken: boolean = false;


    constructor(x: number, y: number, taken: boolean) {
        this.x = x;
        this.y = y;
        this.taken = taken;
    }
}