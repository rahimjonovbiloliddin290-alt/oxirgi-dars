import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calculator,
  DollarSign,
  Calendar,
  Percent,
  PiggyBank,
  CheckCircle2,
  TrendingDown,
  Building,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function MortgageCalculator({ initialPrice = 280000, property = null }) {
  const { formatPrice, formatDualPrice, currency, setInquiryModalProperty, showToast } = useApp();

  const [mode, setMode] = useState('mortgage'); // 'mortgage' | 'installment'
  const [propertyPrice, setPropertyPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [loanTermYears, setLoanTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(14.5); // Average commercial/preferential mortgage rate
  const [installmentMonths, setInstallmentMonths] = useState(24);

  // Sync if initialPrice changes
  useEffect(() => {
    if (initialPrice) {
      setPropertyPrice(initialPrice);
    }
  }, [initialPrice]);

  // Down payment amount
  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanPrincipal = Math.max(0, propertyPrice - downPaymentAmount);

  // Bank Mortgage Calculations (Monthly Payment Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1])
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  let monthlyMortgagePayment = 0;
  if (monthlyInterestRate > 0 && totalMonths > 0 && loanPrincipal > 0) {
    const factor = Math.pow(1 + monthlyInterestRate, totalMonths);
    monthlyMortgagePayment = Math.round((loanPrincipal * (monthlyInterestRate * factor)) / (factor - 1));
  }
  const totalMortgagePayment = monthlyMortgagePayment * totalMonths;
  const totalInterestPaid = Math.max(0, totalMortgagePayment - loanPrincipal);

  // 0% Developer Installment Plan Calculations
  const monthlyInstallmentPayment = installmentMonths > 0 ? Math.round(loanPrincipal / installmentMonths) : 0;
  const totalInstallmentPaid = loanPrincipal;

  const activeMonthlyPayment = mode === 'mortgage' ? monthlyMortgagePayment : monthlyInstallmentPayment;
  const activeTotalCost = mode === 'mortgage' ? totalMortgagePayment + downPaymentAmount : propertyPrice;

  // Percentage splits for progress visual
  const principalPercent = activeTotalCost > 0 ? Math.round((propertyPrice / activeTotalCost) * 100) : 100;
  const interestPercent = 100 - principalPercent;

  const handleApplyClick = () => {
    if (property) {
      setInquiryModalProperty(property);
    } else {
      showToast('Financing pre-approval request started. Please enter your contact details.', 'info');
      setInquiryModalProperty({
        id: 'mortgage-inquiry',
        title: `Mortgage Pre-Approval for ${formatPrice(propertyPrice)}`,
        priceUSD: propertyPrice,
        location: { district: 'Tashkent City', city: 'Tashkent' },
        agent: {
          name: 'UyBozor Mortgage Desk',
          phone: '+998 71 200 88 00',
          email: 'mortgage@uybozor.uz'
        }
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors">
      {/* Header and Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Calculator className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Mortgage & Installment Calculator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time monthly installment calculations in USD and Uzbek Som (UZS).
          </p>
        </div>

        {/* Plan Mode Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setMode('mortgage')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'mortgage'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bank Mortgage
          </button>
          <button
            onClick={() => setMode('installment')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'installment'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            0% Developer Installment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price Input & Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-500" />
                Property Purchase Price
              </label>
              <div className="text-right">
                <span className="text-base font-black text-slate-900 dark:text-white">
                  {formatPrice(propertyPrice)}
                </span>
                <span className="block text-[10px] text-slate-400">
                  {formatDualPrice(propertyPrice).uzs}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="1500000"
              step="5000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>$50,000</span>
              <span>$750,000</span>
              <span>$1,500,000+</span>
            </div>
          </div>

          {/* Down Payment Slider & % */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <PiggyBank className="w-3.5 h-3.5 text-emerald-500" />
                Down Payment ({downPaymentPercent}%)
              </label>
              <div className="text-right">
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {formatPrice(downPaymentAmount)}
                </span>
                <span className="block text-[10px] text-slate-400">
                  Loan Principal: {formatPrice(loanPrincipal)}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10% (Min)</span>
              <span>25% (Standard)</span>
              <span>50%</span>
              <span>70%</span>
            </div>
          </div>

          {/* Mode-specific Sliders */}
          {mode === 'mortgage' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Loan Term in Years */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    Loan Term
                  </label>
                  <span className="text-xs font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {loanTermYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>5 yrs</span>
                  <span>15 yrs</span>
                  <span>30 yrs</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald-500" />
                    Interest Rate (APR)
                  </label>
                  <span className="text-xs font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="8.0"
                  max="24.0"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>8% (State Subsidized)</span>
                  <span>14.5%</span>
                  <span>24%</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Developer Installment duration */}
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  Direct Developer Period
                </label>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60">
                  {installmentMonths} Months (0% Interest)
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="36"
                step="6"
                value={installmentMonths}
                onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>12 mos (1 yr)</span>
                <span>24 mos (2 yrs)</span>
                <span>36 mos (3 yrs)</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Output & Breakdown Column */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="uppercase tracking-wider font-semibold">
                Estimated Monthly Payment
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                {mode === 'mortgage' ? 'Amortized' : 'Interest-Free'}
              </span>
            </div>

            {/* Monthly Number */}
            <div className="mb-4">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatPrice(activeMonthlyPayment)}
                <span className="text-sm font-semibold text-slate-400"> / month</span>
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-1">
                ≈ {formatDualPrice(activeMonthlyPayment).uzs} / month
              </p>
            </div>

            {/* Visual Amortization Bar (Principal vs Interest) */}
            <div className="mb-6 space-y-1.5">
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${principalPercent}%` }}
                  className="bg-emerald-500 h-full transition-all duration-300"
                  title={`Principal: ${principalPercent}%`}
                />
                <div
                  style={{ width: `${interestPercent}%` }}
                  className="bg-amber-500 h-full transition-all duration-300"
                  title={`Interest: ${interestPercent}%`}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Principal ({principalPercent}%)
                </span>
                {mode === 'mortgage' && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Interest ({interestPercent}%)
                  </span>
                )}
              </div>
            </div>

            {/* Financial Matrix Table */}
            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Down Payment:</span>
                <span className="font-bold text-white">{formatPrice(downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Financed Loan Principal:</span>
                <span className="font-bold text-white">{formatPrice(loanPrincipal)}</span>
              </div>
              {mode === 'mortgage' && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Interest over {loanTermYears} yrs:</span>
                  <span className="font-bold text-amber-400">{formatPrice(totalInterestPaid)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 font-semibold">Total Cost of Ownership:</span>
                <span className="font-black text-emerald-400">{formatPrice(activeTotalCost)}</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleApplyClick}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{mode === 'mortgage' ? 'Apply for Mortgage Pre-Approval' : 'Request 0% Installment Offer'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
