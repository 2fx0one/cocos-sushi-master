
export default class Recipe {

    sushiId: string = null
    sushiName: string = null
    picPath: string = null

    //foodId List 
    inputFoodId: string[] = null 
    
    //sushiId List
    outputPicPathList: string[] = null

    constructor(sushiName: string, picPath: string, inputFoodId: string[], outputPicPathList: string[]) {
        this.sushiName = sushiName
        this.picPath = picPath
        this.inputFoodId = inputFoodId
        this.outputPicPathList = outputPicPathList
        
        this.sushiId = inputFoodId.concat().sort().join('_') //保证原始数组顺序
        return this
    }
}