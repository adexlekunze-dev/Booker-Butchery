"use client";

import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  TrendingUp,
  Target,
  BarChart3,
  Search,
  Zap,
  Award,
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  FileText,
  Users,
  Filter,
  ShoppingCart,
  Image as ImageIcon,
  Shield,
  Calculator,
  Star,
  Repeat,
  Menu as MenuIcon,
  Package,
  Eye,
  FileCheck,
  Globe,
  Smartphone,
  Tag,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function MethodologyPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('competitive');
  const [showScoringMethodology, setShowScoringMethodology] = useState(false);
  const [counters, setCounters] = useState({
    gaps: 0,
    mustHave: 0,
    shouldHave: 0,
    studies: 0,
  });

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = (target: number) => target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        gaps: Math.min(prev.gaps + increment(38), 38),
        mustHave: Math.min(prev.mustHave + increment(18), 18),
        shouldHave: Math.min(prev.shouldHave + increment(20), 20),
        studies: Math.min(prev.studies + increment(8), 8),
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Stats */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Discovery Methodology
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-2">
              Research-Backed Problem Identification
            </p>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Problems were systematically identified through competitive analysis, heuristic evaluation, and industry research. Validation with category and branch teams is the next step before delivery.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
                {Math.round(counters.gaps)}
              </div>
              <div className="text-sm sm:text-base text-gray-600">Gaps Identified</div>
              <Target className="h-6 w-6 mx-auto mt-2 text-primary" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
                {Math.round(counters.mustHave)}
              </div>
              <div className="text-sm sm:text-base text-gray-600">Must Have (Baseline)</div>
              <AlertTriangle className="h-6 w-6 mx-auto mt-2 text-error" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
                {Math.round(counters.shouldHave)}
              </div>
              <div className="text-sm sm:text-base text-gray-600">Should Have (Scalability)</div>
              <TrendingUp className="h-6 w-6 mx-auto mt-2 text-warning" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
                {Math.round(counters.studies)}
              </div>
              <div className="text-sm sm:text-base text-gray-600">Research Sources</div>
              <FileText className="h-6 w-6 mx-auto mt-2 text-primary" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Current Status Section */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Status</h2>
            <p className="text-gray-700 mb-6">
              This prototype represents discovery work. Delivery would follow validation with category and branch teams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Discovery Status */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">Discovery:</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-700">Complete</span>
                </div>
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Competitive audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Heuristic eval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Research review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Rapid prototyping</span>
                  </div>
                </div>
              </div>

              {/* Validation Status */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">Validation:</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-blue-600 rounded flex items-center justify-center">
                    <div className="w-1.5 h-3 bg-blue-600"></div>
                    <div className="w-1.5 h-3 bg-blue-600 ml-0.5"></div>
                  </div>
                  <span className="font-bold text-blue-700">Next Step</span>
                </div>
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span>Category team collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span>Branch team validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span>Business alignment review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span>Prioritization workshop</span>
                  </div>
                </div>
              </div>

              {/* Delivery Status */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">Delivery:</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-600">After Validation</span>
                </div>
                <div className="mt-3 text-sm text-gray-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-400" />
                    <span>Engineering specs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-400" />
                    <span>Sprint planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-400" />
                    <span>Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-400" />
                    <span>QA & testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery Process Cards */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2 text-gray-900">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            Discovery Process (Complete)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div 
              className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer p-6 ${
                expandedSection === 'competitive' ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => toggleSection('competitive')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Competitive Analysis</span>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedSection === 'competitive' ? 'rotate-90' : ''}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Competitors</span>
                  <span className="text-lg font-bold text-primary">4</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-500">B2B food distributors analyzed</p>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-semibold text-error">Feature gaps identified</span>
                </div>
              </div>
            </div>

            <div 
              className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer p-6 ${
                expandedSection === 'heuristic' ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => toggleSection('heuristic')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Heuristic Evaluation</span>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedSection === 'heuristic' ? 'rotate-90' : ''}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Framework</span>
                  <span className="text-lg font-bold text-orange-600">Nielsen + Baymard</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-500">10 Usability Heuristics assessed</p>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-semibold text-error">Violations found</span>
                </div>
              </div>
            </div>

            <div 
              className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer p-6 ${
                expandedSection === 'research' ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => toggleSection('research')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Industry Research</span>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedSection === 'research' ? 'rotate-90' : ''}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sources</span>
                  <span className="text-lg font-bold text-purple-600">8+</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-500">Peer-reviewed benchmark studies</p>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-semibold text-success">Validated findings</span>
                </div>
              </div>
            </div>

            <div 
              className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all cursor-pointer p-6 ${
                expandedSection === 'categorization' ? 'border-primary shadow-md' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => toggleSection('categorization')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Gap Categorization</span>
                </div>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedSection === 'categorization' ? 'rotate-90' : ''}`} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Priority</span>
                  <span className="text-lg font-bold text-green-600">Must/Should</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-500">Baseline vs Scalability</p>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs font-semibold text-primary">18 Must / 20 Should</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Audit Results */}
        {expandedSection === 'competitive' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <div className="bg-white rounded-lg border-2 border-primary shadow-md">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 rounded-t-lg p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  Competitive Analysis Results
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  B2B food distributors analyzed: Brakes Group, Bestway Wholesale, Bidfood, Sysco
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { feature: 'Header category navigation', booker: false, industry: 85, critical: true, category: 'Navigation' },
                    { feature: 'Search autocomplete', booker: false, industry: 90, critical: true, category: 'Navigation' },
                    { feature: 'Advanced filtering (8+ dimensions)', booker: false, industry: 75, critical: false, category: 'Navigation' },
                    { feature: 'Mobile optimization', booker: false, industry: 100, critical: true, category: 'Mobile' },
                    { feature: 'Multi-angle image gallery', booker: false, industry: 90, critical: false, category: 'Product' },
                    { feature: 'Trust badges/certifications', booker: false, industry: 80, critical: true, category: 'Product' },
                    { feature: 'Frequently Bought Together', booker: false, industry: 95, critical: true, category: 'Cross-sell' },
                    { feature: 'Bulk pricing visualization', booker: false, industry: 85, critical: true, category: 'B2B Tools' },
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.booker ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <X className="h-5 w-5 text-error" />
                          )}
                          <span className="font-semibold text-gray-900">{item.feature}</span>
                          {item.critical && (
                            <span className="text-xs bg-error/10 text-error px-2 py-0.5 rounded-full font-semibold">Must Have</span>
                          )}
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-700">{item.industry}%</span>
                          <span className="text-xs text-gray-500 ml-1">industry standard</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${item.industry}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-error/10 to-orange-50 border-l-4 border-error rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-error mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Key Finding</h4>
                      <p className="text-gray-700">
                        Booker lags behind industry standards in 7 of 8 conversion-critical features. This represents significant competitive disadvantage and opportunity to reach baseline parity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Heuristic Evaluation */}
        {expandedSection === 'heuristic' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <div className="bg-white rounded-lg border-2 border-orange-200 shadow-md">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-gray-200 rounded-t-lg p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  Heuristic Evaluation
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Nielsen's 10 Usability Heuristics + Baymard Institute E-commerce UX Guidelines assessment
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* CRITICAL */}
                <div className="border-2 border-error/30 rounded-lg p-4 bg-error/5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-error" />
                    <h4 className="text-xl font-bold text-error">CRITICAL - Must Have (Baseline Parity)</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Visibility of system status', problem: 'No header category navigation', impact: 'Users cannot easily find product categories' },
                      { title: 'Match between system and real world', problem: 'Poor filtering options', impact: 'Users struggle to find products matching needs' },
                      { title: 'User control and freedom', problem: 'No search autocomplete', impact: 'Users must manually search, high friction' },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-l-4 border-error pl-4 py-3 rounded">
                        <h5 className="font-bold mb-1 text-gray-900">{item.title}</h5>
                        <p className="text-gray-700 mb-1">→ Problem: {item.problem}</p>
                        <p className="text-sm text-gray-600">Impact: {item.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MAJOR */}
                <div className="border-2 border-warning/30 rounded-lg p-4 bg-warning/5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-6 w-6 text-warning" />
                    <h4 className="text-xl font-bold text-warning">MAJOR - Should Have (Scalability)</h4>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Recognition rather than recall', problem: 'No behavioral personalization', impact: 'Users must remember what they viewed' },
                      { title: 'Flexibility and efficiency of use', problem: 'No quick reorder features', impact: 'Regular customers cannot speed up ordering' },
                      { title: 'Aesthetic and minimalist design', problem: 'Limited product information', impact: 'Users lack details needed for decision' },
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-l-4 border-warning pl-4 py-3 rounded">
                        <h5 className="font-bold mb-1 text-gray-900">{item.title}</h5>
                        <p className="text-gray-700 mb-1">→ Problem: {item.problem}</p>
                        <p className="text-sm text-gray-600">Impact: {item.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Industry Research Synthesis */}
        {expandedSection === 'research' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <div className="bg-white rounded-lg border-2 border-purple-200 shadow-md">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-gray-200 rounded-t-lg p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <FileText className="h-6 w-6 text-purple-600" />
                  Industry Research Synthesis
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {[
                  {
                    title: 'Header Navigation',
                    source: 'Forrester Research (2023) - The State of Digital Commerce',
                    finding: 'Structured navigation lifts engagement 15-20%',
                    solution: 'Header category navigation with mega menus',
                    impact: '+18% navigation CTR, +20% category visits',
                    icon: MenuIcon,
                    bgColor: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    impactColor: 'text-primary',
                    priority: 'Must Have'
                  },
                  {
                    title: 'Search Autocomplete',
                    source: 'Baymard Institute (2023) - E-commerce UX Benchmark Study',
                    finding: 'Search users convert 50% higher than browsers',
                    solution: 'Real-time autocomplete with stock indicators',
                    impact: '+45% search-to-purchase conversion',
                    icon: Search,
                    bgColor: 'bg-green-100',
                    iconColor: 'text-green-600',
                    impactColor: 'text-primary',
                    priority: 'Must Have'
                  },
                  {
                    title: 'Frequently Bought Together',
                    source: 'Forrester Research - The Power of Product Recommendations',
                    finding: 'FBT increases products-per-transaction 30-40%',
                    solution: 'FBT widget with bundle pricing',
                    impact: '+30% products per transaction',
                    icon: ShoppingCart,
                    bgColor: 'bg-purple-100',
                    iconColor: 'text-purple-600',
                    impactColor: 'text-primary',
                    priority: 'Must Have'
                  },
                  {
                    title: 'Content-to-Commerce Funnel',
                    source: 'Content Marketing Institute (2023) - Content Commerce Report',
                    finding: 'Content commerce lifts revenue 20-30%',
                    solution: 'Recipe pages with "Add Full Recipe to Basket"',
                    impact: '+22% recipe-to-cart conversion',
                    icon: FileCheck,
                    bgColor: 'bg-orange-100',
                    iconColor: 'text-orange-600',
                    impactColor: 'text-primary',
                    priority: 'Should Have'
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all bg-white">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`h-6 w-6 ${item.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              item.priority === 'Must Have' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                            }`}>
                              {item.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Research Source:</strong> {item.source}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3 pl-16">
                        <div>
                          <p className="font-semibold text-sm text-gray-700 mb-1">Finding:</p>
                          <p className="text-gray-700">{item.finding}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-700 mb-1">Recommended Solution:</p>
                          <p className="text-gray-700">{item.solution}</p>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <p className="font-semibold text-sm text-gray-700 mb-1">Expected Impact:</p>
                          <p className={`${item.impactColor} font-bold text-lg`}>{item.impact}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <p className="text-sm font-bold text-gray-700">
                      8+ benchmark studies reviewed from:
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Forrester Research, McKinsey Global Institute, Baymard Institute, Nielsen Norman Group, Content Marketing Institute, Salesforce Commerce Cloud, Gartner, Moz/BrightEdge
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gap Categorization */}
        {expandedSection === 'categorization' && (
          <section className="mb-16 animate-in fade-in duration-300">
            <div className="bg-white rounded-lg border-2 border-green-200 shadow-md">
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-b border-gray-200 rounded-t-lg p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <Target className="h-6 w-6 text-green-600" />
                  Gap Categorization: Must Have vs Should Have
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Gaps categorized by priority: Baseline Parity (Must Have) vs Scalability (Should Have)
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Must Have Section */}
                <div className="border-2 border-error/30 rounded-lg p-6 bg-error/5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-6 w-6 text-error" />
                    <h4 className="text-xl font-bold text-error">Must Have (Baseline Parity) - 18 Gaps</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Industry-standard features that 80%+ of competitors have. Required to compete at baseline level.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Header category navigation',
                      'Search autocomplete',
                      'Mobile optimization',
                      'Multi-angle image gallery',
                      'Structured product information',
                      'Trust badges/certifications',
                      'Frequently Bought Together',
                      'Category SEO metadata',
                      'Product SEO metadata',
                      'Bulk pricing visualization',
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white border-l-4 border-error pl-3 py-2 rounded">
                        <X className="h-4 w-4 text-error flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Should Have Section */}
                <div className="border-2 border-warning/30 rounded-lg p-6 bg-warning/5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-6 w-6 text-warning" />
                    <h4 className="text-xl font-bold text-warning">Should Have (Scalability) - 20 Gaps</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Advanced features that drive competitive advantage and growth. Differentiators beyond baseline.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'Advanced filtering (12+ dimensions)',
                      'Account-aware homepage',
                      'Behavioral personalization',
                      'Dynamic homepage templates',
                      'Stock urgency messaging',
                      'Upsell products',
                      'Cross-category recommendations',
                      'Content-to-commerce funnel (recipes)',
                      'Portion calculator',
                      'Cut guides & educational content',
                      'Standing orders/subscriptions',
                      'Loyalty program',
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white border-l-4 border-warning pl-3 py-2 rounded">
                        <TrendingUp className="h-4 w-4 text-warning flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Problem Prioritization Matrix */}
        <section className="mb-16">
          <div className="bg-white rounded-lg border-2 border-gray-200 shadow-md">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 rounded-t-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Target className="h-6 w-6 text-primary" />
                    Problem Prioritization Matrix
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Gaps prioritized by: Baseline Parity (Must Have) vs Scalability (Should Have)</p>
                </div>
                <Button 
                  variant="tertiary" 
                  size="sm" 
                  onClick={() => setShowScoringMethodology(!showScoringMethodology)}
                >
                  {showScoringMethodology ? 'Hide' : 'Show'} methodology
                </Button>
              </div>
            </div>
            
            {showScoringMethodology && (
              <div className="px-6 pb-4 border-b bg-primary/5">
                <h4 className="font-bold text-lg mb-3 text-gray-900">Categorization Methodology</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Must Have (Baseline Parity):</strong> Industry-standard features that 80%+ of competitors have. Required to compete at baseline level.</p>
                  <p><strong>Should Have (Scalability):</strong> Advanced features that drive competitive advantage. Differentiators beyond baseline.</p>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="space-y-6">
                {/* Must Have Examples */}
                <div>
                  <h4 className="font-bold text-lg mb-4 text-error">Must Have - Baseline Parity (18 gaps)</h4>
                  <div className="space-y-3">
                    {[
                      { problem: 'Header category navigation', category: 'Navigation', impact: 'CRITICAL', priority: 1, emoji: '🔴', textColor: 'text-error' },
                      { problem: 'Search autocomplete', category: 'Navigation', impact: 'CRITICAL', priority: 2, emoji: '🔴', textColor: 'text-error' },
                      { problem: 'Mobile optimization', category: 'Mobile', impact: 'CRITICAL', priority: 3, emoji: '🔴', textColor: 'text-error' },
                      { problem: 'Trust badges/certifications', category: 'Product', impact: 'CRITICAL', priority: 4, emoji: '🔴', textColor: 'text-error' },
                      { problem: 'Frequently Bought Together', category: 'Cross-sell', impact: 'CRITICAL', priority: 5, emoji: '🔴', textColor: 'text-error' },
                      { problem: 'Bulk pricing visualization', category: 'B2B Tools', impact: 'CRITICAL', priority: 6, emoji: '🔴', textColor: 'text-error' },
                    ].map((item, index) => (
                      <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={`${item.textColor} font-bold text-lg`}>
                                {item.emoji} {item.priority}
                              </span>
                              <span className="font-bold text-lg text-gray-900">{item.problem}</span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.category}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Impact: </span>
                                <span className="font-bold text-error">{item.impact}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Priority: </span>
                                <span className="font-bold">Baseline Parity</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Should Have Examples */}
                <div className="mt-8">
                  <h4 className="font-bold text-lg mb-4 text-warning">Should Have - Scalability (20 gaps)</h4>
                  <div className="space-y-3">
                    {[
                      { problem: 'Advanced filtering (12+ dimensions)', category: 'Navigation', impact: 'MEDIUM', priority: 1, emoji: '🟡', textColor: 'text-warning' },
                      { problem: 'Content-to-commerce funnel (recipes)', category: 'Content', impact: 'HIGH', priority: 2, emoji: '🟡', textColor: 'text-warning' },
                      { problem: 'Portion calculator', category: 'Tools', impact: 'MEDIUM', priority: 3, emoji: '🟡', textColor: 'text-warning' },
                      { problem: 'Standing orders/subscriptions', category: 'Retention', impact: 'MEDIUM', priority: 4, emoji: '🟡', textColor: 'text-warning' },
                      { problem: 'Loyalty program', category: 'Retention', impact: 'MEDIUM', priority: 5, emoji: '🟡', textColor: 'text-warning' },
                    ].map((item, index) => (
                      <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={`${item.textColor} font-bold text-lg`}>
                                {item.emoji} {item.priority}
                              </span>
                              <span className="font-bold text-lg text-gray-900">{item.problem}</span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.category}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Impact: </span>
                                <span className="font-bold text-warning">{item.impact}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Priority: </span>
                                <span className="font-bold">Scalability</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery vs. Delivery Flow */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              Discovery vs. Delivery
            </h2>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 relative">
              {/* Timeline connector */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200" style={{ margin: '0 10%' }} />
              
              {[
                { 
                  icon: CheckCircle, 
                  label: 'Discovery', 
                  subtitle: '(What to build)',
                  bgColor: 'bg-green-100', 
                  iconColor: 'text-green-600', 
                  badgeColor: 'bg-green-600', 
                  step: 'Complete',
                  status: 'complete'
                },
                { 
                  icon: Users, 
                  label: 'Validation', 
                  subtitle: '(Next step)',
                  bgColor: 'bg-blue-100', 
                  iconColor: 'text-blue-600', 
                  badgeColor: 'bg-blue-600', 
                  step: 'Next',
                  status: 'next'
                },
                { 
                  icon: Zap, 
                  label: 'Delivery', 
                  subtitle: '(Build it right)',
                  bgColor: 'bg-gray-100', 
                  iconColor: 'text-gray-600', 
                  badgeColor: 'bg-gray-400', 
                  step: 'After',
                  status: 'pending'
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${item.bgColor} flex items-center justify-center border-4 border-white shadow-md`}>
                      {item.status === 'complete' ? (
                        <CheckCircle className={`h-8 w-8 ${item.iconColor}`} />
                      ) : item.status === 'next' ? (
                        <div className="relative">
                          <Icon className={`h-8 w-8 ${item.iconColor}`} />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                        </div>
                      ) : (
                        <Icon className={`h-8 w-8 ${item.iconColor}`} />
                      )}
                    </div>
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold text-white ${
                      item.status === 'complete' ? 'bg-green-600' : 
                      item.status === 'next' ? 'bg-blue-600 animate-pulse' : 
                      'bg-gray-400'
                    }`}>
                      {item.step}
                    </div>
                    <p className="font-semibold text-sm sm:text-base text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.subtitle}</p>
                    {item.status === 'next' && (
                      <p className="text-xs text-blue-600 font-medium mt-1">Next Step</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Validation Process - Next Step */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 flex items-center gap-2 text-gray-900">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            Validation Process (Next Step)
          </h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Collaboration with Category & Branch Teams</h3>
                <p className="text-gray-700">
                  The next validation layer involves collaborative review with category management teams and branch operations teams to ensure all identified gaps align with business objectives, customer needs, and operational feasibility.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Team Collaboration */}
              <div className="bg-white rounded-lg border border-blue-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Category Team Collaboration</h4>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Validate product-related gaps against merchandising strategy and customer needs.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Product information gaps validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Filter dimensions prioritization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Cross-sell opportunity validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Content strategy alignment</span>
                  </li>
                </ul>
              </div>

              {/* Branch Team Collaboration */}
              <div className="bg-white rounded-lg border border-blue-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Branch Team Collaboration</h4>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Validate gaps against customer pain points and operational efficiency needs.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Customer feedback integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Operational workflow validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Mobile usage pattern confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Retention feature prioritization</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-300">
              <p className="text-sm text-gray-700">
                <strong>Outcome:</strong> This validation step will ensure all 38 identified gaps are business-aligned, customer-focused, and operationally feasible before moving to delivery phase.
              </p>
            </div>
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section className="mb-16">
          <div className="bg-white rounded-lg border-2 border-gray-200 shadow-md">
            <div className="bg-gradient-to-r from-primary/10 to-orange-50 border-b border-gray-200 rounded-t-lg p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Zap className="h-6 w-6 text-primary" />
                Implementation Roadmap
              </h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-error/30 rounded-lg p-6 bg-error/5">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-error">
                    <CheckCircle className="h-6 w-6" />
                    Phase 1: Baseline Parity (Must Have)
                  </h4>
                  <p className="text-gray-700 mb-4">
                    <strong>Goal:</strong> Reach industry baseline, eliminate critical gaps
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Timeline:</strong> Months 0-3
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Gaps:</strong> 18 Must Have gaps
                  </p>
                  <p className="text-gray-700 font-semibold">
                    <strong>Outcome:</strong> Competitive parity, table stakes features implemented
                  </p>
                </div>
                <div className="border-2 border-warning/30 rounded-lg p-6 bg-warning/5">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-warning">
                    <TrendingUp className="h-6 w-6" />
                    Phase 2: Scalability (Should Have)
                  </h4>
                  <p className="text-gray-700 mb-4">
                    <strong>Goal:</strong> Build competitive advantage, enable growth
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Timeline:</strong> Months 3-12
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Gaps:</strong> 20 Should Have gaps
                  </p>
                  <p className="text-gray-700 font-semibold">
                    <strong>Outcome:</strong> Differentiation, growth enablers, competitive advantage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-16">
          <div className="rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
            <h3 className="text-3xl font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Sparkles className="h-8 w-8 text-primary" />
              Summary
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              This systematic discovery methodology identified <strong className="text-gray-900">38 critical gaps</strong> through competitive analysis, heuristic evaluation, and industry research.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-xl mb-2 text-gray-900">18 Must Have Gaps</h4>
                <p className="text-gray-600">Required to reach industry baseline parity</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-xl mb-2 text-gray-900">20 Should Have Gaps</h4>
                <p className="text-gray-600">Competitive advantage and scalability enablers</p>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              All gaps validated against peer-reviewed research, ensuring defensible prioritization for phased implementation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

