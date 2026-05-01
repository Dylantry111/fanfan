import React, { useMemo, useState } from "react";

const foods = [
  { id: "rice", name: "熟米饭", type: "carb", carbs: 28, protein: 2.6, fat: 0.3, kcal: 130, units: [{ label: "家用小碗", grams: 110 }, { label: "外卖饭盒", grams: 160 }], note: "适合日常主食，外卖常见。", shortHint: "小碗米饭" },
  { id: "noodle", name: "面条", type: "carb", carbs: 25, protein: 4, fat: 1, kcal: 138, units: [{ label: "标准面碗", grams: 220 }], note: "一碗面通常主食量偏高。", shortHint: "半碗到一碗面量" },
  { id: "mantou", name: "馒头", type: "carb", carbs: 47, protein: 7, fat: 1, kcal: 223, units: [{ label: "1个", grams: 100 }], note: "同等碳水下，比米饭实际克重少。", shortHint: "1个中等馒头" },
  { id: "baozi", name: "包子", type: "carb", carbs: 30, protein: 6, fat: 5, kcal: 200, units: [{ label: "1个", grams: 120 }], note: "含馅料，脂肪和热量波动较大。", shortHint: "1个常规肉包" },
  { id: "bread", name: "面包", type: "carb", carbs: 50, protein: 8, fat: 4, kcal: 260, units: [{ label: "1片", grams: 30 }], note: "早餐常见，注意甜面包脂肪糖分更高。", shortHint: "切片面包" },
  { id: "oats", name: "燕麦", type: "carb", carbs: 60, protein: 13, fat: 7, kcal: 380, units: [{ label: "1份", grams: 50 }], note: "适合早餐，饱腹感较好。", shortHint: "4-5勺干燕麦" },
  { id: "sweet_potato", name: "红薯", type: "carb", carbs: 20, protein: 1.6, fat: 0.1, kcal: 90, units: [{ label: "1个", grams: 220 }], note: "饱腹感强，适合减脂。", shortHint: "1个中等红薯" },
  { id: "potato", name: "土豆", type: "carb", carbs: 17, protein: 2, fat: 0.1, kcal: 77, units: [{ label: "1个", grams: 180 }], note: "蒸煮更适合，油炸不适合。", shortHint: "1个中等土豆" },
  { id: "corn", name: "玉米", type: "carb", carbs: 21, protein: 3.4, fat: 1.2, kcal: 96, units: [{ label: "1根", grams: 200 }], note: "可替代部分主食。", shortHint: "1根玉米" },
  { id: "rice_noodle", name: "米粉", type: "carb", carbs: 26, protein: 3, fat: 0.5, kcal: 120, units: [{ label: "标准汤粉碗", grams: 200 }], note: "汤粉类容易低估主食量。", shortHint: "小半碗到一碗粉" },
  { id: "porridge", name: "白粥", type: "carb", carbs: 10, protein: 1.1, fat: 0.1, kcal: 45, units: [{ label: "1碗", grams: 250 }], note: "水分高，同等碳水需要更大克重。", shortHint: "1碗白粥" },
  { id: "dumpling", name: "饺子", type: "carb", carbs: 28, protein: 8, fat: 8, kcal: 220, units: [{ label: "6个", grams: 150 }], note: "主食和肉馅混合，脂肪波动较大。", shortHint: "6个家常饺子" },
  { id: "wonton", name: "馄饨", type: "carb", carbs: 22, protein: 7, fat: 6, kcal: 180, units: [{ label: "1碗", grams: 220 }], note: "注意汤底和油泼。", shortHint: "1碗馄饨" },
  { id: "whole_wheat_bread", name: "全麦面包", type: "carb", carbs: 43, protein: 10, fat: 4, kcal: 250, units: [{ label: "1片", grams: 35 }], note: "优先选配料简单的。", shortHint: "2片以内" },
  { id: "pumpkin", name: "南瓜", type: "carb", carbs: 7, protein: 1, fat: 0.1, kcal: 30, units: [{ label: "1块", grams: 200 }], note: "碳水密度低，可增加饱腹感。", shortHint: "1大块蒸南瓜" },

  { id: "chicken", name: "鸡胸肉", type: "protein", carbs: 0, protein: 31, fat: 3.6, kcal: 165, units: [{ label: "1掌心", grams: 120 }], note: "高蛋白低脂，最稳的减脂肉类。", shortHint: "1掌心厚度" },
  { id: "chicken_leg", name: "鸡腿肉", type: "protein", carbs: 0, protein: 24, fat: 10, kcal: 190, units: [{ label: "1只去骨鸡腿", grams: 130 }], note: "比鸡胸脂肪高，去皮更合适。", shortHint: "1只去骨鸡腿" },
  { id: "beef", name: "牛肉", type: "protein", carbs: 0, protein: 26, fat: 15, kcal: 250, units: [{ label: "1掌心", grams: 100 }], note: "蛋白质高，脂肪视部位差异较大。", shortHint: "1掌心牛肉" },
  { id: "lean_beef", name: "瘦牛肉", type: "protein", carbs: 0, protein: 26, fat: 8, kcal: 180, units: [{ label: "1掌心", grams: 100 }], note: "比普通牛肉更适合减脂期。", shortHint: "1掌心瘦牛肉" },
  { id: "pork", name: "瘦猪肉", type: "protein", carbs: 0, protein: 27, fat: 10, kcal: 200, units: [{ label: "1掌心", grams: 100 }], note: "选择里脊、瘦肉更合适。", shortHint: "1掌心瘦肉" },
  { id: "pork_rib", name: "排骨", type: "protein", carbs: 0, protein: 18, fat: 23, kcal: 290, units: [{ label: "3块", grams: 120 }], note: "脂肪较高，减脂期控制份量。", shortHint: "3块排骨" },
  { id: "fish", name: "鱼肉", type: "protein", carbs: 0, protein: 22, fat: 2, kcal: 110, units: [{ label: "1块", grams: 150 }], note: "低脂高蛋白，适合晚餐。", shortHint: "1大块鱼肉" },
  { id: "salmon", name: "三文鱼", type: "protein", carbs: 0, protein: 20, fat: 13, kcal: 208, units: [{ label: "1块", grams: 120 }], note: "优质脂肪较高，需要计入脂肪预算。", shortHint: "1块三文鱼" },
  { id: "shrimp", name: "虾", type: "protein", carbs: 0, protein: 20, fat: 1, kcal: 100, units: [{ label: "1份", grams: 150 }], note: "低脂蛋白，适合减脂。", shortHint: "10-12只中虾" },
  { id: "egg", name: "鸡蛋", type: "protein", carbs: 1.1, protein: 13, fat: 10, kcal: 155, units: [{ label: "1个", grams: 50 }], note: "蛋白和脂肪一起提供，不适合无限加。", shortHint: "1个鸡蛋" },
  { id: "egg_white", name: "蛋清", type: "protein", carbs: 0.7, protein: 11, fat: 0.2, kcal: 52, units: [{ label: "1个蛋清", grams: 33 }], note: "补蛋白时很好用。", shortHint: "1个蛋清" },
  { id: "tofu", name: "豆腐", type: "protein", carbs: 2, protein: 8, fat: 4.8, kcal: 80, units: [{ label: "半盒", grams: 200 }], note: "植物蛋白，蛋白密度低于肉类。", shortHint: "半盒嫩豆腐" },
  { id: "dried_tofu", name: "豆干", type: "protein", carbs: 10, protein: 16, fat: 8, kcal: 170, units: [{ label: "1份", grams: 100 }], note: "蛋白较高，但钠和油要注意。", shortHint: "1小包豆干" },
  { id: "milk", name: "牛奶", type: "protein", carbs: 5, protein: 3.4, fat: 3.6, kcal: 60, units: [{ label: "1盒/杯", grams: 250 }], note: "早餐或加餐常见。", shortHint: "1盒纯牛奶" },
  { id: "yogurt", name: "酸奶", type: "protein", carbs: 6, protein: 4, fat: 3, kcal: 70, units: [{ label: "1杯", grams: 200 }], note: "注意含糖酸奶。", shortHint: "1杯无糖酸奶" },
  { id: "duck", name: "鸭肉", type: "protein", carbs: 0, protein: 19, fat: 28, kcal: 330, units: [{ label: "1掌心", grams: 100 }], note: "脂肪偏高，烧鸭尤其要控量。", shortHint: "1掌心鸭肉" },
];

const dishGuides = [
  { name: "黄焖鸡米饭", scene: "外卖高频", risk: "主食和酱汁容易超标，鸡皮和额外土豆会把热量继续抬高。", how: ["米饭减到半份或小半碗", "优先挑鸡腿肉本体，少喝酱汁", "加一份青菜补体积感"], fit: "减脂 / 维持" },
  { name: "番茄炒蛋", scene: "家常菜", risk: "看起来清淡，但鸡蛋数量和炒油会决定脂肪高低。", how: ["蛋控制在 2-3 个", "配一份明确主食，不要边吃边补", "如果蛋白不足，旁边加虾或鸡胸"], fit: "维持 / 增肌" },
  { name: "麻辣烫 / 冒菜", scene: "自由选菜", risk: "汤底、丸子、宽粉和芝麻酱最容易让热量失控。", how: ["先选虾、鱼片、鸡胸、豆腐", "主食只留 1 份粉/面/土豆", "丸子、肥牛、芝麻酱三选一，不要全上"], fit: "减脂 / 维持" },
  { name: "火锅", scene: "社交聚餐", risk: "不是火锅本身危险，是无意识续肉、蘸料和主食叠加危险。", how: ["先下蔬菜和瘦肉，后吃主食", "蘸料以酱油、醋、蒜为主", "把肥牛、丸滑、甜饮控制成点缀"], fit: "减脂 / 维持 / 增肌" },
  { name: "牛肉面", scene: "一餐解决", risk: "面量往往已经够两顿主食，牛肉却不一定够蛋白。", how: ["先判断面量，默认按高碳水处理", "如果想吃得稳，补 1 份蛋或牛肉", "晚餐再减少主食、补蔬菜和蛋白"], fit: "减脂 / 增肌" },
  { name: "烧鸭饭 / 叉烧饭", scene: "盖饭快餐", risk: "脂肪高，酱汁和双拼很容易直接超出脂肪预算。", how: ["米饭减量", "优先单拼，不要双拼", "当天其他餐把额外油脂压低"], fit: "维持" },
];

const correctionRules = [
  { title: "午饭超了怎么办", desc: "晚饭先减主食，不要再减蛋白。把修正重点放在碳水和油脂，不要直接饿过头。" },
  { title: "晚上想吃宵夜怎么办", desc: "优先用酸奶、蛋白奶、蛋清、虾、黄瓜这类高饱腹低负担组合，别再补第二份主食。" },
  { title: "今天蛋白不够怎么补", desc: "补蛋白优先顺序：鸡胸 / 虾 / 鱼 / 蛋清 / 无糖酸奶。不要用奶茶、坚果、蛋糕假装补营养。" },
  { title: "外卖点餐默认规则", desc: "先定蛋白，再定主食，最后补蔬菜；主食和酱汁不同时放开，是最稳的外卖策略。" },
];

const presetPlans = {
  balanced_three: { label: "均衡三餐", mealMode: "three", ratios: { breakfast: 30, lunch: 40, dinner: 30 } },
  lunch_focus: { label: "午餐主战场", mealMode: "three", ratios: { breakfast: 25, lunch: 45, dinner: 30 } },
  snack_plan: { label: "带宵夜额度", mealMode: "snack", ratios: { breakfast: 25, lunch: 40, dinner: 25, snack: 10 } },
  training_plan: { label: "训练后偏晚餐", mealMode: "snack", ratios: { breakfast: 20, lunch: 35, dinner: 35, snack: 10 } },
};

const mealProfiles = {
  three: [
    { id: "breakfast", name: "早餐" },
    { id: "lunch", name: "午餐" },
    { id: "dinner", name: "晚餐" },
  ],
  snack: [
    { id: "breakfast", name: "早餐" },
    { id: "lunch", name: "午餐" },
    { id: "dinner", name: "晚餐" },
    { id: "snack", name: "零食/宵夜" },
  ],
};

const activityMap = {
  sedentary: { label: "久坐/基本不运动", factor: 1.2 },
  light: { label: "轻度活动", factor: 1.35 },
  strength: { label: "规律力量训练", factor: 1.55 },
};

const goalMap = {
  mild_cut: { label: "温和减脂", deficit: 300, proteinFactor: 1.8, fatRatio: 0.25, minKcalMale: 1500, minKcalFemale: 1200 },
  standard_cut: { label: "标准减脂", deficit: 500, proteinFactor: 1.9, fatRatio: 0.25, minKcalMale: 1500, minKcalFemale: 1200 },
  maintain: { label: "维持体重", deficit: 0, proteinFactor: 1.6, fatRatio: 0.27, minKcalMale: 1600, minKcalFemale: 1300 },
  lean_gain: { label: "干净增肌", deficit: -250, proteinFactor: 2, fatRatio: 0.25, minKcalMale: 1700, minKcalFemale: 1400 },
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

function formatLifestyleUnit(food, grams) {
  if (!grams || grams <= 0 || !food.units?.length) return "—";
  const unit = food.units[0];
  const count = grams / unit.grams;
  const roundedCount = round(count, count < 2 ? 1 : 0);
  const countText = roundedCount === 1 ? "约 1 份" : `约 ${roundedCount} 份`;
  return `${countText} ${unit.label}${food.shortHint ? ` · ${food.shortHint}` : ""}`;
}

function calculateNutrition(form) {
  const weight = Math.max(Number(form.weight) || 0, 0);
  const height = Math.max(Number(form.height) || 0, 0);
  const age = Math.max(Number(form.age) || 0, 0);
  const selectedActivity = activityMap[form.activity] || activityMap.sedentary;
  const selectedGoal = goalMap[form.goal] || goalMap.standard_cut;
  const BMR = bmr({ sex: form.sex, weight, height, age });
  const TDEE = BMR * selectedActivity.factor;
  const minKcal = form.sex === "male" ? selectedGoal.minKcalMale : selectedGoal.minKcalFemale;
  const targetKcal = Math.max(TDEE - selectedGoal.deficit, minKcal);
  const protein = weight * selectedGoal.proteinFactor;
  const fat = (targetKcal * selectedGoal.fatRatio) / 9;
  const carbs = Math.max((targetKcal - protein * 4 - fat * 9) / 4, 0);
  return { BMR, TDEE, kcal: targetKcal, protein, fat, carbs };
}

function runSelfTests() {
  const rice = foods.find((food) => food.id === "rice");
  const chicken = foods.find((food) => food.id === "chicken");
  const egg = foods.find((food) => food.id === "egg");
  const maleDefault = calculateNutrition({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut" });
  const leanGain = calculateNutrition({ sex: "male", age: 30, height: 178, weight: 75, activity: "strength", goal: "lean_gain" });

  return [
    { name: "男性 BMR：85kg / 175cm / 35岁", pass: nearlyEqual(bmr({ sex: "male", weight: 85, height: 175, age: 35 }), 1773.75, 0.01) },
    { name: "女性 BMR：65kg / 165cm / 30岁", pass: nearlyEqual(bmr({ sex: "female", weight: 65, height: 165, age: 30 }), 1370.25, 0.01) },
    { name: "60g 碳水 ≈ 214g 熟米饭", pass: nearlyEqual(gramsFor(rice, "carbs", 60), 214.29, 0.1) },
    { name: "40g 蛋白 ≈ 129g 鸡胸肉", pass: nearlyEqual(gramsFor(chicken, "protein", 40), 129.03, 0.1) },
    { name: "鸡蛋 13g 蛋白 ≈ 100g 鸡蛋", pass: nearlyEqual(gramsFor(egg, "protein", 13), 100, 0.1) },
    { name: "0g 目标不会返回无效克重", pass: gramsFor(rice, "carbs", 0) === null },
    { name: "默认男性目标热量不低于保护线", pass: maleDefault.kcal >= 1500 },
    { name: "增肌模式热量高于维持逻辑", pass: leanGain.kcal > leanGain.protein * 4 },
    { name: "标准三餐比例合计为100%", pass: Object.values(presetPlans.balanced_three.ratios).reduce((sum, value) => sum + value, 0) === 100 },
    { name: "宵夜模式比例合计为100%", pass: Object.values(presetPlans.snack_plan.ratios).reduce((sum, value) => sum + value, 0) === 100 },
    { name: "菜肴建议至少 6 条", pass: dishGuides.length >= 6 },
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

function MacroPill({ label, value, suffix = "g", hint }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm">
      <div className="text-xs font-medium tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value}{suffix}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
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

function NumberField({ value, onChange, max = undefined }) {
  return <input className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" type="number" value={value} min="0" max={max} onChange={(event) => onChange(event.target.value)} />;
}

function FoodCompactCard({ food, target, macro }) {
  const grams = gramsFor(food, macro, target);
  if (!grams) return null;
  const macroLabel = macro === "carbs" ? "主食" : "蛋白";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-slate-900">{food.name}</div>
          <div className="mt-1 text-xs text-slate-500">{macroLabel} · {food.shortHint}</div>
        </div>
        <Badge tone="slate">{macroLabel}</Badge>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-700">
        <span className="font-semibold">{round(grams)}g</span>
        <span className="text-slate-400">/</span>
        <span>{formatLifestyleUnit(food, grams)}</span>
      </div>
      <div className="mt-2 text-xs text-slate-500">每100g：碳水 {food.carbs}g · 蛋白 {food.protein}g · 脂肪 {food.fat}g</div>
    </div>
  );
}

function RatioPlanner({ mealMode, ratios, onRatioChange, onMealModeChange, activePreset, onApplyPreset }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three;
  const total = meals.reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0);
  const valid = total === 100;

  return (
    <CardShell>
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <MiniIcon label="配" />
          <h2 className="text-xl font-semibold">餐次比例</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <FieldLabel>餐次模式</FieldLabel>
            <SelectField
              value={mealMode}
              onChange={onMealModeChange}
              options={[{ value: "three", label: "三餐" }, { value: "snack", label: "三餐 + 宵夜/加餐" }]}
            />
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">当前合计</div>
            <div className={`mt-1 text-2xl font-bold ${valid ? "text-emerald-700" : "text-red-700"}`}>{total}%</div>
            <div className="mt-1 text-xs text-slate-500">{valid ? "比例有效，会按当前比例分配每日目标。" : `还需要调整到 100%，当前差值 ${100 - total > 0 ? `+${100 - total}` : 100 - total}%`}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(presetPlans)
            .filter(([, preset]) => preset.mealMode === mealMode)
            .map(([key, preset]) => (
              <button
                key={key}
                className={`rounded-full px-3 py-2 text-xs font-medium ${activePreset === key ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                onClick={() => onApplyPreset(key)}
              >
                {preset.label}
              </button>
            ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {meals.map((meal) => (
            <div key={meal.id} className="rounded-2xl border border-slate-200 bg-white p-3">
              <FieldLabel>{meal.name}</FieldLabel>
              <NumberField value={ratios[meal.id] ?? 0} max={100} onChange={(value) => onRatioChange(meal.id, value)} />
              <div className="mt-1 text-xs text-slate-500">输入百分比</div>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

function MealCard({ meal, dailyMacros, ratioPercent }) {
  const ratio = Math.max(Number(ratioPercent) || 0, 0) / 100;
  const target = {
    carbs: dailyMacros.carbs * ratio,
    protein: dailyMacros.protein * ratio,
    fat: dailyMacros.fat * ratio,
    kcal: dailyMacros.kcal * ratio,
  };
  const carbFoods = foods.filter((food) => food.type === "carb");
  const proteinFoods = foods.filter((food) => food.type === "protein");

  return (
    <CardShell className="overflow-hidden">
      <div className="bg-slate-900 px-4 py-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">{meal.name}</div>
            <div className="mt-1 text-sm text-slate-300">占全天 {round(ratio * 100)}%</div>
          </div>
          <MiniIcon label="餐" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-2.5"><div className="text-[11px] text-slate-300">热量</div><div className="mt-1 text-base font-semibold">{round(target.kcal)}</div></div>
          <div className="rounded-2xl bg-white/10 p-2.5"><div className="text-[11px] text-slate-300">碳水</div><div className="mt-1 text-base font-semibold">{round(target.carbs)}g</div></div>
          <div className="rounded-2xl bg-white/10 p-2.5"><div className="text-[11px] text-slate-300">蛋白</div><div className="mt-1 text-base font-semibold">{round(target.protein)}g</div></div>
          <div className="rounded-2xl bg-white/10 p-2.5"><div className="text-[11px] text-slate-300">脂肪</div><div className="mt-1 text-base font-semibold">{round(target.fat)}g</div></div>
        </div>
      </div>
      <div className="space-y-4 p-4">
        <section>
          <div className="mb-2 flex items-center gap-2">
            <MiniIcon label="主" />
            <h3 className="font-semibold">主食任选 1 种</h3>
          </div>
          <div className="grid gap-2">
            {carbFoods.slice(0, 5).map((food) => <FoodCompactCard key={food.id} food={food} target={target.carbs} macro="carbs" />)}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2">
            <MiniIcon label="蛋" />
            <h3 className="font-semibold">蛋白任选 1 种</h3>
          </div>
          <div className="grid gap-2">
            {proteinFoods.slice(0, 5).map((food) => <FoodCompactCard key={food.id} food={food} target={target.protein} macro="protein" />)}
          </div>
        </section>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">脂肪策略：本餐约 {round(target.fat)}g 作为上限参考。执行时不要求死磕每一克油脂，默认少油、避开肥肉和油炸即可。</div>
      </div>
    </CardShell>
  );
}

function DishesPanel() {
  return (
    <CardShell>
      <div className="p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">常见吃法怎么选</h2>
            <p className="mt-1 text-sm text-slate-500">不是教你死磕卡路里，而是把常见外卖和家常菜变成更稳的执行策略。</p>
          </div>
          <Badge tone="blue">先看风险，再看替换动作</Badge>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {dishGuides.map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{item.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.scene} · 适合 {item.fit}</div>
                </div>
                <Badge tone="amber">避坑</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.risk}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {item.how.map((line) => <li key={line}>• {line}</li>)}
              </ul>
            </div>
          ))}
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

function ActionPanel() {
  return (
    <CardShell>
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <MiniIcon label="修" />
          <h2 className="text-xl font-semibold">今天吃乱了，怎么修</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {correctionRules.map((item) => (
            <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
              <div className="font-semibold text-slate-900">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  );
}

function TrustPanel() {
  return (
    <CardShell>
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <MiniIcon label="信" />
          <h2 className="text-xl font-semibold">这个参考怎么来的</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-semibold">算法逻辑</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">基础代谢 + 活动系数估算日常消耗，再按目标分配热量、蛋白、脂肪和碳水。</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-semibold">数据来源</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">当前为原型内置示例数据，后续应接入更权威的食物营养数据库并校正常见外卖份量。</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="font-semibold">适用范围</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">适用于日常控饮食、减脂、维持和干净增肌场景，不替代医疗诊断和个体化临床建议。</div>
          </div>
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
  const defaultPreset = presetPlans.balanced_three;
  const [activeTab, setActiveTab] = useState("meals");
  const [form, setForm] = useState({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut", mealMode: defaultPreset.mealMode });
  const [ratios, setRatios] = useState(defaultPreset.ratios);
  const [activePreset, setActivePreset] = useState("balanced_three");

  const result = useMemo(() => calculateNutrition(form), [form]);
  const meals = mealProfiles[form.mealMode] || mealProfiles.three;
  const ratioTotal = meals.reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0);
  const ratioValid = ratioTotal === 100;
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const tabs = [
    { id: "meals", label: "每餐方案" },
    { id: "dishes", label: "日常吃法" },
    { id: "actions", label: "超了怎么修" },
    { id: "shopping", label: "采购清单" },
    { id: "trust", label: "可信度" },
    { id: "tests", label: "自检" },
  ];

  function applyPreset(key) {
    const preset = presetPlans[key];
    if (!preset) return;
    setForm((prev) => ({ ...prev, mealMode: preset.mealMode }));
    setRatios(preset.ratios);
    setActivePreset(key);
  }

  function handleMealModeChange(value) {
    const fallbackKey = value === "snack" ? "snack_plan" : "balanced_three";
    const preset = presetPlans[fallbackKey];
    setForm((prev) => ({ ...prev, mealMode: value }));
    setRatios(preset.ratios);
    setActivePreset(fallbackKey);
  }

  function handleRatioChange(mealId, value) {
    setRatios((prev) => ({ ...prev, [mealId]: Math.max(Number(value) || 0, 0) }));
    setActivePreset(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-4 text-slate-900 sm:px-4 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <CardShell className="overflow-hidden border-none bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4">
              <div>
                <Badge tone="blue">饭饭 · 日常饮食控制助手</Badge>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">把控饮食这件事，变成你每天真的做得到</h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">它不是只告诉你热量和营养素，而是把减脂、维持、增肌目标翻译成更生活化的食材份量、菜肴选择和纠偏动作，让你在外卖、家常菜、聚餐里也能做出更稳的决定。</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs text-slate-300">适用人群</div><div className="mt-1 text-base font-semibold">想控制饮食但不知道怎么做的人</div></div>
                <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs text-slate-300">当前目标</div><div className="mt-1 text-base font-semibold">{goalMap[form.goal]?.label}</div></div>
                <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs text-slate-300">核心输出</div><div className="mt-1 text-base font-semibold">每餐份量 + 日常吃法 + 超标修正</div></div>
              </div>
            </div>
          </div>
        </CardShell>

        <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
          <CardShell className="h-fit lg:sticky lg:top-6 lg:col-span-4">
            <div className="p-5">
              <div className="mb-4 flex items-center gap-2"><MiniIcon label="算" /><h2 className="text-xl font-semibold">你的数据</h2></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><FieldLabel>性别</FieldLabel><SelectField value={form.sex} onChange={(value) => set("sex", value)} options={[{ value: "male", label: "男性" }, { value: "female", label: "女性" }]} /></div>
                <div><FieldLabel>年龄</FieldLabel><NumberField value={form.age} onChange={(value) => set("age", value)} /></div>
                <div><FieldLabel>身高 cm</FieldLabel><NumberField value={form.height} onChange={(value) => set("height", value)} /></div>
                <div className="col-span-2"><FieldLabel>体重 kg</FieldLabel><NumberField value={form.weight} onChange={(value) => set("weight", value)} /></div>
                <div className="col-span-2"><FieldLabel>活动水平</FieldLabel><SelectField value={form.activity} onChange={(value) => set("activity", value)} options={Object.entries(activityMap).map(([value, item]) => ({ value, label: item.label }))} /></div>
                <div className="col-span-2"><FieldLabel>目标</FieldLabel><SelectField value={form.goal} onChange={(value) => set("goal", value)} options={Object.entries(goalMap).map(([value, item]) => ({ value, label: item.label }))} /></div>
              </div>
              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">第一版先解决“今天到底该怎么吃”这个核心问题：把数字翻译成可执行的主食、蛋白、菜肴和纠偏建议。</div>
            </div>
          </CardShell>

          <div className="space-y-5 lg:col-span-8">
            <CardShell>
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">今日目标</h2>
                  <Badge tone="green">已自动计算</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  <MacroPill label="基础代谢" value={round(result.BMR)} suffix=" kcal" hint="静息消耗" />
                  <MacroPill label="日常消耗" value={round(result.TDEE)} suffix=" kcal" hint="含活动量" />
                  <MacroPill label="目标热量" value={round(result.kcal)} suffix=" kcal" hint="按当前目标生成" />
                  <MacroPill label="蛋白质" value={round(result.protein)} hint="优先吃够" />
                  <MacroPill label="碳水" value={round(result.carbs)} hint="主食参考" />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4"><div className="text-sm text-slate-500">脂肪预算</div><div className="mt-1 text-2xl font-semibold">{round(result.fat)}g</div><div className="mt-1 text-xs text-slate-500">执行层不强制精算，用来防止油脂超标。</div></div>
                  <div className="rounded-3xl bg-slate-50 p-4"><div className="text-sm text-slate-500">默认规则</div><div className="mt-1 text-sm leading-6 text-slate-700">不同目标会切换热量和蛋白策略：减脂偏保守、维持更平衡、增肌提高蛋白和总热量。</div></div>
                </div>
              </div>
            </CardShell>

            <RatioPlanner
              mealMode={form.mealMode}
              ratios={ratios}
              onRatioChange={handleRatioChange}
              onMealModeChange={handleMealModeChange}
              activePreset={activePreset}
              onApplyPreset={applyPreset}
            />

            <div className="rounded-3xl bg-white p-2 shadow-sm">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                {tabs.map((tab) => <button key={tab.id} className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${activeTab === tab.id ? "bg-slate-900 text-white shadow-sm" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}
              </div>
            </div>

            {!ratioValid && activeTab === "meals" ? (
              <CardShell>
                <div className="p-5 text-sm leading-6 text-red-700">当前餐次比例合计不是 100%，请先调整到 100% 再查看每餐方案。</div>
              </CardShell>
            ) : null}

            <div className="space-y-5">
              {activeTab === "meals" && ratioValid && meals.map((meal) => <MealCard key={meal.id} meal={meal} dailyMacros={result} ratioPercent={ratios[meal.id]} />)}
              {activeTab === "dishes" && <DishesPanel />}
              {activeTab === "actions" && <ActionPanel />}
              {activeTab === "shopping" && <ShoppingList />}
              {activeTab === "trust" && <TrustPanel />}
              {activeTab === "tests" && <TestPanel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
