class ProductRepository extends Repository {
  /**
   * Returns an array of Products including ProductVariants, translated into the
   * specified language.
   */
  localeFind(languageCode) {
    return this.getProductQueryBuilder(languageCode)
      .getMany()
      .then((result) => this.translateProductAndVariants(result));
  }

  /**
   * Returns single Product including ProductVariants, translated into the
   * specified language.
   */
  localeFindOne(id, languageCode) {
    return this.getProductQueryBuilder(languageCode)
      .andWhere("ProductEntity.id = :id", { id })
      .getMany()
      .then((result) => this.translateProductAndVariants(result))
      .then((res) => res[0]);
  }

  getProductQueryBuilder(languageCode) {
    const code = languageCode || "en";

    return this.manager
      .createQueryBuilder(ProductEntity, "product")
      .leftJoinAndSelect("product.variants", "variant")
      .leftJoinAndSelect("product.translations", "product_translation")
      .leftJoinAndSelect("variant.translations", "product_variant_translation")
      .where("product_translation.languageCode = :code", { code })
      .andWhere("product_variant_translation.languageCode = :code", { code });
  }

  translateProductAndVariants(result) {
    return result.map((productEntity) => {
      const product = translate(productEntity);
      product.variants = product.variants.map((variant) => translate(variant));
      return product;
    });
  }
}
