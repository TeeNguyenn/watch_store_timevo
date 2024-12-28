class UserDTO {
    first_name: string;
    last_name: string;
    full_name?: string;
    email: string;
    phone_number: string;
    password: string;
    retype_password: string;
    role_ids: number[];


    constructor(
        first_name: string,
        last_name: string,
        full_name: string,
        email: string,
        phone_number: string,
        password: string,
        retype_password: string,
        role_ids: number[],
    ) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.full_name = full_name;
        this.email = email;
        this.phone_number = phone_number;
        this.password = password;
        this.retype_password = retype_password;
        this.role_ids = role_ids;

    }

}

export default UserDTO;