export default function PaymentStep() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Checkout – Payment</h1>
      <form action="/checkout/review">
        <section className="border rounded p-4 space-y-3">
          <div className="font-medium">Payment method</div>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="payment_method" value="account" defaultChecked />
            Account (Invoice)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="payment_method" value="card" />
            Credit/Debit Card (simulated)
          </label>
        </section>
        <div className="pt-2">
          <button className="px-4 py-2 bg-black text-white rounded">Continue to Review</button>
        </div>
      </form>
    </div>
  );
}


