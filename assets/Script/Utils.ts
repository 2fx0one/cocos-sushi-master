
export default class Utils {
    public static getRandomInt(min: number, max: number) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    }

    // public loadResouces(path, callback: (err:any, spriteFrame: cc.SpriteFrame)=>void) {
    //     cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
    //         callback(err, spriteFrame)
    //     })
    // }
}