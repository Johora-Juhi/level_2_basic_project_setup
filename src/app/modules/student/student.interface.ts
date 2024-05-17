import { Schema, model, connect } from 'mongoose';


type userName = {
    firtName: string;
    middlename: string;
    lastName: string;
}

type LocalGurdian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
    relation: string;
}

type Gurdian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}
export type Student = {
    id: string;
    name: userName;
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