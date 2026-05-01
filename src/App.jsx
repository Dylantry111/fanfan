import React, { useMemo, useState } from "react";

const foods = [
  { id: "rice", name: "熟米饭", type: "carb", carbs: 28, protein: 2.6, fat: 0.3, kcal: 130, units: [{ label: "碗", grams: 110 }], note: "适合日常主食，外卖常见。", shortHint: "小碗米饭" },
  { id: "noodle", name: "面条", type: "carb", carbs: 25, protein: 4, fat: 1, kcal: 138, units: [{ label: "碗", grams: 220 }], note: "一碗面通常主食量偏高。", shortHint: "半碗到一碗面量" },
  { id: "mantou", name: "馒头", type: "carb", carbs: 47, protein: 7, fat: 1, kcal: 223, units: [{ label: "个", grams: 100 }], note: "同等碳水下，比米饭实际克重少。", shortHint: "中等馒头" },
  { id: "baozi", name: "包子", type: "carb", carbs: 30, protein: 6, fat: 5, kcal: 200, units: [{ label: "个", grams: 120 }], note: "含馅料，脂肪和热量波动较大。", shortHint: "常规肉包" },
  { id: "bread", name: "面包", type: "carb", carbs: 50, protein: 8, fat: 4, kcal: 260, units: [{ label: "片", grams: 30 }], note: "早餐常见，注意甜面包脂肪糖分更高。", shortHint: "切片面包" },
  { id: "oats", name: "燕麦", type: "carb", carbs: 60, protein: 13, fat: 7, kcal: 380, units: [{ label: "份", grams: 50 }], note: "适合早餐，饱腹感较好。", shortHint: "4-5勺干燕麦" },
  { id: "sweet_potato", name: "红薯", type: "carb", carbs: 20, protein: 1.6, fat: 0.1, kcal: 90, units: [{ label: "个", grams: 220 }], note: "饱腹感强，适合减脂。", shortHint: "中等红薯" },
  { id: "potato", name: "土豆", type: "carb", carbs: 17, protein: 2, fat: 0.1, kcal: 77, units: [{ label: "个", grams: 180 }], note: "蒸煮更适合，油炸不适合。", shortHint: "中等土豆" },
  { id: "corn", name: "玉米", type: "carb", carbs: 21, protein: 3.4, fat: 1.2, kcal: 96, units: [{ label: "根", grams: 200 }], note: "可替代部分主食。", shortHint: "1根玉米" },
  { id: "porridge", name: "白粥", type: "carb", carbs: 10, protein: 1.1, fat: 0.1, kcal: 45, units: [{ label: "碗", grams: 250 }], note: "水分高，同等碳水需要更大克重。", shortHint: "1碗白粥" },
  { id: "dumpling", name: "饺子", type: "carb", carbs: 28, protein: 8, fat: 8, kcal: 220, units: [{ label: "个", grams: 25 }], note: "主食和肉馅混合，脂肪波动较大。", shortHint: "家常饺子" },
  { id: "whole_wheat_bread", name: "全麦面包", type: "carb", carbs: 43, protein: 10, fat: 4, kcal: 250, units: [{ label: "片", grams: 35 }], note: "优先选配料简单的。", shortHint: "全麦切片" },

  { id: "chicken", name: "鸡胸肉", type: "protein", carbs: 0, protein: 31, fat: 3.6, kcal: 165, units: [{ label: "掌心", grams: 120 }], note: "高蛋白低脂，最稳的减脂肉类。", shortHint: "掌心厚度" },
  { id: "chicken_leg", name: "鸡腿肉", type: "protein", carbs: 0, protein: 24, fat: 10, kcal: 190, units: [{ label: "只", grams: 130 }], note: "比鸡胸脂肪高，去皮更合适。", shortHint: "去骨鸡腿" },
  { id: "beef", name: "牛肉", type: "protein", carbs: 0, protein: 26, fat: 15, kcal: 250, units: [{ label: "掌心", grams: 100 }], note: "蛋白质高，脂肪视部位差异较大。", shortHint: "掌心牛肉" },
  { id: "fish", name: "鱼肉", type: "protein", carbs: 0, protein: 22, fat: 2, kcal: 110, units: [{ label: "块", grams: 150 }], note: "低脂高蛋白，适合晚餐。", shortHint: "大块鱼肉" },
  { id: "shrimp", name: "虾", type: "protein", carbs: 0, protein: 20, fat: 1, kcal: 100, units: [{ label: "只", grams: 12 }], note: "低脂蛋白，适合减脂。", shortHint: "中等虾" },
  { id: "egg", name: "鸡蛋", type: "protein", carbs: 1.1, protein: 13, fat: 10, kcal: 155, units: [{ label: "个", grams: 50 }], note: "蛋白和脂肪一起提供，不适合无限加。", shortHint: "鸡蛋" },
  { id: "egg_white", name: "蛋清", type: "protein", carbs: 0.7, protein: 11, fat: 0.2, kcal: 52, units: [{ label: "个", grams: 33 }], note: "补蛋白时很好用。", shortHint: "蛋清" },
  { id: "tofu", name: "豆腐", type: "protein", carbs: 2, protein: 8, fat: 4.8, kcal: 80, units: [{ label: "盒", grams: 400 }], note: "植物蛋白，蛋白密度低于肉类。", shortHint: "盒装豆腐" },
  { id: "milk", name: "牛奶", type: "protein", carbs: 5, protein: 3.4, fat: 3.6, kcal: 60, units: [{ label: "盒", grams: 250 }], note: "早餐或加餐常见。", shortHint: "纯牛奶" },
  { id: "yogurt", name: "酸奶", type: "protein", carbs: 6, protein: 4, fat: 3, kcal: 70, units: [{ label: "杯", grams: 200 }], note: "注意含糖酸奶。", shortHint: "无糖酸奶" },
];

const dishGuides = [
  { name: "黄焖鸡米饭", scene: "外卖高频", risk: "主食和酱汁容易超标。", how: ["米饭减到半份", "少喝酱汁", "补一份青菜"], fit: "减脂 / 维持" },
  { name: "番茄炒蛋", scene: "家常菜", risk: "鸡蛋数量和炒油会决定脂肪高低。", how: ["蛋控制在 2-3 个", "配明确主食", "蛋白不够时加虾或鸡胸"], fit: "维持 / 增肌" },
  { name: "麻辣烫 / 冒菜", scene: "自由选菜", risk: "汤底、丸子、宽粉和芝麻酱最容易失控。", how: ["先选虾、鱼片、鸡胸、豆腐", "主食只留 1 份", "丸子和芝麻酱控制"], fit: "减脂 / 维持" },
  { name: "火锅", scene: "社交聚餐", risk: "无意识续肉、蘸料和主食叠加危险。", how: ["先下蔬菜和瘦肉", "蘸料偏清爽", "肥牛丸滑控制成点缀"], fit: "减脂 / 维持 / 增肌" },
];

const correctionRules = [
  { title: "午饭超了怎么办", desc: "晚饭先减主食，不要再减蛋白。重点修碳水和油脂。" },
  { title: "晚上想吃宵夜怎么办", desc: "优先用酸奶、蛋白奶、蛋清、虾这类高饱腹低负担组合。" },
  { title: "今天蛋白不够怎么补", desc: "鸡胸 / 虾 / 鱼 / 蛋清 / 无糖酸奶，优先补这些。" },
];

const presetPlans = {
  balanced_three: { label: "均衡三餐", mealMode: "three", ratios: { breakfast: 30, lunch: 40, dinner: 30 } },
  snack_plan: { label: "带宵夜额度", mealMode: "snack", ratios: { breakfast: 25, lunch: 40, dinner: 25, snack: 10 } },
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
    { id: "snack", name: "宵夜/加餐" },
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
  const roundedCount = count < 2 ? round(count, 1) : round(count, 0);
  const clean = `${roundedCount}`;

  if (unit.label === "掌心") return `约 ${clean}个掌心大小`;
  if (unit.label === "份") return food.shortHint ? `约 ${clean}份，${food.shortHint}` : `约 ${clean}份`;
  if (unit.label === "盒" && food.id === "tofu") return count < 1 ? `约 ${round(count * 2, 1)}半盒豆腐` : `约 ${clean}盒豆腐`;
  if (unit.label === "只" && food.id === "shrimp") return `约 ${clean}只中虾`;
  return `约 ${clean}${unit.label}${food.shortHint ? `，${food.shortHint}` : ""}`;
}

function runSelfTests() {
  const rice = foods.find((food) => food.id === "rice");
  const chicken = foods.find((food) => food.id === "chicken");
  const egg = foods.find((food) => food.id === "egg");
  const maleDefault = calculateNutrition({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut" });
  return [
    { name: "男性 BMR：85kg / 175cm / 35岁", pass: nearlyEqual(bmr({ sex: "male", weight: 85, height: 175, age: 35 }), 1773.75, 0.01) },
    { name: "60g 碳水 ≈ 214g 熟米饭", pass: nearlyEqual(gramsFor(rice, "carbs", 60), 214.29, 0.1) },
    { name: "40g 蛋白 ≈ 129g 鸡胸肉", pass: nearlyEqual(gramsFor(chicken, "protein", 40), 129.03, 0.1) },
    { name: "鸡蛋 13g 蛋白 ≈ 100g 鸡蛋", pass: nearlyEqual(gramsFor(egg, "protein", 13), 100, 0.1) },
    { name: "默认男性目标热量不低于保护线", pass: maleDefault.kcal >= 1500 },
    { name: "标准三餐比例合计为100%", pass: Object.values(presetPlans.balanced_three.ratios).reduce((sum, value) => sum + value, 0) === 100 },
  ];
}

function CardShell({ children, className = "" }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function Badge({ children, tone = "slate" }) {
  const classes = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    amber: "bg-amber-100 text-amber-900",
    dark: "bg-slate-900 text-white",
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes[tone] || classes.slate}`}>{children}</span>;
}

function MiniButton({ active, children, onClick }) {
  return <button className={`rounded-2xl px-4 py-3 text-sm font-medium ${active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`} onClick={onClick}>{children}</button>;
}

function MacroPill({ label, value, suffix = "", hint }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}{suffix}</div>
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

function SectionTitle({ title, desc }) {
  return (
    <div>
      <div className="text-xl font-semibold text-slate-900">{title}</div>
      {desc ? <div className="mt-1 text-sm text-slate-500">{desc}</div> : null}
    </div>
  );
}

function FoodCard({ food, grams, macro }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-900">{food.name}</div>
          <div className="mt-1 text-xs text-slate-500">{macro === "carbs" ? "主食" : "蛋白"} · {food.note}</div>
        </div>
        <Badge>{macro === "carbs" ? "主食" : "蛋白"}</Badge>
      </div>
      <div className="mt-3 text-lg font-semibold text-slate-900">{round(grams)}g</div>
      <div className="mt-1 text-sm text-slate-600">{formatLifestyleUnit(food, grams)}</div>
      <div className="mt-2 text-xs text-slate-500">每100g：碳水 {food.carbs}g · 蛋白 {food.protein}g · 脂肪 {food.fat}g</div>
    </div>
  );
}

function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-3 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div className="text-lg font-semibold text-slate-900">{title}</div>
          <button className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700" onClick={onClose}>关闭</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function PersonalInfoPage({ form, set, nutrition, mealMode, onMealModeChange, ratios, onRatioChange, activePreset, onApplyPreset }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three;
  const total = meals.reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0);
  const valid = total === 100;

  return (
    <div className="space-y-5">
      <CardShell>
        <div className="p-5">
          <SectionTitle title="个人信息" desc="把基础参数放到一个独立页面，平时不需要频繁修改。" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="col-span-2"><FieldLabel>性别</FieldLabel><SelectField value={form.sex} onChange={(value) => set("sex", value)} options={[{ value: "male", label: "男性" }, { value: "female", label: "女性" }]} /></div>
            <div><FieldLabel>年龄</FieldLabel><NumberField value={form.age} onChange={(value) => set("age", value)} /></div>
            <div><FieldLabel>身高 cm</FieldLabel><NumberField value={form.height} onChange={(value) => set("height", value)} /></div>
            <div className="col-span-2"><FieldLabel>体重 kg</FieldLabel><NumberField value={form.weight} onChange={(value) => set("weight", value)} /></div>
            <div className="col-span-2"><FieldLabel>活动水平</FieldLabel><SelectField value={form.activity} onChange={(value) => set("activity", value)} options={Object.entries(activityMap).map(([value, item]) => ({ value, label: item.label }))} /></div>
            <div className="col-span-2"><FieldLabel>目标</FieldLabel><SelectField value={form.goal} onChange={(value) => set("goal", value)} options={Object.entries(goalMap).map(([value, item]) => ({ value, label: item.label }))} /></div>
          </div>
        </div>
      </CardShell>

      <CardShell>
        <div className="p-5">
          <SectionTitle title="每日目标" desc="这里集中展示代谢与营养目标，不再和每餐操作混在一起。" />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            <MacroPill label="基础代谢" value={round(nutrition.BMR)} suffix=" kcal" hint="静息消耗" />
            <MacroPill label="日常消耗" value={round(nutrition.TDEE)} suffix=" kcal" hint="含活动量" />
            <MacroPill label="目标热量" value={round(nutrition.kcal)} suffix=" kcal" hint="按当前目标生成" />
            <MacroPill label="蛋白质" value={round(nutrition.protein)} suffix="g" hint="优先吃够" />
            <MacroPill label="碳水" value={round(nutrition.carbs)} suffix="g" hint="主食参考" />
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">脂肪预算约 {round(nutrition.fat)}g，用来限制油脂过量，不要求每餐精算。</div>
        </div>
      </CardShell>

      <CardShell>
        <div className="p-5">
          <SectionTitle title="餐次设置" desc="先设好你的习惯分配，后面用餐时直接调用。" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <FieldLabel>餐次模式</FieldLabel>
              <SelectField value={mealMode} onChange={onMealModeChange} options={[{ value: "three", label: "三餐" }, { value: "snack", label: "三餐 + 宵夜/加餐" }]} />
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">当前合计</div>
              <div className={`mt-1 text-2xl font-bold ${valid ? "text-emerald-700" : "text-red-700"}`}>{total}%</div>
              <div className="mt-1 text-xs text-slate-500">{valid ? "已生效" : "需要调到 100% 才会用于推荐"}</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(presetPlans).filter(([, preset]) => preset.mealMode === mealMode).map(([key, preset]) => <MiniButton key={key} active={activePreset === key} onClick={() => onApplyPreset(key)}>{preset.label}</MiniButton>)}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {meals.map((meal) => (
              <div key={meal.id} className="rounded-2xl border border-slate-200 bg-white p-3">
                <FieldLabel>{meal.name}</FieldLabel>
                <NumberField value={ratios[meal.id] ?? 0} max={100} onChange={(value) => onRatioChange(meal.id, value)} />
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    </div>
  );
}

function AdminDataPage() {
  return (
    <div className="space-y-5">
      <CardShell>
        <div className="p-5">
          <SectionTitle title="后台数据" desc="把食材和策略视作后台内容，主流程不直接铺开给用户。" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="font-semibold text-slate-900">食材库</div>
              <div className="mt-2 text-sm text-slate-600">当前共 {foods.length} 条示例食材，前端先以内置数据方式运行，后面可以切到后台管理。</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="font-semibold text-slate-900">菜肴策略</div>
              <div className="mt-2 text-sm text-slate-600">当前共 {dishGuides.length} 条常见吃法建议，可继续扩成可维护的策略模板。</div>
            </div>
          </div>
        </div>
      </CardShell>

      <CardShell>
        <div className="p-5">
          <div className="text-sm font-medium text-slate-500">示例食材</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {foods.map((food) => (
              <div key={food.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="font-semibold text-slate-900">{food.name}</div>
                <div className="mt-1 text-sm text-slate-500">{food.type === "carb" ? "主食" : "蛋白"} · {food.shortHint}</div>
                <div className="mt-2 text-xs text-slate-500">每100g：碳水 {food.carbs}g · 蛋白 {food.protein}g · 脂肪 {food.fat}g</div>
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    </div>
  );
}

function MealFlowModal({ open, onClose, mealMode, ratios, nutrition }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three;
  const [selectedMeal, setSelectedMeal] = useState(meals[0]?.id || "breakfast");
  const activeMeal = meals.find((meal) => meal.id === selectedMeal) || meals[0];
  const ratioPercent = Number(ratios[selectedMeal]) || 0;
  const ratio = ratioPercent / 100;
  const targets = {
    carbs: nutrition.carbs * ratio,
    protein: nutrition.protein * ratio,
    fat: nutrition.fat * ratio,
    kcal: nutrition.kcal * ratio,
  };
  const carbFoods = foods.filter((food) => food.type === "carb").slice(0, 6);
  const proteinFoods = foods.filter((food) => food.type === "protein").slice(0, 6);

  return (
    <Modal open={open} title="开始一餐" onClose={onClose}>
      <div className="space-y-5">
        <SectionTitle title="先选你现在要吃哪一餐" desc="只有在真正要吃的时候，才进入操作流程。" />
        <div className="flex flex-wrap gap-2">
          {meals.map((meal) => <MiniButton key={meal.id} active={selectedMeal === meal.id} onClick={() => setSelectedMeal(meal.id)}>{meal.name}</MiniButton>)}
        </div>

        <CardShell>
          <div className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-slate-900">{activeMeal?.name} 推荐</div>
                <div className="mt-1 text-sm text-slate-500">按你预设的 {ratioPercent}% 比例自动生成</div>
              </div>
              <Badge tone="green">已个性化</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <MacroPill label="热量" value={round(targets.kcal)} suffix=" kcal" />
              <MacroPill label="碳水" value={round(targets.carbs)} suffix="g" />
              <MacroPill label="蛋白" value={round(targets.protein)} suffix="g" />
              <MacroPill label="脂肪上限" value={round(targets.fat)} suffix="g" />
            </div>
          </div>
        </CardShell>

        <div className="grid gap-5 lg:grid-cols-2">
          <CardShell>
            <div className="p-5">
              <div className="text-lg font-semibold text-slate-900">主食推荐</div>
              <div className="mt-3 space-y-3">
                {carbFoods.map((food) => {
                  const grams = gramsFor(food, "carbs", targets.carbs);
                  return <FoodCard key={food.id} food={food} grams={grams} macro="carbs" />;
                })}
              </div>
            </div>
          </CardShell>

          <CardShell>
            <div className="p-5">
              <div className="text-lg font-semibold text-slate-900">蛋白推荐</div>
              <div className="mt-3 space-y-3">
                {proteinFoods.map((food) => {
                  const grams = gramsFor(food, "protein", targets.protein);
                  return <FoodCard key={food.id} food={food} grams={grams} macro="protein" />;
                })}
              </div>
            </div>
          </CardShell>
        </div>

        <CardShell>
          <div className="p-5">
            <div className="text-lg font-semibold text-slate-900">这一餐的执行提示</div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">先定蛋白，再选主食，最后补蔬菜。这样最不容易吃乱。</div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">如果这餐是外卖，优先压酱汁和额外油脂，不要同时放开主食和甜饮。</div>
            </div>
          </div>
        </CardShell>
      </div>
    </Modal>
  );
}

function StrategyPage() {
  return (
    <div className="space-y-5">
      <CardShell>
        <div className="p-5">
          <SectionTitle title="日常吃法策略" desc="平时不需要一直打开，作为随时查阅的策略页存在。" />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {dishGuides.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.scene} · 适合 {item.fit}</div>
                  </div>
                  <Badge tone="amber">避坑</Badge>
                </div>
                <div className="mt-3 text-sm text-slate-600">{item.risk}</div>
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {item.how.map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CardShell>

      <CardShell>
        <div className="p-5">
          <div className="text-lg font-semibold text-slate-900">纠偏建议</div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {correctionRules.map((item) => (
              <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">{item.title}</div>
                <div className="mt-2 text-sm text-slate-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </CardShell>
    </div>
  );
}

function TestPage() {
  const tests = useMemo(() => runSelfTests(), []);
  const passed = tests.filter((test) => test.pass).length;
  return (
    <CardShell>
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <SectionTitle title="逻辑自检" desc="保留最小验证页，方便继续开发时快速检查。" />
          <Badge tone={passed === tests.length ? "green" : "red"}>{passed}/{tests.length} 通过</Badge>
        </div>
        <div className="space-y-2">
          {tests.map((test) => (
            <div key={test.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm">
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
  const [page, setPage] = useState("home");
  const [mealFlowOpen, setMealFlowOpen] = useState(false);
  const [form, setForm] = useState({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut" });
  const [mealMode, setMealMode] = useState(defaultPreset.mealMode);
  const [ratios, setRatios] = useState(defaultPreset.ratios);
  const [activePreset, setActivePreset] = useState("balanced_three");

  const nutrition = useMemo(() => calculateNutrition(form), [form]);
  const ratioTotal = (mealProfiles[mealMode] || []).reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0);
  const ratioValid = ratioTotal === 100;
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function applyPreset(key) {
    const preset = presetPlans[key];
    if (!preset) return;
    setMealMode(preset.mealMode);
    setRatios(preset.ratios);
    setActivePreset(key);
  }

  function handleMealModeChange(value) {
    const fallbackKey = value === "snack" ? "snack_plan" : "balanced_three";
    const preset = presetPlans[fallbackKey];
    setMealMode(value);
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Badge tone="blue">饭饭 · 更像 APP 的饮食控制原型</Badge>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">把长页面拆掉，改成更像真实使用流程</h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">基础资料放在个人信息页，食材和策略收进后台/策略页。真正要吃饭时，再打开“开始一餐”弹窗，用更短路径完成推荐和选择。</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm" onClick={() => setMealFlowOpen(true)}>开始一餐</button>
                <button className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white" onClick={() => setPage("personal")}>去个人信息</button>
              </div>
            </div>
          </div>
        </CardShell>

        <div className="rounded-3xl bg-white p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            <MiniButton active={page === "home"} onClick={() => setPage("home")}>首页</MiniButton>
            <MiniButton active={page === "personal"} onClick={() => setPage("personal")}>个人信息</MiniButton>
            <MiniButton active={page === "strategy"} onClick={() => setPage("strategy")}>策略页</MiniButton>
            <MiniButton active={page === "admin"} onClick={() => setPage("admin")}>后台数据</MiniButton>
            <MiniButton active={page === "tests"} onClick={() => setPage("tests")}>自检</MiniButton>
          </div>
        </div>

        {page === "home" && (
          <div className="grid gap-5 lg:grid-cols-3">
            <CardShell className="lg:col-span-2">
              <div className="p-5">
                <SectionTitle title="现在的主流程" desc="不再把全部信息平铺在一个长页面，而是按真实动作拆开。" />
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">1. 先设个人信息</div>
                    <div className="mt-2 text-sm text-slate-600">身高、体重、目标、活动量集中设置一次即可。</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">2. 平时不进长页</div>
                    <div className="mt-2 text-sm text-slate-600">食材库和策略放在独立页面，不干扰主要操作。</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">3. 吃饭时再打开</div>
                    <div className="mt-2 text-sm text-slate-600">进入弹窗，选择早餐/午餐/晚餐，直接看推荐。</div>
                  </div>
                </div>
              </div>
            </CardShell>

            <CardShell>
              <div className="p-5">
                <SectionTitle title="当前状态" desc="首页只保留关键摘要。" />
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">当前目标</div><div className="mt-1 font-semibold text-slate-900">{goalMap[form.goal].label}</div></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">目标热量</div><div className="mt-1 font-semibold text-slate-900">{round(nutrition.kcal)} kcal</div></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">餐次比例</div><div className="mt-1 font-semibold text-slate-900">{ratioValid ? "已配置" : "未完成"}</div></div>
                </div>
              </div>
            </CardShell>
          </div>
        )}

        {page === "personal" && <PersonalInfoPage form={form} set={set} nutrition={nutrition} mealMode={mealMode} onMealModeChange={handleMealModeChange} ratios={ratios} onRatioChange={handleRatioChange} activePreset={activePreset} onApplyPreset={applyPreset} />}
        {page === "strategy" && <StrategyPage />}
        {page === "admin" && <AdminDataPage />}
        {page === "tests" && <TestPage />}
      </div>

      <MealFlowModal open={mealFlowOpen} onClose={() => setMealFlowOpen(false)} mealMode={mealMode} ratios={ratios} nutrition={nutrition} />
    </div>
  );
}
