"use strict";

/**
 *  product-category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::product-category.product-category",
  {
    async findOne(ctx) {
      try {
        const { id: medusaId } = ctx.params;
        const productCategory = await strapi.db
          .query("api::product-category.product-category")
          .findOne({
            where: { medusa_id: medusaId },
          });
        if (productCategory && productCategory.id) {
          return (ctx.body = { productCategory });
        }
        return ctx.notFound(ctx);
      } catch (e) {
        return ctx.internalServerError(ctx);
      }
    },
    async create(ctx) {
      try {
        console.log(ctx);
        let categoryBody = ctx.request.body;
        if (!categoryBody.medusa_id) {
          categoryBody.medusa_id = categoryBody.id;
          delete categoryBody.id;
        }

        let parentCategory = categoryBody.parent_category;
        if (parentCategory && !parentCategory.medusa_id) {
          parentCategory.medusa_id = parentCategory.id;
          delete parentCategory.id;
          const parentId = await strapi.db
            .query("api::product-category.product-category")
            .findOne({
              where: { medusa_id: parentCategory.medusa_id },
            });
          if (parentId) {
            parentCategory.id = parentId.id
          } else {
            return ctx.notFound(ctx);
          }
        }
        const create = await strapi.entityService.create(
          "api::product-category.product-category",
          { data: categoryBody }
        );

        if (create) {
          return (ctx.body = { id: create });
        }
        return ctx.badRequest(ctx);
      } catch (e) {
        console.log(e);
        return ctx.internalServerError(ctx);
      }
    },
    async update(ctx) {
      try {
        const { id: medusaId } = ctx.params;
        let categoryBody = ctx.request.body;
        if (!categoryBody.medusa_id) {
          categoryBody.medusa_id = categoryBody.id;
          delete categoryBody.id;
        }

        let parentCategory = categoryBody.parent_category;
        if (parentCategory && !parentCategory.medusa_id) {
          parentCategory.medusa_id = parentCategory.id;
          delete parentCategory.id;
          const parentId = await strapi.db
            .query("api::product-category.product-category")
            .findOne({
              where: { medusa_id: parentCategory.medusa_id },
            });
          if (parentId) {
            parentCategory.id = parentId.id
          } else {
            return ctx.notFound(ctx);
          }
        }

        const found = await strapi.db
          .query("api::product-category.product-category")
          .findOne({
            where: { medusa_id: medusaId },
          });

        if (found) {
          const update = await strapi.entityService.update(
            "api::product-category.product-category",
            found.id,
            { data: categoryBody }
          );
          if (update) {
            return (ctx.body = { id: update });
          } else {
            return ctx.internalServerError(ctx);
          }
        }

        const create = await strapi.entityService.create(
          "api::product-category.product-category",
          { data: categoryBody }
        );
        if (create) {
          return (ctx.body = { id: create });
        }

        return ctx.notFound(ctx);
      } catch (e) {
        return ctx.internalServerError(ctx);
      }
    },
    async delete(ctx) {
      try {
        const { id: medusaId } = ctx.params;
        const category = await strapi.db
          .query("api::product-category.product-category")
          .findOne({ where: { medusa_id: medusaId } });
        if (category) {
          await strapi.db
            .query("api::product-category.product-category")
            .delete({
              where: { medusa_id: medusaId },
            });
          return (ctx.body = {
            id: category.id,
          });
        }
        return ctx.notFound(ctx);
      } catch (e) {
        console.log("Error occurred while trying to delete product variant");
        return ctx.internalServerError(ctx);
      }
    },
  }
);
