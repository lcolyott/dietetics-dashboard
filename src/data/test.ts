import moment from "moment";
import { Address, ApplicationUser, Contact, Course, Placement, Rotation, Semester, Site } from "./models";

export const testContacts: Contact[] = [
    {
        Id: 0,
        Name: "John Doe",
        Email: "JohnDoe@email.com",
        Phone: "x-xxx-xxx-xxxx"
    },
    {
        Id: 1,
        Name: "Jill Doe",
        Email: "JillDoe@email.com",
        Phone: "x-xxx-xxx-xxxx"
    },
    {
        Id: 2,
        Name: "Ron Swanson",
        Email: "RonSwanson@email.com",
        Phone: "x-xxx-xxx-xxxx"
    },
    {
        Id: 3,
        Name: "Primary Site Contact",
        Email: "PrimarySC@email.com",
        Phone: "x-xxx-xxx-xxxx"
    },
    {
        Id: 4,
        Name: "Secondary Site Contact",
        Email: "SecondarySC@email.com",
        Phone: "x-xxx-xxx-xxxx"
    },
];

export const testAddresses: Address[] = [
    {
        Id: 0,
        Street: "xxx Street Rd.",
        City: "City",
        State: "ST",
        Zip: "xxxxx"
    },
];

export const testSites: Site[] = [
    {
        Id: 0,
        PrimaryContactId: 3,
        SecondaryContactId: 4,
        AddressId: 0,
        AffiliationAgreementId: -1,

        LastContact: new Date(),
        Notes: "This is a site note",
        Clinical: true,
        Community: true,
        Food: true,
        Sports: true
    }
];

export const testSemesters: Semester[] = [
    {
        Id: 0,
        Type: "Spring",
        Year: new Date(2021).getFullYear(),
        StartDate: new Date(2021),
        EndDate: moment(new Date(2021)).add(4, "M").toDate(),
    }
];

export const testCourses: Course[] = [
    {
        Id: 0,
        SemesterId: 0,
        Number: "Nutrition-001",
        Description: "Community"
    },
    {
        Id: 1,
        SemesterId: 0,
        Number: "Nutrition-002",
        Description: "Clinical"
    },
    {
        Id: 2,
        SemesterId: 0,
        Number: "Nutrition-003",
        Description: "Food"
    },
    {
        Id: 3,
        SemesterId: 0,
        Number: "Nutrition-004",
        Description: "Sports"
    },
];

export const testRotations: Rotation[] = [
    {
        Id: 0,
        CourseId: 0,
        SiteId: 0,
        Type: "Community",
        RequiredHours: 72,
        StartDate: new Date(2021),
        EndDate: moment(new Date(2021)).add(2, "M").toDate()
    },
    {
        Id: 0,
        CourseId: 0,
        SiteId: 0,
        Type: "Clinical",
        RequiredHours: 128,
        StartDate: new Date(2021),
        EndDate: moment(new Date(2021)).add(3, "M").toDate()
    },
    {
        Id: 0,
        CourseId: 0,
        SiteId: 0,
        Type: "Food",
        RequiredHours: 56,
        StartDate: new Date(2021),
        EndDate: moment(new Date(2021)).add(1, "M").toDate()
    },
    {
        Id: 0,
        CourseId: 0,
        SiteId: 0,
        Type: "Sports",
        RequiredHours: 56,
        StartDate: new Date(2021),
        EndDate: moment(new Date(2021)).add(1, "M").toDate()
    },
];

export const testUsers: ApplicationUser[] = [
    {
        Id: 0,
        ContactId: 0,
        Active: true,
        Name: "John Doe",
        Email: "JohnDoe@email.com",
        Phone: "x-xxx-xxx-xxxx",
        Role: "Student"
    },
    {
        Id: 1,
        ContactId: 1,
        Active: true,
        Name: "Jill Doe",
        Email: "JillDoe@email.com",
        Phone: "x-xxx-xxx-xxxx",
        Role: "Preceptor"
    },
    {
        Id: 2,
        ContactId: 2,
        Active: true,
        Name: "Ron Swanson",
        Email: "RonSwanson@email.com",
        Phone: "x-xxx-xxx-xxxx",
        Role: "Admin"
    },
];

export const testPlacements: Placement[] = [
    {
        Id: 0,
        UserId: 0,
        SemesterId: 0,
        RotationId: 0,
    },
    {
        Id: 1,
        UserId: 1,
        SemesterId: 0,
        RotationId: 0,
    },
    {
        Id: 0,
        UserId: 0,
        SemesterId: 0,
        RotationId: 1,
    },
    {
        Id: 1,
        UserId: 1,
        SemesterId: 0,
        RotationId: 1,
    },
    {
        Id: 0,
        UserId: 0,
        SemesterId: 0,
        RotationId: 2,
    },
    {
        Id: 1,
        UserId: 1,
        SemesterId: 0,
        RotationId: 2,
    },
    {
        Id: 0,
        UserId: 0,
        SemesterId: 0,
        RotationId: 3,
    },
    {
        Id: 1,
        UserId: 1,
        SemesterId: 0,
        RotationId: 3,
    },
];