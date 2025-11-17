import { BranchDetailClient } from "./BranchDetailClient";
import branchesData from '@/data/branches.json';

export async function generateStaticParams() {
  return branchesData
    .filter((branch: any) => branch.status === 'active')
    .map((branch: any) => ({
      code: branch.branch_code,
    }));
}

export default async function BranchDetail({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const branch = branchesData.find((b: any) => b.branch_code.toUpperCase() === code.toUpperCase() && b.status === 'active');

  if (!branch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Branch Not Found</h1>
          <p className="text-gray-600">The branch you're looking for doesn't exist or is no longer active.</p>
        </div>
      </div>
    );
  }

  return <BranchDetailClient branch={branch} />;
}
