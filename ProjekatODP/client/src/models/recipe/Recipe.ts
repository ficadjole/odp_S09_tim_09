export type Category = 'Appetizer' | 'Main course' | 'Soup' | 'Salad' | 'Dessert' | 'Drink';
export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  authorId: string;
  createdAt: string; 
  category: Category;
}

const recipesData: Recipe[] = [
  {
    id: "1",
    title: "Chocolate Cake",
    ingredients: ["Flour", "Sugar", "Cocoa", "Eggs"],
    instructions: "Mix ingredients and bake for 30 minutes.",
    authorId: "User1",
    createdAt: "2025-08-14",
    category: "Dessert"
  },
  {
    id: "2",
    title: "Pasta Carbonara",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-08-03",
    category: "Main course"
  },
  {
    id: "3",
    title: "Pizza",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-08-23",
    category: "Main course"
  },
  {
    id: "4",
    title: "Coffe",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-05-13",
    category: "Drink"
  },
  {
    id: "5",
    title: "Fried chesse",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-04-13",
    category: "Appetizer"
  },
  {
    id: "6",
    title: "Sopska",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-09-13",
    category: "Salad"
  },
  {
    id: "7",
    title: "Chicken soup",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-07-13",
    category: "Soup"
  },
  {
    id: "8",
    title: "Pudding",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-12-13",
    category: "Dessert"
  },
  {
    id: "9",
    title: "Pickles",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-02-13",
    category: "Appetizer"
  }
];

export default recipesData;