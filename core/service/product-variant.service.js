export class ProductVariantService {
  constructor(connection) {}

  async create(product, createProductVariantDto) {
    const { sku, price, image, optionCodes, translations } =
      createProductVariantDto;
    const productVariant = new ProductVariant();
    productVariant.sku = sku;
    productVariant.price = price;
    productVariant.image = image;

    if (optionCodes && optionCodes.length) {
      const options = await this.connection.getRepository(ProductOption).find();
      const selectedOptions = options.filter((o) =>
        optionCodes.includes(o.code)
      );
      productVariant.options = selectedOptions;
    }

    const variantTranslations = [];

    for (const input of translations) {
      const { languageCode, name } = input;
      const translation = new ProductVariantTranslationEntity();
      translation.languageCode = languageCode;
      translation.name = name;
      variantTranslations.push(translation);
    }

    return this.connection
      .getCustomRepository(ProductVariantRepository)
      .create(product, productVariant, variantTranslations)
      .then((variant) => translateDeep(variant, DEFAULT_LANGUAGE_CODE));
  }
}
