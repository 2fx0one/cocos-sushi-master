export default class Singleton {
    public static readonly Instance: Singleton = new Singleton();
    private constructor() {}

    public a = 'a'
}