class ShippingMethodModel {
    shippingMethodId: number;
    name?: string;
    desc?: string;
    cost?: number;

    constructor(shippingMethodId: number, name: string,
        desc: string,
        cost: number,) {
        this.shippingMethodId = shippingMethodId;
        this.name = name;
        this.desc = desc;
        this.cost = cost;
    }
}

export default ShippingMethodModel;