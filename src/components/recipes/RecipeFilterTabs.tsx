"use client";

import { useState } from "react";
import { ChefHat, Store, Clock, Calendar, Utensils } from "lucide-react";
import { CategoryRecipe, UseCase, Season } from "@/data/category-recipes";

type FilterType = 'all' | 'useCase' | 'protein' | 'difficulty' | 'season';

interface RecipeFilterTabsProps {
  recipes: CategoryRecipe[];
  onFilterChange: (filteredRecipes: CategoryRecipe[]) => void;
}

export function RecipeFilterTabs({ recipes, onFilterChange }: RecipeFilterTabsProps) {
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');

  const handleTabChange = (tab: FilterType) => {
    setActiveTab(tab);
    setActiveSubFilter('all');
    onFilterChange(recipes); // Reset to all recipes when changing main tab
  };

  const handleSubFilterChange = (filter: string, type: FilterType) => {
    setActiveSubFilter(filter);
    
    if (filter === 'all') {
      onFilterChange(recipes);
      return;
    }

    let filtered: CategoryRecipe[] = [];
    
    switch (type) {
      case 'useCase':
        filtered = recipes.filter(r => r.useCase === filter);
        break;
      case 'protein':
        filtered = recipes.filter(r => r.category === filter);
        break;
      case 'difficulty':
        filtered = recipes.filter(r => r.difficulty === filter);
        break;
      case 'season':
        filtered = recipes.filter(r => r.season === filter);
        break;
      default:
        filtered = recipes;
    }
    
    onFilterChange(filtered);
  };

  // Count recipes by filter
  const getUseCaseCount = (useCase: UseCase | 'all') => {
    if (useCase === 'all') return recipes.length;
    return recipes.filter(r => r.useCase === useCase).length;
  };

  const getProteinCount = (protein: string | 'all') => {
    if (protein === 'all') return recipes.length;
    return recipes.filter(r => r.category === protein).length;
  };

  const getDifficultyCount = (difficulty: string | 'all') => {
    if (difficulty === 'all') return recipes.length;
    return recipes.filter(r => r.difficulty === difficulty).length;
  };

  const getSeasonCount = (season: Season | 'all') => {
    if (season === 'all') return recipes.length;
    return recipes.filter(r => r.season === season).length;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide pb-px -mb-px">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex-shrink-0 ${
              activeTab === 'all'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="hidden sm:inline">All Recipes</span>
            <span className="sm:hidden">All</span>
            <span className="hidden md:inline"> ({recipes.length})</span>
          </button>
          <button
            onClick={() => handleTabChange('useCase')}
            className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex-shrink-0 ${
              activeTab === 'useCase'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">By Use Case</span>
            <span className="sm:hidden">Use Case</span>
          </button>
          <button
            onClick={() => handleTabChange('protein')}
            className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex-shrink-0 ${
              activeTab === 'protein'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">By Protein</span>
            <span className="sm:hidden">Protein</span>
          </button>
          <button
            onClick={() => handleTabChange('difficulty')}
            className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex-shrink-0 ${
              activeTab === 'difficulty'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">By Difficulty</span>
            <span className="sm:hidden">Difficulty</span>
          </button>
          <button
            onClick={() => handleTabChange('season')}
            className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 flex-shrink-0 ${
              activeTab === 'season'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">By Season</span>
            <span className="sm:hidden">Season</span>
          </button>
        </div>
      </div>

      {/* Sub Filters */}
      {activeTab === 'useCase' && (
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Browse by Use Case</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => handleSubFilterChange('all', 'useCase')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'all'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🍽️</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">All Recipes</div>
              <div className="text-xs sm:text-sm text-gray-600">{getUseCaseCount('all')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('pub-casual', 'useCase')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'pub-casual'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🏪</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Pub & Casual Dining</div>
              <div className="text-xs sm:text-sm text-gray-600">{getUseCaseCount('pub-casual')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('fine-dining', 'useCase')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'fine-dining'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🍽️</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Fine Dining & Special Occasions</div>
              <div className="text-xs sm:text-sm text-gray-600">{getUseCaseCount('fine-dining')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('quick-lunch', 'useCase')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'quick-lunch'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">⚡</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Quick Lunch Service</div>
              <div className="text-xs sm:text-sm text-gray-600">{getUseCaseCount('quick-lunch')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('large-events', 'useCase')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'large-events'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎉</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Large Events & Catering</div>
              <div className="text-xs sm:text-sm text-gray-600">{getUseCaseCount('large-events')} recipes</div>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'protein' && (
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Browse by Protein</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => handleSubFilterChange('all', 'protein')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'all'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🍖</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">All Proteins</div>
              <div className="text-xs sm:text-sm text-gray-600">{getProteinCount('all')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('BEEF', 'protein')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'BEEF'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🥩</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Beef Recipes</div>
              <div className="text-xs sm:text-sm text-gray-600">{getProteinCount('BEEF')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('CHICKEN', 'protein')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'CHICKEN'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🐔</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Chicken Recipes</div>
              <div className="text-xs sm:text-sm text-gray-600">{getProteinCount('CHICKEN')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('PORK', 'protein')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'PORK'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🐖</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Pork Recipes</div>
              <div className="text-xs sm:text-sm text-gray-600">{getProteinCount('PORK')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('LAMB', 'protein')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'LAMB'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🐑</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Lamb Recipes</div>
              <div className="text-xs sm:text-sm text-gray-600">{getProteinCount('LAMB')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('SAUSAGES', 'protein')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'SAUSAGES'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🌭</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Sausage Recipes</div>
              <div className="text-xs sm:text-sm text-gray-600">{getProteinCount('SAUSAGES')} recipes</div>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'difficulty' && (
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Browse by Difficulty</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => handleSubFilterChange('all', 'difficulty')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'all'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📚</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">All Levels</div>
              <div className="text-xs sm:text-sm text-gray-600">{getDifficultyCount('all')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('Easy', 'difficulty')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'Easy'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">✅</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Simple</div>
              <div className="text-xs sm:text-sm text-gray-600">{getDifficultyCount('Easy')} recipes · 3 steps or less</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('Medium', 'difficulty')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'Medium'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🔧</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Moderate</div>
              <div className="text-xs sm:text-sm text-gray-600">{getDifficultyCount('Medium')} recipes · Requires some prep</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('Advanced', 'difficulty')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'Advanced'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">👨‍🍳</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Advanced</div>
              <div className="text-xs sm:text-sm text-gray-600">{getDifficultyCount('Advanced')} recipes · Chef-level technique</div>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'season' && (
        <div className="space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Browse by Season</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => handleSubFilterChange('all', 'season')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'all'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🌍</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">All Seasons</div>
              <div className="text-xs sm:text-sm text-gray-600">{getSeasonCount('all')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('spring', 'season')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'spring'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🌸</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Spring Specials</div>
              <div className="text-xs sm:text-sm text-gray-600">{getSeasonCount('spring')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('summer', 'season')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'summer'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">☀️</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Summer BBQ</div>
              <div className="text-xs sm:text-sm text-gray-600">{getSeasonCount('summer')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('autumn', 'season')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'autumn'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🍂</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Autumn Comforts</div>
              <div className="text-xs sm:text-sm text-gray-600">{getSeasonCount('autumn')} recipes</div>
            </button>
            <button
              onClick={() => handleSubFilterChange('winter', 'season')}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                activeSubFilter === 'winter'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">❄️</div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">Winter Warmers</div>
              <div className="text-xs sm:text-sm text-gray-600">{getSeasonCount('winter')} recipes</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

