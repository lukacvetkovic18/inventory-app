export const oas = {
  routePrefix: '/documentation',
  swagger: {
      info: {
          title: 'App for Beyondi task',
          description: 'Test app',
          version: '0.0.1',
      },

      servers: [
          { url: "http://localhost:3100", description: "Local" },
      ],

      externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      security: [{ BearerAuth: [], BasicAuth: [] }],
      components: {
          securitySchemes: {
              BearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
              },
              BasicAuth: {
                  type: 'http',
                  scheme: 'basic',
              },
          },
      },
      tags: [
         
      ]
  },

  exposeRoute: true
}
