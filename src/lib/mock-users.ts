// Static user data for prototype

export type MockUser = {
  id: string;
  email: string;
  password: string; // Plain text for prototype only
  full_name: string;
  business_name: string;
  business_type: string;
  primary_branch_code: string;
  delivery_address: {
    line1: string;
    city: string;
    postcode: string;
  };
  contact_phone: string;
  loyalty_tier: 'bronze' | 'silver' | 'gold';
  loyalty_points: number;
};

export const MOCK_USERS: MockUser[] = [
  {
    id: 'user-test-001',
    email: 'test@booker.com',
    password: 'Test123!',
    full_name: 'Sarah Bailey',
    business_name: 'The Red Lion Restaurant',
    business_type: 'restaurant',
    primary_branch_code: 'MAN001',
    delivery_address: {
      line1: '123 Test Street',
      city: 'Manchester',
      postcode: 'M1 1AA',
    },
    contact_phone: '07000 123456',
    loyalty_tier: 'silver',
    loyalty_points: 850,
  },
  {
    id: 'user-goldenspoon-001',
    email: 'orders@goldenspoonrest.co.uk',
    password: 'Password123!',
    full_name: 'James Mitchell',
    business_name: 'The Golden Spoon Restaurant',
    business_type: 'restaurant',
    primary_branch_code: 'MAN001',
    delivery_address: {
      line1: '15 High Street',
      city: 'Manchester',
      postcode: 'M1 4HT',
    },
    contact_phone: '07000 111111',
    loyalty_tier: 'silver',
    loyalty_points: 1200,
  },
];

// Load registered users from localStorage (for new registrations)
function getRegisteredUsers(): MockUser[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('mock_users');
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Get all users (static + registered)
export function getAllUsers(): MockUser[] {
  const registered = getRegisteredUsers();
  // Merge static users with registered users, avoiding duplicates
  const allUsers = [...MOCK_USERS];
  registered.forEach(regUser => {
    if (!allUsers.find(u => u.email === regUser.email)) {
      allUsers.push(regUser);
    }
  });
  return allUsers;
}

export function getUserByEmail(email: string): MockUser | null {
  // Check static users first
  const staticUser = MOCK_USERS.find(u => u.email === email);
  if (staticUser) return staticUser;
  
  // Check registered users
  if (typeof window !== 'undefined') {
    const registered = getRegisteredUsers();
    return registered.find(u => u.email === email) || null;
  }
  
  return null;
}

export function getUserById(id: string): MockUser | null {
  // Check static users first
  const staticUser = MOCK_USERS.find(u => u.id === id);
  if (staticUser) return staticUser;
  
  // Check registered users
  if (typeof window !== 'undefined') {
    const registered = getRegisteredUsers();
    return registered.find(u => u.id === id) || null;
  }
  
  return null;
}

