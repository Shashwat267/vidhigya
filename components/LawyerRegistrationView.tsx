
import React, { useState } from 'react';
import { Lawyer, SubscriptionTier, AppView } from '../types';
import { registerLawyer } from '../services/lawyerService';
import { BriefcaseIcon, CheckBadgeIcon, StarIcon } from './Icons';

interface LawyerRegistrationViewProps {
  isDarkMode?: boolean;
  setView: (view: AppView) => void;
}

const LawyerRegistrationView: React.FC<LawyerRegistrationViewProps> = ({ isDarkMode, setView }) => {
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
    <div className={`flex flex-col h-full overflow-y-auto transition-colors duration-500 ${isDarkMode ? 'bg-stone-950' : 'bg-legal-paper'}`}>
      <header className={`border-b p-6 md:p-8 transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        <h2 className={`text-3xl font-serif font-bold flex items-center gap-3 ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>
          <BriefcaseIcon className="text-legal-accent w-8 h-8" />
          Partner Portal
        </h2>
        <p className={`mt-2 text-lg font-light ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>
          Join Vidhigya's network. Grow your practice with India's trusted legal platform.
        </p>
      </header>

      <div className="p-6 md:p-8 max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 1 ? (isDarkMode ? 'bg-legal-accent text-stone-950' : 'bg-legal-dark text-legal-accent') : (isDarkMode ? 'bg-stone-800 text-stone-500' : 'bg-stone-200 text-stone-500')}`}>1</div>
          <div className={`w-20 h-1 transition-colors ${step >= 2 ? (isDarkMode ? 'bg-legal-accent' : 'bg-legal-dark') : (isDarkMode ? 'bg-stone-800' : 'bg-stone-200')}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 2 ? (isDarkMode ? 'bg-legal-accent text-stone-950' : 'bg-legal-dark text-legal-accent') : (isDarkMode ? 'bg-stone-800 text-stone-500' : 'bg-stone-200 text-stone-500')}`}>2</div>
          <div className={`w-20 h-1 transition-colors ${step >= 3 ? (isDarkMode ? 'bg-legal-accent' : 'bg-legal-dark') : (isDarkMode ? 'bg-stone-800' : 'bg-stone-200')}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= 3 ? (isDarkMode ? 'bg-legal-accent text-stone-950' : 'bg-legal-dark text-legal-accent') : (isDarkMode ? 'bg-stone-800 text-stone-500' : 'bg-stone-200 text-stone-500')}`}>3</div>
        </div>

        {step === 1 && (
          <div className={`p-8 rounded-2xl shadow-sm border animate-fade-in transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
            <h3 className={`text-2xl font-serif font-bold mb-6 ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Professional Profile</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-2">
                 <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Full Name</label>
                 <input name="name" value={formData.name} onChange={handleInputChange} className={`w-full p-3 border rounded-lg transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-legal-accent' : 'bg-stone-50 border-stone-200 focus:border-stone-400'}`} placeholder="e.g. Adv. Anjali Desai" />
              </div>
              <div>
                 <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Firm Name (Optional)</label>
                 <input name="firmName" value={formData.firmName} onChange={handleInputChange} className={`w-full p-3 border rounded-lg transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-legal-accent' : 'bg-stone-50 border-stone-200 focus:border-stone-400'}`} />
              </div>
              <div>
                 <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>City/Location</label>
                 <input name="location" value={formData.location} onChange={handleInputChange} className={`w-full p-3 border rounded-lg transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-legal-accent' : 'bg-stone-50 border-stone-200 focus:border-stone-400'}`} placeholder="e.g. Mumbai, Maharashtra" />
              </div>
              <div>
                 <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Years of Experience</label>
                 <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} className={`w-full p-3 border rounded-lg transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-legal-accent' : 'bg-stone-50 border-stone-200 focus:border-stone-400'}`} />
              </div>
              <div>
                 <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Contact Email</label>
                 <input name="email" value={formData.email} onChange={handleInputChange} className={`w-full p-3 border rounded-lg transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-legal-accent' : 'bg-stone-50 border-stone-200 focus:border-stone-400'}`} />
              </div>
              <div className="col-span-2">
                 <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Practice Areas (Comma separated)</label>
                 <input name="practiceAreasString" value={formData.practiceAreasString} onChange={handleInputChange} className={`w-full p-3 border rounded-lg transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-legal-accent' : 'bg-stone-50 border-stone-200 focus:border-stone-400'}`} placeholder="Civil Rights, Criminal Defense, Property Law..." />
              </div>
              <div className="col-span-2">
                 <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>Professional Bio</label>
                 <textarea name="bio" value={formData.bio} onChange={handleInputChange} className={`w-full p-3 border rounded-lg h-32 resize-none transition-colors ${isDarkMode ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-legal-accent' : 'bg-stone-50 border-stone-200 focus:border-stone-400'}`} placeholder="Tell potential clients about your expertise..." />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} className={`px-8 py-3 rounded-xl font-bold transition-all ${isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400' : 'bg-legal-dark text-white hover:bg-stone-800'}`}>Next: Select Plan</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
             <h3 className={`text-2xl font-serif font-bold mb-6 text-center ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Choose Your Tier</h3>
             <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Free Tier */}
                <div 
                  onClick={() => handleTierSelect('Free')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${formData.subscriptionTier === 'Free' ? (isDarkMode ? 'border-legal-accent bg-stone-900 shadow-xl scale-105' : 'border-stone-800 bg-white shadow-xl scale-105') : (isDarkMode ? 'border-stone-800 bg-stone-900 hover:border-stone-700' : 'border-stone-200 bg-white hover:border-stone-400')}`}
                >
                  <h4 className={`text-xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Standard</h4>
                  <p className={`text-3xl font-serif font-bold mt-2 ${isDarkMode ? 'text-stone-50' : 'text-stone-900'}`}>Free</p>
                  <ul className="mt-6 space-y-3 text-sm text-stone-600">
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-stone-400"/> Basic Directory Listing</li>
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-stone-400"/> Client Inquiries</li>
                  </ul>
                </div>

                {/* Pro Tier */}
                <div 
                  onClick={() => handleTierSelect('Pro')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${formData.subscriptionTier === 'Pro' ? (isDarkMode ? 'border-legal-accent bg-stone-800 shadow-xl scale-105' : 'border-legal-dark bg-stone-50 shadow-xl scale-105') : (isDarkMode ? 'border-stone-800 bg-stone-900 hover:border-stone-700' : 'border-stone-200 bg-white hover:border-stone-400')}`}
                >
                  <div className="text-xs font-bold text-legal-dark uppercase tracking-wide mb-2">Most Popular</div>
                  <h4 className={`text-xl font-bold ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Advocate</h4>
                  <p className={`text-3xl font-serif font-bold mt-2 ${isDarkMode ? 'text-stone-50' : 'text-stone-900'}`}>₹2,999<span className="text-sm font-sans font-normal text-stone-500">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-sm text-stone-600">
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-legal-accent"/> <b>Verified Badge</b></li>
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-legal-accent"/> Priority Search Ranking</li>
                    <li className="flex gap-2"><CheckBadgeIcon className="w-5 h-5 text-legal-accent"/> Profile Analytics</li>
                  </ul>
                </div>

                {/* Elite Tier */}
                <div 
                  onClick={() => handleTierSelect('Elite')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${formData.subscriptionTier === 'Elite' ? (isDarkMode ? 'border-legal-accent bg-stone-900 shadow-xl scale-105' : 'border-legal-accent bg-amber-50 shadow-xl scale-105') : (isDarkMode ? 'border-stone-800 bg-stone-900 hover:border-legal-accent' : 'border-stone-200 bg-white hover:border-legal-accent')}`}
                >
                   {formData.subscriptionTier === 'Elite' && <div className="absolute top-0 right-0 bg-legal-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">SELECTED</div>}
                  <h4 className="text-xl font-bold text-legal-accent">Partner</h4>
                  <p className={`text-3xl font-serif font-bold mt-2 ${isDarkMode ? 'text-stone-50' : 'text-stone-900'}`}>₹5,999<span className="text-sm font-sans font-normal text-stone-500">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-sm text-stone-700">
                    <li className="flex gap-2"><StarIcon className="w-5 h-5 text-legal-accent" filled/> <b>Top of Search Results</b></li>
                    <li className="flex gap-2"><StarIcon className="w-5 h-5 text-legal-accent" filled/> Featured on Home Page</li>
                    <li className="flex gap-2"><StarIcon className="w-5 h-5 text-legal-accent" filled/> Dedicated SEO Boost</li>
                  </ul>
                </div>
             </div>

             <div className={`flex justify-between items-center p-6 rounded-2xl border shadow-sm transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
                <div>
                   <p className={`text-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-500'}`}>Selected Plan: <span className="font-bold text-legal-accent">{formData.subscriptionTier}</span></p>
                   <p className="text-xs text-stone-400">Recurring monthly billing. Cancel anytime.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="text-stone-500 hover:text-stone-300 font-medium transition-colors">Back</button>
                  <button onClick={handleSubmit} className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform active:scale-95 ${isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400' : 'bg-legal-dark text-white hover:bg-stone-800'}`}>Complete Registration</button>
                </div>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center animate-fade-in-up py-12">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isDarkMode ? 'bg-green-950/30' : 'bg-green-100'}`}>
              <CheckBadgeIcon className="w-12 h-12 text-green-600" />
            </div>
            <h3 className={`text-4xl font-serif font-bold mb-4 ${isDarkMode ? 'text-stone-50' : 'text-legal-dark'}`}>Welcome to Vidhigya!</h3>
            <p className={`text-xl mb-8 max-w-lg mx-auto ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Your profile has been created successfully. You are now visible to clients in {formData.location}.
            </p>
            <div className={`p-6 rounded-xl border inline-block text-left mb-8 shadow-sm transition-colors ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
               <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-stone-100' : 'text-stone-900'}`}>Next Steps:</h4>
               <ul className={`list-disc pl-5 space-y-1 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                 <li>Verify your Bar Council ID (Link sent to email)</li>
                 <li>Upload a professional headshot</li>
                 <li>Complete your payment setup for the {formData.subscriptionTier} tier</li>
               </ul>
            </div>
            <div>
              <button 
                onClick={() => setView(AppView.HOME)} 
                className={`px-8 py-3 rounded-xl font-bold transition-all ${isDarkMode ? 'bg-legal-accent text-stone-950 hover:bg-amber-400' : 'bg-legal-dark text-white hover:bg-stone-800'}`}
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
