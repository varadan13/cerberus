export class ProductVariantRepository {
  localeFindByProductId(productId, languageCode) {
    return this.getProductVariantQueryBuilder(
      productId,
      languageCode
    ).getMany();
  }

  async create(product, productVariantEntity, translations) {
    for (const translation of translations) {
      await this.manager.save(translation);
    }
    productVariantEntity.product = product;
    productVariantEntity.translations = translations;
    return this.manager.save(productVariantEntity);
  }

  getProductVariantQueryBuilder(productId, languageCode) {
    const code = languageCode || LanguageCode.EN;

    return this.manager
      .createQueryBuilder(ProductVariant, "variant")
      .leftJoinAndSelect("product_variant.options", "option")
      .leftJoinAndSelect(
        "variant.translations",
        "product_variant_translation",
        "product_variant_translation.languageCode = :code"
      )
      .leftJoinAndSelect("variant.options", "variant_options")
      .leftJoinAndSelect(
        "variant_options.translations",
        "variant_options_translation",
        "variant_options_translation.languageCode = :code"
      )
      .where("variant.productId = :productId")
      .setParameters({ productId, code });
  }
}
