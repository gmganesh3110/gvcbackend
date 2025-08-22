export class CreateExpensepoDto {
    billNo:string;  
    totalAmount:number;
    date: Date;
    expenseItems: ExpensePoItemsDto[];
    paymentMethod: string;
    createdBy: number;
}

export class ExpensePoItemsDto {
    item: number;
    qty: number;
    price: number;
    amount:number;
}

export class GetAllExpensePosData {
    id: number;
    billNo:string;  
    totalAmount:number;
    fromDate: Date;
    toDate: Date;
    start: number;
    limit: number;
}


export class GetOneExpensePosData {
    id: number;
}

export class DeleteExpenseDto {
    id: number;
    updatedBy: number;
}