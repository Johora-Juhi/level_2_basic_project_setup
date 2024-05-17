import { Schema, model, connect } from 'mongoose';


export type UserName = {
    firtName: string;
    middlename: string;
    lastName: string;
}

export type LocalGurdian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
    relation: string;
}

export type Gurdian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}
export type Student = {
    id: string;
    name: UserName;
    gender: "male" | "female",
    dateOfBirth: string;
    contactNo: string;
    emengencyContactNo: string;
    email: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    presentAddress: string;
    permanentAddress: string;
    gurdian: Gurdian,
    localGurdian: LocalGurdian,
    profileImage?: string,
    isActive: 'active' | 'blocked'
}