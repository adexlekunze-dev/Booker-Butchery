"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getBranchByCode, getAllBranches } from "@/lib/data/branches";
import { MapPin, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface PrimaryBranch {
  id: string;
  branch_code: string;
  name: string;
  address?: {
    line1?: string;
    city?: string;
    postcode?: string;
  };
  contact?: {
    phone?: string;
    manager?: {
      name?: string;
      phone?: string;
    };
  };
  services?: {
    delivery?: {
      cutoff_time?: string;
      delivery_days?: string[];
    };
    click_collect?: {
      available?: boolean;
      ready_time_hours?: number;
    };
  };
  distance_miles?: number;
}

interface BranchIndicatorData {
  primary_branch: PrimaryBranch;
  alternate_branches: PrimaryBranch[];
}

export function BranchIndicator() {
  const [session, setSession] = useState<any>(null);
  const [branchData, setBranchData] = useState<BranchIndicatorData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedNearbyBranches, setExpandedNearbyBranches] = useState<Set<string>>(new Set());

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);

    if (currentSession?.user && currentUser?.primary_branch_code) {
      // Get branch data from static data
      const branch = getBranchByCode(currentUser.primary_branch_code);
      
      if (branch) {
        // Get nearby branches
        const allBranches = getAllBranches();
        const primaryCoords = branch.coordinates as { latitude: number; longitude: number };
        
        let nearbyBranches: PrimaryBranch[] = [];
        if (primaryCoords?.latitude && primaryCoords?.longitude) {
          nearbyBranches = allBranches
            .filter(b => b.branch_code !== branch.branch_code && b.status === 'active')
            .map(b => {
              const coords = b.coordinates as { latitude: number; longitude: number };
              if (coords?.latitude && coords?.longitude) {
                const distance = calculateDistance(
                  primaryCoords.latitude,
                  primaryCoords.longitude,
                  coords.latitude,
                  coords.longitude
                );
                // Include full branch data with contact and services
                const nearbyBranch: PrimaryBranch = {
                  id: b.id,
                  branch_code: b.branch_code,
                  name: b.name,
                  address: b.address || undefined,
                  contact: b.contact ? {
                    phone: b.contact.phone || undefined,
                    manager: b.contact.manager ? {
                      name: b.contact.manager.name || undefined,
                      phone: b.contact.manager.phone || undefined,
                    } : undefined,
                  } : undefined,
                  services: b.services ? {
                    delivery: b.services.delivery ? {
                      cutoff_time: b.services.delivery.cutoff_time || undefined,
                      delivery_days: b.services.delivery.delivery_days || undefined,
                    } : undefined,
                    click_collect: b.services.click_collect ? {
                      available: b.services.click_collect.available || false,
                      ready_time_hours: b.services.click_collect.ready_time_hours || undefined,
                    } : undefined,
                  } : undefined,
                  distance_miles: distance,
                };
                return nearbyBranch;
              }
              return null;
            })
            .filter((b): b is PrimaryBranch => b !== null)
            .sort((a, b) => (a.distance_miles || 0) - (b.distance_miles || 0))
            .slice(0, 2); // Top 2 nearby branches
        }

        setBranchData({
          primary_branch: {
            id: branch.id,
            branch_code: branch.branch_code,
            name: branch.name,
            address: branch.address,
            contact: branch.contact,
            services: branch.services,
          },
          alternate_branches: nearbyBranches
        });
      } else {
        // Fallback to Manchester Central
        setBranchData({
          primary_branch: {
            id: "prototype-man001",
            branch_code: "MAN001",
            name: "Manchester Central",
            address: {
              line1: "Unit 5, Ashburton Trading Estate",
              city: "Manchester",
              postcode: "M17 1RY"
            }
          },
          alternate_branches: []
        });
      }
    } else if (currentSession?.user) {
      // User logged in but no branch assigned - use default
      setBranchData({
        primary_branch: {
          id: "prototype-man001",
          branch_code: "MAN001",
          name: "Manchester Central",
          address: {
            line1: "Unit 5, Ashburton Trading Estate",
            city: "Manchester",
            postcode: "M17 1RY"
          }
        },
        alternate_branches: []
      });
    }
    
    setLoading(false);

    // Listen for storage changes
    const handleStorageChange = () => {
      const newSession = getSession();
      const newUser = getUser();
      setSession(newSession);
      
      if (newSession?.user && newUser?.primary_branch_code) {
        const branch = getBranchByCode(newUser.primary_branch_code);
        if (branch) {
          // Get nearby branches
          const allBranches = getAllBranches();
          const primaryCoords = branch.coordinates as { latitude: number; longitude: number };
          
          let nearbyBranches: PrimaryBranch[] = [];
          if (primaryCoords?.latitude && primaryCoords?.longitude) {
            nearbyBranches = allBranches
              .filter(b => b.branch_code !== branch.branch_code && b.status === 'active')
              .map(b => {
                const coords = b.coordinates as { latitude: number; longitude: number };
                if (coords?.latitude && coords?.longitude) {
                  const distance = calculateDistance(
                    primaryCoords.latitude,
                    primaryCoords.longitude,
                    coords.latitude,
                    coords.longitude
                  );
                  // Include full branch data with contact and services
                  const nearbyBranch: PrimaryBranch = {
                    id: b.id,
                    branch_code: b.branch_code,
                    name: b.name,
                    address: b.address || undefined,
                    contact: b.contact ? {
                      phone: b.contact.phone || undefined,
                      manager: b.contact.manager ? {
                        name: b.contact.manager.name || undefined,
                        phone: b.contact.manager.phone || undefined,
                      } : undefined,
                    } : undefined,
                    services: b.services ? {
                      delivery: b.services.delivery ? {
                        cutoff_time: b.services.delivery.cutoff_time || undefined,
                        delivery_days: b.services.delivery.delivery_days || undefined,
                      } : undefined,
                      click_collect: b.services.click_collect ? {
                        available: b.services.click_collect.available || false,
                        ready_time_hours: b.services.click_collect.ready_time_hours || undefined,
                      } : undefined,
                    } : undefined,
                    distance_miles: distance,
                  };
                  return nearbyBranch;
                }
                return null;
              })
              .filter((b): b is PrimaryBranch => b !== null)
              .sort((a, b) => (a.distance_miles || 0) - (b.distance_miles || 0))
              .slice(0, 2); // Top 2 nearby branches
          }

          setBranchData({
            primary_branch: {
              id: branch.id,
              branch_code: branch.branch_code,
              name: branch.name,
              address: branch.address,
              contact: branch.contact,
              services: branch.services,
            },
            alternate_branches: nearbyBranches
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Only show for authenticated users
  if (!session?.user) {
    return null;
  }

  if (loading || !branchData?.primary_branch) {
    return (
      <div className="flex flex-col items-start px-3 py-2 rounded-md border border-gray-300 text-left min-w-[140px]">
        <span className="text-xs text-gray-600 font-medium">Your branch</span>
        <div className="flex items-center gap-1.5 w-full">
          <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
          <span className="text-sm font-semibold text-gray-900 truncate flex-1">
            {loading ? "Loading..." : "Manchester Central"}
          </span>
        </div>
      </div>
    );
  }

  const primaryBranch = branchData.primary_branch;
  const address = primaryBranch.address;
  const contact = primaryBranch.contact;
  const services = primaryBranch.services;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-start px-3 py-2 rounded-md border border-gray-300 hover:border-primary hover:bg-gray-50 text-left transition-all min-w-[140px]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-xs text-gray-600 font-medium">Your branch</span>
        <div className="flex items-center gap-1.5 w-full">
          <MapPin className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
          <span className="text-sm font-semibold text-gray-900 truncate flex-1">
            {primaryBranch.name}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
            strokeWidth={2}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 p-4 max-h-96 overflow-y-auto">
            {/* Primary Branch Details */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Your Branch
              </h3>
              
              {/* Basic Info (Always Visible) */}
              <div className="space-y-2 text-sm">
                <div>
                  <div className="font-medium text-gray-900">
                    {primaryBranch.name}
                  </div>
                  {address && (
                    <div className="text-gray-600 mt-1">
                      {address.line1 && <div>{address.line1}</div>}
                      {address.city && (
                        <div>
                          {address.city}
                          {address.postcode && `, ${address.postcode}`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* See Details Toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-3 flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <span>{showDetails ? "Hide" : "See"} Details</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`}
                />
              </button>

              {/* Detailed Info (Hidden by Default) */}
              {showDetails && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 text-sm">
                  {contact?.phone && (
                    <div className="text-gray-600">
                      <span className="font-medium">Phone:</span> {contact.phone}
                    </div>
                  )}

                  {contact?.manager && (
                    <div className="text-gray-600">
                      <span className="font-medium">Manager:</span> {contact.manager.name}
                      {contact.manager.phone && ` (${contact.manager.phone})`}
                    </div>
                  )}

                  {services?.delivery && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-xs text-gray-600">
                        <div className="font-medium mb-1">Delivery:</div>
                        {services.delivery.delivery_days && (
                          <div>
                            Available: {services.delivery.delivery_days.join(", ")}
                          </div>
                        )}
                        {services.delivery.cutoff_time && (
                          <div>Cutoff: {services.delivery.cutoff_time}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {services?.click_collect?.available && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Click & Collect:</span> Available
                      {services.click_collect.ready_time_hours && (
                        <span> (Ready in {services.click_collect.ready_time_hours} hours)</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Nearby Branches */}
            {branchData.alternate_branches && branchData.alternate_branches.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Nearby Branches
                </h4>
                <div className="space-y-3">
                  {branchData.alternate_branches.map((branch) => {
                    const isExpanded = expandedNearbyBranches.has(branch.id);
                    return (
                      <div key={branch.id} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                        {/* Basic Info */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">
                              {branch.name}
                            </div>
                            {branch.address && (
                              <div className="text-xs text-gray-600 mt-1">
                                {branch.address.line1 && <div>{branch.address.line1}</div>}
                                {branch.address.city && branch.address.postcode && (
                                  <div>{branch.address.city}, {branch.address.postcode}</div>
                                )}
                              </div>
                            )}
                          </div>
                          {branch.distance_miles && (
                            <div className="text-sm font-semibold text-gray-900 ml-3">
                              {branch.distance_miles.toFixed(1)} miles
                            </div>
                          )}
                        </div>

                        {/* See Details Toggle for Nearby Branch */}
                        <button
                          onClick={() => {
                            const newSet = new Set(expandedNearbyBranches);
                            if (isExpanded) {
                              newSet.delete(branch.id);
                            } else {
                              newSet.add(branch.id);
                            }
                            setExpandedNearbyBranches(newSet);
                          }}
                          className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          <span>{isExpanded ? "Hide" : "See"} Details</span>
                          <ChevronRight
                            className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </button>

                        {/* Detailed Info (Hidden by Default) */}
                        {isExpanded && (
                          <div className="mt-2 pt-2 border-t border-gray-200 space-y-2 text-xs">
                            {branch.contact?.phone && (
                              <div className="text-gray-600">
                                <span className="font-medium">Phone:</span> {branch.contact.phone}
                              </div>
                            )}

                            {branch.contact?.manager && (
                              <div className="text-gray-600">
                                <span className="font-medium">Manager:</span> {branch.contact.manager.name}
                                {branch.contact.manager.phone && ` (${branch.contact.manager.phone})`}
                              </div>
                            )}

                            {branch.services?.delivery && (
                              <div className="pt-2 border-t border-gray-200">
                                <div className="text-gray-600">
                                  <div className="font-medium mb-1">Delivery:</div>
                                  {branch.services.delivery.delivery_days && (
                                    <div>
                                      Available: {branch.services.delivery.delivery_days.join(", ")}
                                    </div>
                                  )}
                                  {branch.services.delivery.cutoff_time && (
                                    <div>Cutoff: {branch.services.delivery.cutoff_time}</div>
                                  )}
                                </div>
                              </div>
                            )}

                            {branch.services?.click_collect?.available && (
                              <div className="text-gray-600">
                                <span className="font-medium">Click & Collect:</span> Available
                                {branch.services.click_collect.ready_time_hours && (
                                  <span> (Ready in {branch.services.click_collect.ready_time_hours} hours)</span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div>
              <Link
                href="/branches"
                className="block w-full text-center text-sm py-2 px-4 text-primary hover:bg-orange-50 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Find Other Branches
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


