import { UserRoles } from "./authorization";
import { IIdentity } from "./interfaces";

export interface Contact extends IIdentity {
    Name: string;
    Email: string;
    Phone: string;
};

export interface Address extends IIdentity {
    Street: string;
    City: string;
    State: string;
    Zip: string;
};

export interface AffiliationAgreement extends IIdentity {
    Active: boolean;
    Number: string;
    Date: Date;
    ExpirationDate: Date;
    File: Blob;
};

export interface Site extends IIdentity {
    PrimaryContactId: number;
    SecondaryContactId: number;
    AddressId: number;
    AffiliationAgreementId: number;

    LastContact: Date;
    Notes: string;
    Clinical: boolean;
    Community: boolean;
    Food: boolean;
    Sports: boolean;
};

export interface Semester extends IIdentity {
    Type: string & "Spring" | "Summer" | "Fall" | "Winter";
    Year: number;
    StartDate: Date;
    EndDate: Date;
};

export interface Course extends IIdentity {
    SemesterId: number;

    Number: string;
    Description: string;
};

export interface Rotation extends IIdentity {
    CourseId: number;
    SiteId: number;

    Type: string & "Clinical" | "Community" | "Food" | "Sports";
    RequiredHours: number;
    StartDate: Date;
    EndDate: Date;
};

export interface Placement extends IIdentity {
    UserId: number;
    SemesterId: number;
    RotationId: number;
};

export interface WeeklyHours extends IIdentity {
    RotationId: number;

    Submitted: boolean;
    Approved: boolean;

    WeekOf: Date;
    Sunday: number;
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
};

export interface ApplicationUser extends IIdentity {
    ContactId: number;

    Active: boolean;
    Name: string;
    Email: string;
    Phone: string;
    Role: string & "Admin" | "Preceptor" | "Student";
};

export interface StudentUser extends ApplicationUser {
    GraduationDate: Date;
};

export interface PreceptorUser extends ApplicationUser {
    SiteId: number;
};

export interface Notification extends IIdentity {
    UserId: string;

    Read: boolean;
    Priority: number;
    Message: string;
    Date: Date;
};

export interface CourseTemplateMap extends IIdentity {
    CourseId: number;
    TemplateId: number;
};

export interface FormTemplate extends IIdentity {
    Name: string;
    Data: Blob;
    LastUpdated: Date;
};

export interface FormRecord extends IIdentity {
    TemplateId: number;
    RotationId: number;

    Submitted: boolean;
    Approved: boolean;
    Data: Blob;
    LastUpdated: Date;
};