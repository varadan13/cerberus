export class ProductResolver {
  constructor(productService, productVariantService) {}

  // query products
  products(obj, args) {
    return this.productService.findAll(args.lang);
  }

  // query product
  product(obj, args) {
    return this.productService.findOne(args.id, args.lang);
  }

  // createProduct mutation
  async createProduct(_, args) {
    const { input } = args;
    const product = await this.productService.create(input);

    if (input.variants && input.variants.length) {
      for (const variant of input.variants) {
        await this.productVariantService.create(product, variant);
      }
    }

    return product;
  }

  // updateProduct mutation
  updateProduct(_, args) {
    const { productId, input } = args;
    return this.productService.update(input);
  }
}
