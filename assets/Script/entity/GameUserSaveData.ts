import GameUserSaveStageData from "./GameUserSaveStageData";

export default class GameUserSaveData {
    name: string = 'Sushi Master';
    level: string= '1';
    selectLevel:string = '1';
    gold: number = 100;

    curtainSpeed: number = 1;
    conveyorSpeed: number = 1;
    customerSeatAmount: number = 3;

    stageData: { [key: string]: GameUserSaveStageData } = {}

    constructor(name: string) {
        this.name = name;
    }

// closedCountSecond:number = 300 //倒计时300秒
}