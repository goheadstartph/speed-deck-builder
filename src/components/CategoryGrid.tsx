import { Landmark, TrendingUp, Globe, CreditCard, Target } from "lucide-react";

const categories = [
  { icon: Landmark, label: "Digital Banks", color: "bg-primary/10 text-primary" },
  { icon: TrendingUp, label: "Local Brokers", color: "bg-accent text-accent-foreground" },
  { icon: Globe, label: "Global Brokers", color: "bg-primary/10 text-primary" },
  { icon: CreditCard, label: "Credit Builders", color: "bg-accent text-accent-foreground" },
  { icon: Target, label: "Long-term Goals", color: "bg-primary/10 text-primary" },
];

const CategoryGrid = () => (
  <section className="border-b bg-secondary/50 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => document.getElementById("the-vault")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className={`rounded-xl p-3 ${cat.color}`}>
              <cat.icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium text-foreground">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
