export default function DeliveryStep() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Checkout – Delivery & Collection</h1>
      <form action="/checkout/payment">
        <section className="border rounded p-4 space-y-3">
          <div className="font-medium">Delivery details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="border rounded px-3 py-2" name="address1" placeholder="Address line 1" required />
            <input className="border rounded px-3 py-2" name="postcode" placeholder="Postcode" required />
            <input className="border rounded px-3 py-2 md:col-span-2" name="instructions" placeholder="Special instructions (optional)" />
          </div>
        </section>
        <div className="pt-2">
          <button className="px-4 py-2 bg-black text-white rounded">Continue to Payment</button>
        </div>
      </form>
    </div>
  );
}


