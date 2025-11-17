"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getSavedMenus, getMenuTemplates, getPopularMenus, getRecentMenus } from "@/lib/data/mock-menus";
import type { SavedMenu, MenuTemplate } from "@/lib/data/mock-menus";
import { Button } from "@/components/ui/Button";
import { Plus, UtensilsCrossed, TrendingUp, Clock, Star, BookOpen, Copy, Edit, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function MenuBuilderDashboard() {
  const [session, setSession] = useState<any>(null);
  const [savedMenus, setSavedMenus] = useState<SavedMenu[]>([]);
  const [templates, setTemplates] = useState<MenuTemplate[]>([]);
  const [popularMenus, setPopularMenus] = useState<SavedMenu[]>([]);
  const [recentMenus, setRecentMenus] = useState<SavedMenu[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'standard' | 'seasonal' | 'event' | 'weekly_special'>('all');

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';

      // Load saved menus
      const menus = getSavedMenus(userId);
      setSavedMenus(menus);

      // Load templates
      const menuTemplates = getMenuTemplates();
      setTemplates(menuTemplates);

      // Load popular and recent
      const popular = getPopularMenus(userId, 3);
      setPopularMenus(popular);

      const recent = getRecentMenus(userId, 3);
      setRecentMenus(recent);
    }
  }, []);

  if (!session?.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Please log in to access the menu builder.</p>
      </div>
    );
  }

  // Filter menus based on active filter
  const filteredMenus = activeFilter === 'all'
    ? savedMenus
    : savedMenus.filter(menu => menu.menu_type === activeFilter);

  // Get menu type badge color
  const getMenuTypeBadge = (type: SavedMenu['menu_type']) => {
    const badges = {
      standard: { label: 'Standard', color: 'bg-blue-100 text-blue-700' },
      seasonal: { label: 'Seasonal', color: 'bg-green-100 text-green-700' },
      event: { label: 'Event', color: 'bg-purple-100 text-purple-700' },
      weekly_special: { label: 'Weekly', color: 'bg-orange-100 text-orange-700' },
      custom: { label: 'Custom', color: 'bg-gray-100 text-gray-700' },
    };
    return badges[type];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-gray-900">Menu Builder</h1>
              </div>
              <p className="text-gray-600">
                Save complete menus and reorder with one click. Create templates for different occasions.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => console.log('Create new menu')}
            >
              Create New Menu
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{savedMenus.length}</div>
                <div className="text-sm text-gray-600">Saved Menus</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {popularMenus[0]?.times_used || 0}
                </div>
                <div className="text-sm text-gray-600">Most Used Menu</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{templates.length}</div>
                <div className="text-sm text-gray-600">Available Templates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Most Popular Menus */}
        {popularMenus.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900">Your Most Popular Menus</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularMenus.map((menu) => (
                <div
                  key={menu.id}
                  className="bg-white rounded-lg border-2 border-yellow-400 p-4 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{menu.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{menu.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getMenuTypeBadge(menu.menu_type).color}`}>
                          {getMenuTypeBadge(menu.menu_type).label}
                        </span>
                        {menu.is_template && (
                          <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">
                            Template
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-1 mb-1">
                          <ShoppingCart className="w-3 h-3" />
                          <span>{menu.total_items} items • £{menu.estimated_value.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Used {menu.times_used} times</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => console.log('Reorder menu:', menu.id)}
                    >
                      Reorder Now
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log('View menu:', menu.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200 scrollbar-hide">
            {[
              { id: 'all', label: 'All Menus', count: savedMenus.length },
              { id: 'standard', label: 'Standard', count: savedMenus.filter(m => m.menu_type === 'standard').length },
              { id: 'seasonal', label: 'Seasonal', count: savedMenus.filter(m => m.menu_type === 'seasonal').length },
              { id: 'event', label: 'Events', count: savedMenus.filter(m => m.menu_type === 'event').length },
              { id: 'weekly_special', label: 'Weekly Specials', count: savedMenus.filter(m => m.menu_type === 'weekly_special').length },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-t-lg font-medium text-sm whitespace-nowrap transition-colors border-b-2 flex-shrink-0 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-gray-700 border-transparent hover:border-gray-300'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* All Saved Menus */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {activeFilter === 'all' ? 'All Saved Menus' : `${activeFilter.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())} Menus`}
          </h2>
          {filteredMenus.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenus.map((menu) => (
                <div
                  key={menu.id}
                  className={`bg-white rounded-lg border-2 p-5 shadow-sm hover:shadow-md transition-all ${
                    !menu.is_active ? 'opacity-60 border-gray-200' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{menu.name}</h3>
                      {menu.description && (
                        <p className="text-sm text-gray-600 mb-2">{menu.description}</p>
                      )}
                      {menu.occasion && (
                        <p className="text-xs text-gray-500 mb-2">For: {menu.occasion}</p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getMenuTypeBadge(menu.menu_type).color}`}>
                          {getMenuTypeBadge(menu.menu_type).label}
                        </span>
                        {menu.is_template && (
                          <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">
                            Template
                          </span>
                        )}
                        {!menu.is_active && (
                          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-200 text-gray-600">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <ShoppingCart className="w-3 h-3" />
                          <span>{menu.total_items} items • £{menu.estimated_value.toFixed(2)}</span>
                        </div>
                        {menu.covers_estimate && (
                          <div className="flex items-center gap-1">
                            <UtensilsCrossed className="w-3 h-3" />
                            <span>Serves ~{menu.covers_estimate} covers</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            Last used: {menu.last_used_date
                              ? new Date(menu.last_used_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                              : 'Never'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Used {menu.times_used} times</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {menu.tags && menu.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {menu.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Item Preview */}
                  <div className="mb-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                    <div className="font-semibold mb-1">Menu Items:</div>
                    {menu.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="truncate">
                        • {item.product_name} (x{item.quantity})
                      </div>
                    ))}
                    {menu.items.length > 3 && (
                      <div className="text-gray-400 mt-1">+ {menu.items.length - 3} more items</div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => console.log('Reorder menu:', menu.id)}
                      className="text-xs"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Reorder
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log('Copy menu:', menu.id)}
                      className="text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Duplicate
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log('Edit menu:', menu.id)}
                      className="text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => console.log('Delete menu:', menu.id)}
                      className="text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <UtensilsCrossed className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No menus found in this category</p>
              <Button
                variant="primary"
                onClick={() => console.log('Create new menu')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Menu
              </Button>
            </div>
          )}
        </div>

        {/* Menu Templates */}
        {templates.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <h2 className="text-xl font-bold text-gray-900">Pre-Built Menu Templates</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Start with a professional template and customize to your needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200 p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-gray-700 mb-1">Suggested For:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.suggested_occasions.slice(0, 2).map((occasion, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-0.5 rounded bg-white text-indigo-700"
                        >
                          {occasion}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-3">
                    {template.items.length} items • Est. £{template.estimated_value.toFixed(2)}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => console.log('Use template:', template.id)}
                  >
                    Use This Template
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
