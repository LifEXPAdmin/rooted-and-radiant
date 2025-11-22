'use client';

import { useEffect, useState } from 'react';

export default function BeAGuest() {
  // Guest application form state
  const [guestForm, setGuestForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredContactMethod: '',
    testimonyDescription: '',
    selectedDateTimes: [{ date: '', time: '', id: `dt-${Date.now()}-init` }] as Array<{ date: string; time: string; id: string }>, // Start with one empty slot
    otherTimes: '', // For "Other" option
    consentRecording: false,
    consentAge: false,
  });
  const [guestFormStatus, setGuestFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [guestFormMessage, setGuestFormMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    // Smooth fade-in animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Add a new date/time slot
  const addDateTimeSlot = () => {
    const newId = `dt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setGuestForm({
      ...guestForm,
      selectedDateTimes: [...guestForm.selectedDateTimes, { date: '', time: '', id: newId }],
    });
  };

  // Remove a date/time slot
  const removeDateTimeSlot = (id: string) => {
    setGuestForm({
      ...guestForm,
      selectedDateTimes: guestForm.selectedDateTimes.filter((dt) => dt.id !== id),
    });
  };

  // Update a specific date/time slot
  const updateDateTimeSlot = (id: string, field: 'date' | 'time', value: string) => {
    setGuestForm({
      ...guestForm,
      selectedDateTimes: guestForm.selectedDateTimes.map((dt) =>
        dt.id === id ? { ...dt, [field]: value } : dt
      ),
    });
  };

  // Get minimum date (today) for date picker
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <>
      {/* Navigation Bar - Fixed at Top */}
      <nav className="fixed top-0 left-0 right-0 z-[90] backdrop-blur-md bg-white/30 border-b border-amber-200/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              Rooted & Radiant
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/#home" className="text-amber-900 hover:text-amber-700 transition-colors font-medium">Home</a>
              <a href="/#about" className="text-amber-900 hover:text-amber-700 transition-colors font-medium">About</a>
              <a href="/be-a-guest" className="text-amber-900 hover:text-amber-700 transition-colors font-medium">Be a Guest</a>
              <a href="/#contact" className="text-amber-900 hover:text-amber-700 transition-colors font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Guest Application Form Section */}
      <section className="py-24 sm:py-32 pt-32 sm:pt-40 bg-gradient-to-b from-amber-50/50 via-yellow-50/30 to-ivory-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              Share Your Story on Rooted & Radiant
            </h1>
            <p className="text-xl text-amber-900 text-center mb-12" style={{ fontFamily: 'serif' }}>
              Everyone has a testimony. If God has brought you through something, we'd be honored to help you share it. Fill out the form below and we'll reach out soon.
            </p>
            
            <div className="bg-white/80 rounded-lg shadow-xl p-8 sm:p-10 backdrop-blur-sm border border-amber-200/50">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  // Scroll to top on validation error
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  
                  // Collect all validation errors
                  const errors: string[] = [];
                  
                  // Validate each field individually
                  if (!guestForm.fullName || guestForm.fullName.trim() === '') {
                    errors.push('Please enter your full name');
                  }
                  
                  if (!guestForm.email || guestForm.email.trim() === '') {
                    errors.push('Please enter your email address');
                  } else if (!guestForm.email.includes('@') || !guestForm.email.includes('.')) {
                    errors.push('Please enter a valid email address');
                  }
                  
                  if (!guestForm.preferredContactMethod) {
                    errors.push('Please select your preferred contact method');
                  }
                  
                  if (!guestForm.testimonyDescription || guestForm.testimonyDescription.trim() === '') {
                    errors.push('Please share your testimony description');
                  }
                  
                  // Validate date/time selections
                  const validDateTimes = guestForm.selectedDateTimes.filter((dt) => dt.date && dt.time);
                  if (validDateTimes.length === 0 && (!guestForm.otherTimes || guestForm.otherTimes.trim() === '')) {
                    errors.push('Please select at least one date and time, or provide other availability options');
                  }
                  
                  // Check for incomplete date/time slots
                  const incompleteSlots = guestForm.selectedDateTimes.filter((dt) => (dt.date && !dt.time) || (!dt.date && dt.time));
                  if (incompleteSlots.length > 0) {
                    errors.push('Please complete all date and time fields (both date and time are required for each slot)');
                  }
                  
                  if (!guestForm.consentRecording) {
                    errors.push('Please confirm your consent for recording and sharing');
                  }
                  
                  if (!guestForm.consentAge) {
                    errors.push('Please confirm you are at least 18 years old or have parental permission');
                  }
                  
                  // If there are errors, show them and stop
                  if (errors.length > 0) {
                    setGuestFormStatus('error');
                    setValidationErrors(errors);
                    setGuestFormMessage('Please fix the following issues:');
                    return;
                  }
                  
                  // Clear any previous errors
                  setValidationErrors([]);
                  setGuestFormStatus('loading');
                  setGuestFormMessage('');

                  try {
                    const response = await fetch('/api/guest-application', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        ...guestForm,
                      }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                      setGuestFormStatus('success');
                      setGuestFormMessage(data.message || 'Thank you for sharing your story! We will reach out soon.');
                      // Reset form
                      setGuestForm({
                        fullName: '',
                        email: '',
                        phoneNumber: '',
                        preferredContactMethod: '',
                        testimonyDescription: '',
                        selectedDateTimes: [{ date: '', time: '', id: `dt-${Date.now()}-reset` }],
                        otherTimes: '',
                        consentRecording: false,
                        consentAge: false,
                      });
                      setValidationErrors([]);
                    } else {
                      setGuestFormStatus('error');
                      setValidationErrors([data.error || 'Something went wrong. Please try again.']);
                      setGuestFormMessage('Please fix the following issues:');
                    }
                  } catch (error) {
                    setGuestFormStatus('error');
                    setValidationErrors(['Something went wrong. Please try again later.']);
                    setGuestFormMessage('Please fix the following issues:');
                  }
                }}
                className="space-y-6"
              >
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-amber-900 font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={guestForm.fullName}
                    onChange={(e) => setGuestForm({ ...guestForm, fullName: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                    style={{ fontFamily: 'serif' }}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-amber-900 font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={guestForm.email}
                    onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                    style={{ fontFamily: 'serif' }}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-amber-900 font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                    Phone Number <span className="text-amber-600 text-sm">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={guestForm.phoneNumber}
                    onChange={(e) => setGuestForm({ ...guestForm, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                    style={{ fontFamily: 'serif' }}
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-3" style={{ fontFamily: 'serif' }}>
                    Preferred Contact Method <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Text message', 'Phone call', 'Email'].map((method) => (
                      <label key={method} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContactMethod"
                          value={method}
                          checked={guestForm.preferredContactMethod === method}
                          onChange={(e) => setGuestForm({ ...guestForm, preferredContactMethod: e.target.value })}
                          required
                          className="w-4 h-4 text-amber-900 focus:ring-amber-500 border-amber-300"
                        />
                        <span className="text-amber-900" style={{ fontFamily: 'serif' }}>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Testimony Description */}
                <div>
                  <label htmlFor="testimonyDescription" className="block text-amber-900 font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                    Testimony Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="testimonyDescription"
                    value={guestForm.testimonyDescription}
                    onChange={(e) => setGuestForm({ ...guestForm, testimonyDescription: e.target.value })}
                    required
                    rows={6}
                    placeholder="Please briefly share what God has brought you through..."
                    className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 resize-y"
                    style={{ fontFamily: 'serif' }}
                  />
                </div>

                {/* Specific Date & Time Selection */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                    Select Specific Dates & Times <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-amber-700 mb-3 italic" style={{ fontFamily: 'serif' }}>
                    Please select specific dates and times when you're available. You can add multiple date/time combinations. 
                    <span className="font-semibold text-amber-800"> We prefer recording podcasts on Saturdays.</span>
                  </p>

                  {/* Date/Time Slots */}
                  <div className="space-y-4 mb-4">
                    {guestForm.selectedDateTimes.map((dateTime) => (
                      <div key={dateTime.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                        <div className="flex-1">
                          <label className="block text-amber-900 text-sm mb-1" style={{ fontFamily: 'serif' }}>
                            Date
                          </label>
                          <input
                            type="date"
                            value={dateTime.date}
                            onChange={(e) => updateDateTimeSlot(dateTime.id, 'date', e.target.value)}
                            min={getMinDate()}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                            style={{ fontFamily: 'serif' }}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-amber-900 text-sm mb-1" style={{ fontFamily: 'serif' }}>
                            Time
                          </label>
                          <input
                            type="time"
                            value={dateTime.time}
                            onChange={(e) => updateDateTimeSlot(dateTime.id, 'time', e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                            style={{ fontFamily: 'serif' }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDateTimeSlot(dateTime.id)}
                          className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                          style={{ fontFamily: 'serif' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add More Date/Time Button */}
                  <button
                    type="button"
                    onClick={addDateTimeSlot}
                    className="px-4 py-2 bg-amber-100 text-amber-900 hover:bg-amber-200 rounded-lg transition-colors text-sm font-medium mb-4"
                    style={{ fontFamily: 'serif' }}
                  >
                    + Add Another Date & Time
                  </button>

                  {/* Other Times Option */}
                  <div className="mt-4">
                    <label htmlFor="otherTimes" className="block text-amber-900 font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                      Other Availability Times
                      <span className="text-sm font-normal text-amber-600"> (optional - for times not listed above, e.g., late evening)</span>
                    </label>
                    <textarea
                      id="otherTimes"
                      value={guestForm.otherTimes}
                      onChange={(e) => setGuestForm({ ...guestForm, otherTimes: e.target.value })}
                      rows={3}
                      placeholder="Please describe any other times you're available (e.g., 'Late evenings after 9pm', 'Early mornings before 7am')"
                      className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 resize-y"
                      style={{ fontFamily: 'serif' }}
                    />
                  </div>
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-4 pt-4 border-t border-amber-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guestForm.consentRecording}
                      onChange={(e) => setGuestForm({ ...guestForm, consentRecording: e.target.checked })}
                      required
                      className="mt-1 w-4 h-4 text-amber-900 focus:ring-amber-500 border-amber-300"
                    />
                    <span className="text-amber-900 text-sm" style={{ fontFamily: 'serif' }}>
                      I understand that if I am selected as a guest, my conversation may be recorded, edited, and shared publicly as part of the Rooted & Radiant podcast, including on audio platforms, YouTube, the website, and social media. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={guestForm.consentAge}
                      onChange={(e) => setGuestForm({ ...guestForm, consentAge: e.target.checked })}
                      required
                      className="mt-1 w-4 h-4 text-amber-900 focus:ring-amber-500 border-amber-300"
                    />
                    <span className="text-amber-900 text-sm" style={{ fontFamily: 'serif' }}>
                      I confirm that I am at least 18 years old, or I have permission from a parent/guardian to participate. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={guestFormStatus === 'loading'}
                    className="w-full px-8 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'serif' }}
                  >
                    {guestFormStatus === 'loading' ? 'Submitting...' : 'Submit My Application'}
                  </button>
                </div>

                {/* Status Message */}
                {guestFormMessage && (
                  <div 
                    className={`text-sm px-4 py-3 rounded-lg ${
                      guestFormStatus === 'success' 
                        ? 'text-green-800 bg-green-100' 
                        : 'text-red-800 bg-red-100'
                    }`}
                    style={{ fontFamily: 'serif' }}
                  >
                    {guestFormMessage}
                    {validationErrors.length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

