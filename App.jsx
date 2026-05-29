import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChefHat, Clock, Flame, Leaf, X, Utensils, Hand, Star, LockKeyhole, UnlockKeyhole } from "lucide-react";

const pizzas = [
  {
    id: 1,
    name: "Margherita Napoletana",
    label: "Classic Italian",
    line: "Tomato, mozzarella, basil — nothing more, nothing less.",
    time: "12 min",
    heat: "Mild",
    palette: "from-amber-300/70 via-orange-400/35 to-emerald-500/18",
    bg: "from-[#2a160d] via-[#1a100b] to-[#0f1a12]",
    sauce: "#d9482f",
    cheese: "#fff2c7",
    herb: "#15803d",
    topping: "#f9fafb",
    accent: "text-amber-100",
    ingredients: ["250 g pizza dough", "San Marzano tomato sauce", "Fior di latte or fresh mozzarella", "Fresh basil", "Extra virgin olive oil", "Sea salt"],
    steps: ["Stretch the dough and leave a soft raised edge.", "Spread a light layer of tomato sauce.", "Add torn mozzarella pieces.", "Bake hot until the crust is blistered.", "Finish with basil and olive oil."],
    chef: "The premium look comes from restraint. Keep it clean and let the ingredients breathe."
  },
  {
    id: 2,
    name: "Pepperoni Hot Honey",
    label: "Sweet Heat",
    line: "Crispy pepperoni, melted cheese and warm spicy honey.",
    time: "14 min",
    heat: "Spicy",
    palette: "from-orange-400/70 via-amber-300/32 to-red-500/22",
    bg: "from-[#2b170b] via-[#1b1009] to-[#1c0b07]",
    sauce: "#c2410c",
    cheese: "#ffe9a3",
    herb: "#84cc16",
    topping: "#991b1b",
    accent: "text-orange-100",
    ingredients: ["250 g pizza dough", "Tomato sauce", "Mozzarella", "Pepperoni", "Hot honey", "Chili flakes", "Oregano"],
    steps: ["Spread tomato sauce thinly.", "Add mozzarella and pepperoni.", "Bake until pepperoni curls and crisps.", "Drizzle hot honey after baking.", "Finish with oregano and chili flakes."],
    chef: "Hot honey goes on after the oven. That keeps the flavor glossy, warm and sharp."
  },
  {
    id: 3,
    name: "Quattro Formaggi",
    label: "Cheese Lover",
    line: "Four cheeses melting into one rich, creamy bite.",
    time: "13 min",
    heat: "Mild",
    palette: "from-yellow-200/62 via-amber-400/34 to-[#7c4a1d]/22",
    bg: "from-[#2a1a0b] via-[#1b1209] to-[#130d08]",
    sauce: "#fcd34d",
    cheese: "#fff7d6",
    herb: "#a16207",
    topping: "#d8b4fe",
    accent: "text-yellow-100",
    ingredients: ["250 g pizza dough", "Mozzarella", "Gorgonzola", "Parmigiano Reggiano", "Fontina or Taleggio", "Olive oil", "Black pepper"],
    steps: ["Use a very light white base.", "Add mozzarella first.", "Scatter gorgonzola, fontina and parmigiano.", "Bake hot and fast.", "Finish with black pepper and olive oil."],
    chef: "Use gorgonzola like perfume, not like sauce. A little makes the whole pizza feel expensive."
  },
  {
    id: 4,
    name: "Prosciutto & Rucola",
    label: "Premium Fresh",
    line: "Fresh rucola, delicate prosciutto and parmesan shavings.",
    time: "12 min",
    heat: "Fresh",
    palette: "from-amber-300/55 via-emerald-500/28 to-[#8b5a2b]/18",
    bg: "from-[#1f1a0d] via-[#17120b] to-[#0f1c14]",
    sauce: "#dc2626",
    cheese: "#fff7ed",
    herb: "#16a34a",
    topping: "#fecaca",
    accent: "text-emerald-100",
    ingredients: ["250 g pizza dough", "Tomato sauce", "Mozzarella", "Prosciutto", "Rucola", "Parmigiano shavings", "Olive oil"],
    steps: ["Bake the base with sauce and mozzarella.", "Remove when the crust is golden.", "Add prosciutto after baking.", "Top with rucola and parmigiano.", "Finish with olive oil."],
    chef: "The fresh ingredients must stay fresh. Put them on after the oven, never before."
  },
  {
    id: 5,
    name: "Truffle Mushroom Bianca",
    label: "Gourmet",
    line: "Earthy mushrooms, white base and a final touch of truffle oil.",
    time: "15 min",
    heat: "Aromatic",
    palette: "from-[#8b5a2b]/52 via-amber-200/28 to-stone-300/16",
    bg: "from-[#24180f] via-[#17110b] to-[#0f0d0a]",
    sauce: "#e7e5e4",
    cheese: "#fff7ed",
    herb: "#57534e",
    topping: "#292524",
    accent: "text-stone-100",
    ingredients: ["250 g pizza dough", "Ricotta or white cream base", "Mozzarella", "Thinly sliced or pre-roasted mushrooms", "Parmigiano", "Thyme", "Truffle oil"],
    steps: ["Spread a thin white base.", "Add mozzarella and thinly sliced or pre-roasted mushrooms.", "Bake until the edge crisps and the mushrooms stay concentrated, not watery.", "Add parmigiano while hot.", "Finish with thyme and truffle oil."],
    chef: "Truffle oil goes last. Heat kills the aroma you paid for."
  },
  {
    id: 6,
    name: "Capricciosa Moderna",
    label: "European Elite",
    line: "Rich ham, earthy mushrooms, and glossy black olives arranged with precision.",
    time: "13 min",
    heat: "Mild",
    palette: "from-rose-400/50 via-amber-500/25 to-stone-600/20",
    bg: "from-[#241212] via-[#190e0e] to-[#0f0f12]",
    sauce: "#cc3333",
    cheese: "#fffdd0",
    herb: "#1e3f20",
    topping: "#f4a261",
    accent: "text-rose-100",
    ingredients: ["250 g pizza dough", "Traditional pelat", "Fior di latte", "Gourmet cooked ham", "Fresh sliced button mushrooms", "Kalamata olives", "Wild oregano"],
    steps: ["Apply sauce and cheese evenly.", "Layer the ham ribbons and flat-cut mushrooms.", "Bake until the edges display a deep golden honeycomb.", "Garnish with fresh olives and a pinch of oregano."],
    chef: "Slice the mushrooms ultra-thin. Heavy, wet mushrooms release water and ruin your crispy base texture."
  },
  {
    id: 7,
    name: "Diavola Infernal",
    label: "Fiery Crimson",
    line: "Spicy Calabrian salami tearing through melted mozzarella and chili oils.",
    time: "12 min",
    heat: "Very Hot",
    palette: "from-red-600/60 via-orange-500/30 to-zinc-900/40",
    bg: "from-[#330b0b] via-[#1c0707] to-[#0d0404]",
    sauce: "#b31a1a",
    cheese: "#fff5cc",
    herb: "#1b4314",
    topping: "#7a0c0c",
    accent: "text-red-200",
    ingredients: ["250 g pizza dough", "Spicy tomato coulis", "High-moisture mozzarella", "Soppressata or Ventricina salame", "Fresh red chili slices", "Nduja infused oil"],
    steps: ["Base with spicy tomato sauce and torn cheese.", "Layer with thin slices of artisanal hot salami.", "Scatter fresh chili wheels across the surface.", "Flash bake at maximum heat, finish with red oil."],
    chef: "If using Nduja, drop it on in tiny pea-sized pearls. It melts completely and paints the cheese with pure smoky spice."
  },
  {
    id: 8,
    name: "Vegetariana Verde",
    label: "Garden Feast",
    line: "Charred bell peppers, tender zucchini, and sweet caramelized red onion.",
    time: "14 min",
    heat: "Mild",
    palette: "from-emerald-400/60 via-yellow-400/25 to-teal-600/15",
    bg: "from-[#0e1f13] via-[#0b140e] to-[#090b0a]",
    sauce: "#e64a19",
    cheese: "#fffae6",
    herb: "#2e7d32",
    topping: "#fb8c00",
    accent: "text-emerald-100",
    ingredients: ["250 g pizza dough", "Herb pelat base", "Low-moisture mozzarella", "Grilled zucchini ribbons", "Roasted sweet peppers", "Red onion slivers", "Sweet corn", "Cherry tomatoes"],
    steps: ["Lightly sauce and cheese the dough structure.", "Artistically arrange pre-grilled or roasted vegetables.", "Bake until the vegetable edges gain a delicate smoky char.", "Squeeze a drop of lemon juice over the top immediately after baking."],
    chef: "Raw vegetables sweat heavily in a home oven. Always roast or grill your peppers and zucchini beforehand to concentrate their sugars."
  },
  {
    id: 9,
    name: "Marinara Antica",
    label: "The Purest Legacy",
    line: "An ancient Neapolitan masterpiece focused entirely on garlic, oil, and tomato.",
    time: "11 min",
    heat: "Aromatic",
    palette: "from-red-500/70 via-amber-600/35 to-stone-800/20",
    bg: "from-[#2b0c08] via-[#1c0906] to-[#120807]",
    sauce: "#c82333",
    cheese: "transparent",
    herb: "#145a32",
    topping: "#f4d03f",
    accent: "text-amber-200",
    ingredients: ["250 g pizza dough", "Premium San Marzano whole tomatoes", "Garlic cloves (sliced paper-thin)", "Dried mountain oregano", "Finest extra virgin olive oil"],
    steps: ["Crush San Marzano tomatoes by hand onto the dough.", "Distribute garlic slices perfectly so they don't bunch up.", "Dust heavily with high-grade wild oregano.", "Drizzle olive oil in a spiral motion and bake intensely."],
    chef: "No cheese means the sauce is exposed. Use the highest quality canned Italian plum tomatoes you can source."
  },
  {
    id: 10,
    name: "Calzone Napoletano",
    label: "Crescent Moon",
    line: "A golden, puffed pocket hiding a steaming center of ricotta and savory ham.",
    time: "15 min",
    heat: "Mild",
    palette: "from-amber-400/60 via-orange-300/30 to-amber-900/20",
    bg: "from-[#291b0d] via-[#1a1109] to-[#120e0a]",
    sauce: "#de4326",
    cheese: "#ffffff",
    herb: "#27ae60",
    topping: "#f1948a",
    accent: "text-amber-100",
    ingredients: ["250 g pizza dough", "Fresh ricotta cheese", "Mozzarella cubes", "Prosciutto cotto (cooked ham)", "Spoonful of tomato sauce for top"],
    steps: ["Roll out the circle, spread ricotta and fillings on one hemisphere.", "Fold over and press the edges with a rope-like crimp to seal.", "Ladle a tiny smudge of sauce on top to prevent the pocket from bursting.", "Bake until it resembles a giant puffed, blistered cloud."],
    chef: "Ensure your ricotta is drained dry through a cheesecloth overnight, or the inside steam will turn the interior soggy."
  },
  {
    id: 11,
    name: "Aloha Paradiso",
    label: "Salty & Sweet",
    line: "Sweet caramelized pineapple cubes balancing against premium cured ham strips.",
    time: "13 min",
    heat: "Mild",
    palette: "from-yellow-400/60 via-rose-400/30 to-orange-500/15",
    bg: "from-[#261d0f] via-[#1a140b] to-[#120d08]",
    sauce: "#e03e1b",
    cheese: "#fff9db",
    herb: "#218f21",
    topping: "#ffd54f",
    accent: "text-yellow-100",
    ingredients: ["250 g pizza dough", "San Marzano sauce", "Mozzarella", "Artisanal smoked ham", "Fresh pineapple (never canned)", "Jalapeno wheels (optional)"],
    steps: ["Sauce and blanket with premium cheese.", "Distribute strips of savory smoked ham.", "Scatter fresh, dry pineapple cubes evenly.", "Bake until pineapple edges turn golden brown and sweet."],
    chef: "Canned pineapple is loaded with excess syrup. Use fresh pineapple, slice it, and sear it in a hot dry pan before putting it on the pizza."
  },
  {
    id: 12,
    name: "Siciliana Umami",
    label: "Mediterranean Fire",
    line: "Salted capers, black olives, and briny anchovies forming an unforgettable profile.",
    time: "12 min",
    heat: "Savory",
    palette: "from-violet-400/40 via-red-500/30 to-stone-900/30",
    bg: "from-[#1a111e] via-[#120c15] to-[#0d090f]",
    sauce: "#bd2130",
    cheese: "#fffbe6",
    herb: "#196f3d",
    topping: "#2c3e50",
    accent: "text-purple-200",
    ingredients: ["250 g pizza dough", "Tomato sauce base", "Mozzarella", "Premium salted anchovy fillets", "Siciliana black olives", "Brined capers", "Pinch of chili flakes"],
    steps: ["Spread tomato and light cheese layers.", "Dot with capers and halved olives.", "Lay anchovy fillets across the top.", "Bake fast, allowing the anchovy oils to melt beautifully into the sauce."],
    chef: "Anchovies are deeply salty. Do not add salt to your sauce for this specific recipe, or you'll overpower the dish."
  },
  {
    id: 13,
    name: "Tonno e Cipolla Rossa",
    label: "Coastal Harvest",
    line: "Flaky white tuna paired with sweet, crisp rings of Tropea red onion.",
    time: "13 min",
    heat: "Savory",
    palette: "from-blue-400/40 via-fuchsia-400/25 to-stone-800/20",
    bg: "from-[#111a24] via-[#0d131a] to-[#090d12]",
    sauce: "#d32f2f",
    cheese: "#fffee0",
    herb: "#117a65",
    topping: "#c39bd3",
    accent: "text-blue-200",
    ingredients: ["250 g pizza dough", "Tangy tomato coulis", "Mozzarella cheese", "High-grade tuna steak in olive oil", "Tropea red onions sliced super thin"],
    steps: ["Sauce the base, cover with shredded mozzarella.", "Flake the drained tuna over the cheese layer.", "Cover with delicate red onion rings.", "Bake until onions soften and develop sweet, crispy tips."],
    chef: "Drain your tuna well and mix it with a tiny touch of olive oil and black pepper before flaking it onto the cheese."
  },
  {
    id: 14,
    name: "Frutti di Mare Costiera",
    label: "Seafood Luxury",
    line: "Marinated calamari, sweet shrimp, and mussels kissed by garlic and fresh parsley.",
    time: "14 min",
    heat: "Fresh",
    palette: "from-cyan-400/50 via-teal-500/30 to-amber-700/15",
    bg: "from-[#0a1c1c] via-[#081414] to-[#060c0c]",
    sauce: "#cb3224",
    cheese: "#fffdf0",
    herb: "#16a085",
    topping: "#e74c3c",
    accent: "text-cyan-100",
    ingredients: ["250 g pizza dough", "Light tomato oil base", "Mozzarella", "Cleaned small shrimp", "Squid rings", "Mussels", "Garlic butter splash", "Fresh chopped flat-leaf parsley"],
    steps: ["Flash sear seafood in garlic butter for 60 seconds first.", "Sauce and lightly cheese the pizza structure.", "Scatter seafood across the canvas, bake rapidly.", "Garnish with fresh parsley and a micro-drizzle of lemon."],
    chef: "Never put raw, wet frozen seafood mix on a pizza. It will turn into a mini lake. Defrost, dry thoroughly, and quick-sear it first."
  },
  {
    id: 15,
    name: "Mexicana Picante",
    label: "Border Crosser",
    line: "Spiced minced beef, sweet corn, black beans, and sharp pickled jalapenos.",
    time: "14 min",
    heat: "Spicy",
    palette: "from-amber-500/60 via-red-600/30 to-yellow-600/20",
    bg: "from-[#291605] via-[#1a0e03] to-[#0f0902]",
    sauce: "#c0392b",
    cheese: "#fcc232",
    herb: "#27ae60",
    topping: "#d35400",
    accent: "text-orange-200",
    ingredients: ["250 g pizza dough", "Fiery tomato sauce", "Cheddar-Mozzarella blend", "Seasoned taco beef", "Sweet corn", "Black beans", "Jalapeno slices"],
    steps: ["Layer the hot sauce and mixed cheese blend.", "Scatter seasoned cooked ground beef, corn, and beans.", "Top with pickled jalapenos.", "Bake until cheese bubbles intensely and turns amber."],
    chef: "Use a mix of Cheddar and Mozzarella. Cheddar provides a sharp, rich flavor note that compliments the spiced beef profile beautifully."
  },
  {
    id: 16,
    name: "Smoky BBQ Chicken",
    label: "The Smokehouse",
    line: "Tender shredded chicken breast drenched in deep, woody barbecue glaze.",
    time: "13 min",
    heat: "Rich",
    palette: "from-amber-600/60 via-orange-600/25 to-stone-900/40",
    bg: "from-[#241305] via-[#170c03] to-[#0f0802]",
    sauce: "#5c1d06",
    cheese: "#fff4cc",
    herb: "#1e4620",
    topping: "#f5b041",
    accent: "text-amber-200",
    ingredients: ["250 g pizza dough", "Artisanal hickory BBQ sauce", "Mozzarella & Smoked Gouda", "Pulled chicken breast", "Red onion rings", "Fresh cilantro"],
    steps: ["Replace normal tomato sauce with a thin layer of BBQ sauce.", "Add cheeses, followed by chicken and red onion rings.", "Bake until the edges display a deep mahogany caramelization.", "Top with fresh cilantro leaves."],
    chef: "Mix a tablespoon of olive oil into your BBQ sauce base. It slows down the sugar burning process inside a hot oven."
  },
  {
    id: 17,
    name: "Carbonara Suprema",
    label: "Roman Midnight",
    line: "Velvety egg cream base, crispy cured pancetta, and mountains of Pecorino.",
    time: "13 min",
    heat: "Rich",
    palette: "from-yellow-300/50 via-amber-400/25 to-stone-800/30",
    bg: "from-[#221c10] via-[#17130a] to-[#0f0c06]",
    sauce: "#fef9e7",
    cheese: "#fffce3",
    herb: "#784212",
    topping: "#eb984e",
    accent: "text-yellow-200",
    ingredients: ["250 g pizza dough", "Egg yolk, Pecorino and black pepper cream", "Fior di latte", "Crispy guanciale or pancetta cubes", "Freshly cracked black pepper", "Pecorino Romano"],
    steps: ["Create a light white base with cheese.", "Scatter lardons of cured pork across the surface.", "Bake until cheese is molten and pork fat renders completely.", "Out of the oven, swirl on the egg and Pecorino cream, then finish with black pepper."],
    chef: "Never bake the egg yolk mix directly at 400°C or it will scramble. Whisk it with Pecorino and black pepper, then swirl it onto the hot pizza immediately after it exits the oven."
  },
  {
    id: 18,
    name: "Bianca Ruzmarin",
    label: "Minimalist Dream",
    line: "An understated luxury of whipped ricotta, garlic oil, and fresh pine needles of rosemary.",
    time: "11 min",
    heat: "Aromatic",
    palette: "from-stone-300/50 via-emerald-400/20 to-stone-700/20",
    bg: "from-[#171916] via-[#10120f] to-[#0a0b0a]",
    sauce: "#f4f6f7",
    cheese: "#ffffff",
    herb: "#239b56",
    topping: "#eaecee",
    accent: "text-stone-300",
    ingredients: ["250 g pizza dough", "Extra virgin olive oil", "Garlic water brush", "Fresh mozzarella", "Whipped whole milk ricotta", "Fresh rosemary sprigs", "Flaky sea salt"],
    steps: ["Brush dough skin lightly with garlic oil.", "Scatter mozzarella tearing and add dollops of whipped ricotta.", "Sprinkle fresh rosemary leaves across the white landscape.", "Bake until golden, finish with structural sea salt flakes."],
    chef: "Soak your fresh rosemary in olive oil for 5 minutes before throwing it onto the pizza. This stops the hot oven environment from turning them black and bitter."
  },
  {
    id: 19,
    name: "Quattro Stagioni",
    label: "The Alchemy Wheel",
    line: "Four distinct quadrants celebrating ham, artichokes, mushrooms, and olives.",
    time: "14 min",
    heat: "Mild",
    palette: "from-orange-400/40 via-teal-400/25 to-rose-400/20",
    bg: "from-[#1c1612] via-[#130f0c] to-[#0c0a08]",
    sauce: "#d32f2f",
    cheese: "#fffdf2",
    herb: "#196f3d",
    topping: "#e59866",
    accent: "text-orange-100",
    ingredients: ["250 g pizza dough", "Classic tomato pelat", "Mozzarella", "Quadrant 1: Cooked ham", "Quadrant 2: Sliced mushrooms", "Quadrant 3: Marinated artichoke hearts", "Quadrant 4: Black olives"],
    steps: ["Apply sauce and cheese across the whole surface area.", "Visually divide the circle into 4 quarters.", "Place one ingredient exclusively inside each zone.", "Bake carefully until all quadrants reach symmetrical harmony."],
    chef: "Squeeze the marinated artichokes completely dry in a paper towel before chopping them up, or they will leak moisture into their quarter."
  },
  {
    id: 20,
    name: "Napoletana Eccellente",
    label: "Ancient Harbor",
    line: "A deep dive into old Neapolitan heritage using capers and pungent garlic oils.",
    time: "12 min",
    heat: "Savory",
    palette: "from-red-600/55 via-amber-500/25 to-slate-900/30",
    bg: "from-[#220f0a] via-[#160a06] to-[#0d0604]",
    sauce: "#c0392b",
    cheese: "#fffdea",
    herb: "#145a32",
    topping: "#566573",
    accent: "text-red-100",
    ingredients: ["250 g pizza dough", "San Marzano sauce", "Mozzarella", "Salted capers", "Garlic minced", "Oregano leaf", "Olive oil splash"],
    steps: ["Spread premium sauce, sprinkle garlic flakes.", "Add mozzarella cubes and scatter capers.", "Dust with oregano lines.", "Bake at intense volcanic heat until edge bubbles display beautiful dark micro-spots."],
    chef: "Wash your capers under running water to remove the harsh storage brine, then pat them completely dry before dropping them on the sauce."
  }
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(query.matches);

    update();

    if (query.addEventListener) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }

    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  return isMobile;
}

const fastEase = [0.16, 1, 0.3, 1];

const PizzaIllustration = memo(function PizzaIllustration({ pizza, active = false, small = false, isMobile = false }) {
  const shouldReduceMotion = useReducedMotion();
  const size = small ? "h-24 w-24 min-[420px]:h-28 min-[420px]:w-28" : "h-56 w-56 sm:h-72 sm:w-72";

  const toppings = useMemo(() => [
    { x: 34, y: 31, r: 8, c: pizza.topping },
    { x: 61, y: 26, r: 6, c: pizza.herb },
    { x: 49, y: 50, r: 9, c: pizza.cheese },
    { x: 27, y: 61, r: 6, c: pizza.herb },
    { x: 68, y: 64, r: 9, c: pizza.topping },
    { x: 43, y: 72, r: 5, c: pizza.sauce },
    { x: 72, y: 43, r: 5, c: pizza.herb }
  ], [pizza.cheese, pizza.herb, pizza.sauce, pizza.topping]);

  const shouldAnimatePizza = active && !shouldReduceMotion && !isMobile;

  return (
    <motion.div
      animate={shouldAnimatePizza ? { rotate: [0, -4, 6, 0], scale: [1, 1.035, 1] } : { rotate: 0, scale: 1 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className={`relative ${size} mx-auto transform-gpu`}
    >
      <div className={`absolute inset-3 rounded-full bg-gradient-to-br ${pizza.palette} opacity-[0.12] blur-lg sm:opacity-[0.22] sm:blur-2xl`} />
      <div className="absolute inset-[8%] rounded-full bg-[#7c3f16] shadow-[0_16px_26px_rgba(0,0,0,.32)] sm:shadow-[0_24px_44px_rgba(0,0,0,.42)]" />
      <div className="absolute inset-[13%] rounded-full bg-gradient-to-br from-[#f5c46f] via-[#d88925] to-[#7c3f16]" />
      <div
        className="absolute inset-[21%] rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 24%, ${pizza.cheese} 0 10%, transparent 11%), radial-gradient(circle at 66% 60%, ${pizza.cheese} 0 8%, transparent 9%), ${pizza.sauce}`
        }}
      />

      <svg className="absolute inset-[14%] h-[72%] w-[72%] overflow-visible" viewBox="0 0 100 100">
        {toppings.map((t, index) => (
          <circle
            key={index}
            cx={t.x}
            cy={t.y}
            r={t.r}
            fill={t.c}
            opacity="0.95"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.4"
          />
        ))}
        <path d="M18 48 C34 38, 43 60, 57 48 S76 50, 82 38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
});

function FallingOregano({ trigger }) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const leafCount = isMobile ? 6 : 10;

  const leaves = useMemo(() => Array.from({ length: leafCount }, (_, i) => {
    const direction = i % 2 === 0 ? 1 : -1;
    const drift = 18 + (i % 4) * 8;

    return {
      id: `${trigger}-${i}`,
      left: 8 + ((i * 53) % 84),
      delay: (i % 4) * 0.04,
      duration: isMobile ? 1.05 + (i % 3) * 0.08 : 1.25 + (i % 4) * 0.1,
      fall: isMobile ? 410 + (i % 3) * 26 : 520 + (i % 4) * 32,
      driftA: direction * drift,
      driftB: direction * -drift * 0.55,
      driftC: direction * drift * 0.35,
      rotate: direction * (230 + (i % 4) * 35),
      size: 4 + (i % 3)
    };
  }), [trigger, leafCount, isMobile]);

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden [contain:layout_paint]">
      <style>
        {`
          @keyframes scanory-oregano-fall {
            0% {
              opacity: 0;
              transform: translate3d(0, -18px, 0) rotate(0deg) scale(0.9);
            }
            15% {
              opacity: 0.82;
              transform: translate3d(var(--drift-a), calc(var(--fall) * 0.18), 0) rotate(calc(var(--rot) * 0.22)) scale(1);
            }
            48% {
              opacity: 0.78;
              transform: translate3d(var(--drift-b), calc(var(--fall) * 0.48), 0) rotate(calc(var(--rot) * 0.56)) scale(0.96);
            }
            78% {
              opacity: 0.45;
              transform: translate3d(var(--drift-c), calc(var(--fall) * 0.78), 0) rotate(calc(var(--rot) * 0.82)) scale(1.02);
            }
            100% {
              opacity: 0;
              transform: translate3d(calc(var(--drift-a) * 0.25), var(--fall), 0) rotate(var(--rot)) scale(0.85);
            }
          }
        `}
      </style>

      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="absolute top-0 rounded-[60%] bg-emerald-300/70 shadow-sm shadow-emerald-950/30"
          style={{
            left: `${leaf.left}%`,
            width: leaf.size * 1.8,
            height: leaf.size,
            borderRadius: "65% 35% 65% 35%",
            animationName: "scanory-oregano-fall",
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            animationTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            animationFillMode: "both",
            willChange: "transform, opacity",
            "--fall": `${leaf.fall}px`,
            "--drift-a": `${leaf.driftA}px`,
            "--drift-b": `${leaf.driftB}px`,
            "--drift-c": `${leaf.driftC}px`,
            "--rot": `${leaf.rotate}deg`
          }}
        />
      ))}
    </div>
  );
}

export default function ScanoryPizzaExperience() {
  const [unlocked, setUnlocked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [doughOpen, setDoughOpen] = useState(false);
  const [burst, setBurst] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const overlayOpen = Boolean(selected) || secretOpen;
    const previousOverflow = document.body.style.overflow;

    if (overlayOpen) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected, secretOpen]);

  const toggleUnlock = useCallback(() => setUnlocked((v) => !v), []);

  const openPizza = useCallback((pizza) => {
    setSelected(pizza);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setBurst((b) => b + 1);
      });
    });
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#120b06] text-[#fff7ea] selection:bg-amber-300 selection:text-stone-950">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#120b06_0%,#160d07_42%,#100906_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,164,65,.13),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(120,64,24,.10),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.022] [background-image:linear-gradient(45deg,#fff_1px,transparent_1px),linear-gradient(-45deg,#fff_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      {burst > 0 && <FallingOregano key={burst} trigger={burst} />}

      <main className="relative mx-auto w-full max-w-[980px] px-4 py-4 sm:px-8 sm:py-8">
        <section className="relative min-h-[calc(100svh-2rem)] overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.055] px-5 py-7 shadow-xl shadow-black/30 sm:min-h-[560px] sm:rounded-[2rem] sm:p-10 sm:shadow-2xl sm:shadow-black/35 sm:backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 hidden h-56 w-56 rounded-full bg-amber-500/10 blur-3xl sm:block" />
          <div className="absolute -bottom-20 left-4 hidden h-56 w-56 rounded-full bg-amber-900/10 blur-3xl sm:block" />

          <div className="relative flex min-h-[calc(100svh-5.5rem)] flex-col items-center justify-center text-center sm:min-h-[480px]">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f0c06a] via-[#b8732a] to-[#6b3f1d] text-3xl shadow-xl shadow-black/30">
              🍕
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, delay: 0.03 }} className="mb-3 text-[11px] font-black uppercase tracking-[0.42em] text-amber-300">
              Scanory Kitchen
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, delay: 0.06 }} className="mx-auto max-w-3xl text-5xl font-black leading-[.88] tracking-[-0.07em] sm:text-7xl">
              Your wall art just became a recipe book.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, delay: 0.09 }} className="mx-auto mt-5 max-w-lg text-sm leading-7 text-amber-50/66 sm:text-base">
              20 masterclass recipes unlocked from one single visual scan.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: 0.12 }}
              onClick={toggleUnlock}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#d9a441] px-6 py-3.5 text-sm font-black text-stone-950 shadow-xl shadow-black/25 active:scale-95"
            >
              {unlocked ? <UnlockKeyhole size={17} /> : <LockKeyhole size={17} />}
              {unlocked ? "Lock collection" : "Unlock recipes"}
            </motion.button>
          </div>
        </section>

        <AnimatePresence initial={false}>
          {unlocked && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <section className="relative mt-5 overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/22 p-5 shadow-xl shadow-black/20 sm:mt-7 sm:rounded-[2rem] sm:p-8 sm:shadow-2xl sm:shadow-black/25 sm:backdrop-blur-xl">
                <div className="absolute -right-14 top-8 hidden h-44 w-44 rounded-full bg-amber-500/10 blur-3xl sm:block" />
                <div className="absolute -left-16 bottom-0 hidden h-44 w-44 rounded-full bg-orange-900/10 blur-3xl sm:block" />

                <div className="relative">
                  <p className="text-[11px] font-black uppercase tracking-[0.38em] text-amber-300">Tap to taste</p>
                  <h2 className="mt-3 max-w-xl text-4xl font-black leading-[.92] tracking-[-0.055em] sm:text-5xl">Choose tonight’s pizza</h2>
                </div>

                <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {pizzas.map((pizza) => (
                    <button
                      key={pizza.id}
                      onClick={() => openPizza(pizza)}
                      className={`group relative overflow-hidden rounded-[1.45rem] border p-3 text-left shadow-lg shadow-black/15 transition-colors duration-100 active:scale-[0.985] sm:rounded-[1.7rem] sm:p-4 sm:shadow-xl sm:shadow-black/20 ${
                        selected?.id === pizza.id
                          ? "border-amber-300/55 bg-[#2a1a0b]/55"
                          : "border-white/10 bg-white/[0.055] active:bg-white/[0.1] sm:hover:bg-white/[0.09]"
                      }`}
                    >
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${pizza.palette}`} />
                      <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${pizza.palette} opacity-[0.09] blur-lg sm:opacity-[0.16] sm:blur-xl`} />
                      <PizzaIllustration pizza={pizza} active={selected?.id === pizza.id} small isMobile={isMobile} />
                      <h3 className="mt-2 truncate text-[14px] font-black leading-4 tracking-[-0.04em] sm:text-lg sm:leading-5">{pizza.name}</h3>
                      <p className={`mt-2 text-[11px] font-bold sm:text-xs ${pizza.accent}`}>{pizza.label}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="relative mt-5 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.055] p-5 sm:mt-7 sm:rounded-[2rem] sm:p-8 sm:backdrop-blur-xl">
                <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
                  <div className="rounded-[1.55rem] bg-[#20130b] p-5 ring-1 ring-white/10 sm:rounded-[1.8rem] sm:p-6">
                    <p className="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Kitchen note</p>
                    <h2 className="mt-3 text-4xl font-black leading-[.95] tracking-[-0.055em]">Before you bake</h2>

                    <div className="mt-5 space-y-3 text-sm leading-6 text-amber-50/70">
                      <p>Heat the oven as high as possible.</p>
                      <p>Use less sauce than you think.</p>
                      <p>Fresh toppings go after baking.</p>
                    </div>

                    <button onClick={() => setSecretOpen(true)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-5 py-3 text-sm font-black text-amber-100 active:scale-[.98]">
                      <Hand size={17} /> Touch for chef secret
                    </button>
                  </div>

                  <button
                    onClick={() => setDoughOpen((v) => !v)}
                    className="group relative min-h-[560px] overflow-hidden rounded-[1.55rem] border border-white/10 bg-gradient-to-br from-[#2a180d] via-[#1b1009] to-[#101a12] p-0 text-left ring-1 ring-white/5 min-[420px]:min-h-[530px] sm:min-h-[360px] sm:rounded-[1.8rem]"
                    style={{ perspective: "1200px" }}
                  >
                    <motion.div
                      animate={{ rotateY: doughOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: fastEase }}
                      className="relative h-full min-h-[560px] w-full transform-gpu min-[420px]:min-h-[530px] sm:min-h-[360px]"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="absolute inset-0 p-5 sm:p-6" style={{ backfaceVisibility: "hidden" }}>
                        <div className="absolute -right-16 -top-16 hidden h-48 w-48 rounded-full bg-amber-500/12 blur-3xl sm:block" />
                        <div className="absolute -bottom-14 -left-14 hidden h-48 w-48 rounded-full bg-amber-900/10 blur-3xl sm:block" />

                        <div className="relative grid h-full min-h-[510px] place-items-center text-center min-[420px]:min-h-[480px] sm:min-h-[310px]">
                          <div>
                            <motion.div
                              animate={shouldReduceMotion || isMobile ? { rotate: 0, y: 0 } : { rotate: [0, 3, -3, 0], y: [0, -4, 0] }}
                              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                              className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#d9a441] via-[#8b5a2b] to-[#4a2b15] text-4xl shadow-xl shadow-black/25 sm:shadow-2xl sm:shadow-black/30"
                            >
                              🥖
                            </motion.div>

                            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Perfect pizza dough</p>
                            <h3 className="mx-auto mt-3 max-w-md text-3xl font-black leading-[.94] tracking-[-0.055em] sm:text-4xl">One dough for every pizza.</h3>

                            <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2 text-center text-xs font-bold text-amber-50/75">
                              <div className="rounded-2xl bg-white/[0.07] px-3 py-3"><span className="block text-lg text-amber-200">500 g</span>Flour</div>
                              <div className="rounded-2xl bg-white/[0.07] px-3 py-3"><span className="block text-lg text-amber-200">325 ml</span>Water</div>
                              <div className="rounded-2xl bg-white/[0.07] px-3 py-3"><span className="block text-lg text-amber-200">24h</span>Ferment</div>
                            </div>

                            <p className="mx-auto mt-5 max-w-xs text-sm font-bold leading-6 text-amber-50/62">Tap to flip the card and reveal the full dough formula.</p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 overflow-y-auto overscroll-contain p-5 sm:p-6" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                        <div className="absolute -right-16 -top-16 hidden h-48 w-48 rounded-full bg-amber-500/12 blur-3xl sm:block" />

                        <div className="relative">
                          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Dough formula</p>
                          <h3 className="mt-3 text-3xl font-black leading-[.94] tracking-[-0.055em] sm:text-4xl">The base recipe</h3>

                          <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl bg-black/20 p-4 ring-1 ring-white/10">
                              <h4 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-amber-300">Ingredients</h4>
                              <ul className="space-y-2 text-sm leading-6 text-amber-50/76">
                                <li>500 g tipo 00 or bread flour</li>
                                <li>325 ml lukewarm water</li>
                                <li>10 g sea salt</li>
                                <li>2 g dry yeast or 6 g fresh yeast</li>
                                <li>1 tbsp olive oil, optional</li>
                              </ul>
                            </div>

                            <div className="rounded-3xl bg-black/20 p-4 ring-1 ring-white/10">
                              <h4 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-amber-300">Method</h4>
                              <ol className="space-y-2 text-sm leading-6 text-amber-50/76">
                                <li>1. Mix flour and water.</li>
                                <li>2. Rest for 20 minutes.</li>
                                <li>3. Add yeast, salt and oil.</li>
                                <li>4. Knead until smooth.</li>
                                <li>5. Cold ferment 24–48h.</li>
                                <li>6. Bring to room temperature before stretching.</li>
                              </ol>
                            </div>
                          </div>

                          <div className="mt-4 rounded-3xl bg-[#d9a441] p-4 text-sm font-black leading-6 text-stone-950">
                            Stretch by hand. Do not use a rolling pin — it pushes out the air that makes the crust light.
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </button>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selected && <RecipeModal pizza={selected} onClose={() => setSelected(null)} isMobile={isMobile} />}
      </AnimatePresence>

      <AnimatePresence>
        {secretOpen && <SecretModal onClose={() => setSecretOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

function RecipeModal({ pizza, onClose, isMobile = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.08 }}
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-end bg-black/72 p-3 sm:items-center sm:justify-center sm:p-6 sm:backdrop-blur-md"
    >
      <motion.div
        initial={{ y: isMobile ? 22 : 14, scale: isMobile ? 1 : 0.99, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 14, scale: 0.99, opacity: 0 }}
        transition={{ duration: isMobile ? 0.12 : 0.16, ease: fastEase }}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[92svh] w-full max-w-3xl overscroll-contain overflow-y-auto rounded-[1.8rem] transform-gpu border border-white/10 bg-gradient-to-br ${pizza.bg} p-5 shadow-xl shadow-black sm:rounded-[2rem] sm:p-7 sm:shadow-2xl`}
      >
        <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${pizza.palette}`} />

        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white active:scale-95 sm:backdrop-blur">
          <X size={20} />
        </button>

        <div className="grid gap-5 md:grid-cols-[.78fr_1.22fr]">
          <div className="flex flex-col items-center justify-center rounded-[1.45rem] bg-black/18 p-4 ring-1 ring-white/10 sm:rounded-[1.6rem]">
            <PizzaIllustration pizza={pizza} active isMobile={isMobile} />

            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><Clock size={13} />{pizza.time}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><Flame size={13} />{pizza.heat}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><Utensils size={13} />1 pizza</span>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-amber-300">Recipe unlocked</p>
            <h2 className="mt-2 text-4xl font-black leading-[.92] tracking-[-0.06em] sm:text-5xl">{pizza.name}</h2>
            <p className="mt-3 text-sm leading-6 text-amber-50/70">{pizza.line}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-amber-300">
                  <Leaf size={16} /> Ingredients
                </h4>

                <ul className="space-y-2">
                  {pizza.ingredients.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-amber-50/76">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-amber-300">
                  <ChefHat size={16} /> Preparation
                </h4>

                <ol className="space-y-3">
                  {pizza.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-amber-50/76">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-300 text-xs font-black text-stone-950">{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className={`mt-6 rounded-3xl bg-gradient-to-r ${pizza.palette} p-[1px]`}>
              <div className="rounded-3xl bg-black/45 p-4">
                <p className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                  <Star size={14} /> Chef tip
                </p>
                <p className="text-sm leading-6 text-amber-50/82">{pizza.chef}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SecretModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 14, scale: 0.99 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 14, scale: 0.99 }}
        transition={{ duration: 0.14, ease: fastEase }}
        onClick={onClose}
        className="w-full max-w-sm rounded-[1.8rem] border border-amber-200/20 bg-gradient-to-br from-[#d9a441] to-[#8b5a2b] p-6 text-stone-950 shadow-xl shadow-black/35 sm:shadow-2xl sm:shadow-black/40"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 text-3xl">🔥</div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-stone-800/70">Chef secret</p>
        <h3 className="mt-2 text-3xl font-black leading-[.95] tracking-[-0.05em]">Room temperature dough changes everything.</h3>
        <p className="mt-4 text-sm font-bold leading-6 text-stone-900/80">Let the dough rest before stretching. Cold dough tears, shrinks, and makes the crust dense.</p>
      </motion.div>
    </motion.div>
  );
}
