var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var restaurants = [
    {
      id: 1,
      name: "WoodsHill ",
      description:
        "American cuisine, farm to table, with fresh produce every day",
      dishes: [
        {
          name: "Swordfish grill",
          price: 27,
        },
        {
          name: "Roasted Broccily ",
          price: 11,
        },
      ],
    },
    {
      id: 2,
      name: "Fiorellas",
      description:
        "Italian-American home cooked food with fresh pasta and sauces",
      dishes: [
        {
          name: "Flatbread",
          price: 14,
        },
        {
          name: "Carbonara",
          price: 18,
        },
        {
          name: "Spaghetti",
          price: 19,
        },
      ],
    },
    {
      id: 3,
      name: "Karma",
      description:
        "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
      dishes: [
        {
          name: "Dragon Roll",
          price: 12,
        },
        {
          name: "Pancake roll ",
          price: 11,
        },
        {
          name: "Cod cakes",
          price: 13,
        },
      ],
    },
  ];
  var schema = buildSchema(`
  type Query{
    restaurant(id: Int): restaurant
    restaurants: [restaurant]
  },
  type restaurant {
    id: Int
    name: String
    description: String
    dishes:[Dish]
  }
  type Dish{
    name: String
    price: Int
  }
  input restaurantInput{
    name: String
    description: String
  }
  type DeleteResponse{
    ok: Boolean!
  }
  type Mutation{
    setrestaurant(input: restaurantInput): restaurant
    deleterestaurant(id: Int!): DeleteResponse
    editrestaurant(id: Int!, name: String!): restaurant
  }
  `);
  // The root provides a resolver function for each API endpoint
  
  var root = {
    restaurant: (arg) => restaurants [arg.id],
    restaurants : () => restaurants,
    setrestaurant : ({input}) => {
      restaurants.push ({name: input.name, email:input.email, age: input.age});
      return input;
      
    },
    
   
    deleterestaurant: ({ id }) => {
      const ok = Boolean(restaurants[id]);
      let del = restaurants[id];
      restaurants = restaurants.filter((item) => item.id !== id);
      return {ok};
      
    },
    editrestaurant: ({ id, ...restaurant }) => {
      if (!restaurants[id]) {
        throw new error ("restaurant does not exist");
      }
      restaurants[id] = {
        ...restaurants[id],
        ...restaurant,
      };
      return restaurants[id];
      
    },
  };
  var app = express();
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');