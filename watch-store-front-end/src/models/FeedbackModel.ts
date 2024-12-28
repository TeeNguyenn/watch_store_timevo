class FeedbackModel {
    feedbackId: number;
    productId: number;
    rate?: number;
    comment?: string;
    firstName?: string;
    lastName?: string;
    createAt?: string;
    updateAt?: string;



    constructor(feedbackId: number,
        productId: number,

        rate: number,
        comment: string,
        firstName: string,
        lastName: string,
        createAt: string,
        updateAt: string,

    ) {
        this.feedbackId = feedbackId;
        this.productId = productId;
        this.rate = rate;
        this.comment = comment;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createAt = createAt;
        this.updateAt = updateAt;

    }

}

export default FeedbackModel;