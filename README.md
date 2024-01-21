# strapi-medusa-template

for Strapi v4

npx create-strapi-app strapi-medusa --template https://github.com/xyzones/strapi-medusa-template

## 21/01/2024 Added Product Category 

| Fields          | Medusa-Strapi      | Strapi-Medusa      |
| :-------------- | ------------------ | ------------------ |
| name            | :white_check_mark: | :x: <sup>1</sup>   |
| description     | :white_check_mark: | :x: <sup>1</sup>   |
| handle          | :white_check_mark: | :x: <sup>1</sup>   |
| metadata        | :x: <sup>1</sup>   | :x: <sup>1</sup>   |
| parent_category | :white_check_mark: | :x: <sup>1</sup>   |
| **Action**      | **Medusa-Strapi**  | **Strapi-Medusa**  |
| Create          | :white_check_mark: | :x: <sup>1</sup>   |
| Update          | :white_check_mark: | :white_check_mark: |
| Delete          | :white_check_mark: | :x: <sup>1</sup>   |

 <sup>1 not implemented in  `medusa-plugin-strapi`</sup>