export default class GameUserSaveStageData {
    star: number = 0
    score: number = 0
    lock: boolean = true

    constructor(score: number, lock: boolean) {
        this.score = score;
        this.lock = lock;
    }
}