interface IRole {
    id: number;
    name: string;
}

class UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar?: string;
    address?: string;
    isActive?: boolean;
    role?: IRole[];


    constructor(userId: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        avatar: string,
        address: string,
        isActive: boolean,

        role: IRole[],
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.avatar = avatar;
        this.address = address;
        this.isActive = isActive;
        this.role = role;

    }

}

export default UserModel;