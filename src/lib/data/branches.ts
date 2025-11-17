// Client-side branch data access functions

import branchesData from '@/data/branches.json';

export type Branch = typeof branchesData[0];

export function getAllBranches(): Branch[] {
  return branchesData.filter(b => b.status === 'active');
}

export function getBranchByCode(branchCode: string): Branch | null {
  const branch = branchesData.find(b => b.branch_code === branchCode.toUpperCase());
  return branch && branch.status === 'active' ? branch : null;
}

export function getBranchById(id: string): Branch | null {
  const branch = branchesData.find(b => b.id === id);
  return branch && branch.status === 'active' ? branch : null;
}

