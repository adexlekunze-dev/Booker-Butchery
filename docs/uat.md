# UAT Scenarios (Prototype)

1. Branch-aware browsing
- View Fresh Meat listing with in-stock at branch
- Open PDP and confirm availability panel

2. Out-of-stock handling (if present)
- Find product out of stock at MAN001
- See alternative branches section on PDP

3. Mixed fulfillment basket
- Add delivery item (in stock at MAN001)
- Add click & collect item (different branch)
- Check grouping on `/basket`

4. Checkout flow
- Delivery → Payment → Review → Confirmation
- Basket clears and order appears in `/account/orders`

5. Search + autocomplete
- Type “chicken” in header → select suggestion → PDP
- Visit `/search?q=chicken` → see results

6. Branch finder
- Visit `/branches`
- Search and open a branch detail page

7. Reorder
- Open an order and click Reorder
- Items reappear in `/basket`
