export interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  shortDescription: string;
}

const blogsData: Blog[] = [
  {
    id: "1",
    title: "Top 10 Summer Salads",
    content: "Ove sezone probajte najukusnije i najosvežavajuće salate...",
    authorId: "User1",
    createdAt: "2025-08-10",
    shortDescription: "malo neki opis"
  },
  {
    id: "2",
    title: "Baking Bread at Home",
    content: "Naučite kako da napravite savršeni domaći hleb u 5 koraka...",
    authorId: "User2",
    createdAt: "2025-08-08",
    shortDescription: "malo neki opis"
  },
  {
    id: "3",
    title: "Healthy Smoothie Recipes",
    content: "Pune vitamina i energije, ove smoothie kombinacije su idealne za doručak...",
    authorId: "User3",
    createdAt: "2025-08-05",
    shortDescription: "malo neki opis"
  },
  {
    id: "4",
    title: "Mastering Pasta Dishes",
    content: "Od klasične carbonare do modernih fusilli recepata – sve što treba da znate...",
    authorId: "User4",
    createdAt: "2025-08-02",
    shortDescription: "malo neki opis"
  },
  {
    id: "5",
    title: "Decadent Chocolate Desserts",
    content: "Slatki užitak za ljubitelje čokolade – recepti koji se jednostavno prave kod kuće...",
    authorId: "User5",
    createdAt: "2025-07-30",
    shortDescription: "malo neki opis"
  }
];

export default blogsData;