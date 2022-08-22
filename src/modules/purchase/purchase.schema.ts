const purchaseSchema = {
  id: { type: "number" },
  date: { type: "string" },
  sum: { type: "number" }
  }

export const getPurchasesSchema = {
  tags: ['purchase'],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: purchaseSchema
    }
  }
}
}

export const getPurchaseSchema = {
  tags: ['purchase'],
    params: {
      id: {
        type: "number"
      }
    },
  
    response: {
      200: {
        type: "object",
        properties: purchaseSchema
      }
      }
    }
