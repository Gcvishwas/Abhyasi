import { FieldValue, Timestamp } from "firebase/firestore";

export interface User {
    id: string;
    name: string;
    email: string;
    imageURL: string;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
}

export interface Interview {
    id: string;     // unique identifier for the interview
    position: string; // job position for the interview
    description: string; // description of the interview
    experience: number; // years of experience required
    userId: string; // ID of the user who created the interview
    techStack: string;
    questions: { question: string, answer: string }[]; // array of questions and answers
    createdAt: Timestamp; // timestamp of when the interview was created
    updatedAt: Timestamp; // timestamp of when the interview was last updated
}