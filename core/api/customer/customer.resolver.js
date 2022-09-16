class CustomerResolver {
  constructor(customerService) {}

  customers() {
    return this.customerService.findAll();
  }

  customer(obj, args) {
    return this.customerService.findOne(args.id);
  }

  addresses(customer) {
    return this.customerService.findAddressesByCustomerId(customer.id);
  }
}
