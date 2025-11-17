export type HelpCategory = 
  | "getting-started"
  | "ordering"
  | "delivery-collection"
  | "products-stock"
  | "account-management"
  | "payment-invoicing"
  | "quality-sourcing";

export interface HelpArticle {
  slug: string;
  title: string;
  category: HelpCategory;
  excerpt: string;
  content: string;
  relatedSlugs?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "delivery" | "stock-branches" | "quality-returns";
}

export const categories: { id: HelpCategory; name: string; description: string }[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Learn the basics of using Booker Wholesale"
  },
  {
    id: "ordering",
    name: "Ordering",
    description: "Everything you need to know about placing orders"
  },
  {
    id: "delivery-collection",
    name: "Delivery & Collection",
    description: "Information about delivery and click & collect"
  },
  {
    id: "products-stock",
    name: "Products & Stock",
    description: "Product availability and stock management"
  },
  {
    id: "account-management",
    name: "Account Management",
    description: "Manage your account settings and preferences"
  },
  {
    id: "payment-invoicing",
    name: "Payment & Invoicing",
    description: "Payment methods and invoice information"
  },
  {
    id: "quality-sourcing",
    name: "Quality & Sourcing",
    description: "Our quality standards and sourcing commitments"
  }
];

export const articles: HelpArticle[] = [
  // Getting Started
  {
    slug: "how-to-create-account",
    title: "How to Create an Account",
    category: "getting-started",
    excerpt: "Step-by-step guide to registering for a Booker Wholesale trade account.",
    content: `
# How to Create an Account

Creating an account with Booker Wholesale is simple and straightforward. As a trade-only wholesaler, we require business registration.

## Registration Requirements

- Valid business registration number
- VAT number (if applicable)
- Business address
- Contact details

## Step-by-Step Process

1. Click the "Register" button in the header
2. Fill in your business details:
   - Business name
   - Business address
   - Contact information
   - VAT number (if applicable)
3. Choose your primary branch location
4. Set up your account password
5. Verify your email address
6. Complete registration

## After Registration

Once registered, you'll be able to:
- Browse products with trade prices
- Place orders online
- Manage your account settings
- Track order history
- Set delivery preferences

Your account will be reviewed and activated typically within 24 hours. If you need assistance, contact our support team on 0345 602 3108.
    `,
    relatedSlugs: ["understanding-primary-branch", "first-order-guide"]
  },
  {
    slug: "understanding-primary-branch",
    title: "Understanding Your Primary Branch",
    category: "getting-started",
    excerpt: "Learn about primary branches and how they affect your shopping experience.",
    content: `
# Understanding Your Primary Branch

Your primary branch is the main Booker location assigned to your account. It determines default product availability, pricing, and delivery options.

## What is a Primary Branch?

Your primary branch is the Booker location that:
- Shows default stock availability for products
- Handles most of your deliveries
- Provides local pricing information
- Offers click & collect services

## How Primary Branch Affects You

### Product Availability
Product pages show real-time stock levels at your primary branch. You'll see:
- In stock indicators
- Exact stock counts
- Alternative branch options if out of stock

### Ordering
- Default delivery options are based on your primary branch
- Click & collect pickup is available from your primary branch
- You can still order from other branches during checkout

## Changing Your Primary Branch

You can request to change your primary branch through your account settings. Changes typically process within 24 hours.

To change your primary branch:
1. Go to Account Settings
2. Select "Change Primary Branch"
3. Choose your new branch location
4. Submit the request

Your branch team will contact you to confirm the change.
    `,
    relatedSlugs: ["how-to-create-account", "checking-product-availability"]
  },
  {
    slug: "first-order-guide",
    title: "First Order Guide",
    category: "getting-started",
    excerpt: "Complete guide to placing your first order with Booker Wholesale.",
    content: `
# First Order Guide

Welcome to Booker Wholesale! This guide will help you place your first order successfully.

## Before You Start

1. **Verify Your Account**: Ensure your account is activated
2. **Check Your Branch**: Know your primary branch location
3. **Review Terms**: Familiarize yourself with minimum orders and delivery options

## Placing Your First Order

### Step 1: Browse Products
- Navigate through categories (Meat, Fish & Poultry, Beer & Cider, Greengrocery)
- Use the search bar to find specific products
- Check stock availability at your branch

### Step 2: Add to Basket
- Click "Add to Basket" on products you need
- Adjust quantities as needed
- Review basket for accuracy

### Step 3: Checkout
1. Review your basket items
2. Choose delivery or click & collect
3. Select delivery date and time slot
4. Review order summary
5. Confirm payment method
6. Place order

### Step 4: Confirmation
You'll receive:
- Email confirmation
- Order number
- Delivery/pickup details

## Tips for First Orders

- Start with a smaller order to test the process
- Review product descriptions carefully
- Check delivery time slots in advance
- Note any special instructions for delivery

## Need Help?

If you encounter any issues, contact our support team on 0345 602 3108 or use the website support form.
    `,
    relatedSlugs: ["how-to-place-order-online", "understanding-delivery-vs-click-collect"]
  },
  
  // Ordering
  {
    slug: "how-to-place-order-online",
    title: "How to Place an Order Online",
    category: "ordering",
    excerpt: "Detailed instructions for placing orders through our website.",
    content: `
# How to Place an Order Online

Placing an order online with Booker Wholesale is quick and convenient.

## The Ordering Process

### 1. Browse and Search
- Browse by category (Meat/Fish/Poultry, Beer/Cider, Greengrocery)
- Use the search bar for specific products
- Filter by price, brand, or availability
- Check stock levels at your branch

### 2. Add Products to Basket
- Click "Add to Basket" on any product
- Adjust quantity using the +/- buttons
- Continue shopping or proceed to checkout

### 3. Review Your Basket
- View all items in your basket
- Check quantities and prices
- Remove items if needed
- Verify total cost

### 4. Choose Fulfillment Method
Select either:
- **Delivery**: Next-day delivery to your address
- **Click & Collect**: Pick up from selected branch

### 5. Select Delivery/Pickup Details
- Choose preferred date
- Select time slot (if available)
- Add delivery instructions (if needed)

### 6. Complete Checkout
- Review final order summary
- Confirm payment method
- Place your order

### 7. Order Confirmation
- Receive email confirmation
- Get order number for tracking
- Access order in your account

## Order Cut-Off Times

- **Next-day delivery**: Order by 3pm (Mon-Sat)
- **Click & collect**: Order by 3pm the day before pickup
- Orders placed after cut-off will be processed the next day

## Need to Modify an Order?

Contact your branch before 3pm the day before delivery to make changes.
    `,
    relatedSlugs: ["first-order-guide", "understanding-delivery-vs-click-collect"]
  },
  {
    slug: "understanding-delivery-vs-click-collect",
    title: "Understanding Delivery vs. Click & Collect",
    category: "ordering",
    excerpt: "Learn the differences between delivery and click & collect options.",
    content: `
# Understanding Delivery vs. Click & Collect

Booker offers two convenient fulfillment options for your orders.

## Delivery

### Next-Day Delivery
- Order by 3pm for next-day delivery (Mon-Sat)
- Available time slots:
  - 8am-10am
  - 10am-12pm
  - 12pm-2pm
  - 2pm-4pm

### Delivery Charges
- **Free delivery** on orders over £50
- **£5 delivery charge** on orders under £50

### Benefits
- Convenient - delivered to your door
- No need to leave your business
- Time slot flexibility

## Click & Collect

### How It Works
- Order online and collect from your chosen branch
- Available from any branch with stock
- Collect during branch opening hours

### Collection Process
1. Place order online
2. Receive confirmation email
3. Wait for "Ready to Collect" notification
4. Collect from branch reception
5. Bring ID and order confirmation

### Benefits
- No delivery charges
- Pick up at your convenience
- Can collect from multiple branches in one trip

## Which Option is Right for You?

Choose **Delivery** if:
- You need items delivered to your business
- You prefer convenience
- Order value is over £50 (free delivery)

Choose **Click & Collect** if:
- You want to avoid delivery charges
- You're near a branch location
- You want to collect multiple orders at once

## Mixed Orders

You can combine both methods in a single order:
- Some items for delivery
- Some items for click & collect
- Manage fulfillment groups during checkout
    `,
    relatedSlugs: ["how-to-place-order-online", "delivery-areas-times", "click-collect-process"]
  },
  {
    slug: "ordering-from-multiple-branches",
    title: "Ordering from Multiple Branches",
    category: "ordering",
    excerpt: "Learn how to order products from different branch locations.",
    content: `
# Ordering from Multiple Branches

You're not limited to your primary branch - you can order from any Booker branch that has stock.

## How It Works

During checkout, you can see product availability across all branches and choose:
- Items from your primary branch (delivery or click & collect)
- Items from other branches (click & collect only)

## Finding Products at Other Branches

### Product Page
- View stock levels at your primary branch
- See "Available at other branches" section
- Check nearby branches with stock

### During Checkout
- Items automatically grouped by fulfillment method
- See which branch each item comes from
- Choose collection branch for each item

## Fulfillment Groups

Your order will be organized into fulfillment groups:
- **Delivery Group**: Items from your primary branch for delivery
- **Collection Groups**: Items from specific branches for pickup

## Collection from Multiple Branches

If ordering from multiple branches:
1. Each branch group is processed separately
2. You'll receive notifications for each collection
3. Collect from each branch during their opening hours
4. Bring ID and order confirmation to each branch

## Tips

- Check branch opening hours before ordering
- Consider proximity when choosing branches
- Some products may only be available at specific branches
- Contact branches directly for large quantity orders
    `,
    relatedSlugs: ["click-collect-process", "checking-product-availability"]
  },
  {
    slug: "how-to-use-saved-lists",
    title: "How to Use Saved Lists",
    category: "ordering",
    excerpt: "Create and use saved product lists for faster ordering.",
    content: `
# How to Use Saved Lists

Saved lists help you reorder frequently purchased items quickly.

## Creating a Saved List

1. Add products to your basket
2. Click "Save as List" in basket view
3. Name your list (e.g., "Weekly Order", "Monthly Stock")
4. Save the list

## Using Saved Lists

### Adding Items from a List
1. Go to "My Account" → "Saved Lists"
2. Select a saved list
3. Review items in the list
4. Click "Add All to Basket" or select specific items
5. Adjust quantities as needed
6. Proceed to checkout

### Editing Saved Lists
- Add new items to an existing list
- Remove items you no longer need
- Update quantities for future orders
- Rename or delete lists

## List Management

### Creating Multiple Lists
- Weekly shopping list
- Monthly bulk order list
- Event-specific lists
- Seasonal product lists

### Sharing Lists
Currently, lists are personal to your account. Contact support if you need to share lists across multiple accounts.

## Tips

- Update lists regularly to reflect current needs
- Create lists for different business needs
- Use descriptive names for easy identification
- Check stock availability before adding lists to basket
    `,
    relatedSlugs: ["how-to-place-order-online", "bulk-ordering-guide"]
  },
  {
    slug: "bulk-ordering-guide",
    title: "Bulk Ordering Guide",
    category: "ordering",
    excerpt: "Guide to placing large quantity orders efficiently.",
    content: `
# Bulk Ordering Guide

Order in bulk to save time and ensure consistent supply for your business.

## Benefits of Bulk Ordering

- Save time on frequent ordering
- Secure stock for upcoming events
- Potential for better pricing on large orders
- Reduce delivery charges (orders over £50 are free)

## Planning Your Bulk Order

### Consider These Factors
1. **Storage capacity**: Ensure you have space
2. **Use-by dates**: Check shelf life of products
3. **Business needs**: Plan for upcoming busy periods
4. **Budget**: Large orders require larger payments

## Placing Bulk Orders

### Method 1: Increase Quantities
- Add products to basket as normal
- Use quantity selector to increase amounts
- Check maximum available stock
- Review total cost before checkout

### Method 2: Use Saved Lists
- Create a bulk order list
- Add items in larger quantities
- Reuse the list regularly

## Stock Availability

### Checking Stock Levels
- Product pages show exact stock counts
- Contact your branch for very large quantities
- Some items may need advance notice

### Out of Stock Items
- We'll suggest alternatives
- Transfer from other branches (on request)
- Pre-order options available

## Delivery Considerations

### Large Deliveries
- Confirm delivery vehicle access
- Ensure receiving area is ready
- Consider delivery time slot carefully
- Add delivery instructions if needed

### Click & Collect
- Confirm branch can handle large orders
- Bring suitable vehicle for collection
- Arrange collection time if needed

## Payment

- Trade credit accounts available for bulk orders
- Invoice payment options
- Contact your branch for payment terms

## Need Assistance?

For very large orders or special requirements, contact your local branch directly.
    `,
    relatedSlugs: ["how-to-use-saved-lists", "trade-credit-accounts"]
  },

  // Delivery & Collection
  {
    slug: "delivery-areas-times",
    title: "Delivery Areas and Times",
    category: "delivery-collection",
    excerpt: "Information about delivery coverage and time slots.",
    content: `
# Delivery Areas and Times

Booker provides next-day delivery service across the UK from our 170+ branch network.

## Delivery Coverage

We deliver to most UK postcodes from our extensive branch network. Delivery is available from your primary branch or nearby branches.

## Delivery Time Slots

### Available Slots (Mon-Sat)
- **8am-10am**: Early morning delivery
- **10am-12pm**: Late morning delivery
- **12pm-2pm**: Midday delivery
- **2pm-4pm**: Afternoon delivery

### Selecting Your Time Slot
- Choose preferred slot during checkout
- Subject to availability
- First come, first served basis
- We'll confirm your slot in order confirmation

## Order Cut-Off Times

- **Next-day delivery**: Order by 3pm (Mon-Sat)
- Orders placed after 3pm will be delivered the following day
- Sunday orders processed Monday

## Delivery Days

- Monday to Saturday
- No Sunday deliveries
- Bank holidays may affect delivery times

## Delivery Charges

- **Free delivery** on orders over £50
- **£5 delivery charge** on orders under £50
- Charges apply per delivery

## What to Expect

### On Delivery Day
- Driver will call ahead (if contact number provided)
- Delivery to your specified address
- Sign for delivery (may be required)
- Check items on arrival

### Delivery Instructions
Add special instructions during checkout:
- Access codes
- Preferred drop-off location
- Contact person details
- Delivery timing preferences

## Delivery Issues

If you have delivery concerns:
- Contact your branch before 3pm the day before delivery
- Check order tracking in your account
- Contact support if delivery is late or incorrect
    `,
    relatedSlugs: ["delivery-charges-explained", "what-to-do-if-miss-delivery"]
  },
  {
    slug: "click-collect-process",
    title: "Click & Collect Process",
    category: "delivery-collection",
    excerpt: "Step-by-step guide to using click & collect service.",
    content: `
# Click & Collect Process

Collect your order from a Booker branch at your convenience.

## How Click & Collect Works

1. **Order Online**: Place your order through the website
2. **Choose Branch**: Select branch for collection during checkout
3. **Order Processing**: Branch prepares your order
4. **Ready Notification**: Receive email when order is ready
5. **Collect**: Pick up from branch during opening hours

## Collection Points

Orders can be collected from:
- Your primary branch
- Any other branch with stock
- Multiple branches (for orders with items from different locations)

## What to Bring

- **Photo ID**: Driver's license or business ID
- **Order Confirmation**: Email or order number
- **Collection Vehicle**: If ordering large items

## Collection Hours

Collect during branch opening hours:
- Weekdays: Typically 6am-8pm (varies by branch)
- Saturdays: Typically 6am-6pm
- Sundays: Most branches closed
- Check specific branch hours before ordering

## When You Arrive

1. Go to branch reception/collection point
2. Provide order number or confirmation
3. Show ID for verification
4. Staff will retrieve your order
5. Check items before leaving
6. Sign for collection (if required)

## Collection Notifications

You'll receive emails:
- Order confirmation
- When order is ready for collection
- Reminder if not collected within 3 days

## Collection Timeframes

- **Standard orders**: Ready within 24 hours
- **Large orders**: May take longer (you'll be notified)
- **Orders placed after 3pm**: Ready next day

## Multiple Branch Collections

If collecting from multiple branches:
- Each branch processes separately
- You'll get separate notifications
- Collect from each location
- No need to collect all at once

## Can't Collect?

Contact the branch to:
- Arrange alternative collection person (with ID)
- Change collection branch (if possible)
- Discuss delivery alternative

## Tips

- Check branch opening hours
- Bring correct ID and order details
- Inspect items before leaving
- Contact branch if collection is delayed
    `,
    relatedSlugs: ["understanding-delivery-vs-click-collect", "ordering-from-multiple-branches"]
  },
  {
    slug: "delivery-charges-explained",
    title: "Delivery Charges Explained",
    category: "delivery-collection",
    excerpt: "Understanding delivery charges and when they apply.",
    content: `
# Delivery Charges Explained

Clear information about delivery fees and how to get free delivery.

## Delivery Charge Structure

### Free Delivery
- **Orders over £50**: Free standard delivery
- Applies to all delivery time slots
- Based on order value (excluding VAT)

### Delivery Charge
- **Orders under £50**: £5 delivery charge
- Applies per delivery
- Same charge regardless of distance

## How Charges Are Calculated

Delivery charges are based on your **basket total**:
- If basket total is £50.01 or more → Free delivery
- If basket total is under £50.00 → £5 charge

## Multiple Deliveries

If your order is split into multiple deliveries:
- Each delivery under £50 incurs the £5 charge
- Each delivery over £50 is free
- Charges shown clearly during checkout

## Click & Collect

- **Always free** - no charges for click & collect
- Collect from any branch location
- Great way to avoid delivery charges on smaller orders

## Ways to Get Free Delivery

1. **Increase order value**: Add items to reach £50+
2. **Combine orders**: Group purchases together
3. **Use Click & Collect**: Always free
4. **Plan ahead**: Build up larger orders

## Delivery Charge Examples

### Example 1
- Basket total: £45.00
- Delivery charge: £5.00
- **Total: £50.00**

### Example 2
- Basket total: £52.00
- Delivery charge: £0.00
- **Total: £52.00**

### Example 3
- Basket total: £75.00
- Multiple deliveries (some under £50)
- Each delivery under £50: £5 charge
- Each delivery over £50: Free

## Trade Credit Accounts

Delivery charges apply the same way for trade credit accounts. Charges are included on your invoice.

## Questions?

If you're unsure about delivery charges, contact our support team before placing your order.
    `,
    relatedSlugs: ["delivery-areas-times", "understanding-delivery-vs-click-collect"]
  },
  {
    slug: "what-to-do-if-miss-delivery",
    title: "What to Do if You Miss a Delivery",
    category: "delivery-collection",
    excerpt: "Steps to take if you're not available when delivery arrives.",
    content: `
# What to Do if You Miss a Delivery

If you miss a delivery, here's how to resolve it quickly.

## If Driver Can't Deliver

### Delivery Attempt
- Driver will attempt delivery at your chosen time slot
- May leave a card if no one is available
- Will try to contact you if number provided

### Common Reasons for Missed Delivery
- No one available to receive
- Incorrect address or access issues
- Business closed during delivery slot
- Unable to gain access to property

## What Happens Next

### Driver Will:
1. Attempt to contact you (if number provided)
2. Leave delivery card with contact information
3. May attempt redelivery if arranged

### You Should:
1. Check for delivery card or missed delivery notification
2. Contact the branch or driver immediately
3. Arrange redelivery or alternative collection

## Arranging Redelivery

### Contact Options
- **Phone**: Call your branch directly
- **Online**: Use order tracking in your account
- **Email**: Reply to order confirmation email

### Redelivery Options
- **Next available slot**: Reschedule to next day
- **Alternative time**: Choose different time slot
- **Click & Collect**: Change to branch collection

## Time-Sensitive Items

### Fresh Products
- Contact branch immediately
- Redelivery arranged quickly
- May need refrigeration consideration

### Frozen Items
- Branch will handle appropriately
- Delivery rearranged promptly
- Quality maintained

## Preventing Missed Deliveries

### Tips
- Provide mobile number during checkout
- Add clear delivery instructions
- Ensure someone is available
- Check delivery address is correct
- Consider access requirements (codes, etc.)

### Alternative Options
- Use click & collect for flexibility
- Arrange delivery to alternative address
- Request specific delivery instructions

## Delivery Instructions

Add helpful instructions:
- "Leave with reception"
- "Call on arrival"
- "Access code: 1234"
- "Deliver to side entrance"

## Need Help?

Contact our support team on 0345 602 3108 or your local branch if you're having delivery issues.
    `,
    relatedSlugs: ["delivery-areas-times", "click-collect-process"]
  },

  // Products & Stock
  {
    slug: "checking-product-availability",
    title: "Checking Product Availability at Your Branch",
    category: "products-stock",
    excerpt: "How to check if products are in stock at your assigned branch.",
    content: `
# Checking Product Availability at Your Branch

Real-time stock information helps you plan orders and avoid disappointment.

## Viewing Stock on Product Pages

### Stock Indicators
- **Green checkmark**: In stock at your branch
- **Exact count**: Shows available quantity (for logged-in users)
- **Out of stock**: Shows "Out of Stock" with alternatives

### Stock Information Display
- Stock level visible on product card
- Detailed availability on product detail page
- Real-time updates throughout the day

## Understanding Stock Levels

### In Stock
- Product available for immediate order
- Shows exact quantity (if logged in)
- Can add to basket

### Low Stock
- Limited quantity available
- May show "Only X left"
- Order soon to secure stock

### Out of Stock
- Not available at your branch
- Alternatives suggested
- Other branch options shown
- Transfer requests possible

## Checking Multiple Products

### Category Pages
- Browse categories with stock indicators
- Filter by availability
- See stock at a glance

### Search Results
- Stock status in search results
- Quick availability check
- Filter by stock status

## Stock Updates

### Real-Time Information
- Stock levels update throughout the day
- Reflects current branch inventory
- May change as others order

### Best Practices
- Check stock before adding to basket
- Review availability at checkout
- Consider alternatives if stock is low

## Primary Branch Stock

### Default Display
- Product pages show your primary branch stock
- Logged-in users see exact counts
- Non-logged-in users see general availability

### Branch Selection
- Change primary branch in account settings
- View stock at other branches
- Order from multiple branches

## Stock Notifications

### Coming Soon
- Set up notifications for out-of-stock items
- Receive alerts when back in stock
- Get notified of new product arrivals

## Tips

- Check stock early in the day for best availability
- Consider ordering ahead for popular items
- Contact branch for large quantity orders
- Check other branches if your branch is out of stock
    `,
    relatedSlugs: ["understanding-primary-branch", "out-of-stock-alternatives"]
  },
  {
    slug: "out-of-stock-alternatives",
    title: "Out of Stock Alternatives",
    category: "products-stock",
    excerpt: "What to do when products you need are out of stock.",
    content: `
# Out of Stock Alternatives

When products are out of stock, we offer several alternatives to help you get what you need.

## Alternative Options

### 1. Similar Products at Your Branch
- Alternative products suggested automatically
- Similar specifications and quality
- Same category and price range
- Available immediately

### 2. Same Product at Nearby Branches
- Check other branches with stock
- Available for click & collect
- Same day or next day pickup
- View branch locations on map

### 3. Transfer Requests
- Request stock transfer from other branch
- Takes 24-48 hours typically
- Contact your branch to arrange
- May incur small transfer fee

### 4. Pre-Order Options
- Reserve items for future delivery
- Guaranteed stock when available
- Contact branch for arrangements
- Useful for seasonal items

## Finding Alternatives

### Product Page
- See "Alternative Products" section
- View "Available at Other Branches"
- Click through to alternatives

### Branch Stock Check
- Check nearby branches online
- Contact branch directly
- Discuss transfer options

## Choosing the Right Alternative

### Consider:
- **Urgency**: Do you need it immediately?
- **Location**: How close is alternative branch?
- **Specifications**: Does alternative meet your needs?
- **Price**: Compare prices across options

## Transfer Requests

### How It Works
1. Contact your primary branch
2. Specify product and quantity needed
3. Branch arranges transfer from stock branch
4. Receive when transfer arrives
5. Pick up or arrange delivery

### Transfer Timeframes
- **Standard transfers**: 24-48 hours
- **Express transfers**: Available on request
- **Large quantities**: May take longer

## Pre-Orders

### When to Use
- Seasonal products
- High-demand items
- Large quantity orders
- Special requirements

### How to Arrange
- Contact your branch
- Specify product and quantity
- Agree delivery/pickup date
- Confirm pricing

## Stock Notifications

Set up alerts to:
- Get notified when out-of-stock items return
- Receive updates on alternatives
- Know when transfers arrive

## Need Help?

Contact your branch for assistance finding alternatives or arranging transfers.
    `,
    relatedSlugs: ["checking-product-availability", "stock-notifications"]
  },
  {
    slug: "stock-notifications",
    title: "Stock Notifications",
    category: "products-stock",
    excerpt: "Set up alerts for when out-of-stock products become available.",
    content: `
# Stock Notifications

Stay informed about product availability with stock notifications.

## What Are Stock Notifications?

Receive alerts when:
- Out-of-stock items return to your branch
- Low stock items are replenished
- New products arrive at your branch
- Alternative products become available

## Setting Up Notifications

### On Product Pages
1. Navigate to out-of-stock product
2. Click "Notify Me When Available"
3. Choose notification method:
   - Email notification
   - Account notification
4. Confirm notification preferences

### In Your Account
1. Go to "My Account" → "Stock Notifications"
2. View all active notifications
3. Manage notification settings
4. Add or remove notifications

## Notification Methods

### Email Notifications
- Receive email when stock arrives
- Includes product details and link
- Action directly from email

### Account Notifications
- See notifications in your account
- Dashboard notification badge
- Click through to product page

## Managing Notifications

### View Active Notifications
- See all products you're watching
- Check notification status
- View stock arrival dates

### Edit Notifications
- Change notification preferences
- Update contact details
- Modify notification frequency

### Remove Notifications
- Remove when no longer needed
- Bulk remove options
- Auto-remove when product ordered

## Notification Content

You'll receive information about:
- Product name and details
- Stock quantity available
- Branch location
- Direct link to product page

## Best Practices

### Use For:
- Frequently out-of-stock items
- Seasonal products
- Items you order regularly
- High-demand products

### Don't Forget:
- Check notifications regularly
- Act quickly when stock arrives
- Remove notifications after ordering
- Update preferences as needed

## Notification Settings

### Preferences
- Choose notification method
- Set frequency (immediate or daily digest)
- Select categories to monitor
- Set notification limits

## Tips

- Set notifications for essential products
- Act promptly when notified
- Stock may go quickly after notification
- Consider alternatives while waiting

## Need Help?

Contact support if you're not receiving notifications or need help setting them up.
    `,
    relatedSlugs: ["out-of-stock-alternatives", "checking-product-availability"]
  },
  {
    slug: "product-certifications-explained",
    title: "Product Certifications Explained",
    category: "products-stock",
    excerpt: "Understanding quality certifications and standards on our products.",
    content: `
# Product Certifications Explained

Booker products carry various certifications ensuring quality, sourcing, and ethical standards.

## Common Certifications

### Red Tractor
- **What it means**: Assured Food Standards - British farming standards
- **Covers**: Animal welfare, food safety, environmental protection
- **Products**: Meat, poultry, dairy, crops
- **Look for**: Red Tractor logo on packaging

### RSPCA Assured
- **What it means**: Higher welfare standards for farm animals
- **Covers**: Animal welfare throughout life
- **Products**: Meat, poultry, eggs
- **Look for**: RSPCA Assured label

### Organic Certification
- **What it means**: Certified organic production methods
- **Covers**: No synthetic pesticides, fertilizers, or GMOs
- **Products**: Produce, meat, dairy
- **Look for**: Organic certification logo

### British Sourced
- **What it means**: Products sourced from UK farms
- **Covers**: Origin verification
- **Products**: Various categories
- **Look for**: Union flag or "British" label

## Finding Certified Products

### On Product Pages
- Certification badges displayed
- Detailed certification information
- Filter by certification type

### Search and Filters
- Filter by certification
- Search for specific standards
- Browse certified product ranges

## Why Certifications Matter

### Quality Assurance
- Verified standards
- Regular inspections
- Traceability

### Ethical Sourcing
- Animal welfare standards
- Environmental responsibility
- Sustainable practices

### Customer Confidence
- Transparent sourcing
- Quality guarantees
- Trusted standards

## Our Commitment

Booker is committed to:
- British sourcing where possible
- High welfare standards
- Quality assurance
- Transparent certification

## Understanding Labels

### Label Information
- Certification logos
- Origin information
- Quality marks
- Production method details

### Reading Product Details
- Check product description
- View certification information
- Read packaging labels
- Contact branch for details

## Questions About Certifications?

Contact your branch or customer service for:
- Specific certification details
- Product origin information
- Certification verification
- Alternative certified options
    `,
    relatedSlugs: ["our-quality-standards", "british-sourcing-commitment"]
  },

  // Account Management
  {
    slug: "managing-account-details",
    title: "Managing Your Account Details",
    category: "account-management",
    excerpt: "How to update your account information and preferences.",
    content: `
# Managing Your Account Details

Keep your account information up to date for seamless ordering.

## Accessing Account Settings

1. Log in to your account
2. Click "My Account" in the header
3. Select "Account Settings"

## Information You Can Update

### Contact Details
- Email address
- Phone number
- Mobile number
- Contact preferences

### Business Information
- Business name
- Business address
- VAT number
- Business registration number

### Account Security
- Password
- Security questions
- Two-factor authentication (if available)

## Updating Details

### Step-by-Step
1. Go to relevant section
2. Click "Edit" or update field
3. Make your changes
4. Review and confirm
5. Save changes

### Verification
- Email changes require verification
- Some changes may require approval
- You'll receive confirmation

## Delivery Addresses

### Managing Addresses
- Add new delivery addresses
- Edit existing addresses
- Set default address
- Remove old addresses

### Address Types
- Business address (primary)
- Alternative delivery addresses
- Branch collection points

## Communication Preferences

### Email Preferences
- Order confirmations
- Marketing emails (opt-in)
- Stock notifications
- Account updates

### Notification Settings
- Stock alerts
- Order updates
- Account changes
- Promotional offers

## Security

### Password Management
- Change password regularly
- Use strong passwords
- Enable two-factor authentication if available

### Account Access
- View login history
- Manage devices
- Sign out of all devices

## Important Notes

- Some changes require verification
- Business details may need approval
- Contact support for major changes
- Keep information current

## Need Help?

Contact support if you need assistance updating your account details.
    `,
    relatedSlugs: ["changing-primary-branch", "setting-delivery-preferences"]
  },
  {
    slug: "changing-primary-branch",
    title: "Changing Your Primary Branch",
    category: "account-management",
    excerpt: "How to request a change to your primary branch location.",
    content: `
# Changing Your Primary Branch

Request to change your primary branch when your business needs change.

## What is a Primary Branch?

Your primary branch determines:
- Default stock availability display
- Main delivery branch
- Default pricing
- Account management location

## When to Change

Consider changing if:
- You've moved your business
- Another branch is more convenient
- You need different product range
- Better service at alternative branch

## How to Request Change

### Online Method
1. Log in to your account
2. Go to "Account Settings"
3. Select "Change Primary Branch"
4. Choose new branch from list
5. Submit request
6. Wait for confirmation

### Contact Method
- Phone your preferred branch
- Explain you want to change primary branch
- Provide account details
- Branch will process request

## Processing Time

- **Standard processing**: Within 24 hours
- **Complex cases**: May take 48 hours
- **You'll receive**: Email confirmation when complete

## What Happens After Change

### Immediate Effects
- Stock display updates to new branch
- New branch becomes default
- Delivery options update

### Account Access
- Account remains accessible
- Order history preserved
- Preferences maintained

## Considerations

### Before Changing
- Check branch opening hours
- Verify branch services
- Confirm delivery coverage
- Review branch location

### After Changing
- Update delivery preferences if needed
- Check stock availability at new branch
- Update any saved addresses
- Familiarize yourself with new branch

## Existing Orders

- Previous orders unaffected
- In-progress orders continue normally
- Future orders use new branch

## Need Help?

Contact your preferred branch or support team for assistance with the change.
    `,
    relatedSlugs: ["understanding-primary-branch", "managing-account-details"]
  },
  {
    slug: "setting-delivery-preferences",
    title: "Setting Delivery Preferences",
    category: "account-management",
    excerpt: "Configure your default delivery options and preferences.",
    content: `
# Setting Delivery Preferences

Set up your delivery preferences for faster checkout.

## Default Preferences

### Delivery Method
- Set default: Delivery or Click & Collect
- Apply to all orders automatically
- Change during checkout if needed

### Delivery Address
- Set primary delivery address
- Add multiple addresses
- Choose default for orders

### Time Slot Preferences
- Preferred delivery time slots
- Days of week preferences
- Avoid certain times

## Setting Preferences

### In Account Settings
1. Go to "My Account" → "Preferences"
2. Select "Delivery Preferences"
3. Configure options:
   - Default delivery method
   - Preferred time slots
   - Delivery addresses
   - Special instructions
4. Save preferences

## Default Delivery Options

### Delivery Method
- **Delivery**: Default to delivery
- **Click & Collect**: Default to collection
- **Ask each time**: Choose during checkout

### Time Slots
- Preferred time slot selection
- Multiple preferences allowed
- Flexibility maintained

## Delivery Addresses

### Managing Addresses
- Add new addresses
- Edit existing addresses
- Set default address
- Label addresses (e.g., "Main Warehouse", "Back Door")

### Using Multiple Addresses
- Select address during checkout
- Use different addresses for different orders
- Save frequently used addresses

## Special Instructions

### Default Instructions
- Add standard delivery instructions
- Access codes
- Contact person details
- Delivery location notes

### Per-Order Instructions
- Override defaults during checkout
- Add specific instructions
- Temporary changes

## Preferences Applied

### During Checkout
- Preferences pre-selected
- Can change if needed
- Saves time on frequent orders

### Order Confirmation
- Preferences shown in confirmation
- Delivery details included
- Instructions passed to driver

## Updating Preferences

### When to Update
- Business location changes
- Access requirements change
- Preferred times change
- Contact details update

### How to Update
- Edit in account settings
- Changes apply to future orders
- Previous orders unaffected

## Tips

- Set realistic time preferences
- Keep addresses current
- Add helpful delivery instructions
- Review preferences regularly

## Need Help?

Contact support if you need assistance setting up delivery preferences.
    `,
    relatedSlugs: ["delivery-areas-times", "managing-account-details"]
  },
  {
    slug: "understanding-loyalty-points",
    title: "Understanding Loyalty Points",
    category: "account-management",
    excerpt: "Learn about our loyalty points program and how to earn and redeem points.",
    content: `
# Understanding Loyalty Points

Earn rewards with every purchase through our loyalty points program.

## How Points Work

### Earning Points
- Earn points on all purchases
- Points calculated on order value
- Automatic point allocation
- Points added after order completion

### Point Value
- Points equivalent to order value percentage
- Specific earning rates may vary
- Check your account for rates
- Special promotions may offer bonus points

## Viewing Your Points

### In Your Account
- View current point balance
- See point earning history
- Check point expiration dates
- Track point redemption

### On Orders
- See points earned per order
- Total points balance
- Points available for redemption

## Redeeming Points

### How to Redeem
- Use points at checkout
- Apply to order total
- Partial redemption available
- Minimum redemption may apply

### Redemption Value
- Points convert to discount
- Specific conversion rates
- Maximum redemption per order
- Terms and conditions apply

## Point Expiration

### Expiry Policy
- Points may expire after period of inactivity
- Check expiry dates in account
- Use points before expiration
- Expiry notifications sent

## Special Promotions

### Bonus Points
- Earn extra points during promotions
- Seasonal bonus opportunities
- Category-specific bonuses
- Limited-time offers

### Double Points Days
- Special earning events
- Check for upcoming events
- Maximize earnings
- Terms apply

## Account Features

### Point History
- View earning history
- See redemption history
- Track point activity
- Export statements

### Point Notifications
- Earned points notifications
- Redemption confirmations
- Expiry reminders
- Bonus opportunity alerts

## Tips for Maximizing Points

- Order regularly to maintain balance
- Take advantage of promotions
- Use points before expiry
- Combine with other offers (if allowed)

## Terms and Conditions

- Points are non-transferable
- Terms may vary
- Check full terms in account
- Contact support for questions

## Questions?

Contact support for:
- Point balance inquiries
- Redemption help
- Promotion questions
- Account issues
    `,
    relatedSlugs: ["managing-account-details"]
  },

  // Payment & Invoicing
  {
    slug: "payment-methods",
    title: "Payment Methods",
    category: "payment-invoicing",
    excerpt: "Available payment options for your orders.",
    content: `
# Payment Methods

Booker offers flexible payment options to suit your business needs.

## Accepted Payment Methods

### Credit/Debit Cards
- Visa
- Mastercard
- American Express (where accepted)
- Secure payment processing
- Immediate payment processing

### Trade Credit Accounts
- Invoice payment terms
- Monthly statements
- Credit limits
- Payment terms vary by account

### Bank Transfer
- Direct bank transfer
- BACS payments
- Payment references required
- Processing time may vary

## Setting Payment Method

### During Checkout
1. Proceed to payment step
2. Select payment method
3. Enter payment details
4. Confirm payment
5. Complete order

### Saved Payment Methods
- Save cards for faster checkout
- Secure storage
- Easy selection
- Can remove saved methods

## Trade Credit Accounts

### Account Benefits
- Pay by invoice
- Monthly payment terms
- Credit facilities
- Statement management

### Applying for Trade Credit
- Contact your branch
- Complete application
- Credit check required
- Approval process

### Using Trade Credit
- Select "Trade Credit" at checkout
- Invoice generated
- Pay within terms
- View statements online

## Security

### Payment Security
- PCI compliant processing
- Secure encryption
- Data protection
- Fraud prevention

### Card Security
- Secure payment gateway
- No card details stored (unless saved)
- 3D Secure verification
- Transaction protection

## Payment Confirmation

### Receipts
- Email confirmation
- Order receipt
- Payment confirmation
- Invoice (for trade credit)

### Transaction Records
- View in account
- Order history
- Payment history
- Download receipts

## Refunds

### Refund Process
- Contact branch for refunds
- Processed to original payment method
- Processing time varies
- See returns policy

## Payment Issues

### If Payment Fails
- Check card details
- Verify sufficient funds
- Try alternative method
- Contact support

### Disputed Charges
- Contact branch immediately
- Provide order details
- Investigation process
- Resolution timeline

## Questions?

Contact support for payment method questions or issues.
    `,
    relatedSlugs: ["trade-credit-accounts", "understanding-your-invoice"]
  },
  {
    slug: "trade-credit-accounts",
    title: "Trade Credit Accounts",
    category: "payment-invoicing",
    excerpt: "Information about trade credit accounts and payment terms.",
    content: `
# Trade Credit Accounts

Trade credit accounts offer flexible payment terms for business customers.

## What is Trade Credit?

Trade credit allows you to:
- Order now, pay later
- Receive monthly invoices
- Manage cash flow
- Build credit relationship

## Benefits

### Payment Flexibility
- Pay by invoice
- Monthly payment terms
- Credit facilities
- Extended payment options

### Business Benefits
- Improve cash flow
- Order without immediate payment
- Build credit history
- Convenient invoicing

## Applying for Trade Credit

### Eligibility
- Business account required
- Credit check performed
- Business verification
- Terms assessment

### Application Process
1. Contact your branch
2. Complete application form
3. Provide business details
4. Credit assessment
5. Approval and setup

### Required Information
- Business registration details
- Financial references
- Trade references
- Business bank account

## Credit Limits

### Limit Assignment
- Based on credit assessment
- Business size considered
- Payment history reviewed
- Regular review possible

### Increasing Limits
- Request limit increase
- Demonstrate payment history
- Business growth consideration
- Credit review required

## Payment Terms

### Standard Terms
- Payment due dates
- Terms vary by account
- Monthly statements
- Payment methods accepted

### Payment Options
- Bank transfer (BACS)
- Cheque payment
- Card payment
- Online payment portal

## Managing Your Account

### Statements
- Monthly statements
- View online
- Download PDFs
- Email delivery

### Account Balance
- View current balance
- Outstanding invoices
- Payment history
- Credit available

### Payments
- Make payments online
- Bank transfer options
- Payment references
- Payment confirmation

## Invoicing

### Invoice Details
- Itemized orders
- Delivery charges
- VAT breakdown
- Payment terms

### Invoice Delivery
- Email invoices
- Postal delivery (if requested)
- Online access
- Download options

## Credit Management

### Payment History
- Track payments
- View outstanding
- Payment reminders
- Account status

### Credit Reviews
- Regular assessments
- Limit reviews
- Terms evaluation
- Account maintenance

## Important Information

### Payment Deadlines
- Meet payment terms
- Avoid late fees
- Maintain credit rating
- Contact if issues

### Account Status
- Active accounts
- Suspended accounts
- Payment holds
- Account closure

## Need Help?

Contact your branch or accounts team for:
- Account applications
- Credit limit questions
- Payment arrangements
- Account management
    `,
    relatedSlugs: ["payment-methods", "understanding-your-invoice"]
  },
  {
    slug: "understanding-your-invoice",
    title: "Understanding Your Invoice",
    category: "payment-invoicing",
    excerpt: "How to read and understand your Booker invoice.",
    content: `
# Understanding Your Invoice

Learn how to read and understand your Booker invoices.

## Invoice Sections

### Header Information
- Invoice number
- Invoice date
- Your account details
- Business information
- Payment terms

### Order Details
- Order number(s)
- Order date(s)
- Delivery date(s)
- Delivery method
- Branch details

### Item Breakdown
- Product descriptions
- Quantities ordered
- Unit prices
- Line totals
- Product codes/SKUs

### Charges
- Product subtotal
- Delivery charges
- Other fees
- Subtotal before VAT

### VAT Information
- VAT breakdown
- VAT rate applied
- VAT amount
- Net amounts

### Totals
- Subtotal
- VAT total
- Total amount due
- Payment terms

## Reading Your Invoice

### Line Items
Each product line shows:
- Product name and description
- Quantity ordered
- Unit of measure
- Price per unit
- Line total

### Charges Explained
- **Product charges**: Cost of products
- **Delivery charges**: £5 if order under £50, free if over
- **VAT**: Applicable VAT rate
- **Total**: Final amount due

## Payment Information

### Payment Terms
- Due date
- Payment methods
- Payment reference
- Account details

### Payment Methods
- Bank transfer details
- Payment reference number
- BACS information
- Online payment options

## VAT Breakdown

### VAT Rates
- Standard rate items
- Zero-rated items
- Reduced rate items
- VAT-exempt items

### VAT Calculation
- Net amount × VAT rate
- VAT amount shown
- Total including VAT

## Common Questions

### Invoice Discrepancies
- Check order confirmation
- Compare with order details
- Contact branch for clarification
- Request correction if needed

### Missing Invoices
- Check email inbox
- Search spam/junk
- Request resend
- Access online account

### Payment Queries
- Check payment terms
- Verify payment reference
- Confirm payment received
- Contact accounts team

## Online Invoice Access

### Viewing Invoices
- Log in to account
- Go to "Orders" section
- Select order
- View/download invoice

### Download Options
- PDF download
- Print invoice
- Email copy
- Save for records

## Record Keeping

### Best Practices
- Keep all invoices
- Organize by date
- Maintain records
- Easy retrieval

### Digital Storage
- Download PDFs
- Organize files
- Backup copies
- Long-term storage

## Need Help?

Contact your branch or accounts team for:
- Invoice questions
- Payment queries
- Discrepancies
- Account access
    `,
    relatedSlugs: ["trade-credit-accounts", "payment-methods"]
  },
  {
    slug: "returns-and-refunds",
    title: "Returns and Refunds",
    category: "payment-invoicing",
    excerpt: "Information about returning products and getting refunds.",
    content: `
# Returns and Refunds

Our returns policy ensures you're satisfied with your purchases.

## Returns Policy

### Eligibility
- Products must be returned in original condition
- Return within specified time frame
- Proof of purchase required
- Some items may be non-returnable

### Return Timeframes
- **Fresh products**: Contact within 24 hours
- **Other products**: Check specific terms
- **Damaged items**: Report immediately
- **Quality issues**: Report promptly

## Reasons for Return

### Accepted Reasons
- Product quality issues
- Damaged on delivery
- Wrong item received
- Defective products
- Freshness guarantee claims

### Quality Guarantee
- Fresh meat: 7-day minimum shelf life
- Quality standards maintained
- Full refund or replacement
- Contact within 24 hours

## How to Return

### Step 1: Contact Branch
- Call your branch directly
- Explain reason for return
- Provide order details
- Discuss return method

### Step 2: Arrange Return
- Arrange collection or drop-off
- Get return authorization
- Receive return instructions
- Note return reference

### Step 3: Return Product
- Package appropriately
- Include order details
- Return to branch
- Get confirmation

## Refund Process

### Refund Methods
- Refund to original payment method
- Credit to account
- Replacement product
- Credit note

### Refund Timeframes
- **Card refunds**: 3-5 business days
- **Account credit**: Immediate
- **Bank transfer**: 5-10 business days
- Processing time varies

## Fresh Product Returns

### Freshness Guarantee
- Contact within 24 hours
- Quality inspection
- Full refund or replacement
- Photos helpful for claims

### Handling
- Keep product refrigerated
- Don't consume if concerned
- Contact immediately
- Follow branch instructions

## Non-Returnable Items

### Items That Can't Be Returned
- Perishable items after use
- Custom orders
- Special order items
- Items outside return period

### Exceptions
- Quality issues (always accepted)
- Wrong items (always accepted)
- Damaged items (always accepted)

## Return Costs

### Who Pays?
- **Quality issues**: Branch covers costs
- **Wrong items**: Branch covers costs
- **Change of mind**: You may pay return costs
- Check with branch

## Documentation

### What You Need
- Order confirmation
- Invoice or receipt
- Product details
- Reason for return

### Keep Records
- Return authorization
- Return confirmation
- Refund confirmation
- Communication records

## Disputes

### If Unresolved
- Escalate to branch manager
- Contact customer service
- Provide evidence
- Seek resolution

## Tips

- Contact immediately with issues
- Keep products in original condition
- Provide clear reasons
- Follow branch instructions

## Need Help?

Contact your branch or customer service for return assistance.
    `,
    relatedSlugs: ["understanding-your-invoice", "payment-methods"]
  },

  // Quality & Sourcing
  {
    slug: "our-quality-standards",
    title: "Our Quality Standards",
    category: "quality-sourcing",
    excerpt: "Learn about Booker's commitment to quality and standards.",
    content: `
# Our Quality Standards

Booker is committed to providing the highest quality products for your business.

## Quality Commitment

### Our Promise
- Consistent quality standards
- Rigorous quality control
- Supplier partnerships
- Regular quality audits

### Quality Assurance
- Product testing
- Quality inspections
- Standards compliance
- Continuous improvement

## Product Standards

### Fresh Products
- Freshness guarantees
- Storage standards
- Handling procedures
- Delivery quality

### Meat Products
- Quality grading
- Freshness standards
- Storage requirements
- Shelf life management

### Produce
- Freshness standards
- Quality grading
- Storage conditions
- Shelf life guarantees

## Quality Control

### Processes
- Supplier vetting
- Quality inspections
- Product testing
- Standards monitoring

### Checks and Audits
- Regular quality checks
- Supplier audits
- Product testing
- Standards verification

## Certifications

### Standards We Meet
- Red Tractor Assurance
- RSPCA Assured
- Organic certification
- British standards

### Quality Marks
- Certification logos
- Quality badges
- Standards displayed
- Verified claims

## Freshness Guarantee

### Our Guarantee
- Minimum 7-day shelf life on fresh meat
- Quality on delivery
- Freshness standards
- Full refund if not met

### Quality Issues
- Report within 24 hours
- Immediate investigation
- Full refund or replacement
- Quality improvement

## Supplier Standards

### Supplier Requirements
- Quality standards
- Certification requirements
- Regular audits
- Partnership approach

### British Sourcing
- UK suppliers prioritized
- Local sourcing where possible
- British quality standards
- Support for UK producers

## Product Information

### Transparency
- Clear product information
- Certification details
- Origin information
- Quality indicators

### Labels and Packaging
- Clear labeling
- Quality marks
- Origin information
- Storage instructions

## Continuous Improvement

### Our Commitment
- Regular reviews
- Standards updates
- Supplier development
- Customer feedback

### Feedback
- We welcome feedback
- Quality improvement focus
- Customer input valued
- Continuous enhancement

## Quality Assurance

### For Your Business
- Consistent quality
- Reliable supply
- Trusted standards
- Quality guarantees

### Standards Maintained
- Product quality
- Service quality
- Supply chain quality
- Overall standards

## Questions?

Contact your branch or quality team for quality-related questions.
    `,
    relatedSlugs: ["british-sourcing-commitment", "product-certifications-explained"]
  },
  {
    slug: "british-sourcing-commitment",
    title: "British Sourcing Commitment",
    category: "quality-sourcing",
    excerpt: "Our commitment to sourcing British products where possible.",
    content: `
# British Sourcing Commitment

Booker is committed to supporting British producers and sourcing UK products.

## Our Commitment

### British First
- Prioritize British suppliers
- Support UK producers
- Local sourcing where possible
- British quality standards

### Sourcing Policy
- British products prioritized
- UK origin verified
- Local suppliers supported
- Regional sourcing

## Benefits of British Sourcing

### Quality
- High British standards
- Freshness advantages
- Quality assurance
- Traceability

### Support for UK
- Support British farmers
- UK economy support
- Local communities
- Sustainable sourcing

### Customer Benefits
- Fresh products
- Quality assurance
- Origin transparency
- British standards

## British Products

### Categories
- Meat and poultry
- Dairy products
- Fresh produce
- Various categories

### Identification
- Union flag labels
- "British" product badges
- Origin information
- Clear labeling

## Sourcing Information

### Product Pages
- Origin information displayed
- British sourcing indicated
- Certification details
- Source transparency

### Labels
- British origin marked
- Union flag display
- Origin verification
- Clear indication

## Our Standards

### Quality Standards
- British quality standards
- Red Tractor Assurance
- RSPCA Assured
- UK certifications

### Supplier Relationships
- Long-term partnerships
- UK supplier support
- Quality collaboration
- Sustainable relationships

## Verification

### Origin Verification
- Supply chain traceability
- Origin verification
- Certification checks
- Standards compliance

### Transparency
- Clear origin information
- Sourcing transparency
- Verification processes
- Customer information

## Supporting British

### How We Support
- British supplier priority
- Fair pricing
- Long-term contracts
- Partnership approach

### Impact
- UK farmer support
- Local economy
- British agriculture
- Community support

## Product Availability

### British Options
- Wide range available
- Various categories
- Quality British products
- Regular availability

### Finding British Products
- Filter by origin
- Look for British badges
- Check product information
- Ask branch staff

## Our Promise

### Commitment
- Continued British sourcing
- Support for UK producers
- Quality British products
- Transparent sourcing

### Future
- Expand British range
- Support UK suppliers
- Maintain commitments
- Continuous improvement

## Questions?

Contact your branch for information about British-sourced products.
    `,
    relatedSlugs: ["our-quality-standards", "product-certifications-explained"]
  },
  {
    slug: "certifications-red-tractor-rspca",
    title: "Certifications (Red Tractor, RSPCA)",
    category: "quality-sourcing",
    excerpt: "Detailed information about Red Tractor and RSPCA certifications.",
    content: `
# Certifications (Red Tractor, RSPCA)

Understanding what our certifications mean for product quality and animal welfare.

## Red Tractor Assurance

### What is Red Tractor?
Red Tractor is the UK's largest farm and food assurance scheme, covering:
- Food safety
- Animal welfare
- Environmental protection
- Traceability

### Standards Covered
- **Animal Welfare**: High welfare standards throughout life
- **Food Safety**: Rigorous safety standards
- **Environmental**: Environmental protection measures
- **Traceability**: Complete supply chain tracking

### Products Certified
- Meat and poultry
- Dairy products
- Crops and produce
- Processed foods

### How to Identify
- Red Tractor logo on packaging
- Product page certification badges
- Label information
- Certification details

## RSPCA Assured

### What is RSPCA Assured?
RSPCA Assured certifies higher animal welfare standards:
- Higher welfare standards
- RSPCA monitoring
- Regular inspections
- Welfare focus

### Standards
- **Animal Welfare**: Higher welfare requirements
- **Living Conditions**: Better housing standards
- **Handling**: Improved handling procedures
- **Life Quality**: Better quality of life

### Products Certified
- Meat products
- Poultry
- Eggs
- Dairy (where applicable)

### Identification
- RSPCA Assured logo
- Product certifications
- Label information
- Certification verification

## Why These Certifications Matter

### For Your Business
- Quality assurance
- Ethical sourcing
- Customer confidence
- Standards compliance

### For Animals
- Better welfare
- Improved conditions
- Ethical treatment
- Quality of life

### For Customers
- Quality products
- Ethical choices
- Transparency
- Trusted standards

## Finding Certified Products

### On Our Website
- Certification badges on products
- Filter by certification
- Search for certified products
- Category browsing

### Product Information
- Certification details
- Logo display
- Standards information
- Verification details

## Our Commitment

### Certification Support
- Work with certified suppliers
- Maintain certification standards
- Support certification schemes
- Promote certified products

### Standards
- Meet certification requirements
- Regular audits
- Standards compliance
- Continuous improvement

## Understanding Labels

### Label Information
- Certification logos
- Standards information
- Origin details
- Quality marks

### Verification
- Certification verification
- Standards compliance
- Regular checks
- Quality assurance

## Other Certifications

### Additional Standards
- Organic certification
- Fairtrade (where applicable)
- Other quality marks
- Industry standards

### Product Range
- Various certifications
- Different standards
- Quality options
- Choice available

## Questions?

Contact your branch for information about certified products and standards.
    `,
    relatedSlugs: ["product-certifications-explained", "our-quality-standards"]
  },
  {
    slug: "fresh-meat-handling-guide",
    title: "Fresh Meat Handling Guide",
    category: "quality-sourcing",
    excerpt: "Best practices for handling and storing fresh meat products.",
    content: `
# Fresh Meat Handling Guide

Proper handling ensures meat quality and safety.

## Receiving Meat

### On Delivery
- Check temperature on arrival
- Inspect packaging integrity
- Verify use-by dates
- Check quality immediately

### Temperature Check
- Should be cold to touch
- Packaging intact
- No signs of damage
- Report issues immediately

## Storage

### Refrigeration
- Store immediately upon receipt
- Maintain temperature below 5°C
- Use suitable storage containers
- Avoid cross-contamination

### Storage Conditions
- **Temperature**: Below 5°C
- **Packaging**: Keep original packaging
- **Location**: Dedicated meat storage
- **Separation**: Separate from other foods

### Storage Duration
- Use within use-by date
- Fresh meat: 7+ days from delivery
- Follow storage instructions
- Check dates regularly

## Handling Procedures

### Hygiene
- Wash hands before handling
- Use clean utensils
- Avoid cross-contamination
- Maintain clean surfaces

### Preparation
- Thaw properly if frozen
- Use separate cutting boards
- Clean equipment between uses
- Follow food safety guidelines

## Quality Indicators

### Fresh Meat Should
- Have good color
- Smell fresh
- Feel firm
- Have clear packaging

### Warning Signs
- Off odors
- Discoloration
- Slimy texture
- Damaged packaging

## Use-By Dates

### Understanding Dates
- Use-by: Use before date
- Best before: Quality date
- Follow dates strictly
- Don't use after date

### Shelf Life
- Minimum 7 days from delivery
- Check dates on receipt
- Plan usage accordingly
- Quality guarantee

## Temperature Control

### Critical Temperatures
- **Storage**: Below 5°C
- **Transport**: Cold chain maintained
- **Display**: If applicable, below 5°C
- **Cooking**: Appropriate temperatures

### Cold Chain
- Maintain throughout
- Minimize temperature changes
- Quick transfer from delivery
- Proper storage immediately

## Cross-Contamination Prevention

### Separation
- Store raw meat separately
- Use separate utensils
- Avoid contact with other foods
- Clean surfaces thoroughly

### Hygiene
- Wash hands frequently
- Clean equipment properly
- Use color-coded boards
- Follow food safety rules

## Quality Issues

### If Concerns
- Contact branch immediately
- Report within 24 hours
- Don't use if concerned
- Follow branch instructions

### Freshness Guarantee
- 7-day minimum shelf life
- Quality on delivery
- Report issues promptly
- Full refund if not met

## Best Practices

### Receiving
- Check on arrival
- Verify temperature
- Inspect quality
- Store immediately

### Storage
- Proper refrigeration
- Maintain temperature
- Check dates
- Rotate stock

### Handling
- Good hygiene
- Proper procedures
- Clean equipment
- Safety first

## Safety

### Food Safety
- Follow guidelines
- Maintain hygiene
- Control temperatures
- Prevent contamination

### If in Doubt
- Don't use
- Contact branch
- Seek advice
- Safety first

## Questions?

Contact your branch for handling guidance or quality concerns.
    `,
    relatedSlugs: ["our-quality-standards", "product-certifications-explained"]
  }
];

export const faqs: FAQItem[] = [
  // General
  {
    category: "general",
    question: "What's your minimum order?",
    answer: "No minimum order. Order as little or as much as you need. Delivery charges apply on orders under £50."
  },
  {
    category: "general",
    question: "Do I need a business account to order?",
    answer: "Yes, Booker is a trade-only wholesaler. You'll need to register as a business customer with valid business details."
  },
  
  // Delivery
  {
    category: "delivery",
    question: "What are your delivery times?",
    answer: "Order by 3pm for next-day delivery (Mon-Sat). Delivery time slots: 8-10am, 10am-12pm, 12-2pm, 2-4pm."
  },
  {
    category: "delivery",
    question: "How much does delivery cost?",
    answer: "Free on orders over £50. £5 delivery charge on orders under £50."
  },
  {
    category: "delivery",
    question: "Can I change my delivery after placing an order?",
    answer: "Yes, contact your branch before 3pm the day before delivery to modify delivery details."
  },
  
  // Stock & Branches
  {
    category: "stock-branches",
    question: "How do I know if a product is in stock at my branch?",
    answer: "Product pages show real-time availability at your assigned branch. Look for the green checkmark and stock count."
  },
  {
    category: "stock-branches",
    question: "What if something is out of stock at my branch?",
    answer: "We'll suggest alternatives: similar products at your branch, same product at nearby branches for pickup, or transfer requests."
  },
  {
    category: "stock-branches",
    question: "Can I collect from a branch that's not my primary branch?",
    answer: "Yes! Choose click & collect at any branch during checkout if the product is in stock there."
  },
  {
    category: "stock-branches",
    question: "Can I change my primary branch?",
    answer: "Yes, submit a request in your account settings. Changes typically process within 24 hours."
  },
  
  // Quality & Returns
  {
    category: "quality-returns",
    question: "What if I'm not satisfied with the quality?",
    answer: "We offer a freshness guarantee. Contact us within 24 hours for a full refund or replacement."
  },
  {
    category: "quality-returns",
    question: "How long does fresh meat last?",
    answer: "Our fresh meat has a minimum 7-day shelf life from delivery date. Check product labels for specific dates."
  },
  {
    category: "quality-returns",
    question: "Do you offer organic or free-range options?",
    answer: "Yes, we stock a range of organic and free-range products. Filter by 'Organic' or 'Free-range' when browsing."
  }
];

// Helper functions
export function getArticleBySlug(slug: string): HelpArticle | undefined {
  return articles.find(article => article.slug === slug);
}

export function getArticlesByCategory(category: HelpCategory): HelpArticle[] {
  return articles.filter(article => article.category === category);
}

export function getCategoryById(id: HelpCategory) {
  return categories.find(cat => cat.id === id);
}

export function getFAQsByCategory(category: FAQItem["category"]): FAQItem[] {
  return faqs.filter(faq => faq.category === category);
}

export function getAllArticles(): HelpArticle[] {
  return articles;
}

export const allFAQs: FAQItem[] = faqs;
