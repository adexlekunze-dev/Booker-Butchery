"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });

type Branch = { name: string; coordinates?: { latitude?: number; longitude?: number } };

export function BranchMap({ branches }: { branches: Branch[] }) {
  const center = useMemo(() => {
    const b = branches.find(b => b.coordinates?.latitude && b.coordinates?.longitude);
    return {
      lat: b?.coordinates?.latitude ?? 53.4808,
      lng: b?.coordinates?.longitude ?? -2.2426
    };
  }, [branches]);

  return (
    <div className="h-full min-h-[400px] w-full overflow-hidden rounded-lg border border-gray-200">
      <MapContainer style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {branches.map((b, i) => (
          b.coordinates?.latitude && b.coordinates?.longitude ? (
            <Marker key={i} position={[b.coordinates.latitude, b.coordinates.longitude]} />
          ) : null
        ))}
      </MapContainer>
    </div>
  );
}


