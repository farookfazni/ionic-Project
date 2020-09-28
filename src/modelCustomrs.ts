export interface Entry {
    id: string;
    Customer_name: string;
    Contact_no: number;
    Address: string;
    Email: string;
}

export function toEntry(doc: firebase.firestore.DocumentSnapshot): Entry {
    return {id: doc.id, ...doc.data() as Entry };
}