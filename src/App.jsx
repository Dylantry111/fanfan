import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fanfan_guest_profile_v1";

const foods = [
  { id: "rice", name: "熟米饭", type: "carb", per: "100g", carbs: 28, protein: 2.6, fat: 0.3, kcal: 130, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "low", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "碗", grams: 110 }], note: "适合日常主食，外卖常见。", shortHint: "小碗米饭" },
  { id: "noodle", name: "面条", type: "carb", per: "100g", carbs: 25, protein: 4, fat: 1, kcal: 138, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "low", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "碗", grams: 220 }], note: "一碗面通常主食量偏高。", shortHint: "面量偏高" },
  { id: "mantou", name: "馒头", type: "carb", per: "100g", carbs: 47, protein: 7, fat: 1, kcal: 223, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "low", density: "high", digestibility: "fast" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "个", grams: 100 }], note: "同等碳水下，比米饭实际克重少。", shortHint: "中等馒头" },
  { id: "bread", name: "全麦面包", type: "carb", per: "100g", carbs: 43, protein: 10, fat: 4, kcal: 250, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "medium", density: "high", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "片", grams: 35 }], note: "优先选配料简单的。", shortHint: "全麦切片" },
  { id: "oats", name: "燕麦", type: "carb", per: "100g", carbs: 60, protein: 13, fat: 7, kcal: 380, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "high", density: "high", digestibility: "slow" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "份", grams: 50 }], note: "适合早餐，饱腹感较好。", shortHint: "4-5勺干燕麦" },
  { id: "sweet_potato", name: "红薯", type: "carb", per: "100g", carbs: 20, protein: 1.6, fat: 0.1, kcal: 90, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "fiber", fiber: "medium", density: "medium", digestibility: "slow" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "个", grams: 220 }], note: "饱腹感强，适合减脂。", shortHint: "中等红薯" },
  { id: "corn", name: "玉米", type: "carb", per: "100g", carbs: 21, protein: 3.4, fat: 1.2, kcal: 96, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "fiber", fiber: "medium", density: "medium", digestibility: "slow" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "根", grams: 200 }], note: "可替代部分主食。", shortHint: "整根玉米" },
  { id: "porridge", name: "白粥", type: "carb", per: "100ml", carbs: 10, protein: 1.1, fat: 0.1, kcal: 45, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "water", fiber: "low", density: "low", digestibility: "fast" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "碗", grams: 250 }], note: "水分高，同等碳水需要更大克重。", shortHint: "一碗白粥" },
  { id: "dumpling", name: "饺子", type: "carb", per: "100g", carbs: 28, protein: 8, fat: 8, kcal: 220, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "low", density: "high", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "个", grams: 25 }], note: "主食和肉馅混合，份量容易超。", shortHint: "家常饺子" },
  { id: "baozi", name: "包子", type: "carb", per: "100g", carbs: 30, protein: 6, fat: 5, kcal: 200, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "low", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "个", grams: 120 }], note: "早餐常见，注意肉馅和面皮叠加。", shortHint: "常规肉包" },
  { id: "rice_noodle", name: "米粉", type: "carb", per: "100g", carbs: 26, protein: 3, fat: 0.5, kcal: 120, nutritionProfile: { primaryMacro: "carbs", secondaryMacro: "protein", fiber: "low", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "碗", grams: 200 }], note: "汤粉类容易低估主食量。", shortHint: "汤粉" },

  { id: "chicken", name: "鸡胸肉", type: "protein", per: "100g", carbs: 0, protein: 31, fat: 3.6, kcal: 165, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "high", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "掌心", grams: 120 }], note: "高蛋白低脂，最稳的减脂肉类。", shortHint: "掌心厚度" },
  { id: "chicken_leg", name: "鸡腿肉", type: "protein", per: "100g", carbs: 0, protein: 24, fat: 10, kcal: 190, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "high", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "只", grams: 130 }], note: "比鸡胸脂肪高，去皮更合适。", shortHint: "去骨鸡腿" },
  { id: "beef", name: "牛肉", type: "protein", per: "100g", carbs: 0, protein: 26, fat: 15, kcal: 250, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "high", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "掌心", grams: 100 }], note: "蛋白质高，脂肪视部位差异较大。", shortHint: "掌心牛肉" },
  { id: "fish", name: "鱼肉", type: "protein", per: "100g", carbs: 0, protein: 22, fat: 2, kcal: 110, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "块", grams: 150 }], note: "低脂高蛋白，适合晚餐。", shortHint: "大块鱼肉" },
  { id: "shrimp", name: "虾", type: "protein", per: "100g", carbs: 0, protein: 20, fat: 1, kcal: 100, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "只", grams: 12 }], note: "低脂蛋白，适合减脂。", shortHint: "中等虾" },
  { id: "egg_boiled", name: "水煮蛋", type: "protein", per: "100g", carbs: 1.1, protein: 13, fat: 10, kcal: 155, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "个", grams: 50 }], note: "常见早餐蛋类，1个普通鸡蛋可食部分约50克。", shortHint: "普通鸡蛋" },
  { id: "egg_steamed", name: "鸡蛋羹", type: "protein", per: "100g", carbs: 1.3, protein: 9, fat: 6, kcal: 100, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "low", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "碗", grams: 120 }], note: "更软更顺口，适合早餐或晚餐。", shortHint: "一小碗蛋羹" },
  { id: "egg_fried", name: "煎蛋", type: "protein", per: "100g", carbs: 1.1, protein: 12, fat: 12, kcal: 180, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "个", grams: 55 }], note: "油会更高一些，适合偶尔搭配。", shortHint: "单面或双面煎蛋" },
  { id: "egg_tomato", name: "西红柿炒鸡蛋", type: "protein", per: "100g", carbs: 4, protein: 8, fat: 8, kcal: 120, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "low", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "份", grams: 180 }], note: "是菜，不是纯蛋白，适合搭主食吃。", shortHint: "一盘家常菜" },
  { id: "tofu", name: "豆腐", type: "protein", per: "100g", carbs: 2, protein: 8, fat: 4.8, kcal: 80, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "low", density: "medium", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "盒", grams: 400 }], note: "植物蛋白，蛋白密度低于肉类。", shortHint: "盒装豆腐" },
  { id: "milk", name: "牛奶", type: "protein", per: "100ml", carbs: 5, protein: 3.4, fat: 3.6, kcal: 60, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "carbs", fiber: "none", density: "low", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "盒", grams: 250 }], note: "早餐或加餐常见。", shortHint: "纯牛奶" },
  { id: "soy_milk", name: "豆浆", type: "protein", per: "100ml", carbs: 3.5, protein: 3, fat: 1.8, kcal: 35, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "carbs", fiber: "low", density: "low", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "杯", grams: 250 }], note: "中式早餐很常见，尽量优先无糖豆浆。", shortHint: "无糖豆浆" },
  { id: "yogurt", name: "酸奶", type: "protein", per: "100ml", carbs: 6, protein: 4, fat: 3, kcal: 70, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "carbs", fiber: "none", density: "low", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "杯", grams: 200 }], note: "注意含糖酸奶。", shortHint: "无糖酸奶" },
  { id: "pork", name: "瘦猪肉", type: "protein", per: "100g", carbs: 0, protein: 27, fat: 10, kcal: 200, nutritionProfile: { primaryMacro: "protein", secondaryMacro: "fat", fiber: "none", density: "high", digestibility: "medium" }, source: { kind: "internal_seed", confidence: "medium" }, units: [{ label: "掌心", grams: 100 }], note: "里脊和瘦肉更合适。", shortHint: "掌心瘦肉" },
];


const foodMeta = {
  rice: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.86, secondaryMacro: "protein", secondaryRatio: 0.08, groups: ["staple", "grain", "main_carb"], suitableMeals: ["lunch", "dinner"], satiety: 0.7 },
  noodle: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.72, secondaryMacro: "protein", secondaryRatio: 0.12, groups: ["staple", "grain", "main_carb"], suitableMeals: ["breakfast", "lunch", "dinner"], satiety: 0.62 },
  mantou: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.84, secondaryMacro: "protein", secondaryRatio: 0.13, groups: ["staple", "grain", "main_carb"], suitableMeals: ["breakfast", "lunch"], satiety: 0.68 },
  bread: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.69, secondaryMacro: "protein", secondaryRatio: 0.16, groups: ["staple", "grain", "main_carb", "convenience"], suitableMeals: ["breakfast", "snack", "dinner"], satiety: 0.58 },
  oats: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.63, secondaryMacro: "protein", secondaryRatio: 0.14, groups: ["staple", "whole_grain", "main_carb"], suitableMeals: ["breakfast", "snack"], satiety: 0.88 },
  sweet_potato: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.82, secondaryMacro: "protein", secondaryRatio: 0.07, groups: ["staple", "tuber", "main_carb"], suitableMeals: ["lunch", "dinner"], satiety: 0.86 },
  corn: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.7, secondaryMacro: "protein", secondaryRatio: 0.11, groups: ["staple", "whole_grain", "light_carb"], suitableMeals: ["breakfast", "snack", "dinner"], satiety: 0.8 },
  porridge: { role: "staple", form: "light", primaryMacro: "carbs", primaryRatio: 0.88, secondaryMacro: "protein", secondaryRatio: 0.09, groups: ["staple", "grain", "light_carb"], suitableMeals: ["breakfast", "dinner"], satiety: 0.42 },
  dumpling: { role: "dish", form: "solid", primaryMacro: "carbs", primaryRatio: 0.51, secondaryMacro: "protein", secondaryRatio: 0.15, groups: ["mixed_meal", "main_carb"], suitableMeals: ["breakfast", "lunch", "snack"], satiety: 0.7 },
  baozi: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.6, secondaryMacro: "protein", secondaryRatio: 0.12, groups: ["staple", "mixed_carb"], suitableMeals: ["breakfast", "snack"], satiety: 0.64 },
  rice_noodle: { role: "staple", form: "solid", primaryMacro: "carbs", primaryRatio: 0.87, secondaryMacro: "protein", secondaryRatio: 0.1, groups: ["staple", "grain", "main_carb"], suitableMeals: ["breakfast", "lunch", "dinner"], satiety: 0.57 },
  chicken: { role: "protein", form: "dish", primaryMacro: "protein", primaryRatio: 0.75, secondaryMacro: "fat", secondaryRatio: 0.2, groups: ["protein", "lean_protein", "main_protein"], suitableMeals: ["lunch", "dinner"], satiety: 0.9 },
  chicken_leg: { role: "protein", form: "dish", primaryMacro: "protein", primaryRatio: 0.5, secondaryMacro: "fat", secondaryRatio: 0.47, groups: ["protein", "animal_protein", "main_protein"], suitableMeals: ["lunch", "dinner"], satiety: 0.84 },
  beef: { role: "protein", form: "dish", primaryMacro: "protein", primaryRatio: 0.42, secondaryMacro: "fat", secondaryRatio: 0.54, groups: ["protein", "animal_protein", "main_protein"], suitableMeals: ["lunch", "dinner"], satiety: 0.82 },
  fish: { role: "protein", form: "dish", primaryMacro: "protein", primaryRatio: 0.8, secondaryMacro: "fat", secondaryRatio: 0.16, groups: ["protein", "lean_protein", "main_protein"], suitableMeals: ["lunch", "dinner"], satiety: 0.88 },
  shrimp: { role: "protein", form: "dish", primaryMacro: "protein", primaryRatio: 0.8, secondaryMacro: "fat", secondaryRatio: 0.09, groups: ["protein", "lean_protein", "main_protein"], suitableMeals: ["lunch", "dinner"], satiety: 0.84 },
  egg_boiled: { role: "protein", form: "single", primaryMacro: "protein", primaryRatio: 0.34, secondaryMacro: "fat", secondaryRatio: 0.58, groups: ["protein", "egg", "support_protein"], suitableMeals: ["breakfast", "snack", "lunch", "dinner"], satiety: 0.75 },
  egg_steamed: { role: "dish", form: "soft", primaryMacro: "protein", primaryRatio: 0.36, secondaryMacro: "fat", secondaryRatio: 0.54, groups: ["protein", "egg", "support_protein"], suitableMeals: ["breakfast", "dinner"], satiety: 0.68 },
  egg_fried: { role: "protein", form: "single", primaryMacro: "protein", primaryRatio: 0.27, secondaryMacro: "fat", secondaryRatio: 0.6, groups: ["protein", "egg", "support_protein"], suitableMeals: ["breakfast", "dinner"], satiety: 0.7 },
  egg_tomato: { role: "dish", form: "dish", primaryMacro: "protein", primaryRatio: 0.28, secondaryMacro: "fat", secondaryRatio: 0.56, groups: ["protein", "mixed_dish", "support_protein"], suitableMeals: ["lunch", "dinner"], satiety: 0.66 },
  tofu: { role: "dish", form: "soft", primaryMacro: "protein", primaryRatio: 0.4, secondaryMacro: "fat", secondaryRatio: 0.54, groups: ["protein", "plant_protein", "support_protein"], suitableMeals: ["breakfast", "lunch", "dinner"], satiety: 0.72 },
  milk: { role: "drink", form: "drink", primaryMacro: "protein", primaryRatio: 0.23, secondaryMacro: "carbs", secondaryRatio: 0.33, groups: ["dairy", "drink_protein", "support_protein"], suitableMeals: ["breakfast", "snack"], satiety: 0.5 },
  soy_milk: { role: "drink", form: "drink", primaryMacro: "protein", primaryRatio: 0.34, secondaryMacro: "carbs", secondaryRatio: 0.4, groups: ["soy", "drink_protein", "support_protein"], suitableMeals: ["breakfast", "snack"], satiety: 0.56 },
  yogurt: { role: "drink", form: "drink", primaryMacro: "protein", primaryRatio: 0.23, secondaryMacro: "carbs", secondaryRatio: 0.34, groups: ["dairy", "drink_protein", "support_protein"], suitableMeals: ["breakfast", "snack", "dinner"], satiety: 0.62 },
  pork: { role: "protein", form: "dish", primaryMacro: "protein", primaryRatio: 0.51, secondaryMacro: "fat", secondaryRatio: 0.45, groups: ["protein", "animal_protein", "main_protein"], suitableMeals: ["lunch", "dinner"], satiety: 0.8 },
};

const mealCompositionRules = {
  breakfast: {
    carbFloor: 0.7,
    proteinFloor: 0.8,
    maxItems: 3,
    allowDrinkSupplement: true,
    preferredSupportOrder: ["protein", "drink"],
    disallowDrinkPair: true,
    disallowSecondStaple: true,
  },
  lunch: {
    carbFloor: 0.85,
    proteinFloor: 0.9,
    maxItems: 3,
    allowDrinkSupplement: false,
    preferredSupportOrder: ["dish"],
    disallowDrinkPair: true,
    disallowSecondStaple: true,
  },
  dinner: {
    carbFloor: 0.75,
    proteinFloor: 0.9,
    maxItems: 3,
    allowDrinkSupplement: false,
    preferredSupportOrder: ["dish"],
    disallowDrinkPair: true,
    disallowSecondStaple: true,
  },
  snack: {
    carbFloor: 0.45,
    proteinFloor: 0.75,
    maxItems: 2,
    allowDrinkSupplement: true,
    preferredSupportOrder: ["protein", "drink"],
    disallowDrinkPair: true,
    disallowSecondStaple: true,
  },
};

function getFoodMeta(food) {
  return foodMeta[food?.id] || { role: food?.type === "carb" ? "staple" : "protein", form: "solid", primaryMacro: food?.type === "carb" ? "carbs" : "protein", primaryRatio: 0.7, secondaryMacro: food?.type === "carb" ? "protein" : "fat", secondaryRatio: 0.15, groups: [food?.type === "carb" ? "staple" : "protein"], suitableMeals: ["breakfast", "lunch", "dinner", "snack"], satiety: 0.6 };
}

function hasFoodGroup(food, group) {
  return getFoodMeta(food).groups?.includes(group);
}

function getDishFoods(dish) {
  return {
    carbFood: foods.find((food) => food.id === dish.carbFoodId) || null,
    proteinFood: foods.find((food) => food.id === dish.proteinFoodId) || null,
  };
}

function scoreMealCombination(dish) {
  const { carbFood, proteinFood } = getDishFoods(dish);
  const mealRule = mealCompositionRules[dish.meal] || mealCompositionRules.lunch;
  let score = 0;

  if (!carbFood || !proteinFood) return -999;

  const carbMeta = getFoodMeta(carbFood);
  const proteinMeta = getFoodMeta(proteinFood);

  if (carbMeta.suitableMeals?.includes(dish.meal)) score += 2;
  else score -= 3;

  if (proteinMeta.suitableMeals?.includes(dish.meal)) score += 2;
  else score -= 3;

  if (hasFoodGroup(carbFood, "whole_grain")) score += 1.5;
  if (hasFoodGroup(carbFood, "light_carb") && dish.meal === "breakfast") score -= 0.5;
  if (carbFood.id === "porridge" && dish.meal !== "breakfast") score -= 1.5;
  if (carbFood.id === "bread" && dish.meal === "dinner") score -= 0.8;

  if (hasFoodGroup(proteinFood, "main_protein")) score += 2.5;
  if (hasFoodGroup(proteinFood, "support_protein") && ["lunch", "dinner"].includes(dish.meal)) score -= 1.5;
  if (hasFoodGroup(proteinFood, "dairy") && dish.meal === "snack") score += 1.2;
  if (hasFoodGroup(proteinFood, "dairy") && ["lunch", "dinner"].includes(dish.meal)) score -= 1.2;

  const proteinDensity = proteinFood.protein || 0;
  if (dish.meal === "breakfast" && proteinDensity >= 8) score += 1.5;
  if (["lunch", "dinner"].includes(dish.meal) && proteinDensity >= 20) score += 2;
  if (["lunch", "dinner"].includes(dish.meal) && proteinDensity < 10) score -= 2;

  if (mealRule.disallowDrinkPair && proteinMeta.role === "drink" && hasFoodGroup(carbFood, "light_carb")) score -= 0.8;
  score += (carbMeta.satiety || 0.6) * 1.5;
  score += (proteinMeta.satiety || 0.6) * 1.2;

  return round(score, 2);
}

function getMealRule(mealId) {
  return mealCompositionRules[mealId] || mealCompositionRules.lunch;
}

function isDrinkFood(food) {
  return getFoodMeta(food).role === "drink";
}

function isStapleFood(food) {
  return ["staple", "dish"].includes(getFoodMeta(food).role) && food?.type === "carb";
}

function isPrimaryProteinFood(food) {
  const meta = getFoodMeta(food);
  return (meta.role === "protein" || meta.role === "dish" || meta.role === "drink") && food?.protein >= 8;
}

function getProteinSupportCandidates(mealId, carbFood, proteinFood) {
  const carbId = carbFood?.id;
  const proteinId = proteinFood?.id;
  const breakfastCandidates = ["egg_boiled", "milk", "soy_milk", "yogurt", "tofu"];
  const snackCandidates = ["egg_boiled", "milk", "soy_milk", "yogurt"];
  const mealCandidates = ["egg_boiled", "tofu", "milk", "soy_milk", "yogurt"];
  const base = mealId === "breakfast" ? breakfastCandidates : mealId === "snack" ? snackCandidates : mealCandidates;
  return base.filter((id) => id !== carbId && id !== proteinId);
}

function getSupportFoodById(id) {
  return foods.find((food) => food.id === id) || null;
}

const dishLibrary = [
  { id: "breakfast-oats-egg", meal: "breakfast", scene: "home", category: "家常早餐", name: "燕麦鸡蛋早餐杯", tags: ["早餐", "家里", "高蛋白"], carbFoodId: "oats", proteinFoodId: "egg_boiled", note: "很稳，适合早上不想想太多的时候。" },
  { id: "breakfast-bread-yogurt", meal: "breakfast", scene: "convenience", category: "便利店早餐", name: "全麦吐司 + 无糖酸奶 + 水煮蛋", tags: ["早餐", "便利店", "快选"], carbFoodId: "bread", proteinFoodId: "yogurt", note: "参考常见健康早餐结构，保留主食和奶类，同时补一个更稳的蛋白。" },
  { id: "breakfast-porridge-egg", meal: "breakfast", scene: "home", category: "中式早餐", name: "白粥 + 鸡蛋", tags: ["早餐", "家里", "中式"], carbFoodId: "porridge", proteinFoodId: "egg_boiled", note: "白粥饱腹偏弱，所以只保留一份明确蛋白，不再叠奶类。" },
  { id: "breakfast-baozi-milk", meal: "breakfast", scene: "takeout", category: "中式早餐", name: "肉包 + 豆浆 + 水煮蛋", tags: ["早餐", "外卖", "快手"], carbFoodId: "baozi", proteinFoodId: "soy_milk", note: "中式早餐里豆浆比双奶类更自然，和包子、鸡蛋也更搭。" },
  { id: "breakfast-corn-yogurt", meal: "breakfast", scene: "convenience", category: "便利店早餐", name: "玉米 + 酸奶 + 水煮蛋", tags: ["早餐", "便利店", "轻负担"], carbFoodId: "corn", proteinFoodId: "yogurt", note: "轻早餐也尽量补足蛋白，不只停留在玉米加奶类。" },
  { id: "breakfast-mantou-egg", meal: "breakfast", scene: "home", category: "中式早餐", name: "馒头 + 鸡蛋 + 豆浆", tags: ["早餐", "家里", "饱腹"], carbFoodId: "mantou", proteinFoodId: "egg_boiled", note: "保留经典中式早餐结构，主食、鸡蛋和豆浆更接近日常习惯。" },
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
  { id: "dinner-egg-bread", meal: "dinner", scene: "convenience", category: "便利店简餐", name: "鸡蛋 + 全麦面包 + 无糖酸奶", tags: ["晚餐", "便利店", "临时"], carbFoodId: "bread", proteinFoodId: "egg_fried", note: "便利店晚餐优先保留一份主食、一份蛋白，再用酸奶做轻补充。" },
  { id: "dinner-rice-noodle-fish", meal: "dinner", scene: "takeout", category: "粉面类", name: "鱼片米粉减粉版", tags: ["晚餐", "外卖", "热乎"], carbFoodId: "rice_noodle", proteinFoodId: "fish", note: "更接近真实夜间外卖里常点的那类东西。" },
  { id: "dinner-shrimp-fried-rice-lite", meal: "dinner", scene: "takeout", category: "盖饭类", name: "虾仁炒饭减量版", tags: ["晚餐", "外卖", "满足感"], carbFoodId: "rice", proteinFoodId: "shrimp", note: "如果想吃炒饭，可以直接把份量和配菜策略带进去。" },
  { id: "dinner-chicken-bento", meal: "dinner", scene: "convenience", category: "便利店简餐", name: "鸡胸便当晚餐版", tags: ["晚餐", "便利店", "快选"], carbFoodId: "rice", proteinFoodId: "chicken", note: "适合晚归、懒得再想的一餐。" },

  { id: "snack-yogurt", meal: "snack", scene: "convenience", category: "加餐", name: "无糖酸奶", tags: ["加餐", "便利店", "补蛋白"], carbFoodId: "bread", proteinFoodId: "yogurt", note: "加餐先轻量，优先单一奶类或再加一个鸡蛋，不做双奶叠加。" },
  { id: "snack-milk-egg", meal: "snack", scene: "home", category: "加餐", name: "豆浆 + 水煮蛋", tags: ["加餐", "家里", "简单"], carbFoodId: "bread", proteinFoodId: "soy_milk", note: "如果偏中式口味，豆浆加鸡蛋会比再叠别的饮品更自然。" },
  { id: "snack-corn-yogurt", meal: "snack", scene: "convenience", category: "加餐", name: "玉米 + 酸奶", tags: ["加餐", "便利店", "饱腹"], carbFoodId: "corn", proteinFoodId: "yogurt", note: "保留轻主食 + 奶类的结构，但不再自动叠第二奶类。" },
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
  tomorrowPlanDate: "",
  activeDayPlan: {},
  activeDayPlanDate: "",
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

function getDateKey(offset = 0) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function round(n, digits = 0) { const p = Math.pow(10, digits); return Math.round((Number(n) || 0) * p) / p; }
function nearlyEqual(actual, expected, tolerance = 0.5) { return Math.abs(actual - expected) <= tolerance; }
function bmr({ sex, weight, height, age }) { const safeWeight = Math.max(Number(weight) || 0, 0); const safeHeight = Math.max(Number(height) || 0, 0); const safeAge = Math.max(Number(age) || 0, 0); const base = 10 * safeWeight + 6.25 * safeHeight - 5 * safeAge; return sex === "male" ? base + 5 : base - 161; }
function inferActivity(form) { const cardio = Number(form.weeklyCardioMinutes) || 0; const strength = Number(form.weeklyStrengthMinutes) || 0; const total = cardio + strength; if (total >= 360 || strength >= 180) return "strength"; if (total >= 180) return "moderate"; if (total >= 60) return "light"; return "sedentary"; }
function calculateNutrition(form) { const weight = Math.max(Number(form.weight) || 0, 0); const height = Math.max(Number(form.height) || 0, 0); const age = Math.max(Number(form.age) || 0, 0); const inferredActivity = inferActivity(form); const selectedActivity = activityMap[inferredActivity] || activityMap.sedentary; const selectedGoal = goalMap[form.goal] || goalMap.standard_cut; const BMR = bmr({ sex: form.sex, weight, height, age }); const TDEE = BMR * selectedActivity.factor; const minKcal = form.sex === "male" ? selectedGoal.minKcalMale : selectedGoal.minKcalFemale; const targetKcal = Math.max(TDEE - selectedGoal.deficit, minKcal); const protein = weight * selectedGoal.proteinFactor; const fat = (targetKcal * selectedGoal.fatRatio) / 9; const carbs = Math.max((targetKcal - protein * 4 - fat * 9) / 4, 0); return { BMR, TDEE, kcal: targetKcal, protein, fat, carbs }; }
function gramsFor(food, macro, target) { const density = food?.[macro]; const safeTarget = Math.max(Number(target) || 0, 0); if (!density || density <= 0 || safeTarget <= 0) return null; return (safeTarget / density) * 100; }

const portionBounds = {
  rice: { category: "solid", min: 80, default: 120, max: 220, step: 20, unitLabel: "份", portionName: "米饭" },
  noodle: { category: "solid", min: 120, default: 180, max: 260, step: 20, unitLabel: "份", portionName: "面" },
  oats: { category: "solid", min: 30, default: 50, max: 80, step: 10, unitLabel: "份", portionName: "燕麦" },
  bread: { category: "solid", min: 35, default: 70, max: 105, step: 35, unitLabel: "份", portionName: "面包" },
  sweet_potato: { category: "solid", min: 120, default: 220, max: 320, step: 20, unitLabel: "份", portionName: "红薯" },
  corn: { category: "solid", min: 120, default: 200, max: 260, step: 20, unitLabel: "份", portionName: "玉米" },
  porridge: { category: "semiLiquid", min: 100, default: 180, max: 250, step: 50, unitLabel: "碗", portionName: "白粥" },
  dumpling: { category: "solid", min: 100, default: 150, max: 220, step: 20, unitLabel: "份", portionName: "饺子" },
  baozi: { category: "solid", min: 90, default: 120, max: 240, step: 30, unitLabel: "份", portionName: "包子" },
  mantou: { category: "solid", min: 70, default: 100, max: 160, step: 30, unitLabel: "份", portionName: "馒头" },
  rice_noodle: { category: "solid", min: 120, default: 180, max: 260, step: 20, unitLabel: "份", portionName: "米粉" },
  chicken: { category: "solid", min: 90, default: 120, max: 180, step: 10, unitLabel: "份", portionName: "鸡胸肉" },
  chicken_leg: { category: "solid", min: 100, default: 130, max: 180, step: 10, unitLabel: "份", portionName: "鸡腿肉" },
  beef: { category: "solid", min: 80, default: 100, max: 160, step: 10, unitLabel: "份", portionName: "牛肉" },
  fish: { category: "solid", min: 100, default: 150, max: 200, step: 10, unitLabel: "份", portionName: "鱼肉" },
  shrimp: { category: "solid", min: 90, default: 120, max: 180, step: 10, unitLabel: "份", portionName: "虾" },
  pork: { category: "solid", min: 80, default: 100, max: 160, step: 10, unitLabel: "份", portionName: "瘦猪肉" },
  tofu: { category: "solid", min: 120, default: 200, max: 300, step: 20, unitLabel: "份", portionName: "豆腐" },
  egg_boiled: { category: "solid", min: 50, default: 100, max: 150, step: 50, unitLabel: "份", portionName: "水煮蛋" },
  egg_steamed: { category: "semiLiquid", min: 100, default: 120, max: 250, step: 50, unitLabel: "碗", portionName: "鸡蛋羹" },
  egg_fried: { category: "solid", min: 55, default: 55, max: 110, step: 55, unitLabel: "份", portionName: "煎蛋" },
  egg_tomato: { category: "solid", min: 120, default: 180, max: 260, step: 20, unitLabel: "份", portionName: "西红柿炒鸡蛋" },
  milk: { category: "liquid", min: 150, default: 240, max: 240, step: 30, unitLabel: "杯", portionName: "牛奶" },
  soy_milk: { category: "liquid", min: 150, default: 240, max: 240, step: 30, unitLabel: "杯", portionName: "豆浆" },
  yogurt: { category: "liquid", min: 150, default: 210, max: 240, step: 30, unitLabel: "杯", portionName: "酸奶" },
};

function snapPortion(value, step, min) {
  if (!value || !step) return value;
  const safeMin = min || 0;
  return safeMin + Math.round((value - safeMin) / step) * step;
}

function clampPortion(food, grams, context = {}) {
  if (!food || !grams || grams <= 0) return null;
  const bounds = portionBounds[food.id];
  if (!bounds) return grams;
  const { mealId = "", isSupport = false } = context;
  let min = bounds.min;
  let max = bounds.max;

  if ((food.id === "milk" || food.id === "soy_milk" || food.id === "yogurt") && mealId === "snack" && !isSupport) {
    max = Math.min(max, bounds.default || max);
  }

  if ((food.id === "egg_boiled" || food.id === "egg_fried") && mealId === "snack") {
    max = Math.min(max, 110);
  }

  const clamped = Math.min(Math.max(grams, min), max);
  return snapPortion(clamped, bounds.step, min);
}

function getReasonablePortion(food, macro, target, context = {}) {
  const raw = gramsFor(food, macro, target);
  return clampPortion(food, raw, context);
}

function formatLifestyleUnit(food, grams) { if (!grams || grams <= 0 || !food.units?.length) return "—"; const unit = food.units[0]; const count = grams / unit.grams; const roundedCount = count < 2 ? round(count, 1) : round(count, 0); const clean = `${roundedCount}`; if (unit.label === "掌心") return `约 ${clean}个掌心大小`; if (unit.label === "份") return food.shortHint ? `约 ${clean}份，${food.shortHint}` : `约 ${clean}份`; if (unit.label === "盒" && food.id === "tofu") return count < 1 ? `约 ${round(count * 2, 1)}半盒豆腐` : `约 ${clean}盒豆腐`; if (unit.label === "只" && food.id === "shrimp") return `约 ${clean}只中虾`; return `约 ${clean}${unit.label}${food.shortHint ? `，${food.shortHint}` : ""}`; }

function formatLiquidPortion(food, grams) {
  const g = Math.round(grams);
  const label = g <= 150 ? "约半杯" : g <= 180 ? "约1小杯" : g <= 210 ? "约1杯" : "约1大杯";
  return `${label}（约${g}毫升）`;
}

function formatSemiLiquidPortion(food, grams) {
  const g = Math.round(grams);
  const label = g <= 100 ? "约半小碗" : g <= 150 ? "约1小碗" : g <= 200 ? "约1碗" : "约1大碗";
  return `${label}（约${g}毫升）`;
}

function getSolidPortionLabel(ratio) {
  if (ratio <= 0.75) return "约1小份";
  if (ratio <= 1.15) return "约1份";
  if (ratio <= 1.4) return "约1大份";
  return `约${round(ratio * 2, 0) / 2}份`;
}

function formatSolidPortion(food, grams, bounds) {
  const g = Math.round(grams);
  const base = bounds?.default || bounds?.min || g;
  const ratio = g / Math.max(base, 1);
  const label = getSolidPortionLabel(ratio);
  const name = bounds?.portionName || food.name;

  const itemSpecific = {
    rice: g <= 100 ? `约1小份米饭（约${g}克）` : g <= 160 ? `约1份米饭（约${g}克）` : `约1大份米饭（约${g}克）`,
    noodle: g <= 160 ? `约1小份面（约${g}克）` : g <= 220 ? `约1份面（约${g}克）` : `约1大份面（约${g}克）`,
    oats: `${label}燕麦（约${g}克）`,
    bread: g <= 40 ? `约1小份面包（约${g}克）` : g <= 75 ? `约1份面包（约${g}克）` : `约1大份面包（约${g}克）`,
    sweet_potato: g <= 180 ? `约1小份红薯（约${g}克）` : g <= 260 ? `约1份红薯（约${g}克）` : `约1大份红薯（约${g}克）`,
    corn: g <= 160 ? `约1小份玉米（约${g}克）` : g <= 220 ? `约1份玉米（约${g}克）` : `约1大份玉米（约${g}克）`,
    dumpling: g <= 140 ? `约1小份饺子（约${g}克）` : g <= 180 ? `约1份饺子（约${g}克）` : `约1大份饺子（约${g}克）`,
    baozi: g <= 120 ? `约1份包子（约${g}克）` : `约1大份包子（约${g}克）`,
    mantou: g <= 90 ? `约1小份馒头（约${g}克）` : g <= 120 ? `约1份馒头（约${g}克）` : `约1大份馒头（约${g}克）`,
    rice_noodle: g <= 160 ? `约1小份米粉（约${g}克）` : g <= 220 ? `约1份米粉（约${g}克）` : `约1大份米粉（约${g}克）`,
    egg_boiled: g <= 60 ? `约1份水煮蛋（约${g}克）` : g <= 110 ? `约2份水煮蛋（约${g}克）` : `约3份水煮蛋（约${g}克）`,
    egg_fried: g <= 60 ? `约1份煎蛋（约${g}克）` : `约2份煎蛋（约${g}克）`,
  };
  return itemSpecific[food.id] || `${label}${name}（约${g}克）`;
}

function practicalPortion(food, grams) {
  if (!food || !grams || grams <= 0) return { grams: null, text: "—" };
  const bounds = portionBounds[food.id] || { category: "solid", default: grams };
  const g = Math.round(grams);
  if (bounds.category === "liquid") return { grams: g, text: formatLiquidPortion(food, g) };
  if (bounds.category === "semiLiquid") return { grams: g, text: formatSemiLiquidPortion(food, g) };
  return { grams: g, text: formatSolidPortion(food, g, bounds) };
}
function buildMealItems(dish, targets) {
  const carbFood = foods.find((food) => food.id === dish.carbFoodId);
  const proteinFood = foods.find((food) => food.id === dish.proteinFoodId);
  const mealRule = getMealRule(dish.meal);
  const mealTemplates = {
    breakfast: { stapleShare: 0.75, proteinShare: 0.75 },
    lunch: { stapleShare: 0.88, proteinShare: 0.9 },
    dinner: { stapleShare: 0.78, proteinShare: 0.92 },
    snack: { stapleShare: 0.45, proteinShare: 0.75 },
  };
  const template = mealTemplates[dish.meal] || mealTemplates.lunch;
  const items = [];
  const carbTarget = Math.max(Number(targets.carbs) || 0, 0);
  const proteinTarget = Math.max(Number(targets.protein) || 0, 0);
  const used = new Set([dish.carbFoodId, dish.proteinFoodId]);
  const usedRoles = new Set();

  if (carbFood && carbTarget > 0) {
    const carbMeta = getFoodMeta(carbFood);
    usedRoles.add(carbMeta.role);
    items.push({ name: carbFood.name, text: practicalPortion(carbFood, getReasonablePortion(carbFood, "carbs", carbTarget * template.stapleShare, { mealId: dish.meal, isSupport: false })).text, role: carbMeta.role });
  }
  if (proteinFood && proteinTarget > 0) {
    const proteinMeta = getFoodMeta(proteinFood);
    usedRoles.add(proteinMeta.role);
    items.push({ name: proteinFood.name, text: practicalPortion(proteinFood, getReasonablePortion(proteinFood, "protein", proteinTarget * template.proteinShare, { mealId: dish.meal, isSupport: false })).text, role: proteinMeta.role });
  }

  let coveredCarbs = carbFood ? template.stapleShare : 0;
  let coveredProtein = proteinFood ? template.proteinShare : 0;
  const supportCandidates = getProteinSupportCandidates(dish.meal, carbFood, proteinFood);

  supportCandidates.forEach((id) => {
    if (items.length >= mealRule.maxItems) return;
    if (coveredProtein >= mealRule.proteinFloor) return;
    const supportFood = getSupportFoodById(id);
    if (!supportFood || used.has(supportFood.id)) return;
    if (mealRule.disallowDrinkPair && isDrinkFood(proteinFood) && isDrinkFood(supportFood)) return;
    if (mealRule.disallowSecondStaple && isStapleFood(carbFood) && isStapleFood(supportFood)) return;
    if (!mealRule.allowDrinkSupplement && isDrinkFood(supportFood)) return;

    const supportProteinTarget = proteinTarget * Math.max(mealRule.proteinFloor - coveredProtein, 0);
    if (supportProteinTarget <= 0) return;
    const grams = getReasonablePortion(supportFood, "protein", supportProteinTarget, { mealId: dish.meal, isSupport: true });
    const portion = practicalPortion(supportFood, grams);
    if (portion.text === "—") return;

    items.push({ name: supportFood.name, text: portion.text, role: getFoodMeta(supportFood).role });
    used.add(supportFood.id);
    usedRoles.add(getFoodMeta(supportFood).role);
    coveredProtein += Math.min((supportFood.protein || 0) / Math.max(proteinTarget, 1), 0.35);
  });

  if (dish.meal === "snack") {
    const filteredSnackItems = items.filter((item) => item.role !== "staple" || item.name === carbFood?.name);
    return filteredSnackItems.filter((item, index, arr) => item.text !== "—" && arr.findIndex((x) => x.name === item.name) === index).slice(0, mealRule.maxItems);
  }

  return items.filter((item, index, arr) => item.text !== "—" && arr.findIndex((x) => x.name === item.name) === index).slice(0, mealRule.maxItems);
}

function scoreDish(dish, preferences, historyCounts) { const dishName = dish.name; const foodIds = [dish.carbFoodId, dish.proteinFoodId].filter(Boolean); if (preferences.dislikedDishes.includes(dishName)) return -999; if (foodIds.some((id) => preferences.avoidFoods.includes(id))) return -999; let score = scoreMealCombination(dish); if (preferences.favoriteDishes.includes(dishName)) score += 4; if (foodIds.some((id) => preferences.favoriteFoods.includes(id))) score += 3; if (preferences.preferredScenes.includes(dish.scene)) score += 2; score += (historyCounts[dishName] || 0) * 0.8; return score; }
function getDishRecommendations({ mealId, scene, preferences, historyCounts, limit = 6, offset = 0 }) { return dishLibrary.filter((dish) => dish.meal === mealId && (!scene || dish.scene === scene)).map((dish) => ({ ...dish, score: scoreDish(dish, preferences, historyCounts), nutritionScore: scoreMealCombination(dish) })).filter((dish) => dish.score > -999).sort((a, b) => b.score - a.score || b.nutritionScore - a.nutritionScore).slice(offset, offset + limit); }
function buildTodayProgress(plans, chosenMealIds) { const mealKeys = ["breakfast", "lunch", "dinner", "snack"]; const planned = mealKeys.filter((meal) => plans[meal]?.dishId).length; const completed = mealKeys.filter((meal) => chosenMealIds.includes(meal)).length; return { planned, completed, remaining: Math.max(planned - completed, 0) }; }
function runSelfTests() { const rice = foods.find((food) => food.id === "rice"); const chicken = foods.find((food) => food.id === "chicken"); const milk = foods.find((food) => food.id === "milk"); const soyMilk = foods.find((food) => food.id === "soy_milk"); const maleDefault = calculateNutrition({ sex: "male", age: 35, height: 175, weight: 85, activity: "sedentary", goal: "standard_cut" }); const preferences = { avoidFoods: ["beef"], favoriteFoods: ["rice"], favoriteDishes: [], dislikedDishes: [], preferredScenes: [] }; const recs = getDishRecommendations({ mealId: "lunch", scene: "takeout", preferences, historyCounts: {} }); const eggPortion = practicalPortion(foods.find((food) => food.id === "egg_boiled"), 100); const breakfastScore = scoreMealCombination(dishLibrary.find((item) => item.id === "breakfast-oats-egg")); const milkMin = getReasonablePortion(milk, "protein", 2.5, { mealId: "breakfast", isSupport: true }); const milkMax = getReasonablePortion(milk, "protein", 40, { mealId: "breakfast", isSupport: false }); const soyMilkPortion = getReasonablePortion(soyMilk, "protein", 12, { mealId: "breakfast", isSupport: false }); return [{ name: "男性 BMR：85kg / 175cm / 35岁", pass: nearlyEqual(bmr({ sex: "male", weight: 85, height: 175, age: 35 }), 1773.75, 0.01) }, { name: "60g 碳水 ≈ 214g 熟米饭", pass: nearlyEqual(gramsFor(rice, "carbs", 60), 214.29, 0.1) }, { name: "40g 蛋白 ≈ 129g 鸡胸肉", pass: nearlyEqual(gramsFor(chicken, "protein", 40), 129.03, 0.1) }, { name: "默认男性目标热量不低于保护线", pass: maleDefault.kcal >= 1500 }, { name: "标准三餐比例合计为100%", pass: Object.values(presetPlans.balanced_three.ratios).reduce((sum, value) => sum + value, 0) === 100 }, { name: "忌口食材不会出现在午餐推荐里", pass: recs.every((item) => item.proteinFoodId !== "beef") }, { name: "当前菜肴库不少于30条", pass: dishLibrary.length >= 30 }, { name: "两个鸡蛋约100克", pass: eggPortion.text.includes("100") }, { name: "健康早餐组合应有正向营养评分", pass: breakfastScore > 0 }, { name: "牛奶下限不低于150ml", pass: milkMin >= 150 }, { name: "牛奶上限不高于240ml", pass: milkMax <= 240 }, { name: "豆浆份量应落在一杯范围内", pass: soyMilkPortion >= 150 && soyMilkPortion <= 240 }]; }

function CardShell({ children, className = "" }) { return <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>; }
function Badge({ children, tone = "slate" }) { const classes = { slate: "bg-slate-100 text-slate-700", green: "bg-emerald-100 text-emerald-800", red: "bg-red-100 text-red-800", blue: "bg-blue-100 text-blue-800", amber: "bg-amber-100 text-amber-900", dark: "bg-slate-900 text-white" }; return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes[tone] || classes.slate}`}>{children}</span>; }
function MiniButton({ active, children, onClick }) { return <button className={`rounded-2xl px-4 py-3 text-sm font-medium ${active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`} onClick={onClick}>{children}</button>; }
function MacroPill({ label, value, suffix = "", hint }) { return <div className="rounded-2xl bg-slate-50 p-4"><div className="text-xs text-slate-500">{label}</div><div className="mt-1 text-2xl font-bold text-slate-900">{value}{suffix}</div>{hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}</div>; }
function FieldLabel({ children }) { return <label className="text-sm font-medium text-slate-600">{children}</label>; }
function SelectField({ value, onChange, options }) { return <select className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>; }
function NumberField({ value, onChange, max = undefined }) { return <input className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" type="number" value={value} min="0" max={max} onChange={(event) => onChange(event.target.value)} />; }
function TextField({ value, onChange, placeholder = "" }) { return <input className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />; }
function SectionTitle({ title, desc, action }) { return <div className="flex items-start justify-between gap-3"><div><div className="text-xl font-semibold text-slate-900">{title}</div>{desc ? <div className="mt-1 text-sm text-slate-500">{desc}</div> : null}</div>{action || null}</div>; }
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

function PersonalInfoPage({ form, set, nutrition, mealMode, onMealModeChange, ratios, onRatioChange, activePreset, onApplyPreset, preferences, setPreferences, guestId, nickname, setNickname, setPage }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three; const total = meals.reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0); const valid = total === 100; const [showMore, setShowMore] = React.useState(false); function toggleListItem(key, value) { setPreferences((prev) => { const exists = prev[key].includes(value); return { ...prev, [key]: exists ? prev[key].filter((item) => item !== value) : [...prev[key], value] }; }); }
  return <div className="space-y-5"><button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700" onClick={() => setPage("home")}>返回首页</button><CardShell><div className="p-5"><SectionTitle title="资料卡" desc="这里是你的档案。需要时可以回来编辑和更新。" action={<button className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700" onClick={() => setShowMore((v) => !v)}>{showMore ? "收起更多" : "更多"}</button>} /><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">昵称</div><TextField value={nickname} onChange={setNickname} placeholder="给自己起个名字" /></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">游客ID</div><div className="mt-2 break-all text-sm font-medium text-slate-900">{guestId || "待生成"}</div></div>{showMore ? <div className="mt-4 grid gap-5 lg:grid-cols-3"><div><div className="text-sm font-semibold text-slate-900">忌口食材</div><div className="mt-3 flex flex-wrap gap-2">{foods.map((food) => <button key={food.id} className={`rounded-full px-3 py-2 text-xs ${preferences.avoidFoods.includes(food.id) ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-700"}`} onClick={() => toggleListItem("avoidFoods", food.id)}>{food.name}</button>)}</div></div><div><div className="text-sm font-semibold text-slate-900">喜欢的食材</div><div className="mt-3 flex flex-wrap gap-2">{foods.map((food) => <button key={food.id} className={`rounded-full px-3 py-2 text-xs ${preferences.favoriteFoods.includes(food.id) ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"}`} onClick={() => toggleListItem("favoriteFoods", food.id)}>{food.name}</button>)}</div></div><div><div className="text-sm font-semibold text-slate-900">偏好场景</div><div className="mt-3 flex flex-wrap gap-2">{[{ value: "home", label: "家里" }, { value: "takeout", label: "外卖" }, { value: "convenience", label: "便利店" }].map((scene) => <button key={scene.value} className={`rounded-full px-3 py-2 text-xs ${preferences.preferredScenes.includes(scene.value) ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-700"}`} onClick={() => toggleListItem("preferredScenes", scene.value)}>{scene.label}</button>)}</div></div></div> : null}</div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="个人信息" desc="基础数据和目标集中设置，平时不需要频繁改。" /><div className="mt-4 grid grid-cols-2 gap-3"><div className="col-span-2"><FieldLabel>性别</FieldLabel><SelectField value={form.sex} onChange={(value) => set("sex", value)} options={[{ value: "male", label: "男性" }, { value: "female", label: "女性" }]} /></div><div><FieldLabel>年龄</FieldLabel><NumberField value={form.age} onChange={(value) => set("age", value)} /></div><div><FieldLabel>身高 cm</FieldLabel><NumberField value={form.height} onChange={(value) => set("height", value)} /></div><div className="col-span-2"><FieldLabel>体重 kg</FieldLabel><NumberField value={form.weight} onChange={(value) => set("weight", value)} /></div><div className="col-span-2"><FieldLabel>活动水平</FieldLabel><SelectField value={form.activity} onChange={(value) => set("activity", value)} options={Object.entries(activityMap).map(([value, item]) => ({ value, label: item.label }))} /></div><div className="col-span-2"><FieldLabel>目标</FieldLabel><SelectField value={form.goal} onChange={(value) => set("goal", value)} options={Object.entries(goalMap).map(([value, item]) => ({ value, label: item.label }))} /></div></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="每日目标" desc="把代谢和营养目标放在这里集中查看。" /><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5"><MacroPill label="基础代谢" value={round(nutrition.BMR)} suffix=" kcal" hint="静息消耗" /><MacroPill label="日常消耗" value={round(nutrition.TDEE)} suffix=" kcal" hint="含活动量" /><MacroPill label="目标热量" value={round(nutrition.kcal)} suffix=" kcal" hint="按当前目标生成" /><MacroPill label="蛋白质" value={round(nutrition.protein)} suffix="g" hint="优先吃够" /><MacroPill label="碳水" value={round(nutrition.carbs)} suffix="g" hint="主食参考" /></div></div></CardShell><CardShell><div className="p-5"><SectionTitle title="餐次设置" desc="先设好分配，后面系统会按这个习惯给推荐。" /><div className="mt-4 grid gap-3 md:grid-cols-2"><div><FieldLabel>餐次模式</FieldLabel><SelectField value={mealMode} onChange={onMealModeChange} options={[{ value: "three", label: "三餐" }, { value: "snack", label: "三餐 + 宵夜/加餐" }]} /></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">当前合计</div><div className={`mt-1 text-2xl font-bold ${valid ? "text-emerald-700" : "text-red-700"}`}>{total}%</div><div className="mt-1 text-xs text-slate-500">{valid ? "已生效" : "需要调到 100%"}</div></div></div><div className="mt-4 flex flex-wrap gap-2">{Object.entries(presetPlans).filter(([, preset]) => preset.mealMode === mealMode).map(([key, preset]) => <MiniButton key={key} active={activePreset === key} onClick={() => onApplyPreset(key)}>{preset.label}</MiniButton>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{meals.map((meal) => <div key={meal.id} className="rounded-2xl border border-slate-200 bg-white p-3"><FieldLabel>{meal.name}</FieldLabel><NumberField value={ratios[meal.id] ?? 0} max={100} onChange={(value) => onRatioChange(meal.id, value)} /></div>)}</div></div></CardShell></div>;
}

function PlanningPage({ mealMode, preferences, historyCounts, tomorrowPlan, setTomorrowPlan, tomorrowPlanDate, setTomorrowPlanDate, setPage }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three;
  const scenes = [{ id: "home", name: "家里" }, { id: "takeout", name: "外卖" }, { id: "convenience", name: "便利店" }];
  const targetDate = getDateKey(1);
  const selectedMeals = meals.map((meal) => {
    const plan = tomorrowPlan[meal.id];
    const dish = dishLibrary.find((item) => item.id === plan?.dishId);
    return dish ? { mealId: meal.id, mealName: meal.name, dishName: dish.name, scene: plan?.scene || "takeout" } : null;
  }).filter(Boolean);
  function setMealPlan(mealId, updates) {
    setTomorrowPlanDate(targetDate);
    setTomorrowPlan((prev) => ({ ...prev, [mealId]: { ...(prev[mealId] || {}), ...updates } }));
  }
  function clearMealPlan(mealId) {
    setTomorrowPlanDate(targetDate);
    setTomorrowPlan((prev) => {
      const next = { ...prev };
      delete next[mealId];
      return next;
    });
  }
  return <div className="space-y-5"><button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700" onClick={() => setPage("home")}>返回首页</button><CardShell><div className="p-5"><SectionTitle title="明日餐食" desc="先给明天留好方案。到明天时，今日计划会优先显示你已经安排过的餐。" /><div className="mt-4 rounded-2xl bg-slate-50 p-4"><div className="text-sm text-slate-500">计划日期</div><div className="mt-1 text-lg font-semibold text-slate-900">{targetDate}{tomorrowPlanDate === targetDate ? " · 已保存" : " · 还没开始"}</div><div className="mt-3 text-sm text-slate-600">当前已安排 {selectedMeals.length} 餐。每选一餐都会显示在下面，不会再像没发生一样。</div></div>{selectedMeals.length ? <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{selectedMeals.map((item) => <div key={item.mealName} className="rounded-2xl bg-emerald-50 p-4"><div className="text-sm text-emerald-700">已选 · {item.mealName}</div><div className="mt-1 font-semibold text-emerald-900">{item.dishName}</div><div className="mt-1 text-xs text-emerald-800">场景：{item.scene === "home" ? "家里" : item.scene === "takeout" ? "外卖" : "便利店"}</div><div className="mt-3 flex gap-2"><button className="rounded-full bg-white px-3 py-2 text-xs text-emerald-800" onClick={() => document.getElementById(`meal-plan-${item.mealId}`)?.scrollIntoView({ behavior: "smooth", block: "center" })}>重新选择</button><button className="rounded-full bg-white px-3 py-2 text-xs text-red-600" onClick={() => clearMealPlan(item.mealId)}>清空这餐</button></div></div>)}</div> : <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">你还没选任何一餐。选完之后，这里会立刻出现摘要卡。</div>}</div></CardShell><CardShell><div className="p-5"><div className="space-y-4">{meals.map((meal) => { const current = tomorrowPlan[meal.id] || { scene: "takeout", dishId: "", batch: 0 }; const recommendations = getDishRecommendations({ mealId: meal.id, scene: current.scene, preferences, historyCounts, limit: 6, offset: current.batch * 6 }); const totalAvailable = getDishRecommendations({ mealId: meal.id, scene: current.scene, preferences, historyCounts, limit: 999, offset: 0 }).length; const maxBatch = Math.max(Math.ceil(totalAvailable / 6) - 1, 0); const selectedDish = dishLibrary.find((item) => item.id === current.dishId); return <div id={`meal-plan-${meal.id}`} key={meal.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><div className="font-semibold text-slate-900">{meal.name}</div><div className="mt-1 text-sm text-slate-500">先选场景，再点一个你更想吃的组合。</div>{selectedDish ? <div className="mt-2 text-sm font-medium text-emerald-700">当前已选：{selectedDish.name}</div> : null}</div><div className="flex flex-wrap gap-2">{scenes.map((scene) => <button key={scene.id} className={`rounded-full px-3 py-2 text-xs ${current.scene === scene.id ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setMealPlan(meal.id, { scene: scene.id, dishId: "", batch: 0 })}>{scene.name}</button>)}{selectedDish ? <button className="rounded-full bg-red-50 px-3 py-2 text-xs text-red-600" onClick={() => clearMealPlan(meal.id)}>清空</button> : null}{totalAvailable > 6 ? <button className="rounded-full bg-amber-100 px-3 py-2 text-xs text-amber-900" onClick={() => setMealPlan(meal.id, { batch: current.batch >= maxBatch ? 0 : current.batch + 1 })}>换一批</button> : null}</div></div><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{recommendations.map((dish) => <button key={dish.id} className={`rounded-2xl border p-4 text-left ${current.dishId === dish.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`} onClick={() => setMealPlan(meal.id, { dishId: dish.id })}><div className="flex items-center justify-between gap-2"><div className="font-semibold">{dish.name}</div><Badge tone={current.dishId === dish.id ? "dark" : "amber"}>{current.dishId === dish.id ? "已选" : dish.category}</Badge></div><div className={`mt-2 text-xs ${current.dishId === dish.id ? "text-slate-300" : "text-slate-500"}`}>{dish.note}</div><div className="mt-3 flex flex-wrap gap-1">{dish.tags.map((tag) => <span key={tag} className={`rounded-full px-2 py-1 text-[11px] ${current.dishId === dish.id ? "bg-white/10 text-white" : "bg-white text-slate-600"}`}>{tag}</span>)}</div></button>)}</div></div>; })}</div></div></CardShell></div>;
}

function TodayPage({ nutrition, mealMode, activeDayPlan, chosenMealIds, nickname, setPage, activeDayPlanDate }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three; const progress = buildTodayProgress(activeDayPlan, chosenMealIds);
  return <div className="space-y-5"><button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700" onClick={() => setPage("home")}>返回首页</button><CardShell><div className="p-5"><SectionTitle title={`今天，${nickname || "你"}想怎么吃`} desc="如果你昨天已经配好了，今天到饭点就不需要重新想一遍。" /><div className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">当前生效日期：{activeDayPlanDate || getDateKey(0)}。如果你昨天提前做了明日餐食，今天会自动显示在这里。</div><div className="mt-4 grid gap-3 md:grid-cols-3"><MacroPill label="已规划餐次" value={progress.planned} hint="今天共安排了几餐" /><MacroPill label="已完成餐次" value={progress.completed} hint="你已经吃掉并确认的餐次" /><MacroPill label="还剩" value={progress.remaining} hint="还可以继续照计划吃" /></div></div></CardShell><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{meals.map((meal) => { const plan = activeDayPlan[meal.id]; const dish = dishLibrary.find((item) => item.id === plan?.dishId); const completed = chosenMealIds.includes(meal.id); return <CardShell key={meal.id}><div className="p-5"><div className="flex items-center justify-between gap-3"><div><div className="font-semibold text-slate-900">{meal.name}</div><div className="mt-1 text-sm text-slate-500">{dish ? completed ? "这餐已经按计划记为已用餐" : "昨天已经帮你想好了，饭点时可以直接照着吃" : completed ? "这餐已记录完成" : "还没有提前安排"}</div></div><Badge tone={completed ? "blue" : dish ? "green" : "slate"}>{completed ? "已用餐" : dish ? "已规划" : "未规划"}</Badge></div>{dish ? <div className="mt-4 rounded-2xl bg-slate-50 p-4"><div className="flex items-center justify-between gap-2"><div className="font-semibold text-slate-900">{dish.name}</div><Badge tone="amber">{dish.category}</Badge></div><div className="mt-2 text-sm text-slate-600">{dish.note}</div><div className="mt-3 flex flex-wrap gap-2">{dish.tags.map((tag) => <span key={tag} className="rounded-full bg-white px-2 py-1 text-xs text-slate-600">{tag}</span>)}</div></div> : <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">你还没给这餐做安排，临时吃也没关系，饭点时再选就行。</div>}</div></CardShell>; })}</div><CardShell><div className="p-5"><SectionTitle title="今日目标摘要" desc="不压迫，只给你当下需要的基准。" /><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><MacroPill label="目标热量" value={round(nutrition.kcal)} suffix=" kcal" /><MacroPill label="蛋白质" value={round(nutrition.protein)} suffix="g" /><MacroPill label="碳水" value={round(nutrition.carbs)} suffix="g" /><MacroPill label="脂肪预算" value={round(nutrition.fat)} suffix="g" /></div></div></CardShell></div>;
}

function MealFlowModal({ open, onClose, mealMode, ratios, nutrition, preferences, historyCounts, onCompleteMeal, activeDayPlan, chosenMealIds }) {
  const meals = mealProfiles[mealMode] || mealProfiles.three;
  const [selectedMeal, setSelectedMeal] = useState(meals[0]?.id || "breakfast");
  const [selectedScene, setSelectedScene] = useState("takeout");
  const [batch, setBatch] = useState(0);
  const activeMeal = meals.find((meal) => meal.id === selectedMeal) || meals[0];
  const plannedSelection = activeDayPlan?.[selectedMeal];
  const plannedDish = dishLibrary.find((item) => item.id === plannedSelection?.dishId);
  const isCompleted = chosenMealIds.includes(selectedMeal);
  const ratioPercent = Number(ratios[selectedMeal]) || 0;
  const ratio = ratioPercent / 100;
  const targets = { carbs: nutrition.carbs * ratio, protein: nutrition.protein * ratio, fat: nutrition.fat * ratio, kcal: nutrition.kcal * ratio };
  const allRecommendations = getDishRecommendations({ mealId: selectedMeal, scene: selectedScene, preferences, historyCounts, limit: 999, offset: 0 });
  const recommendations = allRecommendations.slice(batch * 6, batch * 6 + 6);
  const activeDietTip = useMemo(() => getDietTip({ mealId: selectedMeal, scene: selectedScene, page: "mealFlow" }), [selectedMeal, selectedScene]);
  const maxBatch = Math.max(Math.ceil(allRecommendations.length / 6) - 1, 0);
  function changeMeal(mealId) { setSelectedMeal(mealId); setBatch(0); }
  function changeScene(sceneId) { setSelectedScene(sceneId); setBatch(0); }
  useEffect(() => {
    if (plannedSelection?.scene) setSelectedScene(plannedSelection.scene);
  }, [selectedMeal, plannedSelection?.scene]);
  return <Modal open={open} title="开始一餐" onClose={onClose}><div className="space-y-5"><SectionTitle title="需要的时候再帮你一把" desc="如果这餐昨天已经规划好了，我会先把原计划顶到前面；你也可以临时换成别的。" /><div className="flex flex-wrap gap-2">{meals.map((meal) => <MiniButton key={meal.id} active={selectedMeal === meal.id} onClick={() => changeMeal(meal.id)}>{meal.name}</MiniButton>)}</div>{plannedDish ? <CardShell className="border-none bg-emerald-50"><div className="p-4"><div className="flex items-center justify-between gap-3"><div><div className="text-sm font-semibold text-emerald-800">这餐已有计划</div><div className="mt-1 text-lg font-semibold text-emerald-950">{plannedDish.name}</div><div className="mt-1 text-sm text-emerald-900/80">{plannedSelection?.scene === "home" ? "家里" : plannedSelection?.scene === "takeout" ? "外卖" : "便利店"} · {plannedDish.note}</div></div><Badge tone={isCompleted ? "blue" : "green"}>{isCompleted ? "已用餐" : "待执行"}</Badge></div><div className="mt-3 flex flex-wrap gap-2">{!isCompleted ? <button className="rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white" onClick={() => onCompleteMeal(selectedMeal, plannedDish.name, { dishId: plannedDish.id, source: "planned", scene: plannedSelection?.scene })}>按这个吃，记为已用餐</button> : <button className="rounded-2xl bg-slate-200 px-4 py-3 text-sm font-medium text-slate-700" onClick={onClose}>这餐已经记过了</button>}<button className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-emerald-900" onClick={() => setBatch(0)}>换成别的推荐</button></div></div></CardShell> : null}<div className="flex flex-wrap gap-2">{[{ id: "home", name: "家里" }, { id: "takeout", name: "外卖" }, { id: "convenience", name: "便利店" }].map((scene) => <MiniButton key={scene.id} active={selectedScene === scene.id} onClick={() => changeScene(scene.id)}>{scene.name}</MiniButton>)}{allRecommendations.length > 6 ? <button className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900" onClick={() => setBatch(batch >= maxBatch ? 0 : batch + 1)}>换一批</button> : null}</div><CardShell className="border-none bg-amber-50"><div className="p-4"><div className="text-sm font-semibold text-amber-900">当前这餐的小妙招</div><div className="mt-2 text-sm leading-6 text-amber-900/90">{activeDietTip}</div></div></CardShell><CardShell><div className="p-5"><div className="flex items-center justify-between gap-3"><div><div className="text-lg font-semibold text-slate-900">{activeMeal?.name} 建议</div><div className="mt-1 text-sm text-slate-500">按你预设的 {ratioPercent}% 比例和偏好生成</div></div><Badge tone="green">{allRecommendations.length} 个候选</Badge></div><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><MacroPill label="热量" value={round(targets.kcal)} suffix=" kcal" /><MacroPill label="碳水" value={round(targets.carbs)} suffix="g" /><MacroPill label="蛋白" value={round(targets.protein)} suffix="g" /><MacroPill label="脂肪上限" value={round(targets.fat)} suffix="g" /></div></div></CardShell><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{recommendations.map((dish) => { const mealItems = buildMealItems(dish, targets); return <CardShell key={dish.id}><div className="p-5"><div className="flex items-center justify-between gap-2"><div className="font-semibold text-slate-900">{dish.name}</div><Badge tone="amber">{dish.category}</Badge></div><div className="mt-2 text-sm text-slate-600">{dish.note}</div><div className="mt-3 space-y-2 text-sm text-slate-700">{mealItems.map((item) => <div key={item.name}>{item.name}：{item.text}</div>)}</div><div className="mt-4 flex flex-wrap gap-2">{dish.tags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{tag}</span>)}</div><button className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white" onClick={() => onCompleteMeal(selectedMeal, dish.name, { dishId: dish.id, source: plannedDish?.id === dish.id ? "planned" : "manual", scene: selectedScene })}>这餐我就按这个吃</button></div></CardShell>; })}</div></div></Modal>;
}

function FixPage() { return <div className="space-y-5"><CardShell><div className="p-5"><SectionTitle title="超了怎么修" desc="把纠偏也做成主入口，不让用户翻一堆资料。" /><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{correctionRules.map((item) => <div key={item.title} className="rounded-2xl bg-slate-50 p-4"><div className="font-semibold text-slate-900">{item.title}</div><div className="mt-2 text-sm text-slate-600">{item.desc}</div></div>)}</div></div></CardShell></div>; }

function getGreeting(name) {
  const pool = [
    `${name || "你"}，今天想先从哪一餐开始？`,
    `${name || "你"}，先把今天这顿吃稳。`,
    `${name || "你"}，要不要我直接给你出一餐？`,
    `${name || "你"}，今天也别把吃饭这件事搞复杂了。`,
  ];
  const index = new Date().getDate() % pool.length;
  return pool[index];
}

const dietTips = {
  general: [
    "先吃蛋白质和蔬菜，再吃主食，通常更容易稳住食量。",
    "外卖想控一点，先从少酱汁、少额外浇头开始，比全都不吃更容易坚持。",
    "鸡蛋不一定非得去蛋黄，重点是整天总量和做法，水煮通常比油煎更稳。",
    "如果晚饭容易吃多，可以先喝点热汤或先吃菜，再决定主食要不要加。",
    "一餐里主食有一个主角就够了，米饭、面、粥、馒头、面包通常没必要叠两份主食主角。",
  ],
  breakfast: [
    "早餐更稳的结构通常是：1份主食 + 1份明确蛋白，奶类可以有，但牛奶和酸奶没必要同时上。",
    "燕麦、玉米、红薯这类主食通常比白粥更耐饿；如果吃白粥，记得搭配鸡蛋或别的明确蛋白。",
    "如果早餐只有面包和奶类，补一个鸡蛋，通常会比单吃更稳。",
  ],
  lunch: [
    "午餐优先选真正的主蛋白，比如鸡胸、鱼、虾、牛肉；只靠酸奶、豆腐或一颗蛋，常常不够顶一整餐。",
    "想吃粉面不是不能吃，关键是把蛋白补上、面量减一点，比硬忍着更容易长期执行。",
    "盖饭类先从减饭、少酱汁开始，通常比完全不吃主食更容易坚持。",
  ],
  dinner: [
    "晚餐优先保留明确蛋白，再根据白天情况决定主食量，比只吃一点点更稳。",
    "如果晚餐想清淡一点，鱼、虾、鸡胸配半份主食，通常比粥配零碎小吃更稳。",
    "晚餐如果已经有奶类，就别再额外补第二份奶类了，换成鸡蛋或主蛋白通常更合理。",
  ],
  snack: [
    "加餐的关键不是吃成第二顿正餐，而是轻一点、稳一点：酸奶、牛奶、鸡蛋这类更合适。",
    "加餐如果已经喝了奶，就没必要再叠第二份奶类，控制住总量更重要。",
    "真饿的时候，加餐优先补蛋白或轻主食，不要顺手开成一整顿。",
  ],
  takeout: [
    "外卖想控一点，优先挑看得见蛋白来源的餐，再从饭量和酱汁下手。",
    "汤粉、盖饭、炒饭都能吃，关键不是禁掉，而是把量和配菜修正到更稳。",
    "点外卖时如果主食偏重，后面一餐就先减主食，不要连蛋白一起砍掉。",
  ],
  convenience: [
    "便利店选餐时，优先看有没有主食 + 蛋白的组合；如果只有面包和奶类，补一个鸡蛋通常会更稳。",
    "便利店最怕的是全是零碎小甜食，宁可简单一点，也要先把蛋白补上。",
    "便利店加餐优先单一奶类、鸡蛋、玉米这类容易收住的东西。",
  ],
  home: [
    "家里吃饭最容易做稳的，不是复杂菜谱，而是先定好主食和蛋白，再按胃口加配菜。",
    "家里如果吃粥，尽量同时把鸡蛋、豆腐或别的明确蛋白配上。",
  ],
};

function pickTip(list, seed = 0) {
  if (!list?.length) return "";
  return list[Math.abs(seed) % list.length];
}

function getDietTip(context = {}) {
  const { mealId = "", scene = "", page = "home" } = context;
  const daySeed = new Date().getDate();
  const scoped = [];
  if (mealId && dietTips[mealId]) scoped.push(...dietTips[mealId]);
  if (scene && dietTips[scene]) scoped.push(...dietTips[scene]);
  if (page === "home") scoped.push(...dietTips.general);
  const pool = scoped.length ? scoped : dietTips.general;
  return pickTip(pool, daySeed + (mealId ? mealId.length : 0) + (scene ? scene.length : 0));
}

function FoodLibraryPage({ setPage }) {
  const groupedFoods = useMemo(() => ({
    主食类: foods.filter((food) => food.type === "carb"),
    蛋白类: foods.filter((food) => food.type === "protein"),
  }), []);

  return <div className="space-y-5"><button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700" onClick={() => setPage("home")}>返回首页</button><CardShell><div className="p-5"><SectionTitle title="食材信息库" desc="这里展示系统当前用于计算和推荐参考的核心食材数据库。用户平时不一定细看，但这套底层数据会直接影响份量、搭配和推荐结果。" /><div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">当前信息库按每100g / 100ml 记录主要营养成分，并结合适用餐型、生活化份量和产品规则参与推荐计算。</div></div></CardShell>{Object.entries(groupedFoods).map(([groupName, items]) => <CardShell key={groupName}><div className="p-5"><div className="text-lg font-semibold text-slate-900">{groupName}</div><div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{items.map((food) => { const meta = getFoodMeta(food); const portion = portionBounds[food.id]; return <div key={food.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center justify-between gap-2"><div className="font-semibold text-slate-900">{food.name}</div><Badge tone="blue">{food.per || "每100g"}</Badge></div><div className="mt-2 text-xs text-slate-500">{food.note}</div><div className="mt-3 space-y-1 text-sm text-slate-700"><div>主要营养：{meta.primaryMacro === "protein" ? "蛋白质" : meta.primaryMacro === "carbs" ? "碳水" : meta.primaryMacro}</div><div>次要营养：{meta.secondaryMacro === "protein" ? "蛋白质" : meta.secondaryMacro === "carbs" ? "碳水" : meta.secondaryMacro === "fat" ? "脂肪" : meta.secondaryMacro}</div><div>碳水：{food.carbs}g</div><div>蛋白：{food.protein}g</div><div>脂肪：{food.fat}g</div><div>热量：{food.kcal} kcal</div>{food.nutritionProfile?.fiber ? <div>纤维特征：{food.nutritionProfile.fiber}</div> : null}{food.nutritionProfile?.digestibility ? <div>消化速度：{food.nutritionProfile.digestibility}</div> : null}{portion ? <div>常规份量：{portion.default}{food.per === "100ml" ? "ml" : "g"}（范围 {portion.min}-{portion.max}{food.per === "100ml" ? "ml" : "g"}）</div> : null}<div>适用餐型：{(meta.suitableMeals || []).map((meal) => meal === "breakfast" ? "早餐" : meal === "lunch" ? "午餐" : meal === "dinner" ? "晚餐" : meal === "snack" ? "加餐" : meal).join(" / ")}</div></div></div>; })}</div></div></CardShell>)}</div>;
}

function TestPage() { const tests = useMemo(() => runSelfTests(), []); const passed = tests.filter((test) => test.pass).length; return <CardShell><div className="p-5"><div className="mb-4 flex items-center justify-between gap-3"><SectionTitle title="逻辑自检" desc="保留最小验证页，避免改着改着把推荐逻辑改坏。" /><Badge tone={passed === tests.length ? "green" : "red"}>{passed}/{tests.length} 通过</Badge></div><div className="space-y-2">{tests.map((test) => <div key={test.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm"><span>{test.name}</span><span className={test.pass ? "font-semibold text-emerald-700" : "font-semibold text-red-700"}>{test.pass ? "PASS" : "FAIL"}</span></div>)}</div></div></CardShell>; }

export default function NutritionWebToolMVP() {
  const stored = loadStoredProfile();
  const [ready, setReady] = useState(false);
  const [guestId, setGuestId] = useState(stored?.guestId || "");
  const [nickname, setNickname] = useState(stored?.nickname || "");
  const [profileCompleted, setProfileCompleted] = useState(stored?.profileCompleted || false);
  const [page, setPage] = useState(() => {
    if (typeof window === "undefined") return "home";
    const fromHash = window.location.hash.replace(/^#/, "");
    return fromHash || "home";
  });
  const goPage = (next) => {
    setPage(next);
    if (typeof window !== "undefined") {
      const nextHash = `#${next}`;
      if (window.location.hash !== nextHash) window.history.pushState({ page: next }, "", nextHash);
    }
  };
  const [mealFlowOpen, setMealFlowOpen] = useState(false);
  const homeDietTip = useMemo(() => getDietTip({ page: "home" }), []);
  const [form, setForm] = useState(stored?.form || defaultProfile.form);
  const [mealMode, setMealMode] = useState(stored?.mealMode || defaultProfile.mealMode);
  const [ratios, setRatios] = useState(stored?.ratios || defaultProfile.ratios);
  const [activePreset, setActivePreset] = useState(stored?.activePreset || defaultProfile.activePreset);
  const [preferences, setPreferences] = useState(stored?.preferences || defaultProfile.preferences);
  const [choiceHistory, setChoiceHistory] = useState(stored?.choiceHistory || defaultProfile.choiceHistory);
  const [chosenMealIds, setChosenMealIds] = useState(stored?.chosenMealIds || defaultProfile.chosenMealIds);
  const [tomorrowPlan, setTomorrowPlan] = useState(stored?.tomorrowPlan || defaultProfile.tomorrowPlan);
  const [tomorrowPlanDate, setTomorrowPlanDate] = useState(stored?.tomorrowPlanDate || defaultProfile.tomorrowPlanDate);
  const [activeDayPlan, setActiveDayPlan] = useState(stored?.activeDayPlan || defaultProfile.activeDayPlan);
  const [activeDayPlanDate, setActiveDayPlanDate] = useState(stored?.activeDayPlanDate || defaultProfile.activeDayPlanDate);
  const [weekPlan, setWeekPlan] = useState(stored?.weekPlan || defaultProfile.weekPlan);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handlePopState = () => {
      const fromHash = window.location.hash.replace(/^#/, "");
      setPage(fromHash || "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nextHash = `#${page || "home"}`;
    if (window.location.hash !== nextHash) window.history.replaceState({ page }, "", nextHash);
  }, [page]);

  useEffect(() => {
    if (!ready || !guestId) return;
    saveStoredProfile({ guestId, nickname, profileCompleted, form, mealMode, ratios, activePreset, preferences, choiceHistory, chosenMealIds, tomorrowPlan, tomorrowPlanDate, activeDayPlan, activeDayPlanDate, weekPlan });
  }, [ready, guestId, nickname, profileCompleted, form, mealMode, ratios, activePreset, preferences, choiceHistory, chosenMealIds, tomorrowPlan, tomorrowPlanDate, activeDayPlan, activeDayPlanDate, weekPlan]);

  const nutrition = useMemo(() => calculateNutrition(form), [form]);
  const historyCounts = useMemo(() => choiceHistory.reduce((acc, item) => ({ ...acc, [item]: (acc[item] || 0) + 1 }), {}), [choiceHistory]);
  const ratioTotal = (mealProfiles[mealMode] || []).reduce((sum, meal) => sum + (Number(ratios[meal.id]) || 0), 0);
  const ratioValid = ratioTotal === 100;
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  function applyPreset(key) { const preset = presetPlans[key]; if (!preset) return; setMealMode(preset.mealMode); setRatios(preset.ratios); setActivePreset(key); }
  function handleMealModeChange(value) { const fallbackKey = value === "snack" ? "snack_plan" : "balanced_three"; const preset = presetPlans[fallbackKey]; setMealMode(value); setRatios(preset.ratios); setActivePreset(fallbackKey); }
  function handleRatioChange(mealId, value) { setRatios((prev) => ({ ...prev, [mealId]: Math.max(Number(value) || 0, 0) })); setActivePreset(null); }
  function handleCompleteMeal(mealId, dishName, details = {}) { setChosenMealIds((prev) => Array.from(new Set([...prev, mealId]))); setChoiceHistory((prev) => [...prev, dishName]); if (details?.dishId) { setActiveDayPlan((prev) => ({ ...prev, [mealId]: { ...(prev[mealId] || {}), dishId: details.dishId, scene: details.scene || prev[mealId]?.scene || "takeout", completed: true, completedSource: details.source || "manual" } })); } setMealFlowOpen(false); goPage("today"); }
  function startGuestMode() { setGuestId(generateGuestId()); }
  useEffect(() => {
    const today = getDateKey(0);
    if (activeDayPlanDate === today) return;
    if (tomorrowPlanDate === today && Object.keys(tomorrowPlan || {}).length) {
      setActiveDayPlan(tomorrowPlan);
      setActiveDayPlanDate(today);
      setChosenMealIds([]);
      return;
    }
    setActiveDayPlan({});
    setActiveDayPlanDate(today);
    setChosenMealIds([]);
  }, [tomorrowPlan, tomorrowPlanDate, activeDayPlanDate]);

  function finishProfile() { setProfileCompleted(true); goPage("home"); }

  return <div className="min-h-screen bg-slate-100 px-3 py-4 text-slate-900 sm:px-4 md:px-8 md:py-8"><div className="mx-auto max-w-5xl space-y-5">{page === "home" ? <><CardShell className="overflow-hidden border-none bg-white shadow-sm"><div className="p-5 sm:p-6"><div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{getGreeting(nickname)}</div><div className="mt-2 text-sm text-slate-500">不用想太多，按顺手的入口直接点就行。</div></div></CardShell><div className="grid gap-3"><button className="rounded-3xl bg-slate-900 px-5 py-5 text-left text-white shadow-sm" onClick={() => setMealFlowOpen(true)}><div className="text-lg font-semibold">准备用餐</div><div className="mt-1 text-sm text-slate-300">{Object.keys(activeDayPlan || {}).length ? "今天已有提前安排，点进去会优先按你的计划参考。" : "先选是哪一餐，我直接给你推荐。"}</div></button><button className="rounded-3xl bg-white px-5 py-5 text-left text-slate-900 shadow-sm" onClick={() => goPage("today")}><div className="text-lg font-semibold">今日计划</div><div className="mt-1 text-sm text-slate-500">看看今天有哪些已经提前定好的餐。</div></button><button className="rounded-3xl bg-white px-5 py-5 text-left text-slate-900 shadow-sm" onClick={() => goPage("planning")}><div className="text-lg font-semibold">明日餐食</div><div className="mt-1 text-sm text-slate-500">提前把明天想好，饭点少纠结。</div></button><button className="rounded-3xl bg-white px-5 py-5 text-left text-slate-900 shadow-sm" onClick={() => goPage("food-library")}><div className="text-lg font-semibold">食材信息库</div><div className="mt-1 text-sm text-slate-500">查看系统当前用于计算和推荐参考的食材数据库。</div></button><button className="rounded-3xl bg-white px-5 py-5 text-left text-slate-900 shadow-sm" onClick={() => goPage("personal")}><div className="text-lg font-semibold">资料卡</div><div className="mt-1 text-sm text-slate-500">查看和更新你的建档资料。</div></button><CardShell className="border-none bg-amber-50"><div className="p-5"><div className="text-sm font-semibold text-amber-900">饮食小妙招</div><div className="mt-2 text-sm leading-6 text-amber-900/90">{homeDietTip}</div></div></CardShell></div></> : null}{page !== "home" ? <div className="flex gap-2"><button className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm" onClick={() => goPage("home")}>首页</button><button className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${page === "today" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`} onClick={() => goPage("today")}>今日计划</button><button className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${page === "planning" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`} onClick={() => goPage("planning")}>明日餐食</button><button className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${page === "food-library" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`} onClick={() => goPage("food-library")}>食材库</button><button className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${page === "personal" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`} onClick={() => goPage("personal")}>资料卡</button></div> : null}{!ratioValid && page !== "home" ? <CardShell><div className="p-5 text-sm text-red-700">当前餐次比例还没调到 100%，推荐会受影响，建议先去资料卡完成配置。</div></CardShell> : null}{page === "planning" && <PlanningPage mealMode={mealMode} preferences={preferences} historyCounts={historyCounts} tomorrowPlan={tomorrowPlan} setTomorrowPlan={setTomorrowPlan} tomorrowPlanDate={tomorrowPlanDate} setTomorrowPlanDate={setTomorrowPlanDate} setPage={goPage} />}{page === "today" && <TodayPage nutrition={nutrition} mealMode={mealMode} activeDayPlan={activeDayPlan} chosenMealIds={chosenMealIds} nickname={nickname} setPage={goPage} activeDayPlanDate={activeDayPlanDate} />}{page === "food-library" && <FoodLibraryPage setPage={goPage} />}{page === "personal" && <PersonalInfoPage form={form} set={set} nutrition={nutrition} mealMode={mealMode} onMealModeChange={handleMealModeChange} ratios={ratios} onRatioChange={handleRatioChange} activePreset={activePreset} onApplyPreset={applyPreset} preferences={preferences} setPreferences={setPreferences} guestId={guestId} nickname={nickname} setNickname={setNickname} setPage={goPage} />}</div><MealFlowModal open={mealFlowOpen} onClose={() => setMealFlowOpen(false)} mealMode={mealMode} ratios={ratios} nutrition={nutrition} preferences={preferences} historyCounts={historyCounts} onCompleteMeal={handleCompleteMeal} activeDayPlan={activeDayPlan} chosenMealIds={chosenMealIds} />{ready && !guestId ? <WelcomeOverlay nickname={nickname} setNickname={setNickname} onStart={startGuestMode} /> : null}{ready && guestId && !profileCompleted ? <OnboardingCard nickname={nickname} setNickname={setNickname} form={form} set={set} mealMode={mealMode} setMealMode={handleMealModeChange} ratios={ratios} setRatios={setRatios} preferences={preferences} setPreferences={setPreferences} onFinish={finishProfile} /> : null}</div>;
}
