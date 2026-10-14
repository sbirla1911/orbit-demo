// Fake data for the Orbit demo. Everything here is made up.

var INTERESTS = [
  { id: "climbing", label: "Climbing", emoji: "🧗" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "hiking", label: "Hiking", emoji: "🥾" },
  { id: "music", label: "Live music", emoji: "🎸" },
  { id: "food", label: "Food spots", emoji: "🍜" },
  { id: "film", label: "Movies", emoji: "🎬" },
  { id: "games", label: "Board games", emoji: "🎲" },
  { id: "running", label: "Running", emoji: "🏃" },
  { id: "art", label: "Art & museums", emoji: "🎨" },
  { id: "cooking", label: "Cooking", emoji: "🍳" },
  { id: "soccer", label: "Soccer", emoji: "⚽" },
  { id: "karaoke", label: "Karaoke", emoji: "🎤" }
];

var CAMPUSES = {
  campus: ["Penn"],
  inter: ["Penn", "Drexel", "Temple"],
  city: ["Penn", "Drexel", "Temple", "Jefferson", "Saint Joseph's"]
};

var POOL_SIZE = { campus: 4812, inter: 15930, city: 38240 };

// When the user is free (from "synced" calendar)
var MY_FREE = ["Thu 7pm", "Sat 2pm", "Sun 11am"];

// One activity per interest: where Orbit would book
var ACTIVITIES = {
  climbing: { title: "Bouldering session", venue: "Granite Lab Climbing", price: 18 },
  coffee: { title: "Coffee crawl", venue: "3 cafés on Walnut St", price: 12 },
  hiking: { title: "Sunrise ridge hike", venue: "Wissahickon trailhead", price: 0 },
  music: { title: "Indie night", venue: "The Paper Moon", price: 22 },
  food: { title: "Dumpling tasting", venue: "Golden Steam House", price: 16 },
  film: { title: "Late movie + popcorn", venue: "Regent Cinema", price: 11 },
  games: { title: "Board game night", venue: "Dice & Dough Café", price: 8 },
  running: { title: "River loop 5K", venue: "Schuylkill River Trail", price: 0 },
  art: { title: "Free museum night", venue: "Modern Art Hall", price: 0 },
  cooking: { title: "Pasta-making class", venue: "Little Kitchen Studio", price: 35 },
  soccer: { title: "Pickup 5-a-side", venue: "Penn Park turf", price: 5 },
  karaoke: { title: "Private karaoke room", venue: "Echo Box", price: 15 }
};

var STUDENTS = [
  { name: "Jay Park", age: 20, campus: "Penn", major: "CS", interests: ["climbing", "games", "coffee"], budget: 25, free: ["Sat 2pm", "Thu 7pm"], color: "#FF8A65" },
  { name: "Priya Shah", age: 21, campus: "Penn", major: "Biology", interests: ["climbing", "hiking", "food"], budget: 30, free: ["Sat 2pm", "Sun 11am"], color: "#4FC3F7" },
  { name: "Marcus Lee", age: 19, campus: "Penn", major: "Economics", interests: ["soccer", "running", "games"], budget: 15, free: ["Thu 7pm", "Sun 11am"], color: "#81C784" },
  { name: "Sofia Ramos", age: 22, campus: "Drexel", major: "Film", interests: ["film", "music", "art"], budget: 25, free: ["Thu 7pm", "Sat 2pm"], color: "#BA68C8" },
  { name: "Aiden Brooks", age: 24, campus: "Penn", major: "MBA", interests: ["coffee", "food", "running"], budget: 40, free: ["Sun 11am", "Thu 7pm"], color: "#FFB74D" },
  { name: "Leila Haddad", age: 20, campus: "Temple", major: "Design", interests: ["art", "coffee", "film"], budget: 20, free: ["Sat 2pm", "Sun 11am"], color: "#F06292" },
  { name: "Noah Kim", age: 18, campus: "Penn", major: "Undeclared", interests: ["games", "karaoke", "food"], budget: 15, free: ["Thu 7pm", "Sat 2pm"], color: "#7986CB" },
  { name: "Emma Wright", age: 23, campus: "Penn", major: "Public Health", interests: ["hiking", "running", "cooking"], budget: 35, free: ["Sun 11am", "Sat 2pm"], color: "#4DB6AC" },
  { name: "Diego Alvarez", age: 21, campus: "Drexel", major: "Music", interests: ["music", "karaoke", "soccer"], budget: 25, free: ["Thu 7pm", "Sat 2pm"], color: "#E57373" },
  { name: "Hana Sato", age: 20, campus: "Penn", major: "Architecture", interests: ["art", "climbing", "coffee"], budget: 20, free: ["Sat 2pm", "Thu 7pm"], color: "#9575CD" },
  { name: "Omar Farouk", age: 27, campus: "Penn", major: "PhD Physics", interests: ["games", "hiking", "cooking"], budget: 30, free: ["Sun 11am", "Thu 7pm"], color: "#64B5F6" },
  { name: "Chloe Martin", age: 19, campus: "Temple", major: "Mech Eng", interests: ["soccer", "climbing", "karaoke"], budget: 20, free: ["Sat 2pm", "Sun 11am"], color: "#AED581" },
  { name: "Ravi Menon", age: 25, campus: "Penn", major: "Data Science MS", interests: ["food", "cooking", "film"], budget: 40, free: ["Thu 7pm", "Sun 11am"], color: "#FFD54F" },
  { name: "Grace Okafor", age: 22, campus: "Drexel", major: "Nursing", interests: ["running", "music", "food"], budget: 25, free: ["Sun 11am", "Sat 2pm"], color: "#4DD0E1" },
  { name: "Ben Carter", age: 20, campus: "Penn", major: "History", interests: ["film", "games", "coffee"], budget: 15, free: ["Thu 7pm", "Sat 2pm"], color: "#A1887F" },
  { name: "Mia Rossi", age: 21, campus: "Jefferson", major: "Painting", interests: ["art", "karaoke", "cooking"], budget: 30, free: ["Sat 2pm", "Thu 7pm"], color: "#F48FB1" },
  { name: "Lucas Nguyen", age: 23, campus: "Temple", major: "Robotics", interests: ["climbing", "running", "games"], budget: 25, free: ["Sun 11am", "Sat 2pm"], color: "#90A4AE" },
  { name: "Zara Ahmed", age: 19, campus: "Penn", major: "Psychology", interests: ["music", "coffee", "hiking"], budget: 20, free: ["Thu 7pm", "Sun 11am"], color: "#CE93D8" },
  { name: "Ethan Cole", age: 26, campus: "Saint Joseph's", major: "JD", interests: ["soccer", "food", "film"], budget: 45, free: ["Sat 2pm", "Thu 7pm"], color: "#80CBC4" },
  { name: "Ana Lima", age: 22, campus: "Penn", major: "Linguistics", interests: ["cooking", "karaoke", "art"], budget: 25, free: ["Sun 11am", "Sat 2pm"], color: "#FFAB91" },
  { name: "Theo Grant", age: 30, campus: "Penn", major: "PhD Chemistry", interests: ["hiking", "coffee", "music"], budget: 30, free: ["Sat 2pm", "Sun 11am"], color: "#9FA8DA" },
  { name: "Isla Murphy", age: 20, campus: "Drexel", major: "Marketing", interests: ["karaoke", "food", "coffee"], budget: 20, free: ["Thu 7pm", "Sat 2pm"], color: "#EF9A9A" },
  { name: "Kai Tanaka", age: 21, campus: "Penn", major: "Math", interests: ["games", "climbing", "film"], budget: 15, free: ["Thu 7pm", "Sun 11am"], color: "#A5D6A7" },
  { name: "Nadia Petrova", age: 24, campus: "Temple", major: "AI MS", interests: ["running", "art", "cooking"], budget: 35, free: ["Sun 11am", "Thu 7pm"], color: "#B39DDB" }
];
