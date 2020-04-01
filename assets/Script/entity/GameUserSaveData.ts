import GameUserSaveStageData from "./GameUserSaveStageData";

export default class GameUserSaveData {
    name: string = 'Sushi Master';
    level: number = 0; //当前天
    selectLevel: number = 1;
    gold: number = 100;

    curtainSpeed: number = 1;
    conveyorSpeed: number = 1;

    customerSeatAmount: number = 3; //顾客数量座位数量
    customerSeatInterval: number = 50; //顾客座位间隔
    customerWaitTime: number = 80; //顾客等待时间
    restaurantClosedSecond: number = 300 //餐厅倒计时300秒

    stageData: { [key: string]: GameUserSaveStageData } = {}

    constructor(name: string) {
        this.name = name;
    }

// closedCountSecond:number = 300 //倒计时300秒
}