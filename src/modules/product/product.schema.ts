const productSchema = {
  id: { type: "number" },
  name: { type: "string" },
  description: { type: "string" },
  price: { type: "number" },
  stockState: { type: "number" },
  warehouseState: { type: "number" }
  }

export const getProductsSchema = {
  tags: ['product'],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: productSchema
    }
  }
}
}

export const getProductSchema = {
  tags: ['product'],
    params: {
      id: {
        type: "number"
      }
    },
  
    response: {
      200: {
        type: "object",
        properties: productSchema
      }
      }
    }
