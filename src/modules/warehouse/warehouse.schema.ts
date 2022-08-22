const warehouseSchema = {
    id: { type: "number"},
    name: { type: "string" },
    location: { type: "string" }
  }

export const getWarehousesSchema = {
  tags: ["warehouse"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: warehouseSchema
    }
  }
}
}

export const getWarehouseSchema = {
  tags: ["warehouse"],
    params: {
      id: {
        type: "number"
      }
    },
  
    response: {
      200: {
        type: "object",
        properties: warehouseSchema
      }
      }
    }


export const postWarehouseSchema = {
  tags: ["warehouse"],
    body: {
      type: 'object',
      required: ['name',
        'location'
      ],
      properties: {
        name: { type: "string" },
        location: { type: "string" }
      }
    },
    response: {
      200: {
        type: "string"
      }
    }
}

export const deleteWarehouseSchema = {
  tags: ["warehouse"],
  params: {
    id: {
      type: "number"
    }
  },
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    }
}

export const putWarehouseSchema = {
  tags: ["warehouse"],
  params: {
    id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: "string" },
      location: { type: "string" }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    }
}}

export const addWorkerSchema = {
  tags: ["warehouse"],
  params: {
    warehouse_id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      worker_id: {
        type: "number"
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {type: 'string'}
      }
    }
  }
}

export const addProductSchema = {
  tags: ["warehouse"],
  params: {
    warehouse_id: {
      type: "number"
    }
  },
  body: {
    type: 'object',
    properties: {
      product_id: {
        type: "number"
      },
      amount: {
        type: "number"
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {type: 'string'}
      }
    }
  }
}