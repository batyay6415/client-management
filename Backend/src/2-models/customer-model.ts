class CustomerModel {

    public customerId: number;
    public customerName: string;
    public occupation: string;
    public phone: string;
    public email: string;

    public constructor(customer: CustomerModel) {
        this.customerId = customer.customerId;
        this.customerName = customer.customerName;
        this.occupation = customer.occupation;
        this.phone = customer.phone;
        this.email = customer.email;

    }

}

export default CustomerModel;