export interface UserData {
    accessToken: string | null,
    uid: number | null,
    id_no: string | null,
    emp_name: string | null;
    emp_surname: string | null;
    role: string | null;
    organisation: Organisation,
    branch: Branch
};

export interface Organisation {
    uid: number,
    name: string,
    description: string,
    email: string,
    phone: string,
    website: string,
    logo: string,
    active: boolean,
    isDeleted: boolean
};

export interface Branch {
    uid: number,
    name: string,
    address: string,
    contactNumber: string,
    email: string,
    active: boolean,
    managerName: string,
    operatingHours: {
        days: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        closing: string,
        opening: string
    },
    isDeleted: boolean
};