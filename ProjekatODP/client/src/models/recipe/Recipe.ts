export type Category = 'Appetizer' | 'Main course' | 'Soup' | 'Salad' | 'Dessert' | 'Drink';
export const categories: Category[] = ['Appetizer', 'Main course', 'Soup', 'Salad', 'Dessert', 'Drink'];

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  authorId: string;
  createdAt: string; 
  category: Category;
  saveti: string;
}

const recipesData: Recipe[] = [
  {
    id: "1",
    title: "Chocolate Cake",
    ingredients: ["2 cups flour", "200g sugar", "1 tbsp cocoa", "Eggs"],
    instructions: "Mix ingredients and bake for 30 minutes.",
    authorId: "User1",
    createdAt: "2025-08-14",
    saveti: "Neki savet",
    category: "Dessert"
  },
  {
    id: "2",
    title: "Pasta Carbonara",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-08-03",
        saveti: "Neki savet",

    category: "Main course"
  },
  {
    id: "3",
    title: "Pizza",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-08-23",
        saveti: "Neki savet",

    category: "Main course"
  },
  {
    id: "4",
    title: "Coffe",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-05-13",
        saveti: "Neki savet",

    category: "Drink"
  },
  {
    id: "5",
    title: "Fried chesse",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2025-04-13",
        saveti: "Neki savet",

    category: "Appetizer"
  },
  {
    id: "6",
    title: "Sopska",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-09-13",
        saveti: "Neki savet",

    category: "Salad"
  },
  {
    id: "7",
    title: "Chicken soup",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-07-13",
        saveti: "Neki savet",

    category: "Soup"
  },
  {
    id: "8",
    title: "Pudding",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-12-13",
        saveti: "Neki savet",

    category: "Dessert"
  },
  {
    id: "9",
    title: "Pickles",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan"],
    instructions: "Cook pasta, fry bacon, mix with eggs and cheese.",
    authorId: "User2",
    createdAt: "2024-02-13",
        saveti: "Neki savet",

    category: "Appetizer"
  }
];

export default recipesData;