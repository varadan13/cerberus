export class CustomerService {
  constructor(connection) {}

  findAll() {
    return this.connection.manager.find(Customer);
  }

  findOne(userId) {
    return this.connection.manager.findOne(Customer, userId);
  }

  findAddressesByCustomerId(customerId) {
    return this.connection
      .getRepository(Address)
      .createQueryBuilder("address")
      .where("address.customerId = :id", { id: customerId })
      .getMany();
  }
}
