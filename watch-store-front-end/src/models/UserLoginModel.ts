class UserLoginModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address?: string;


    constructor(userId: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        address: string,
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;

    }

}

export default UserLoginModel;