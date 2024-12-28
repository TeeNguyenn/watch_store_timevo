class PaymentMethodModel {
    paymentMethodId: number;
    name?: string;
    desc?: string;
    cost?: number;

    constructor(paymentMethodId: number, name: string,
        desc: string,
        cost: number,) {
        this.paymentMethodId = paymentMethodId;
        this.name = name;
        this.desc = desc;
        this.cost = cost;
    }
}

export default PaymentMethodModel;