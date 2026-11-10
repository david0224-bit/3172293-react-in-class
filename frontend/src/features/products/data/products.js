import Cafe from "@/assets/images/cafe-americano.png";
import TortaChocolate from "@/assets/images/tortadeChocolate.png";
import Capuccino from "@/assets/images/capucchino.png";
import Croissant from "@/assets/images/criossant.png";

export const products = [
  {
    id: 1,
    title: "Café Americano",
    price: 3500,
    description: "Café negro preparado con granos 100% colombianos.",
    image: Cafe,
    category: "bebidas"
  },
  {
    id: 2,
    title: "Torta de Chocolate",
    price: 8500,
    description: "Porción de torta de chocolate con cobertura de cacao.",
    image: TortaChocolate,
    category: "postres"
  },
  {
    id: 3,
    title: "Capuccino",
    price: 7000,
    description: "Café espresso con leche vaporizada y espuma cremosa.",
    image: Capuccino,
    category: "bebidas"
  },
  {
    id: 4,
    title: "Croissant de Jamón y Queso",
    price: 9000,
    description: "Croissant horneado relleno de jamón y queso mozzarella.",
    image: Croissant,
    category: "panadería"
  }
];
