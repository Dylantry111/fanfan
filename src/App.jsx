import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fanfan_guest_profile_v1";

const foods = [
  { id: "rice", name: "熟米饭", type: "carb", carbs: 28, protein: 2.6, fat: 0.3, kcal: 130, units: [{ label: "碗", grams: 110 }], note: "适合日常主食，外卖常见。", shortHint: "小碗米饭" },
  { id: "noodle", name: "面条", type: "carb", carbs: 25, protein: 4, fat: 1, kcal: 138, units: [{ label: "碗", grams: 220 }], note: "一碗面通常主食量偏高。", shortHint: "面量偏高" },
  { id: "mantou", name: "馒头", type: "carb", carbs: 47, protein: 7, fat: 1, kcal: 223, units: [{ label: "个", grams: 100 }], note: "同等碳水下，比米饭实际克重少。", shortHint: "中等馒头" },
  { id: "bread", name: "全麦面包", type: "carb", carbs: 43, protein: 10, fat: 4, kcal: 250, units: [{ label: "片", grams: 35 }], note: "优先选配料简单的。", shortHint: "全麦切片" },
  { id: "oats", name: "燕麦", type: "carb", carbs: 60, protein: 13, fat: 7, kcal: 380, units: [{ label: "份", grams: 50 }], note: "适合早餐，饱腹感较好。", shortHint: "4-5勺干燕麦" },
  { id: "sweet_potato", name: "红薯", type: "carb", carbs: 20, protein: 1.6, fat: 0.1, kcal: 90, units: [{ label: "个", grams: 220 }], note: "饱腹感强，适合减脂。", shortHint: "中等红薯" },
  { id: "corn", name: "玉米", type: "carb", carbs: 21, protein: 3.4, fat: 1.2, kcal: 96, units: [{ label: "根", grams: 200 }], note: "可替代部分主食。", shortHint: "整根玉米" },
  { id: "porridge", name: "白粥", type: "carb", carbs: 10, protein: 1.1, fat: 0.1, kcal: 45, units: [{ label: "碗", grams: 250 }], note: "水分高，同等碳水需要更大克重。", shortHint: "一碗白粥" },
  { id: "dumpling", name: "饺子", type: "carb", carbs: 28, protein: 8, fat: 8, kcal: 220, units: [{ label: "个", grams: 25 }], note: "主食和肉馅混合，份量容易超。", shortHint: "家常饺子" },
  { id: "baozi", name: "包子", type: "carb", carbs: 30, protein: 6, fat: 5, kcal: 200, units: [{ label: "个", grams: 120 }], note: "早餐常见，注意肉馅和面皮叠加。", shortHint: "常规肉包" },
  { id: "rice_noodle", name: "米粉", type: "carb", carbs: 26, protein: 3, fat: 0.5, kcal: 120, units: [{ label: "碗", grams: 200 }], note: "汤粉类容易低估主食量。", shortHint: "汤粉" },

  { id: "chicken", name: "鸡胸肉", type: "protein", carbs: 0, protein: 31, fat: 3.6, kcal: 165, units: [{ label: "掌心", grams: 120 }], note: "高蛋白低脂，最稳的减脂肉类。", shortHint: "掌心厚度" },
  { id: "chicken_leg", name: "鸡腿肉", type: "protein", carbs: 0, protein: 24, fat: 10, kcal: 190, units: [{ label: "只", grams: 130 }], note: "比鸡胸脂肪高，去皮更合适。", shortHint: "去骨鸡腿" },
  { id: "beef", name: "牛肉", type: "protein", carbs: 0, protein: 26, fat: 15, kcal: 250, units: [{ label: "掌心", grams: 100 }], note: "蛋白质高，脂肪视部位差异较大。", shortHint: "掌心牛肉" },
  { id: "fish", name: "鱼肉", type: "protein", carbs: 0, protein: 22, fat: 2, kcal: 110, units: [{ label: "块", grams: 150 }], note: "低脂高蛋白，适合晚餐。", shortHint: "大块鱼肉" },
  { id: "shrimp", name: "虾", type: "protein", carbs: 0, protein: 20, fat: 1, kcal: 100, units: [{ label: "只", grams: 12 }], note: "低脂蛋白，适合减脂。", shortHint: "中等虾" },
  { id: "egg_boiled", name: "水煮蛋", type: "protein", carbs: 1.1, protein: 13, fat: 10, kcal: 155, units: [{ label: "个", grams: 50 }], note: "常见早餐蛋类，1个普通鸡蛋可食部分约50克。", shortHint: "普通鸡蛋" },
  { id: "egg_steamed", name: "鸡蛋羹", type: "protein", carbs: 1.3, protein: 9, fat: 6, kcal: 100, units: [{ label: "碗", grams: 120 }], note: "更软更顺口，适合早餐或晚餐。", shortHint: "一小碗蛋羹" },
  { id: "egg_fried", name: "煎蛋", type: "protein", carbs: 1.1, protein: 12, fat: 12, kcal: 180, units: [{ label: "个", grams: 55 }], note: "油会更高一些，适合偶尔搭配。", shortHint: "单面或双面煎蛋" },
  { id: "egg_tomato", name: "西红柿炒鸡蛋", type: "protein", carbs: 4, protein: 8, fat: 8, kcal: 120, units: [{ label: "份", grams: 180 }], note: "是菜，不是纯蛋白，适合搭主食吃。", shortHint: "一盘家常菜" },
  { id: "tofu", name: "豆腐", type: "protein", carbs: 2, protein: 8, fat: 4.8, kcal: 80, units: [{ label: "盒", grams: 400 }], note: "植物蛋白，蛋白密度低于肉类。", shortHint: "盒装豆腐" },
  { id: "milk", name: "牛奶", type: "protein", carbs: 5, protein: 3.4, fat: 3.6, kcal: 60, units: [{ label: "盒", grams: 250 }], note: "早餐或加餐常见。", shortHint: "纯牛奶" },
  { id: "yogurt", name: "酸奶", type: "protein", carbs: 6, protein: 4, fat: 3, kcal: 70, units: [{ label: "杯", grams: 200 }], note: "注意含糖酸奶。", shortHint: "无糖酸奶" },
  { id: "pork", name: "瘦猪肉", type: "protein", carbs: 0, protein: 27, fat: 10, kcal: 200, units: [{ label: "掌心", grams: 100 }], note: "里脊和瘦肉更合适。", shortHint: "掌心瘦肉" },
];

const dishLibrary = [
  { id: "breakfast-oats-egg", meal: "breakfast", scene: "home", category: "家常早餐", name: "燕麦鸡蛋早餐杯", tags: ["早餐", "家里", "高蛋白"], carbFoodId: "oats", proteinFoodId: "egg_boiled", note: "很稳，适合早上不想想太多的时候。" },
  { id: "breakfast-bread-yogurt", meal: "breakfast", scene: "convenience", category: "便利店早餐", name: "全麦吐司 + 无糖酸奶", tags: ["早餐", "便利店", "快选"], carbFoodId: "bread", proteinFoodId: "yogurt", note: "上班路上最容易落地的一种组合。" },
  { id: "breakfast-porridge-egg", meal: "breakfast", scene: "home", category: "中式早餐", name: "白粥鸡蛋小菜版", tags: ["早餐", "家里", "中式"], carbFoodId: "porridge", proteinFoodId: "egg_boiled", note: "适合习惯中式早餐的人。" },
  { id: "breakfast-baozi-milk", meal: "breakfast", scene: "takeout", category: "中式早餐", name: "肉包 + 纯牛奶", tags: ["早餐", "外卖", "快手"], carbFoodId: "baozi", proteinFoodId: "milk", note: "比只吃包子更稳，至少把蛋白补上一点。" },
  { id: "breakfast-corn-yogurt", meal: "breakfast", scene: "convenience", category: "便利店早餐", name: "玉米 + 酸奶", tags: ["早餐", "便利店", "轻负担"], carbFoodId: "corn", proteinFoodId: "yogurt", note: "适合想吃得轻一点的早上。" },
  { id: "breakfast-mantou-egg", meal: "breakfast", scene: "home", category: "中式早餐", name: "馒头鸡蛋牛奶组合", tags: ["早餐", "家里", "饱腹"], carbFoodId: "mantou", proteinFoodId: "egg_boiled", note: "传统早餐里比较容易执行的组合。" },
  { id: "breakfast-rice-noodle-egg", meal: "breakfast", scene: "takeout", category: "粉面早餐", name: "清汤米粉加蛋", tags: ["早餐", "外卖", "热乎"], carbFoodId: "rice_noodle", proteinFoodId: "egg_boiled", note: "适合想吃热食、但又不想太油的早上。" },
  { id: "breakfast-dumpling-milk", meal: "breakfast", scene: "home", category: "中式早餐", name: "早餐饺子 + 纯牛奶", tags: ["早餐", "家里", "满足感"], carbFoodId: "dumpling", proteinFoodId: "milk", note: "偶尔想吃得扎实一点时可以这样配。" },

  { id: "lunch-chicken-rice", meal: "lunch", scene: "takeout", category: "盖饭类", name: "鸡腿饭减饭版", tags: ["午餐", "外卖", "高频"], carbFoodId: "rice", proteinFoodId: "chicken_leg", note: "优先减饭、少酱汁，比硬控不吃舒服很多。" },
  { id: "lunch-beef-rice", meal: "lunch", scene: "takeout", category: "盖饭类", name: "青椒牛肉盖饭减饭版", tags: ["午餐", "外卖", "稳妥"], carbFoodId: "rice", proteinFoodId: "beef", note: "适合午餐主战场，饱腹感和蛋白都比较稳。" },
  { id: "lunch-home-fish", meal: "lunch", scene: "home", category: "家常菜", name: "清蒸鱼配米饭", tags: ["午餐", "家里", "清爽"], carbFoodId: "rice", proteinFoodId: "fish", note: "适合想吃正餐但不想太油的情况。" },
  { id: "lunch-shrimp-rice", meal: "lunch", scene: "home", category: "家常菜", name: "虾仁滑蛋饭", tags: ["午餐", "家里", "轻盈"], carbFoodId: "rice", proteinFoodId: "egg_tomato", note: "比重口盖饭更轻，但仍然像一顿正经午餐。" },
  { id: "lunch-pork-rice", meal: "lunch", scene: "takeout", category: "盖饭类", name: "瘦肉盖饭减酱版", tags: ["午餐", "外卖", "家常感"], carbFoodId: "rice", proteinFoodId: "pork", note: "适合想吃熟悉家常口味的人。" },
  { id: "lunch-dumpling", meal: "lunch", scene: "takeout", category: "中式快餐", name: "家常饺子套餐轻量版", tags: ["午餐", "外卖", "中式"], carbFoodId: "dumpling", proteinFoodId: "egg_boiled", note: "想吃饺子时可以这样吃得更稳一点。" },
  { id: "lunch-noodle-egg", meal: "lunch", scene: "takeout", category: "粉面类", name: "清汤面加水煮蛋", tags: ["午餐", "外卖", "面食"], carbFoodId: "noodle", proteinFoodId: "egg_boiled", note: "吃面时至少把蛋白补上，不然容易只剩主食。" },
  { id: "lunch-tofu-rice", meal: "lunch", scene: "home", category: "家常菜", name: "家常豆腐盖饭", tags: ["午餐", "家里", "清淡"], carbFoodId: "rice", proteinFoodId: "tofu", note: "适合想吃清淡一点、又不想太麻烦的时候。" },
  { id: "lunch-rice-noodle-beef", meal: "lunch", scene: "takeout", category: "粉面类", name: "牛肉米粉减粉版", tags: ["午餐", "外卖", "热乎"], carbFoodId: "rice_noodle", proteinFoodId: "beef", note: "更像真实外卖里的常见选项。" },
  { id: "lunch-chicken-bento", meal: "lunch", scene: "convenience", category: "便利店简餐", name: "鸡胸便当简化版", tags: ["午餐", "便利店", "临时"], carbFoodId: "rice", proteinFoodId: "chicken", note: "适合实在没时间、只能快速解决午餐时。" },
  { id: "lunch-fish-rice-noodle", meal: "lunch", scene: "takeout", category: "粉面类", name: "鱼片汤粉轻量版", tags: ["午餐", "外卖", "清爽"], carbFoodId: "rice_noodle", proteinFoodId: "fish", note: "比浓汤重口味版本更适合控饮食。" },

  { id: "dinner-fish-potato", meal: "dinner", scene: "home", category: "家常晚餐", name: "鱼肉红薯蔬菜盘", tags: ["晚餐", "家里", "轻晚餐"], carbFoodId: "sweet_potato", proteinFoodId: "fish", note: "晚餐想稳一点，这个组合很适合。" },
  { id: "dinner-shrimp-corn", meal: "dinner", scene: "takeout", category: "轻晚餐", name: "虾仁玉米轻晚餐", tags: ["晚餐", "外卖", "轻量"], carbFoodId: "corn", proteinFoodId: "shrimp", note: "适合白天吃多了，晚上想收一收。" },
  { id: "dinner-chicken-rice", meal: "dinner", scene: "home", category: "家常晚餐", name: "鸡胸肉半碗饭晚餐", tags: ["晚餐", "家里", "经典"], carbFoodId: "rice", proteinFoodId: "chicken", note: "这是最稳定、最通用的晚餐解法之一。" },
  { id: "dinner-tofu-porridge", meal: "dinner", scene: "home", category: "家常晚餐", name: "豆腐白粥青菜版", tags: ["晚餐", "家里", "清淡"], carbFoodId: "porridge", proteinFoodId: "tofu", note: "适合胃口一般、但又想吃点热乎的情况。" },
  { id: "dinner-beef-noodle", meal: "dinner", scene: "takeout", category: "粉面类", name: "牛肉面减面版", tags: ["晚餐", "外卖", "满足感"], carbFoodId: "noodle", proteinFoodId: "beef", note: "如果晚餐想吃得有满足感，可以从减面量开始。" },
  { id: "dinner-pork-corn", meal: "dinner", scene: "takeout", category: "轻晚餐", name: "瘦肉玉米蔬菜盘", tags: ["晚餐", "外卖", "家常"], carbFoodId: "corn", proteinFoodId: "pork", note: "适合不想吃米饭、想换点口感的时候。" },
  { id: "dinner-egg-bread", meal: "dinner", scene: "convenience", category: "便利店简餐", name: "煎蛋全麦面包酸奶组合", tags: ["晚餐", "便利店", "临时"], carbFoodId: "bread", proteinFoodId: "egg_fried", note: "加班晚归时比随便乱买要稳得多。" },
  { id: "dinner-rice-noodle-fish", meal: "dinner", scene: "takeout", category: "粉面类", name: "鱼片米粉减粉版", tags: ["晚餐", "外卖", "热乎"], carbFoodId: "rice_noodle", proteinFoodId: "fish", note: "更接近真实夜间外卖里常点的那类东西。" },
  { id: "dinner-shrimp-fried-rice-lite", meal: "dinner", scene: "takeout", category: "盖饭类", name: "虾仁炒饭减量版", tags: ["晚餐", "外卖", "满足感"], carbFoodId: "rice", proteinFoodId: "shrimp", note: "如果想吃炒饭，可以直接把份量和配菜策略带进去。" },
  { id: "dinner-chicken-bento", meal: "dinner", scene: "convenience", category: "便利店简餐", name: "鸡胸便当晚餐版", tags: ["晚餐", "便利店", "快选"], carbFoodId: "rice", proteinFoodId: "chicken", note: "适合晚归、懒得再想的一餐。" },

  { id: "snack-yogurt", meal: "snack", scene: "convenience", category: "加餐", name: "无糖酸奶 + 牛奶", tags: ["加餐", "便利店", "补蛋白"], carbFoodId: "bread", proteinFoodId: "yogurt", note: "更适合临时垫一下，不容易失控。" },
  { id: "snack-milk-egg", meal: "snack", scene: "home", category: "加餐", name: "牛奶 + 水煮蛋", tags: ["加餐", "家里", "简单"], carbFoodId: "bread", proteinFoodId: "milk", note: "如果只是有点饿，不需要上完整正餐。" },
  { id: "snack-corn-yogurt", meal: "snack", scene: "convenience", category: "加餐", name: "玉米 + 酸奶", tags: ["加餐", "便利店", "饱腹"], carbFoodId: "corn", proteinFoodId: "yogurt", note: "适合想垫一口，但又怕后面失控的人。" },
  { id: "snack-dumpling-lite", meal: "snack", scene: "home", category: "加餐", name: "少量饺子 + 热饮", tags: ["加餐", "家里", "满足感"], carbFoodId: "dumpling", proteinFoodId: "egg_boiled", note: "偶尔嘴馋时，比直接开大餐更可控。" },
];

const correctionRules = [
  { title: "午饭主食吃多了", desc: "晚饭先减主食，不要再减蛋白，重点修碳水和油脂。" },
  { title: "炸物吃多了", desc: "后面一餐优先选鱼、虾、鸡胸，避免再叠加高油食物。" },
  { title: "今天蛋白不够", desc: "优先补鸡胸、虾、鱼、蛋、无糖酸奶，不要拿零食冒充补营养。" },
  { title: "晚上想吃宵夜", desc: "优先选酸奶、牛奶、蛋白类小组合，不再补第二份主食。" },
];

const presetPlans = {
  balanced_three: { label: "均衡三餐", mealMode: "three", ratios: { breakfast: 30, lunch: 40, dinner: 30 } },
  snack_plan: { label: "带宵夜额度", mealMode: "snack", ratios: { breakfast: 25, lunch: 40, dinner: 25, snack: 10 } },
};

const mealProfiles = {
  three: [{ id: "breakfast", name: "早餐" }, { id: "lunch", name: "午餐" }, { id: "dinner", name: "晚餐" }],
  snack: [{ id: "breakfast", name: "早餐" }, { id: "lunch", name: "午餐" }, { id: "dinner", name: "晚餐" }, { id: "snack", name: "宵夜/加餐" }],
};

const activityMap = { sedentary: { label: "久坐/基本不运动", factor: 1.2, tag: "轻活动" }, light: { label: "少量步行 / 微量有氧", factor: 1.35, tag: "轻活动" }, moderate: { label: "每周有氧 + 力量都有一些", factor: 1.5, tag: "中等活动" }, strength: { label: "规律训练 / 运动量较高", factor: 1.65, tag: "高活动" } };
const goalMap = {
  mild_cut: { label: "温和减脂", deficit: 300, proteinFactor: 1.8, fatRatio: 0.25, minKcalMale: 1500, minKcalFemale: 1200 },
  standard_cut: { label: "标准减脂", deficit: 500, proteinFactor: 1.9, fatRatio: 0.25, minKcalMale: 1500, minKcalFemale: 1200 },
  maintain: { label: "维持体重", deficit: 0, proteinFactor: 1.6, fatRatio: 0.27, minKcalMale: 1600, minKcalFemale: 1300 },
  lean_gain: { label: "干净增肌", deficit: -250, proteinFactor: 2, fatRatio: 0.25, minKcalMale: 1700, minKcalFemale: 1400 },
};

const defaultProfile = {
  guestId: "",
  nickname: "",
  profileCompleted: false,
  form: { sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut", weeklyCardioMinutes: 0, weeklyStrengthMinutes: 0 },
  mealMode: "snack",
  ratios: { breakfast: 25, lunch: 40, dinner: 25, snack: 10 },
  activePreset: "balanced_three",
  preferences: { avoidFoods: [], favoriteFoods: ["rice", "chicken"], favoriteDishes: ["鸡腿饭减饭版"], dislikedDishes: [], preferredScenes: ["takeout"] },
  choiceHistory: ["鸡腿饭减饭版", "燕麦鸡蛋早餐杯"],
  chosenMealIds: [],
  tomorrowPlan: {},
  weekPlan: {},
};

function generateGuestId() {
  return `guest_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function loadStoredProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveStoredProfile(profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function round(n, digits = 0) { const p = Math.pow(10, digits); return Math.round((Number(n) || 0) * p) / p; }
function nearlyEqual(actual, expected, tolerance = 0.5) { return Math.abs(actual - expected) <= tolerance; }
function bmr({ sex, weight, height, age }) { const safeWeight = Math.max(Number(weight) || 0, 0); const safeHeight = Math.max(Number(height) || 0, 0); const safeAge = Math.max(Number(age) || 0, 0); const base = 10 * safeWeight + 6.25 * safeHeight - 5 * safeAge; return sex === "male" ? base + 5 : base - 161; }
function inferActivity(form) { const cardio = Number(form.weeklyCardioMinutes) || 0; const strength = Number(form.weeklyStrengthMinutes) || 0; const total = cardio + strength; if (total >= 360 || strength >= 180) return "strength"; if (total >= 180) return "moderate"; if (total >= 60) return "light"; return "sedentary"; }
function calculateNutrition(form) { const weight = Math.max(Number(form.weight) || 0, 0); const height = Math.max(Number(form.height) || 0, 0); const age = Math.max(Number(form.age) || 0, 0); const inferredActivity = inferActivity(form); const selectedActivity = activityMap[inferredActivity] || activityMap.sedentary; const selectedGoal = goalMap[form.goal] || goalMap.standard_cut; const BMR = bmr({ sex: form.sex, weight, height, age }); const TDEE = BMR * selectedActivity.factor; const minKcal = form.sex === "male" ? selectedGoal.minKcalMale : selectedGoal.minKcalFemale; const targetKcal = Math.max(TDEE - selectedGoal.deficit, minKcal); const protein = weight * selectedGoal.proteinFactor; const fat = (targetKcal * selectedGoal.fatRatio) / 9; const carbs = Math.max((targetKcal - protein * 4 - fat * 9) / 4, 0); return { BMR, TDEE, kcal: targetKcal, protein, fat, carbs }; }
function gramsFor(food, macro, target) { const density = food?.[macro]; const safeTarget = Math.max(Number(target) || 0, 0); if (!density || density <= 0 || safeTarget <= 0) return null; return (safeTarget / density) * 100; }
function formatLifestyleUnit(food, grams) { if (!grams || grams <= 0 || !food.units?.length) return "—"; const unit = food.units[0]; const count = grams / unit.grams; const roundedCount = count < 2 ? round(count, 1) : round(count, 0); const clean = `${roundedCount}`; if (unit.label === "掌心") return `约 ${clean}个掌心大小`; if (unit.label === "份") return food.shortHint ? `约 ${clean}份，${food.shortHint}` : `约 ${clean}份`; if (unit.label === "盒" && food.id === "tofu") return count < 1 ? `约 ${round(count * 2, 1)}半盒豆腐` : `约 ${clean}盒豆腐`; if (unit.label === "只" && food.id === "shrimp") return `约 ${clean}只中虾`; return `约 ${clean}${unit.label}${food.shortHint ? `，${food.shortHint}` : ""}`; }
function practicalPortion(food, grams) {
  if (!food || !grams || grams <= 0) return { grams: null, text: "—" };
  const g = Math.round(grams);
  const rules = {
    rice: g <= 90 ? `约小半碗（约${g}克）` : g <= 140 ? `约1小碗（约${g}克）` : g <= 190 ? `约1大碗或1.5小碗（约${g}克）` : `约2小碗以内（约${g}克）`,
    noodle: g <= 150 ? `约小半碗面（约${g}克）` : g <= 240 ? `约1碗面（约${g}克）` : `约1大碗面（约${g}克）`,
    oats: `约${round(g / 10)}勺干燕麦（约${g}克）`,
    bread: g <= 40 ? `约1片（约${g}克）` : g <= 75 ? `约2片（约${g}克）` : `约3片以内（约${g}克）`,
    sweet_potato: g <= 220 ? `约1个中等红薯（约${g}克）` : `约1个大红薯（约${g}克）`,
    corn: g <= 200 ? `约1根玉米（约${g}克）` : `约1根大玉米（约${g}克）`,
    porridge: g <= 250 ? `约1碗白粥（约${g}克）` : `约1大碗白粥（约${g}克）`,
    dumpling: g <= 150 ? `约6个饺子（约${g}克）` : `约8个饺子（约${g}克）`,
    baozi: g <= 120 ? `约1个包子（约${g}克）` : `约2个包子以内（约${g}克）`,
    mantou: g <= 100 ? `约1个馒头（约${g}克）` : `约1个半馒头（约${g}克）`,
    rice_noodle: g <= 180 ? `约1小碗米粉（约${g}克）` : `约1碗米粉（约${g}克）`,
    chicken: g <= 130 ? `约1个掌心，约${round(g / 50, 1)}两（约${g}克）` : `约1个半掌心，约${round(g / 50, 1)}两（约${g}克）`,
    chicken_leg: g <= 140 ? `约1只去骨鸡腿（约${g}克）` : `约1只偏大的去骨鸡腿（约${g}克）`,
    beef: g <= 120 ? `约1个掌心，约${round(g / 50, 1)}两（约${g}克）` : `约1个半掌心，约${round(g / 50, 1)}两（约${g}克）`,
    fish: g <= 160 ? `约1大块鱼肉，约${round(g / 50, 1)}两（约${g}克）` : `约1大块半鱼肉，约${round(g / 50, 1)}两（约${g}克）`,
    shrimp: g <= 150 ? `约10-12只中虾（约${g}克）` : `约12-15只中虾（约${g}克）`,
    pork: g <= 120 ? `约1个掌心，约${round(g / 50, 1)}两（约${g}克）` : `约1个半掌心，约${round(g / 50, 1)}两（约${g}克）`,
    tofu: g <= 220 ? `约半盒豆腐（约${g}克）` : `约半盒到3/4盒豆腐（约${g}克）`,
    egg_boiled: g <= 60 ? `约1个水煮蛋（约${g}克）` : g <= 110 ? `约2个水煮蛋（约${g}克）` : `约2到3个水煮蛋（约${g}克）`,
    egg_steamed: g <= 120 ? `约1小碗鸡蛋羹（约${g}克）` : `约1大碗鸡蛋羹（约${g}克）`,
    egg_fried: g <= 60 ? `约1个煎蛋（约${g}克）` : `约2个煎蛋（约${g}克）`,
    egg_tomato: g <= 180 ? `约1份西红柿炒鸡蛋（约${g}克）` : `约1大份西红柿炒鸡蛋（约${g}克）`,
    milk: `约1盒纯牛奶（约${g}克）`,
    yogurt: `约1杯无糖酸奶（约${g}克）`,
  };
  return { grams: g, text: rules[food.id] || `${formatLifestyleUnit(food, grams)}（约${g}克）` };
}
function scoreDish(dish, preferences, historyCounts) { const dishName = dish.name; const foodIds = [dish.carbFoodId, dish.proteinFoodId].filter(Boolean); if (preferences.dislikedDishes.includes(dishName)) return -999; if (foodIds.some((id) => preferences.avoidFoods.includes(id))) return -999; let score = 0; if (preferences.favoriteDishes.includes(dishName)) score += 4; if (foodIds.some((id) => preferences.favoriteFoods.includes(id))) score += 3; if (preferences.preferredScenes.includes(dish.scene)) score += 2; score += (historyCounts[dishName] || 0) * 0.8; return score; }
function getDishRecommendations({ mealId, scene, preferences, historyCounts, limit = 6, offset = 0 }) { return dishLibrary.filter((dish) => dish.meal === mealId && (!scene || dish.scene === scene)).map((dish) => ({ ...dish, score: scoreDish(dish, preferences, historyCounts) })).filter((dish) => dish.score > -999).sort((a, b) => b.score - a.score).slice(offset, offset + limit); }
function buildTodayProgress(plans, chosenMealIds) { const mealKeys = ["breakfast", "lunch", "dinner", "snack"]; const planned = mealKeys.filter((meal) => plans[meal]).length; const completed = mealKeys.filter((meal) => chosenMealIds.includes(meal)).length; return { planned, completed, remaining: Math.max(planned - completed, 0) }; }
function runSelfTests() { const rice = foods.find((food) => food.id === "rice"); const chicken = foods.find((food) => food.id === "chicken"); const maleDefault = calculateNutrition({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut" }); const preferences = { avoidFoods: ["beef"], favoriteFoods: ["rice"], favoriteDishes: [], dislikedDishes: [], preferredScenes: [] }; const recs = getDishRecommendations({ mealId: "lunch", scene: "takeout", preferences, historyCounts: {} }); const eggPortion = practicalPortion(foods.find((food) => food.id === "egg_boiled"), 100); return [{ name: "男性 BMR：85kg / 175cm / 35岁", pass: nearlyEqual(bmr({ sex: "male", weight: 85, height: 175, age: 35 }), 1773.75, 0.01) }, { name: "60g 碳水 ≈ 214g 熟米饭", pass: nearlyEqual(gramsFor(rice, "carbs", 60), 214.29, 0.1) }, { name: "40g 蛋白 ≈ 129g 鸡胸肉", pass: nearlyEqual(gramsFor(chicken, "protein", 40), 129.03, 0.1) }, { name: "默认男性目标热量不低于保护线", pass: maleDefault.kcal >= 1500 }, { name: "标准三餐比例合计为100%", pass: Object.values(presetPlans.balanced_three.ratios).reduce((sum, value) => sum + value, 0) === 100 }, { name: "忌口食材不会出现在午餐推荐里", pass: recs.every((item) => item.proteinFoodId !== "beef") }, { name: "当前菜肴库不少于30条", pass: dishLibrary.length >= 30 }, { name: "两个鸡蛋约100克", pass: eggPortion.text.includes("100") }]; }

function CardShell({ children, className = "" }) { return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>; }
function Badge({ children, tone = "slate" }) { const classes = { slate: "bg-slate-100 text-slate-700", green: "bg-emerald-100 text-emerald-800", red: "bg-red-100 text-red-800", blue: "bg-blue-100 text-blue-800", amber: "bg-amber-100 text-amber-900", dark: "bg-slate-900 text-white" }; return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes[tone] || classes.slate}`}>{children}</span>; }
function MiniButton({ active, children, onClick }) { return <button className={`rounded-2xl px-4 py-3 text-sm font-medium ${active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`} onClick={onClick}>{children}</button>; }
function MacroPill({ label, value, suffix = "", hint }) { return <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs text-slate-500">{label}</div><div className="mt-1 text-2xl font-bold text-slate-900">{value}{suffix}</div>{hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}</div>; }
function FieldLabel({ children }) { return <label className="text-sm font-medium text-slate-600">{children}</label>; }
function SelectField({ value, onChange, options }) { return <select className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>; }
function NumberField({ value, onChange, max = undefined }) { return <input className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" type="number" value={value} min="0" max={max} onChange={(event) => onChange(event.target.value)} />; }
function TextField({ value, onChange, placeholder = "" }) { return <input className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />; }
function SectionTitle({ title, desc }) { return <div><div className="text-xl font-semibold text-slate-900">{title}</div>{desc ? <div className="mt-1 text-sm text-slate-500">{desc}</div> : null}</div>; }
function Modal({ open, title, onClose, children }) { if (!open) return null; return <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-3 sm:items-center"><div className="max-h-[90vh] w-full max-w-6xl overflow-auto rounded-3xl bg-white shadow-2xl"><div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4"><div className="text-lg font-semibold text-slate-900">{title}</div><button className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700" onClick={onClose}>关闭</button></div><div className="p-5">{children}</div></div></div>; }

function WelcomeOverlay({ nickname, setNickname, onStart }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><Badge tone="blue">游客模式</Badge><h2 className="mt-4 text-2xl font-bold text-slate-900">先给自己取个昵称吧</h2><p className="mt-2 text-sm leading-6 text-slate-600">不需要注册。我会给你分配一个游客身份，并把你的偏好、规划和历史记录保存在这台设备里，下次回来会自动接上。</p><div className="mt-5"><FieldLabel>昵称</FieldLabel><TextField value={nickname} onChange={setNickname} placeholder="比如：Dylan / 小林 / 我自己" /></div><button className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white" onClick={onStart} disabled={!nickname.trim()}>开始使用</button></div></div>;
}


function OnboardingCard({ nickname, setNickname, form, set, mealMode, setMealMode, ratios, setRatios, preferences, setPreferences, onFinish }) {
  const inferredActivity = inferActivity(form);
  const total = (Number(ratios.breakfast)||0)+(Number(ratios.lunch)||0)+(Number(ratios.dinner)||0)+(mealMode === "snack" ? (Number(ratios.snack)||0) : 0);
  function setRatio(key, value) { setRatios((prev) => ({ ...prev, [key]: Math.max(Number(value) || 0, 0) })); }
  return <div className="fixed inset-0 z-40 overflow-auto bg-slate-100"><div className="mx-auto max-w-5xl space-y-5 px-4 py-6"><CardShell className="overflow-hidden border-none bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl"><div className="p-6"><Badge tone="blue">建档后再推荐</Badge><h2 className="mt-3 text-3xl font-bold">先把你的资料卡建好</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">你说得对，先建档，再推荐，逻辑会更稳。这里先把基础资料、餐次结构、运动习惯和目标一次配好。</p></div></CardShell><div className="grid gap-5 lg:grid-cols-2"><CardShell><div className="p-5"><SectionTitle title="第一层：基础信息" desc="先确定身体基础数据。" /><div className="mt-4 grid grid-cols-2 gap-3"><div className="col-span-2"><FieldLabel>昵称</FieldLabel><TextField value={nickname} onChange={setNickname} placeholder="给自己起个名字" /></div><div className="col-span-2"><FieldLabel>性别</FieldLabel><SelectField value={form.sex} onChange={(value) => set("sex", value)} options={[{ value: "male", label: "男性" }, { value: "female", label: "女性" }]} /></div><div><FieldLabel>年龄</FieldLabel><NumberField value={form.age} onChange={(value) => set("age", value)} /></div><div><FieldLabel>身高 cm</FieldLabel><NumberField value={form.height} onChange={(value) => set("height", value)} /></div><div className="col-span-2"><FieldLabel>体重 kg</FieldLabel><NumberField value={form.weight} onChange={(value) => set("weight", value)} /></div></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="第二层：每日餐次结构" desc="先决定一天怎么分配，后面推荐就按这个节奏来。" /><div className="mt-4 grid gap-3"><div><FieldLabel>餐次模式</FieldLabel><SelectField value={mealMode} onChange={setMealMode} options={[{ value: "three", label: "早午晚三餐" }, { value: "snack", label: "早午晚 + 宵夜/加餐" }]} /></div><div className="grid grid-cols-2 gap-3"><div><FieldLabel>早餐占比 %</FieldLabel><NumberField value={ratios.breakfast} onChange={(value) => setRatio("breakfast", value)} /></div><div><FieldLabel>午餐占比 %</FieldLabel><NumberField value={ratios.lunch} onChange={(value) => setRatio("lunch", value)} /></div><div><FieldLabel>晚餐占比 %</FieldLabel><NumberField value={ratios.dinner} onChange={(value) => setRatio("dinner", value)} /></div>{mealMode === "snack" ? <div><FieldLabel>宵夜/加餐占比 %</FieldLabel><NumberField value={ratios.snack || 0} onChange={(value) => setRatio("snack", value)} /></div> : null}</div><div className={`rounded-2xl p-4 text-sm ${total === 100 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>当前合计 {total}% 。建议配到 100%。</div><div><div className="text-sm font-semibold text-slate-900">常规饮食习惯</div><div className="mt-3 flex flex-wrap gap-2">{[{ key: "晚餐不吃主食", id: "no_dinner_carb" }, { key: "早餐随便吃两口", id: "light_breakfast" }, { key: "外卖频率高", id: "takeout_often" }].map((item) => <button key={item.id} className={`rounded-full px-3 py-2 text-xs ${preferences.preferredScenes.includes(item.id) ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setPreferences((prev) => ({ ...prev, preferredScenes: prev.preferredScenes.includes(item.id) ? prev.preferredScenes.filter((x) => x !== item.id) : [...prev.preferredScenes, item.id] }))}>{item.key}</button>)}</div></div></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="第三层：运动习惯" desc="可以粗分，也可以直接填每周时长，让系统自动归类。" /><div className="mt-4 grid gap-3"><div><FieldLabel>每周有氧总时长（分钟）</FieldLabel><NumberField value={form.weeklyCardioMinutes || 0} onChange={(value) => set("weeklyCardioMinutes", value)} /></div><div><FieldLabel>每周力量总时长（分钟）</FieldLabel><NumberField value={form.weeklyStrengthMinutes || 0} onChange={(value) => set("weeklyStrengthMinutes", value)} /></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">自动归类结果</div><div className="mt-1 text-xl font-bold text-slate-900">{activityMap[inferredActivity].label}</div><div className="mt-1 text-sm text-slate-500">标签：{activityMap[inferredActivity].tag}</div></div></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="第四层：目标" desc="目标强度会影响热量、蛋白和碳水分配。" /><div className="mt-4"><FieldLabel>当前目标</FieldLabel><SelectField value={form.goal} onChange={(value) => set("goal", value)} options={Object.entries(goalMap).map(([value, item]) => ({ value, label: item.label }))} /></div><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">减脂、维持、增肌，以及温和/标准的强度，都会直接影响蛋白和碳水的建议。建档完成后再进入餐食推荐，逻辑会更完整。</div><button className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white" onClick={onFinish} disabled={!nickname.trim() || total !== 100}>完成建档，开始推荐</button></div></CardShell></div></div></div>;
}

function PersonalInfoPage({ form, set, nutrition, mealMode, onMealModeChange, ratios, onRatioChange, activePreset, onApplyPreset, preferences, setPreferences, guestId, nickname, setNickname }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three; const total = meals.reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0); const valid = total === 100; function toggleListItem(key, value) { setPreferences((prev) => { const exists = prev[key].includes(value); return { ...prev, [key]: exists ? prev[key].filter((item) => item !== value) : [...prev[key], value] }; }); }
  return <div className="space-y-5"><CardShell><div className="p-5"><SectionTitle title="游客身份" desc="默认不注册，直接以游客身份使用；同一台设备再次打开会自动继承数据。" /><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">昵称</div><TextField value={nickname} onChange={setNickname} placeholder="给自己起个名字" /></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">游客ID</div><div className="mt-2 break-all text-sm font-medium text-slate-900">{guestId || "待生成"}</div></div></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="个人信息" desc="基础数据和目标集中设置，平时不需要频繁改。" /><div className="mt-4 grid grid-cols-2 gap-3"><div className="col-span-2"><FieldLabel>性别</FieldLabel><SelectField value={form.sex} onChange={(value) => set("sex", value)} options={[{ value: "male", label: "男性" }, { value: "female", label: "女性" }]} /></div><div><FieldLabel>年龄</FieldLabel><NumberField value={form.age} onChange={(value) => set("age", value)} /></div><div><FieldLabel>身高 cm</FieldLabel><NumberField value={form.height} onChange={(value) => set("height", value)} /></div><div className="col-span-2"><FieldLabel>体重 kg</FieldLabel><NumberField value={form.weight} onChange={(value) => set("weight", value)} /></div><div className="col-span-2"><FieldLabel>活动水平</FieldLabel><SelectField value={form.activity} onChange={(value) => set("activity", value)} options={Object.entries(activityMap).map(([value, item]) => ({ value, label: item.label }))} /></div><div className="col-span-2"><FieldLabel>目标</FieldLabel><SelectField value={form.goal} onChange={(value) => set("goal", value)} options={Object.entries(goalMap).map(([value, item]) => ({ value, label: item.label }))} /></div></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="每日目标" desc="把代谢和营养目标放在这里集中查看。" /><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5"><MacroPill label="基础代谢" value={round(nutrition.BMR)} suffix=" kcal" hint="静息消耗" /><MacroPill label="日常消耗" value={round(nutrition.TDEE)} suffix=" kcal" hint="含活动量" /><MacroPill label="目标热量" value={round(nutrition.kcal)} suffix=" kcal" hint="按当前目标生成" /><MacroPill label="蛋白质" value={round(nutrition.protein)} suffix="g" hint="优先吃够" /><MacroPill label="碳水" value={round(nutrition.carbs)} suffix="g" hint="主食参考" /></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="餐次设置" desc="先设好分配，后面系统会按这个习惯给推荐。" /><div className="mt-4 grid gap-3 md:grid-cols-2"><div><FieldLabel>餐次模式</FieldLabel><SelectField value={mealMode} onChange={onMealModeChange} options={[{ value: "three", label: "三餐" }, { value: "snack", label: "三餐 + 宵夜/加餐" }]} /></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">当前合计</div><div className={`mt-1 text-2xl font-bold ${valid ? "text-emerald-700" : "text-red-700"}`}>{total}%</div><div className="mt-1 text-xs text-slate-500">{valid ? "已生效" : "需要调到 100%"}</div></div></div><div className="mt-4 flex flex-wrap gap-2">{Object.entries(presetPlans).filter(([, preset]) => preset.mealMode === mealMode).map(([key, preset]) => <MiniButton key={key} active={activePreset === key} onClick={() => onApplyPreset(key)}>{preset.label}</MiniButton>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{meals.map((meal) => <div key={meal.id} className="rounded-2xl border border-slate-200 bg-white p-3"><FieldLabel>{meal.name}</FieldLabel><NumberField value={ratios[meal.id] ?? 0} max={100} onChange={(value) => onRatioChange(meal.id, value)} /></div>)}</div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="个人偏好" desc="让推荐越来越像你平时会选的东西。" /><div className="mt-4 grid gap-5 lg:grid-cols-3"><div><div className="text-sm font-semibold text-slate-900">忌口食材</div><div className="mt-3 flex flex-wrap gap-2">{foods.map((food) => <button key={food.id} className={`rounded-full px-3 py-2 text-xs ${preferences.avoidFoods.includes(food.id) ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-700"}`} onClick={() => toggleListItem("avoidFoods", food.id)}>{food.name}</button>)}</div></div><div><div className="text-sm font-semibold text-slate-900">喜欢的食材</div><div className="mt-3 flex flex-wrap gap-2">{foods.map((food) => <button key={food.id} className={`rounded-full px-3 py-2 text-xs ${preferences.favoriteFoods.includes(food.id) ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`} onClick={() => toggleListItem("favoriteFoods", food.id)}>{food.name}</button>)}</div></div><div><div className="text-sm font-semibold text-slate-900">偏好场景</div><div className="mt-3 flex flex-wrap gap-2">{[{ value: "home", label: "家里" }, { value: "takeout", label: "外卖" }, { value: "convenience", label: "便利店" }].map((scene) => <button key={scene.value} className={`rounded-full px-3 py-2 text-xs ${preferences.preferredScenes.includes(scene.value) ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"}`} onClick={() => toggleListItem("preferredScenes", scene.value)}>{scene.label}</button>)}</div></div></div></div></CardShell></div>;
}

function PlanningPage({ mealMode, preferences, historyCounts, tomorrowPlan, setTomorrowPlan, weekPlan, setWeekPlan }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three; const scenes = [{ id: "home", name: "家里" }, { id: "takeout", name: "外卖" }, { id: "convenience", name: "便利店" }];
  function setMealPlan(dayKey, mealId, updates) { const updater = dayKey === "tomorrow" ? setTomorrowPlan : setWeekPlan; updater((prev) => ({ ...prev, [mealId]: { ...(prev[mealId] || {}), ...updates } })); }
  function renderPlanEditor(dayKey, title, desc) {
    const source = dayKey === "tomorrow" ? tomorrowPlan : weekPlan;
    return <CardShell><div className="p-5"><SectionTitle title={title} desc={desc} /><div className="mt-4 space-y-4">{meals.map((meal) => { const current = source[meal.id] || { scene: "takeout", dishId: "", batch: 0 }; const recommendations = getDishRecommendations({ mealId: meal.id, scene: current.scene, preferences, historyCounts, limit: 6, offset: current.batch * 6 }); const totalAvailable = getDishRecommendations({ mealId: meal.id, scene: current.scene, preferences, historyCounts, limit: 999, offset: 0 }).length; const maxBatch = Math.max(Math.ceil(totalAvailable / 6) - 1, 0); return <div key={meal.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><div className="font-semibold text-slate-900">{meal.name}</div><div className="mt-1 text-sm text-slate-500">先选场景，再点一个你更想吃的组合。</div></div><div className="flex flex-wrap gap-2">{scenes.map((scene) => <button key={scene.id} className={`rounded-full px-3 py-2 text-xs ${current.scene === scene.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setMealPlan(dayKey, meal.id, { scene: scene.id, dishId: "", batch: 0 })}>{scene.name}</button>)}{totalAvailable > 6 ? <button className="rounded-full bg-amber-100 px-3 py-2 text-xs text-amber-900" onClick={() => setMealPlan(dayKey, meal.id, { batch: current.batch >= maxBatch ? 0 : current.batch + 1 })}>换一批</button> : null}</div></div><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{recommendations.map((dish) => <button key={dish.id} className={`rounded-2xl border p-4 text-left ${current.dishId === dish.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} onClick={() => setMealPlan(dayKey, meal.id, { dishId: dish.id })}><div className="flex items-center justify-between gap-2"><div className="font-semibold">{dish.name}</div><Badge tone={current.dishId === dish.id ? "dark" : "amber"}>{dish.category}</Badge></div><div className={`mt-2 text-xs ${current.dishId === dish.id ? "text-slate-300" : "text-slate-500"}`}>{dish.note}</div><div className="mt-3 flex flex-wrap gap-1">{dish.tags.map((tag) => <span key={tag} className={`rounded-full px-2 py-1 text-[11px] ${current.dishId === dish.id ? "bg-white/10 text-white" : "bg-white text-slate-600"}`}>{tag}</span>)}</div></button>)}</div></div>; })}</div></div></CardShell>;
  }
  return <div className="space-y-5">{renderPlanEditor("tomorrow", "明天吃什么", "提前把明天想好，第二天饭点时系统就能按你的计划提醒。")} {renderPlanEditor("week", "一周轻规划", "先做轻量草案，不要求每餐都定死，适合大方向先想好的人。")}</div>;
}

function TodayPage({ nutrition, mealMode, tomorrowPlan, chosenMealIds, nickname }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three; const progress = buildTodayProgress(tomorrowPlan, chosenMealIds);
  return <div className="space-y-5"><CardShell><div className="p-5"><SectionTitle title={`今天，${nickname || "你"}想怎么吃`} desc="如果你昨天已经配好了，今天到饭点就不需要重新想一遍。" /><div className="mt-4 grid gap-3 md:grid-cols-3"><MacroPill label="已规划餐次" value={progress.planned} hint="今天共安排了几餐" /><MacroPill label="已完成餐次" value={progress.completed} hint="你已经勾过的餐次" /><MacroPill label="还剩" value={progress.remaining} hint="还可以继续照计划吃" /></div></div></CardShell><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{meals.map((meal) => { const plan = tomorrowPlan[meal.id]; const dish = dishLibrary.find((item) => item.id === plan?.dishId); return <CardShell key={meal.id}><div className="p-5"><div className="flex items-center justify-between gap-3"><div><div className="font-semibold text-slate-900">{meal.name}</div><div className="mt-1 text-sm text-slate-500">{dish ? "昨天已经帮你想好了" : "还没有提前安排"}</div></div><Badge tone={dish ? "green" : "slate"}>{dish ? "已规划" : "未规划"}</Badge></div>{dish ? <div className="mt-4 rounded-2xl bg-slate-50 p-4"><div className="flex items-center justify-between gap-2"><div className="font-semibold text-slate-900">{dish.name}</div><Badge tone="amber">{dish.category}</Badge></div><div className="mt-2 text-sm text-slate-600">{dish.note}</div><div className="mt-3 flex flex-wrap gap-2">{dish.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-2 py-1 text-xs text-slate-600">{tag}</span>)}</div></div> : <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">你还没给这餐做安排，临时吃也没关系，饭点时再选就行。</div>}</div></CardShell>; })}</div><CardShell><div className="p-5"><SectionTitle title="今日目标摘要" desc="不压迫，只给你当下需要的基准。" /><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><MacroPill label="目标热量" value={round(nutrition.kcal)} suffix=" kcal" /><MacroPill label="蛋白质" value={round(nutrition.protein)} suffix="g" /><MacroPill label="碳水" value={round(nutrition.carbs)} suffix="g" /><MacroPill label="脂肪预算" value={round(nutrition.fat)} suffix="g" /></div></div></CardShell></div>;
}

function MealFlowModal({ open, onClose, mealMode, ratios, nutrition, preferences, historyCounts, onCompleteMeal }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three;
  const [selectedMeal, setSelectedMeal] = useState(meals[0]?.id || "breakfast");
  const [selectedScene, setSelectedScene] = useState("takeout");
  const [batch, setBatch] = useState(0);
  const activeMeal = meals.find((meal) => meal.id === selectedMeal) || meals[0];
  const ratioPercent = Number(ratios[selectedMeal]) || 0;
  const ratio = ratioPercent / 100;
  const targets = { carbs: nutrition.carbs * ratio, protein: nutrition.protein * ratio, fat: nutrition.fat * ratio, kcal: nutrition.kcal * ratio };
  const allRecommendations = getDishRecommendations({ mealId: selectedMeal, scene: selectedScene, preferences, historyCounts, limit: 999, offset: 0 });
  const recommendations = allRecommendations.slice(batch * 6, batch * 6 + 6);
  const maxBatch = Math.max(Math.ceil(allRecommendations.length / 6) - 1, 0);
  function changeMeal(mealId) { setSelectedMeal(mealId); setBatch(0); }
  function changeScene(sceneId) { setSelectedScene(sceneId); setBatch(0); }
  return <Modal open={open} title="开始一餐" onClose={onClose}><div className="space-y-5"><SectionTitle title="需要的时候再帮你一把" desc="这次不只给更像真实菜名的方案，也支持你一键换一批。" /><div className="flex flex-wrap gap-2">{meals.map((meal) => <MiniButton key={meal.id} active={selectedMeal === meal.id} onClick={() => changeMeal(meal.id)}>{meal.name}</MiniButton>)}</div><div className="flex flex-wrap gap-2">{[{ id: "home", name: "家里" }, { id: "takeout", name: "外卖" }, { id: "convenience", name: "便利店" }].map((scene) => <MiniButton key={scene.id} active={selectedScene === scene.id} onClick={() => changeScene(scene.id)}>{scene.name}</MiniButton>)}{allRecommendations.length > 6 ? <button className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900" onClick={() => setBatch(batch >= maxBatch ? 0 : batch + 1)}>换一批</button> : null}</div><CardShell><div className="p-5"><div className="flex items-center justify-between gap-3"><div><div className="text-lg font-semibold text-slate-900">{activeMeal?.name} 建议</div><div className="mt-1 text-sm text-slate-500">按你预设的 {ratioPercent}% 比例和偏好生成</div></div><Badge tone="green">{allRecommendations.length} 个候选</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><MacroPill label="热量" value={round(targets.kcal)} suffix=" kcal" /><MacroPill label="碳水" value={round(targets.carbs)} suffix="g" /><MacroPill label="蛋白" value={round(targets.protein)} suffix="g" /><MacroPill label="脂肪上限" value={round(targets.fat)} suffix="g" /></div></div></CardShell><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{recommendations.map((dish) => { const carbFood = foods.find((food) => food.id === dish.carbFoodId); const proteinFood = foods.find((food) => food.id === dish.proteinFoodId); const carbGrams = gramsFor(carbFood, "carbs", targets.carbs); const proteinGrams = gramsFor(proteinFood, "protein", targets.protein); return <CardShell key={dish.id}><div className="p-5"><div className="flex items-center justify-between gap-2"><div className="font-semibold text-slate-900">{dish.name}</div><Badge tone="amber">{dish.category}</Badge></div><div className="mt-2 text-sm text-slate-600">{dish.note}</div><div className="mt-3 space-y-2 text-sm text-slate-700"><div>{carbFood?.name}：{practicalPortion(carbFood, carbGrams).text}</div><div>{proteinFood?.name}：{practicalPortion(proteinFood, proteinGrams).text}</div></div><div className="mt-4 flex flex-wrap gap-2">{dish.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{tag}</span>)}</div><button className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white" onClick={() => onCompleteMeal(selectedMeal, dish.name)}>这餐我就按这个吃</button></div></CardShell>; })}</div></div></Modal>;
}

function FixPage() { return <div className="space-y-5"><CardShell><div className="p-5"><SectionTitle title="超了怎么修" desc="把纠偏也做成主入口，不让用户翻一堆资料。" /><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{correctionRules.map((item) => <div key={item.title} className="rounded-2xl bg-slate-50 p-4"><div className="font-semibold text-slate-900">{item.title}</div><div className="mt-2 text-sm text-slate-600">{item.desc}</div></div>)}</div></div></CardShell></div>; }
function TestPage() { const tests = useMemo(() => runSelfTests(), []); const passed = tests.filter((test) => test.pass).length; return <CardShell><div className="p-5"><div className="mb-4 flex items-center justify-between gap-3"><SectionTitle title="逻辑自检" desc="保留最小验证页，避免改着改着把推荐逻辑改坏。" /><Badge tone={passed === tests.length ? "green" : "red"}>{passed}/{tests.length} 通过</Badge></div><div className="space-y-2">{tests.map((test) => <div key={test.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm"><span>{test.name}</span><span className={test.pass ? "font-semibold text-emerald-700" : "font-semibold text-red-700"}>{test.pass ? "PASS" : "FAIL"}</span></div>)}</div></div></CardShell>; }

export default function NutritionWebToolMVP() {
  const stored = loadStoredProfile();
  const [ready, setReady] = useState(false);
  const [guestId, setGuestId] = useState(stored?.guestId || "");
  const [nickname, setNickname] = useState(stored?.nickname || "");
  const [profileCompleted, setProfileCompleted] = useState(stored?.profileCompleted || false);
  const [page, setPage] = useState("today");
  const [mealFlowOpen, setMealFlowOpen] = useState(false);
  const [form, setForm] = useState(stored?.form || defaultProfile.form);
  const [mealMode, setMealMode] = useState(stored?.mealMode || defaultProfile.mealMode);
  const [ratios, setRatios] = useState(stored?.ratios || defaultProfile.ratios);
  const [activePreset, setActivePreset] = useState(stored?.activePreset || defaultProfile.activePreset);
  const [preferences, setPreferences] = useState(stored?.preferences || defaultProfile.preferences);
  const [choiceHistory, setChoiceHistory] = useState(stored?.choiceHistory || defaultProfile.choiceHistory);
  const [chosenMealIds, setChosenMealIds] = useState(stored?.chosenMealIds || defaultProfile.chosenMealIds);
  const [tomorrowPlan, setTomorrowPlan] = useState(stored?.tomorrowPlan || defaultProfile.tomorrowPlan);
  const [weekPlan, setWeekPlan] = useState(stored?.weekPlan || defaultProfile.weekPlan);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!ready || !guestId) return;
    saveStoredProfile({ guestId, nickname, profileCompleted, form, mealMode, ratios, activePreset, preferences, choiceHistory, chosenMealIds, tomorrowPlan, weekPlan });
  }, [ready, guestId, nickname, profileCompleted, form, mealMode, ratios, activePreset, preferences, choiceHistory, chosenMealIds, tomorrowPlan, weekPlan]);

  const nutrition = useMemo(() => calculateNutrition(form), [form]);
  const historyCounts = useMemo(() => choiceHistory.reduce((acc, item) => ({ ...acc, [item]: (acc[item] || 0) + 1 }), {}), [choiceHistory]);
  const ratioTotal = (mealProfiles[mealMode] || []).reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0);
  const ratioValid = ratioTotal === 100;
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  function applyPreset(key) { const preset = presetPlans[key]; if (!preset) return; setMealMode(preset.mealMode); setRatios(preset.ratios); setActivePreset(key); }
  function handleMealModeChange(value) { const fallbackKey = value === "snack" ? "snack_plan" : "balanced_three"; const preset = presetPlans[fallbackKey]; setMealMode(value); setRatios(preset.ratios); setActivePreset(fallbackKey); }
  function handleRatioChange(mealId, value) { setRatios((prev) => ({ ...prev, [mealId]: Math.max(Number(value) || 0, 0) })); setActivePreset(null); }
  function handleCompleteMeal(mealId, dishName) { setChosenMealIds((prev) => Array.from(new Set([...prev, mealId]))); setChoiceHistory((prev) => [...prev, dishName]); setMealFlowOpen(false); setPage("today"); }
  function startGuestMode() { setGuestId(generateGuestId()); }
  function finishProfile() { setProfileCompleted(true); setPage("today"); }

  return <div className="min-h-screen bg-slate-100 px-3 py-4 text-slate-900 sm:px-4 md:px-8 md:py-8"><div className="mx-auto max-w-7xl space-y-5"><CardShell className="overflow-hidden border-none bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl"><div className="p-5 sm:p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><Badge tone="blue">饭饭 · 游客继承版</Badge><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">不用注册，给自己起个昵称就能继续用</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">这版先把游客身份打通：第一次打开只要起个昵称，系统会给你一个游客ID，并把资料、偏好、规划和历史存在这台设备里，下次回来自动接上。</p></div><div className="flex flex-wrap gap-2"><button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm" onClick={() => setMealFlowOpen(true)}>开始一餐</button><button className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white" onClick={() => setPage("planning")}>安排明天</button></div></div></div></CardShell><div className="rounded-3xl bg-white p-2 shadow-sm"><div className="grid grid-cols-2 gap-2 md:grid-cols-5"><MiniButton active={page === "today"} onClick={() => setPage("today")}>今天</MiniButton><MiniButton active={page === "planning"} onClick={() => setPage("planning")}>提前规划</MiniButton><MiniButton active={page === "fix"} onClick={() => setPage("fix")}>纠偏</MiniButton><MiniButton active={page === "personal"} onClick={() => setPage("personal")}>个人设置</MiniButton><MiniButton active={page === "tests"} onClick={() => setPage("tests")}>自检</MiniButton></div></div>{!ratioValid && page !== "tests" ? <CardShell><div className="p-5 text-sm text-red-700">当前餐次比例还没调到 100%，推荐会受影响，建议先去“个人设置”完成配置。</div></CardShell> : null}{page === "today" && <TodayPage nutrition={nutrition} mealMode={mealMode} tomorrowPlan={tomorrowPlan} chosenMealIds={chosenMealIds} nickname={nickname} />}{page === "planning" && <PlanningPage mealMode={mealMode} preferences={preferences} historyCounts={historyCounts} tomorrowPlan={tomorrowPlan} setTomorrowPlan={setTomorrowPlan} weekPlan={weekPlan} setWeekPlan={setWeekPlan} />}{page === "fix" && <FixPage />}{page === "personal" && <PersonalInfoPage form={form} set={set} nutrition={nutrition} mealMode={mealMode} onMealModeChange={handleMealModeChange} ratios={ratios} onRatioChange={handleRatioChange} activePreset={activePreset} onApplyPreset={applyPreset} preferences={preferences} setPreferences={setPreferences} guestId={guestId} nickname={nickname} setNickname={setNickname} />}{page === "tests" && <TestPage />}</div><MealFlowModal open={mealFlowOpen} onClose={() => setMealFlowOpen(false)} mealMode={mealMode} ratios={ratios} nutrition={nutrition} preferences={preferences} historyCounts={historyCounts} onCompleteMeal={handleCompleteMeal} />{ready && !guestId ? <WelcomeOverlay nickname={nickname} setNickname={setNickname} onStart={startGuestMode} /> : null}{ready && guestId && !profileCompleted ? <OnboardingCard nickname={nickname} setNickname={setNickname} form={form} set={set} mealMode={mealMode} setMealMode={handleMealModeChange} ratios={ratios} setRatios={setRatios} preferences={preferences} setPreferences={setPreferences} onFinish={finishProfile} /> : null}</div>;
}
