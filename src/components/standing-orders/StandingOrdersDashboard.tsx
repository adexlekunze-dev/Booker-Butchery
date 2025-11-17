"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import {
  getStandingOrders,
  getActiveStandingOrders,
  getUpcomingDeliveries,
  getDeliveryHistory,
  calculateMonthlyCost,
} from "@/lib/data/mock-standing-orders";
import type {
  StandingOrder,
  UpcomingDelivery,
  StandingOrderHistory,
} from "@/lib/data/mock-standing-orders";
import { Button } from "@/components/ui/Button";
import {
  RefreshCcw,
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  Calendar,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  SkipForward,
  AlertCircle,
  DollarSign,
} from "lucide-react";

export function StandingOrdersDashboard() {
  const [session, setSession] = useState<any>(null);
  const [standingOrders, setStandingOrders] = useState<StandingOrder[]>([]);
  const [upcomingDeliveries, setUpcomingDeliveries] = useState<UpcomingDelivery[]>([]);
  const [deliveryHistory, setDeliveryHistory] = useState<StandingOrderHistory[]>([]);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'history'>('active');

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';

      // Load standing orders
      const orders = getStandingOrders(userId);
      setStandingOrders(orders);

      // Load upcoming deliveries
      const upcoming = getUpcomingDeliveries(userId, 10);
      setUpcomingDeliveries(upcoming);

      // Load delivery history
      const history = getDeliveryHistory(userId, 10);
      setDeliveryHistory(history);

      // Calculate monthly cost
      const cost = calculateMonthlyCost(userId);
      setMonthlyCost(cost);
    }
  }, []);

  if (!session?.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Please log in to access standing orders.</p>
      </div>
    );
  }

  // Get frequency badge
  const getFrequencyBadge = (frequency: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      weekly: { label: 'Weekly', color: 'bg-blue-100 text-blue-700' },
      'bi-weekly': { label: 'Bi-Weekly', color: 'bg-purple-100 text-purple-700' },
      monthly: { label: 'Monthly', color: 'bg-green-100 text-green-700' },
      custom: { label: 'Custom', color: 'bg-gray-100 text-gray-700' },
    };
    return badges[frequency] || { label: frequency, color: 'bg-gray-100 text-gray-700' };
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string; icon: any }> = {
      active: { label: 'Active', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-700', icon: Pause },
      cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: XCircle },
    };
    return badges[status] || { label: status, color: 'bg-gray-100 text-gray-700', icon: AlertCircle };
  };

  const activeOrders = standingOrders.filter(order => order.status === 'active');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <RefreshCcw className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-gray-900">Standing Orders</h1>
              </div>
              <p className="text-gray-600">
                Manage recurring deliveries and automatic orders for your business
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => console.log('Create new standing order')}
            >
              Create Standing Order
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCcw className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{activeOrders.length}</div>
                <div className="text-sm text-gray-600">Active Orders</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {upcomingDeliveries.length}
                </div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  £{monthlyCost.toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Est. Monthly</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {standingOrders.reduce((sum, o) => sum + o.delivery_count, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Deliveries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            {[
              { id: 'active', label: 'Active Standing Orders', icon: RefreshCcw },
              { id: 'upcoming', label: 'Upcoming Deliveries', icon: Calendar },
              { id: 'history', label: 'Delivery History', icon: Clock },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Standing Orders Tab */}
        {activeTab === 'active' && (
          <div>
            {standingOrders.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {standingOrders.map((order) => {
                  const frequencyBadge = getFrequencyBadge(order.frequency);
                  const statusBadge = getStatusBadge(order.status);
                  const StatusIcon = statusBadge.icon;

                  return (
                    <div
                      key={order.id}
                      className={`bg-white rounded-lg border-2 p-6 shadow-sm hover:shadow-md transition-all ${
                        order.status === 'active' ? 'border-green-200' : 'border-gray-200'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{order.name}</h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 ${statusBadge.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusBadge.label}
                            </span>
                            <span className={`text-xs font-medium px-2 py-1 rounded ${frequencyBadge.color}`}>
                              {frequencyBadge.label}
                            </span>
                          </div>
                          {order.description && (
                            <p className="text-sm text-gray-600 mb-2">{order.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Delivery: {order.delivery_day}s</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              <span>{order.total_items} items • £{order.estimated_value.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{order.delivery_count} deliveries</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Next Delivery */}
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-gray-900 mb-1">
                              Next Delivery
                            </div>
                            <div className="text-lg font-bold text-primary">
                              {new Date(order.next_delivery_date).toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                              })}
                            </div>
                          </div>
                          {order.notify_before_processing && (
                            <div className="text-xs text-gray-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              <span>You'll be notified 48h before</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-semibold text-gray-900 mb-2">
                          Items ({order.items.length}):
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          {order.items.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="truncate">
                                • {item.product_name} x{item.quantity}
                              </span>
                              <span className="text-gray-500 ml-2">
                                £{(item.unit_price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 4 && (
                            <div className="text-gray-400">+ {order.items.length - 4} more items</div>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                        {order.auto_adjust_quantities && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>AI Quantity Adjustment</span>
                          </div>
                        )}
                        {order.skip_on_holidays && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>Auto-skip holidays</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {order.status === 'active' ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => console.log('Pause order:', order.id)}
                            icon={<Pause className="w-4 h-4" />}
                            className="text-xs"
                          >
                            Pause
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => console.log('Resume order:', order.id)}
                            icon={<Play className="w-4 h-4" />}
                            className="text-xs"
                          >
                            Resume
                          </Button>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => console.log('Skip next:', order.id)}
                          icon={<SkipForward className="w-4 h-4" />}
                          className="text-xs"
                        >
                          Skip Next
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => console.log('Edit order:', order.id)}
                          icon={<Edit className="w-4 h-4" />}
                          className="text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => console.log('Delete order:', order.id)}
                          icon={<Trash2 className="w-4 h-4" />}
                          className="text-xs text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      </div>

                      {/* Paused Until Notice */}
                      {order.paused_until && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                          <strong>Paused until:</strong>{' '}
                          {new Date(order.paused_until).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <RefreshCcw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Standing Orders Yet</h3>
                <p className="text-gray-600 mb-6">
                  Set up automatic recurring orders to save time and never run out of essentials
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => console.log('Create first standing order')}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Standing Order
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Deliveries Tab */}
        {activeTab === 'upcoming' && (
          <div>
            {upcomingDeliveries.length > 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {upcomingDeliveries.map((delivery, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">
                            {delivery.standing_order_name}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(delivery.scheduled_date).toLocaleDateString('en-GB', {
                                  weekday: 'long',
                                  day: 'numeric',
                                  month: 'long',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              <span>{delivery.items_count} items</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>£{delivery.estimated_value.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {delivery.can_skip && (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => console.log('Skip delivery:', delivery)}
                                className="text-xs"
                              >
                                <SkipForward className="w-3 h-3 mr-1" />
                                Skip This Delivery
                              </Button>
                            )}
                            {delivery.can_modify && (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => console.log('Modify delivery:', delivery)}
                                className="text-xs"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Modify Items
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              delivery.status === 'scheduled'
                                ? 'bg-green-100 text-green-700'
                                : delivery.status === 'processing'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {delivery.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No upcoming deliveries scheduled</p>
              </div>
            )}
          </div>
        )}

        {/* Delivery History Tab */}
        {activeTab === 'history' && (
          <div>
            {deliveryHistory.length > 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {deliveryHistory.map((record) => (
                    <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">
                            {record.standing_order_name}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(record.delivery_date).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            {record.order_number !== '-' && (
                              <div className="flex items-center gap-1">
                                <Package className="w-4 h-4" />
                                <span>{record.order_number}</span>
                              </div>
                            )}
                            {record.status === 'completed' && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>£{record.total_value.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                          {record.modifications && (
                            <div className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1 inline-block">
                              Modified: {record.modifications}
                            </div>
                          )}
                        </div>
                        <div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 ${
                              record.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : record.status === 'skipped'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {record.status === 'completed' ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : record.status === 'skipped' ? (
                              <SkipForward className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {record.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No delivery history yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
