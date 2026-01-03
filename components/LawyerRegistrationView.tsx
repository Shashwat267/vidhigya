import React, { useState } from 'react';
import { Lawyer, SubscriptionTier } from '../types';
import { registerLawyer } from '../services/lawyerService';
import { BriefcaseIcon, CheckBadgeIcon, StarIcon } from './Icons';

const LawyerRegistrationView: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    firmName: '',
    location: '',
    email: '',
    phone: '',
    practiceAreasString: '',
    bio: '',
    yearsOfExperience: 0,
    subscriptionTier: 'Free' as SubscriptionTier
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTierSelect = (tier: SubscriptionTier) => {
    setFormData(prev => ({ ...prev, subscriptionTier: tier }));
  };

  const handleSubmit = () => {
    const success = registerLawyer({
      name: formData.name,
      firmName: formData.firmName,
      location: formData.location,
      email: formData.email,
      phone: formData.phone,
      practiceAreas: formData.practiceAreasString.split(',').map(s => s.trim()),
      bio: formData.bio,
      yearsOfExperience: Number(formData.yearsOfExperience),
      subscriptionTier: formData.subscriptionTier,
      imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
    });

    if (success) {
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col h-full bg-legal-paper overflow-y-auto">
      <header className="bg-white border-b border-stone-200 p-6 md:p-8">
        <h2 className="text-3xl font-serif font-bold text-legal-dark flex items-center gap-3">
          <BriefcaseIcon className="text-legal-accent w-8 h-8" />
          Partner Portal
        </h2>
        <p className="text-stone-500 mt-2 text-lg font-light">
          Join Vidhigya's network. Grow your practice with India's trusted legal platform.
        </p>
      </header>

      <div className="p-6 md:p-8 max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-legal-dark text-legal-accent' : 'bg-stone-200 text-stone-500'}`}>1</div>
          <div className={`w-20 h-1 ${step >= 2 ? 'bg-legal-dark' : 'bg-stone-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-legal-dark text-legal-accent' : 'bg-stone-200 text-stone-500'}`}>2</div>
          <div className={`w-20 h-1 ${step >= 3 ? 'bg-legal-dark' : 'bg-stone-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-legal-dark text-legal-accent' : 'bg-stone-200 text-stone-500'}`}>3</div>
        </div>

        {step === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 animate-fade-in">
            <h3 className="text-2xl font-serif font-bold text-legal-dark mb-6">Professional Profile</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-2">
                 <label className="block text-sm font-bold text-stone-600 mb-2">Full Name</label>
                 <input name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50" placeholder="e.g. Adv. Anjali Desai" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-stone-600 mb-2">Firm Name (Optional)</label>
                 <input name="firmName" value={formData.firmName} onChange={handleInputChange} className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-stone-600 mb-2">City/Location</label>
                 <input name="location" value={formData.location} onChange={handleInputChange} className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50" placeholder="e.g. Mumbai, Maharashtra" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-stone-600 mb-2">Years of Experience</label>
                 <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-stone-600 mb-2">Contact Email</label>
                 <input name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50" />
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-bold text-stone-600 mb-2">Practice Areas (Comma separated)</label>
                 <input name="practiceAreasString" value={formData.practiceAreasString} onChange={handleInputChange} className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50" placeholder="Civil Rights, Criminal Defense, Property Law..." />
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-bold text-stone-600 mb-2">Professional Bio</label>
                 <textarea name="bio" value={formData.bio} onChange={handleInputChange} className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50 h-32 resize-none" placeholder="Tell potential clients about your expertise..." />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} className="bg-legal-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition-all">Next: Select Plan</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
             <h3 className="text-2xl font-serif font-bold text-legal-dark mb-6 text-center">Choose Your Tier</h3>
             <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Free Tier */}
                <div 
                  onClick={() => handleTierSelect('Free')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${formData.subscriptionTier === 'Free' ? 'border-stone-800 bg-white shadow-xl scale-105' : 'border-stone-200 bg-white hover:border-stone-400'}`}
                >
                  <h4 className="text-xl font-bold text-stone-900">Standard</h4>
                  <p className="text-3xl font-serif font-bold mt-2">Free</p>
                  <ul className="mt-6 space-y-3 text-sm text-stone-600">
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-stone-400"/> Basic Directory Listing</li>
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-stone-400"/> Client Inquiries</li>
                  </ul>
                </div>

                {/* Pro Tier */}
                <div 
                  onClick={() => handleTierSelect('Pro')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${formData.subscriptionTier === 'Pro' ? 'border-legal-dark bg-stone-50 shadow-xl scale-105' : 'border-stone-200 bg-white hover:border-stone-400'}`}
                >
                  <div className="text-xs font-bold text-legal-dark uppercase tracking-wide mb-2">Most Popular</div>
                  <h4 className="text-xl font-bold text-stone-900">Advocate</h4>
                  <p className="text-3xl font-serif font-bold mt-2">₹2,999<span className="text-sm font-sans font-normal text-stone-500">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-sm text-stone-600">
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-legal-dark"/> <b>Verified Badge</b></li>
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-legal-dark"/> Priority Search Ranking</li>
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-legal-dark"/> Profile Analytics</li>
                  </ul>
                </div>

                {/* Elite Tier */}
                <div 
                  onClick={() => handleTierSelect('Elite')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${formData.subscriptionTier === 'Elite' ? 'border-legal-accent bg-amber-50 shadow-xl scale-105' : 'border-stone-200 bg-white hover:border-legal-accent'}`}
                >
                   {formData.subscriptionTier === 'Elite' && <div className="absolute top-0 right-0 bg-legal-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">SELECTED</div>}
                  <h4 className="text-xl font-bold text-legal-accent">Partner</h4>
                  <p className="text-3xl font-serif font-bold mt-2">₹5,999<span className="text-sm font-sans font-normal text-stone-500">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-sm text-stone-700">
                    <li className="flex gap-2"><StarIcon className="w-5 h-5 text-legal-accent" filled/> <b>Top of Search Results</b></li>
                    <li className="flex gap-2"><StarIcon className="w-5 h-5 text-legal-accent" filled/> Featured on Home Page</li>
                    <li className="flex gap-2"><StarIcon className="w-5 h-5 text-legal-accent" filled/> Dedicated SEO Boost</li>
                  </ul>
                </div>
             </div>

             <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div>
                   <p className="text-sm text-stone-500">Selected Plan: <span className="font-bold text-legal-dark">{formData.subscriptionTier}</span></p>
                   <p className="text-xs text-stone-400">Recurring monthly billing. Cancel anytime.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-800 font-medium">Back</button>
                  <button onClick={handleSubmit} className="bg-legal-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl transform active:scale-95">Complete Registration</button>
                </div>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-fade-in-up py-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckBadgeIcon className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-legal-dark mb-4">Welcome to Vidhigya!</h3>
            <p className="text-xl text-stone-600 mb-8 max-w-lg mx-auto">
              Your profile has been created successfully. You are now visible to clients in {formData.location}.
            </p>
            <div className="p-6 bg-white rounded-xl border border-stone-200 inline-block text-left mb-8 shadow-sm">
               <h4 className="font-bold text-stone-900 mb-2">Next Steps:</h4>
               <ul className="list-disc pl-5 text-stone-600 space-y-1">
                 <li>Verify your Bar Council ID (Link sent to email)</li>
                 <li>Upload a professional headshot</li>
                 <li>Complete your payment setup for the {formData.subscriptionTier} tier</li>
               </ul>
            </div>
            <div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-legal-accent text-legal-dark px-8 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerRegistrationView;