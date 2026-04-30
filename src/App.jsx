import React, { useMemo, useState } from "react";

const foods = [
  { id: "rice", name: "熟米饭", type: "carb", carbs: 28, protein: 2.6, fat: 0.3, kcal: 130, units: [{ label: "小碗", grams: 110 }, { label: "大碗", grams: 160 }], note: "适合日常主食，外卖常见。" },
  { id: "noodle", name: "面条", type: "carb", carbs: 25, protein: 4, fat: 1, kcal: 138, units: [{ label: "一碗", grams: 220 }], note: "一碗面通常主食量偏高。" },
  { id: "mantou", name: "馒头", type: "carb", carbs: 47, protein: 7, fat: 1, kcal: 223, units: [{ label: "1个", grams: 100 }], note: "同等碳水下，比米饭实际克重少。" },
  { id: "baozi", name: "包子", type: "carb", carbs: 30, protein: 6, fat: 5, kcal: 200, units: [{ label: "1个", grams: 120 }], note: "含馅料，脂肪和热量波动较大。" },
  { id: "bread", name: "面包", type: "carb", carbs: 50, protein: 8, fat: 4, kcal: 260, units: [{ label: "1片", grams: 30 }], note: "早餐常见，注意甜面包脂肪糖分更高。" },
  { id: "oats", name: "燕麦", type: "carb", carbs: 60, protein: 13, fat: 7, kcal: 380, units: [{ label: "一份", grams: 50 }], note: "适合早餐，饱腹感较好。" },
  { id: "sweet_potato", name: "红薯", type: "carb", carbs: 20, protein: 1.6, fat: 0.1, kcal: 90, units: [{ label: "1个", grams: 220 }], note: "饱腹感强，适合减脂。" },
  { id: "potato", name: "土豆", type: "carb", carbs: 17, protein: 2, fat: 0.1, kcal: 77, units: [{ label: "1个", grams: 180 }], note: "蒸煮更适合，油炸不适合。" },
  { id: "corn", name: "玉米", type: "carb", carbs: 21, protein: 3.4, fat: 1.2, kcal: 96, units: [{ label: "1根", grams: 200 }], note: "可替代部分主食。" },
  { id: "rice_noodle", name: "米粉", type: "carb", carbs: 26, protein: 3, fat: 0.5, kcal: 120, units: [{ label: "一碗", grams: 200 }], note: "汤粉类容易低估主食量。" },
  { id: "porridge", name: "白粥", type: "carb", carbs: 10, protein: 1.1, fat: 0.1, kcal: 45, units: [{ label: "一碗", grams: 250 }], note: "水分高，同等碳水需要更大克重。" },
  { id: "dumpling", name: "饺子", type: "carb", carbs: 28, protein: 8, fat: 8, kcal: 220, units: [{ label: "6个", grams: 150 }], note: "主食和肉馅混合，脂肪波动较大。" },
  { id: "wonton", name: "馄饨", type: "carb", carbs: 22, protein: 7, fat: 6, kcal: 180, units: [{ label: "一碗", grams: 220 }], note: "注意汤底和油泼。" },
  { id: "whole_wheat_bread", name: "全麦面包", type: "carb", carbs: 43, protein: 10, fat: 4, kcal: 250, units: [{ label: "1片", grams: 35 }], note: "优先选配料简单的。" },
  { id: "pumpkin", name: "南瓜", type: "carb", carbs: 7, protein: 1, fat: 0.1, kcal: 30, units: [{ label: "一块", grams: 200 }], note: "碳水密度低，可增加饱腹感。" },

  { id: "chicken", name: "鸡胸肉", type: "protein", carbs: 0, protein: 31, fat: 3.6, kcal: 165, units: [{ label: "一掌", grams: 120 }], note: "高蛋白低脂，最稳的减脂肉类。" },
  { id: "chicken_leg", name: "鸡腿肉", type: "protein", carbs: 0, protein: 24, fat: 10, kcal: 190, units: [{ label: "1只去骨鸡腿", grams: 130 }], note: "比鸡胸脂肪高，去皮更合适。" },
  { id: "beef", name: "牛肉", type: "protein", carbs: 0, protein: 26, fat: 15, kcal: 250, units: [{ label: "一掌", grams: 100 }], note: "蛋白质高，脂肪视部位差异较大。" },
  { id: "lean_beef", name: "瘦牛肉", type: "protein", carbs: 0, protein: 26, fat: 8, kcal: 180, units: [{ label: "一掌", grams: 100 }], note: "比普通牛肉更适合减脂期。" },
  { id: "pork", name: "瘦猪肉", type: "protein", carbs: 0, protein: 27, fat: 10, kcal: 200, units: [{ label: "一掌", grams: 100 }], note: "选择里脊、瘦肉更合适。" },
  { id: "pork_rib", name: "排骨", type: "protein", carbs: 0, protein: 18, fat: 23, kcal: 290, units: [{ label: "3块", grams: 120 }], note: "脂肪较高，减脂期控制份量。" },
  { id: "fish", name: "鱼肉", type: "protein", carbs: 0, protein: 22, fat: 2, kcal: 110, units: [{ label: "一块", grams: 150 }], note: "低脂高蛋白，适合晚餐。" },
  { id: "salmon", name: "三文鱼", type: "protein", carbs: 0, protein: 20, fat: 13, kcal: 208, units: [{ label: "一块", grams: 120 }], note: "优质脂肪较高，需要计入脂肪预算。" },
  { id: "shrimp", name: "虾", type: "protein", carbs: 0, protein: 20, fat: 1, kcal: 100, units: [{ label: "一份", grams: 150 }], note: "低脂蛋白，适合减脂。" },
  { id: "egg", name: "鸡蛋", type: "protein", carbs: 1.1, protein: 13, fat: 10, kcal: 155, units: [{ label: "1个", grams: 50 }], note: "蛋白和脂肪一起提供，不适合无限加。" },
  { id: "egg_white", name: "蛋清", type: "protein", carbs: 0.7, protein: 11, fat: 0.2, kcal: 52, units: [{ label: "1个蛋清", grams: 33 }], note: "补蛋白时很好用。" },
  { id: "tofu", name: "豆腐", type: "protein", carbs: 2, protein: 8, fat: 4.8, kcal: 80, units: [{ label: "半盒", grams: 200 }], note: "植物蛋白，蛋白密度低于肉类。" },
  { id: "dried_tofu", name: "豆干", type: "protein", carbs: 10, protein: 16, fat: 8, kcal: 170, units: [{ label: "一份", grams: 100 }], note: "蛋白较高，但钠和油要注意。" },
  { id: "milk", name: "牛奶", type: "protein", carbs: 5, protein: 3.4, fat: 3.6, kcal: 60, units: [{ label: "一杯", grams: 250 }], note: "早餐或加餐常见。" },
  { id: "yogurt", name: "酸奶", type: "protein", carbs: 6, protein: 4, fat: 3, kcal: 70, units: [{ label: "一杯", grams: 200 }], note: "注意含糖酸奶。" },
  { id: "duck", name: "鸭肉", type: "protein", carbs: 0, protein: 19, fat: 28, kcal: 330, units: [{ label: "一掌", grams: 100 }], note: "脂肪偏高，烧鸭尤其要控量。" },

  { id: "broccoli", name: "西兰花", type: "veg", carbs: 7, protein: 3, fat: 0.4, kcal: 35, units: [{ label: "一份", grams: 200 }], note: "高纤维，适合减脂。" },
  { id: "spinach", name: "菠菜", type: "veg", carbs: 3, protein: 2.9, fat: 0.4, kcal: 23, units: [{ label: "一把", grams: 150 }], note: "热量低，适合增加菜量。" },
  { id: "tomato", name: "番茄", type: "veg", carbs: 4, protein: 1, fat: 0.2, kcal: 20, units: [{ label: "1个", grams: 150 }], note: "适合搭配鸡蛋和牛肉。" },
  { id: "cabbage", name: "卷心菜", type: "veg", carbs: 6, protein: 1.3, fat: 0.1, kcal: 25, units: [{ label: "一份", grams: 200 }], note: "低热量蔬菜。" },
  { id: "pepper", name: "青椒", type: "veg", carbs: 6, protein: 1, fat: 0.3, kcal: 30, units: [{ label: "1个", grams: 120 }], note: "常见配菜。" },
  { id: "cucumber", name: "黄瓜", type: "veg", carbs: 3.6, protein: 0.7, fat: 0.1, kcal: 16, units: [{ label: "1根", grams: 180 }], note: "低热量，可做加餐。" },
  { id: "lettuce", name: "生菜", type: "veg", carbs: 2.9, protein: 1.4, fat: 0.2, kcal: 15, units: [{ label: "一份", grams: 150 }], note: "适合沙拉和卷肉。" },
  { id: "bok_choy", name: "小白菜", type: "veg", carbs: 2.2, protein: 1.5, fat: 0.2, kcal: 14, units: [{ label: "一份", grams: 200 }], note: "炒菜时注意油量。" },
  { id: "mushroom", name: "蘑菇", type: "veg", carbs: 3.3, protein: 3.1, fat: 0.3, kcal: 22, units: [{ label: "一份", grams: 150 }], note: "热量低，适合增加体积。" },
  { id: "cauliflower", name: "花菜", type: "veg", carbs: 5, protein: 1.9, fat: 0.3, kcal: 25, units: [{ label: "一份", grams: 200 }], note: "饱腹感较好。" },
];

const dishes = [
  "番茄炒蛋", "青椒牛肉", "宫保鸡丁", "鱼香肉丝", "回锅肉", "红烧肉", "红烧排骨", "糖醋里脊", "清蒸鱼", "水煮鱼",
  "水煮牛肉", "麻婆豆腐", "干煸四季豆", "蒜蓉西兰花", "炒青菜", "土豆丝", "酸辣土豆丝", "鸡蛋炒饭", "牛肉炒饭", "扬州炒饭",
  "蛋炒面", "牛肉面", "鸡汤面", "兰州拉面", "麻辣烫", "冒菜", "火锅", "盖浇饭", "卤肉饭", "叉烧饭",
  "烧鸭饭", "鸡腿饭", "牛肉盖饭", "黄焖鸡米饭", "煎鸡胸", "鸡胸沙拉", "金枪鱼沙拉", "牛排", "烤鱼", "蒸虾",
  "炒虾仁", "滑蛋牛肉", "西红柿牛腩", "冬瓜排骨汤", "紫菜蛋花汤", "皮蛋瘦肉粥", "白粥", "燕麦牛奶", "三明治", "全麦面包",
];

const mealProfiles = {
  three: [
    { id: "breakfast", name: "早餐", ratio: 0.25 },
    { id: "lunch", name: "午餐", ratio: 0.4 },
    { id: "dinner", name: "晚餐", ratio: 0.35 },
  ],
  snack: [
    { id: "breakfast", name: "早餐", ratio: 0.22 },
    { id: "lunch", name: "午餐", ratio: 0.35 },
    { id: "dinner", name: "晚餐", ratio: 0.33 },
    { id: "snack", name: "零食/宵夜额度", ratio: 0.1 },
  ],
};

const activityMap = {
  sedentary: { label: "久坐/基本不运动", factor: 1.2 },
  light: { label: "轻度活动", factor: 1.35 },
  strength: { label: "规律力量训练", factor: 1.55 },
};

const goalMap = {
  mild_cut: { label: "温和减脂", deficit: 300 },
  standard_cut: { label: "标准减脂", deficit: 500 },
  maintain: { label: "维持体重", deficit: 0 },
};

function round(n, digits = 0) {
  const p = Math.pow(10, digits);
  return Math.round((Number(n) || 0) * p) / p;
}

function nearlyEqual(actual, expected, tolerance = 0.5) {
  return Math.abs(actual - expected) <= tolerance;
}

function bmr({ sex, weight, height, age }) {
  const safeWeight = Math.max(Number(weight) || 0, 0);
  const safeHeight = Math.max(Number(height) || 0, 0);
  const safeAge = Math.max(Number(age) || 0, 0);
  const base = 10 * safeWeight + 6.25 * safeHeight - 5 * safeAge;
  return sex === "male" ? base + 5 : base - 161;
}

function gramsFor(food, macro, target) {
  const density = food?.[macro];
  const safeTarget = Math.max(Number(target) || 0, 0);
  if (!density || density <= 0 || safeTarget <= 0) return null;
  return (safeTarget / density) * 100;
}

function unitText(food, grams) {
  if (!grams || grams <= 0 || !food.units?.length) return "—";
  const unit = food.units[0];
  const count = grams / unit.grams;
  if (count < 0.45) return `约半${unit.label}`;
  if (count < 0.85) return `约 2/3 ${unit.label}`;
  if (count < 1.2) return `约 1 ${unit.label}`;
  if (count < 1.7) return `约 1.5 ${unit.label}`;
  if (count < 2.3) return `约 2 ${unit.label}`;
  return `约 ${round(count, 1)} ${unit.label}`;
}

function calculateNutrition(form) {
  const weight = Math.max(Number(form.weight) || 0, 0);
  const height = Math.max(Number(form.height) || 0, 0);
  const age = Math.max(Number(form.age) || 0, 0);
  const selectedActivity = activityMap[form.activity] || activityMap.sedentary;
  const selectedGoal = goalMap[form.goal] || goalMap.standard_cut;
  const BMR = bmr({ sex: form.sex, weight, height, age });
  const TDEE = BMR * selectedActivity.factor;
  const minKcal = form.sex === "male" ? 1500 : 1200;
  const targetKcal = Math.max(TDEE - selectedGoal.deficit, minKcal);
  const protein = weight * 1.8;
  const fat = (targetKcal * 0.25) / 9;
  const carbs = Math.max((targetKcal - protein * 4 - fat * 9) / 4, 0);
  return { BMR, TDEE, kcal: targetKcal, protein, fat, carbs };
}

function runSelfTests() {
  const rice = foods.find((food) => food.id === "rice");
  const chicken = foods.find((food) => food.id === "chicken");
  const egg = foods.find((food) => food.id === "egg");
  const maleDefault = calculateNutrition({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut" });

  return [
    { name: "男性 BMR：85kg / 175cm / 35岁", pass: nearlyEqual(bmr({ sex: "male", weight: 85, height: 175, age: 35 }), 1773.75, 0.01) },
    { name: "女性 BMR：65kg / 165cm / 30岁", pass: nearlyEqual(bmr({ sex: "female", weight: 65, height: 165, age: 30 }), 1370.25, 0.01) },
    { name: "60g 碳水 ≈ 214g 熟米饭", pass: nearlyEqual(gramsFor(rice, "carbs", 60), 214.29, 0.1) },
    { name: "40g 蛋白 ≈ 129g 鸡胸肉", pass: nearlyEqual(gramsFor(chicken, "protein", 40), 129.03, 0.1) },
    { name: "鸡蛋 13g 蛋白 ≈ 100g 鸡蛋", pass: nearlyEqual(gramsFor(egg, "protein", 13), 100, 0.1) },
    { name: "0g 目标不会返回无效克重", pass: gramsFor(rice, "carbs", 0) === null },
    { name: "默认男性目标热量不低于 1500 kcal", pass: maleDefault.kcal >= 1500 },
    { name: "餐次比例合计为 100%", pass: nearlyEqual(mealProfiles.three.reduce((sum, meal) => sum + meal.ratio, 0), 1, 0.001) },
    { name: "零食模式比例合计为 100%", pass: nearlyEqual(mealProfiles.snack.reduce((sum, meal) => sum + meal.ratio, 0), 1, 0.001) },
    { name: "菜肴库包含 50 个常见菜肴", pass: dishes.length === 50 },
    { name: "食材库当前不少于 40 个条目", pass: foods.length >= 40 },
  ];
}

function MiniIcon({ label }) {
  return <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{label}</span>;
}

function CardShell({ children, className = "" }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Badge({ children, tone = "slate" }) {
  const classes = {
    slate: "bg-slate-100 text-slate-700",
    dark: "bg-slate-900 text-white",
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-red-100 text-red-800",
    amber: "bg-amber-100 text-amber-900",
    blue: "bg-blue-100 text-blue-800",
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes[tone] || classes.slate}`}>{children}</span>;
}

function MacroPill({ label, value, suffix = "g" }) {
  return (
    <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-900">{value}{suffix}</div>
    </div>
  );
}

function FieldLabel({ children }) {
  return <label className="text-sm font-medium text-slate-600">{children}</label>;
}

function SelectField({ value, onChange, options }) {
  return (
    <select className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}

function NumberField({ value, onChange }) {
  return <input className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" type="number" value={value} min="0" onChange={(event) => onChange(event.target.value)} />;
}

function FoodCard({ food, target, macro }) {
  const grams = gramsFor(food, macro, target);
  if (!grams) return null;
  const macroLabel = macro === "carbs" ? "碳水" : macro === "protein" ? "蛋白质" : "脂肪";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-900">{food.name}</div>
          <div className="mt-1 text-sm text-slate-500">{food.note}</div>
        </div>
        <Badge>{macroLabel}</Badge>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">实际克重</div>
          <div className="text-lg font-semibold">{round(grams)}g</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">生活单位</div>
          <div className="text-lg font-semibold">{unitText(food, grams)}</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-500">每100g：碳水 {food.carbs}g / 蛋白 {food.protein}g / 脂肪 {food.fat}g</div>
    </div>
  );
}

function MealCard({ meal, dailyMacros }) {
  const target = {
    carbs: dailyMacros.carbs * meal.ratio,
    protein: dailyMacros.protein * meal.ratio,
    fat: dailyMacros.fat * meal.ratio,
    kcal: dailyMacros.kcal * meal.ratio,
  };
  const carbFoods = foods.filter((food) => food.type === "carb");
  const proteinFoods = foods.filter((food) => food.type === "protein");

  return (
    <CardShell className="overflow-hidden">
      <div className="bg-slate-900 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xl font-semibold">{meal.name}</div>
            <div className="mt-1 text-sm text-slate-300">占全天 {round(meal.ratio * 100)}%</div>
          </div>
          <MiniIcon label="餐" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          <div className="rounded-xl bg-white/10 p-2"><div className="text-xs">热量</div><div className="font-semibold">{round(target.kcal)}</div></div>
          <div className="rounded-xl bg-white/10 p-2"><div className="text-xs">碳水</div><div className="font-semibold">{round(target.carbs)}g</div></div>
          <div className="rounded-xl bg-white/10 p-2"><div className="text-xs">蛋白</div><div className="font-semibold">{round(target.protein)}g</div></div>
          <div className="rounded-xl bg-white/10 p-2"><div className="text-xs">脂肪</div><div className="font-semibold">{round(target.fat)}g</div></div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <MiniIcon label="主" />
          <h3 className="font-semibold">主食选择：任选一种</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {carbFoods.slice(0, 6).map((food) => <FoodCard key={food.id} food={food} target={target.carbs} macro="carbs" />)}
        </div>

        <div className="mb-3 mt-6 flex items-center gap-2">
          <MiniIcon label="蛋" />
          <h3 className="font-semibold">蛋白质选择：任选一种</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {proteinFoods.slice(0, 6).map((food) => <FoodCard key={food.id} food={food} target={target.protein} macro="protein" />)}
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">脂肪策略：系统内部按本餐约 {round(target.fat)}g 脂肪上限控制。用户执行层不要求精算油脂，默认建议正常炒菜、少油汤、避免肥肉和油炸。</div>
      </div>
    </CardShell>
  );
}

function DishesPanel() {
  return (
    <CardShell>
      <div className="p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">常见菜肴库（50个）</h2>
          <Badge tone="blue">下一步：拆解成食材 + 克重 + 营养</Badge>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {dishes.map((name) => <div key={name} className="rounded-2xl bg-slate-50 p-4 text-sm">{name}</div>)}
        </div>
      </div>
    </CardShell>
  );
}

function ShoppingList() {
  return (
    <CardShell>
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <MiniIcon label="购" />
          <h2 className="text-xl font-semibold">示例采购清单逻辑</h2>
        </div>
        <p className="mb-4 text-sm text-slate-600">第一版可以先根据一日菜单合并食材。第二版扩展到一周，并根据用户常吃菜自动去重。</p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4"><div className="font-semibold">主食</div><ul className="mt-2 space-y-1 text-sm text-slate-600"><li>大米 / 红薯 / 面条</li><li>按一周碳水目标合并</li></ul></div>
          <div className="rounded-2xl bg-slate-50 p-4"><div className="font-semibold">蛋白质</div><ul className="mt-2 space-y-1 text-sm text-slate-600"><li>鸡胸 / 牛肉 / 鱼 / 鸡蛋</li><li>按用户偏好和预算组合</li></ul></div>
          <div className="rounded-2xl bg-slate-50 p-4"><div className="font-semibold">蔬菜与调味</div><ul className="mt-2 space-y-1 text-sm text-slate-600"><li>青菜 300–500g/天</li><li>少油、少糖、高纤维优先</li></ul></div>
        </div>
      </div>
    </CardShell>
  );
}

function TestPanel() {
  const tests = useMemo(() => runSelfTests(), []);
  const passed = tests.filter((test) => test.pass).length;
  const allPassed = passed === tests.length;

  return (
    <CardShell>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">核心逻辑自检</h2>
          <Badge tone={allPassed ? "green" : "red"}>{passed}/{tests.length} 通过</Badge>
        </div>
        <div className="space-y-2">
          {tests.map((test) => (
            <div key={test.name} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm">
              <span>{test.name}</span>
              <span className={test.pass ? "font-semibold text-emerald-700" : "font-semibold text-red-700"}>{test.pass ? "PASS" : "FAIL"}</span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

export default function NutritionWebToolMVP() {
  const [activeTab, setActiveTab] = useState("meals");
  const [form, setForm] = useState({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut", mealMode: "three" });

  const result = useMemo(() => calculateNutrition(form), [form]);
  const meals = mealProfiles[form.mealMode] || mealProfiles.three;
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const tabs = [
    { id: "meals", label: "每餐方案" },
    { id: "dishes", label: "菜肴层" },
    { id: "shopping", label: "采购清单" },
    { id: "tests", label: "自检" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge tone="dark">MVP Prototype</Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">AI 生活化减脂配餐工具</h1>
              <p className="mt-3 max-w-3xl text-slate-600">第一版原型：用户输入身体数据，系统自动计算每日碳蛋脂目标，再把纯营养克数换算成食材实际克重和生活单位。</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">拍照识别：后续</button>
              <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm">重新计算</button>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          <CardShell className="h-fit lg:col-span-4">
            <div className="p-5">
              <div className="mb-4 flex items-center gap-2"><MiniIcon label="算" /><h2 className="text-xl font-semibold">用户数据</h2></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><FieldLabel>性别</FieldLabel><SelectField value={form.sex} onChange={(value) => set("sex", value)} options={[{ value: "male", label: "男性" }, { value: "female", label: "女性" }]} /></div>
                <div><FieldLabel>年龄</FieldLabel><NumberField value={form.age} onChange={(value) => set("age", value)} /></div>
                <div><FieldLabel>身高 cm</FieldLabel><NumberField value={form.height} onChange={(value) => set("height", value)} /></div>
                <div className="col-span-2"><FieldLabel>体重 kg</FieldLabel><NumberField value={form.weight} onChange={(value) => set("weight", value)} /></div>
                <div className="col-span-2"><FieldLabel>活动水平</FieldLabel><SelectField value={form.activity} onChange={(value) => set("activity", value)} options={Object.entries(activityMap).map(([value, item]) => ({ value, label: item.label }))} /></div>
                <div className="col-span-2"><FieldLabel>目标</FieldLabel><SelectField value={form.goal} onChange={(value) => set("goal", value)} options={Object.entries(goalMap).map(([value, item]) => ({ value, label: item.label }))} /></div>
                <div className="col-span-2"><FieldLabel>餐次模式</FieldLabel><SelectField value={form.mealMode} onChange={(value) => set("mealMode", value)} options={[{ value: "three", label: "三餐" }, { value: "snack", label: "三餐 + 零食/宵夜额度" }]} /></div>
              </div>
              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">当前营养数据为原型内置示例。正式版应导入 USDA / 中国食物成分表等权威数据库，并固化版本。</div>
            </div>
          </CardShell>

          <div className="space-y-5 lg:col-span-8">
            <CardShell>
              <div className="p-5">
                <h2 className="mb-4 text-xl font-semibold">计算结果</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                  <MacroPill label="基础代谢" value={round(result.BMR)} suffix=" kcal" />
                  <MacroPill label="日常消耗" value={round(result.TDEE)} suffix=" kcal" />
                  <MacroPill label="目标热量" value={round(result.kcal)} suffix=" kcal" />
                  <MacroPill label="蛋白质" value={round(result.protein)} />
                  <MacroPill label="碳水" value={round(result.carbs)} />
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">脂肪预算</div><div className="text-2xl font-semibold">{round(result.fat)}g</div><div className="mt-1 text-xs text-slate-500">用户层不强制精算，系统层用于控风险。</div></div>
                  <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2"><div className="text-sm text-slate-500">默认规则</div><div className="mt-1 text-sm leading-6 text-slate-700">蛋白质按体重 × 1.8g；脂肪按目标热量 25%；剩余热量给碳水。减脂默认热量缺口 500 kcal，并设置最低热量保护。</div></div>
                </div>
              </div>
            </CardShell>

            <div>
              <div className="mb-5 flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm">
                {tabs.map((tab) => <button key={tab.id} className={`rounded-xl px-4 py-2 text-sm font-medium ${activeTab === tab.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}
              </div>
              <div className="space-y-5">
                {activeTab === "meals" && meals.map((meal) => <MealCard key={meal.id} meal={meal} dailyMacros={result} />)}
                {activeTab === "dishes" && <DishesPanel />}
                {activeTab === "shopping" && <ShoppingList />}
                {activeTab === "tests" && <TestPanel />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
