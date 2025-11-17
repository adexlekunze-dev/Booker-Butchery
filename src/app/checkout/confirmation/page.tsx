export default function ConfirmationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">✅ Order Confirmed</h1>
      <p className="text-sm text-gray-700">Your order has been placed successfully. Delivery and collection details will be shown in your order history.</p>
      <div className="flex gap-3">
        <a className="px-4 py-2 bg-black text-white rounded" href="/">Continue Shopping</a>
        <a className="px-4 py-2 border rounded" href="/account/orders">View Order History</a>
      </div>
    </div>
  );
}


