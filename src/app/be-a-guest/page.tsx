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
    generalAvailability: '',
    timeSlot: '',
    flexibleAvailabilityNotes: '',
    consentRecording: false,
    consentAge: false,
  });
  const [guestFormStatus, setGuestFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [guestFormMessage, setGuestFormMessage] = useState('');

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

  // Get time slot options based on availability selection
  const getTimeSlotOptions = () => {
    switch (guestForm.generalAvailability) {
      case 'Weekdays':
        return [
          '9:00 am – 11:00 am',
          '11:00 am – 1:00 pm',
          '1:00 pm – 3:00 pm',
          '3:00 pm – 5:00 pm',
        ];
      case 'Weeknights':
        return [
          '5:00 pm – 7:00 pm',
          '7:00 pm – 9:00 pm',
        ];
      case 'Weekends':
        return [
          'Saturday morning',
          'Saturday afternoon',
          'Saturday evening',
          'Sunday afternoon',
          'Sunday evening',
        ];
      default:
        return [];
    }
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
                  
                  // Validate required fields
                  if (!guestForm.fullName || !guestForm.email || !guestForm.preferredContactMethod || 
                      !guestForm.testimonyDescription || !guestForm.generalAvailability || 
                      !guestForm.consentRecording || !guestForm.consentAge) {
                    setGuestFormStatus('error');
                    setGuestFormMessage('Please fill in all required fields');
                    return;
                  }

                  // Validate email
                  if (!guestForm.email.includes('@')) {
                    setGuestFormStatus('error');
                    setGuestFormMessage('Please enter a valid email address');
                    return;
                  }

                  // Validate time slot or flexible availability notes
                  if (guestForm.generalAvailability === "I'm flexible") {
                    if (!guestForm.flexibleAvailabilityNotes || guestForm.flexibleAvailabilityNotes.trim() === '') {
                      setGuestFormStatus('error');
                      setGuestFormMessage('Please tell us about your availability');
                      return;
                    }
                  } else if (!guestForm.timeSlot) {
                    setGuestFormStatus('error');
                    setGuestFormMessage('Please select a preferred time slot');
                    return;
                  }

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
                        // Include timeSlot or flexibleAvailabilityNotes based on availability selection
                        timeSlot: guestForm.generalAvailability === "I'm flexible" ? '' : guestForm.timeSlot,
                        flexibleAvailabilityNotes: guestForm.generalAvailability === "I'm flexible" ? guestForm.flexibleAvailabilityNotes : '',
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
                        generalAvailability: '',
                        timeSlot: '',
                        flexibleAvailabilityNotes: '',
                        consentRecording: false,
                        consentAge: false,
                      });
                    } else {
                      setGuestFormStatus('error');
                      setGuestFormMessage(data.error || 'Something went wrong. Please try again.');
                    }
                  } catch (error) {
                    setGuestFormStatus('error');
                    setGuestFormMessage('Something went wrong. Please try again later.');
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

                {/* General Availability */}
                <div>
                  <label className="block text-amber-900 font-semibold mb-3" style={{ fontFamily: 'serif' }}>
                    General Availability <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Weekdays', 'Weeknights', 'Weekends', "I'm flexible"].map((availability) => (
                      <label key={availability} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="generalAvailability"
                          value={availability}
                          checked={guestForm.generalAvailability === availability}
                          onChange={(e) => {
                            setGuestForm({ 
                              ...guestForm, 
                              generalAvailability: e.target.value,
                              timeSlot: '', // Reset time slot when availability changes
                            });
                          }}
                          required
                          className="w-4 h-4 text-amber-900 focus:ring-amber-500 border-amber-300"
                        />
                        <span className="text-amber-900" style={{ fontFamily: 'serif' }}>{availability}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dynamic Time Slot Options */}
                {guestForm.generalAvailability && guestForm.generalAvailability !== "I'm flexible" && getTimeSlotOptions().length > 0 && (
                  <div>
                    <label className="block text-amber-900 font-semibold mb-3" style={{ fontFamily: 'serif' }}>
                      Preferred Time Slot <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {getTimeSlotOptions().map((slot) => (
                        <label key={slot} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="timeSlot"
                            value={slot}
                            checked={guestForm.timeSlot === slot}
                            onChange={(e) => setGuestForm({ ...guestForm, timeSlot: e.target.value })}
                            required={guestForm.generalAvailability !== "I'm flexible"}
                            className="w-4 h-4 text-amber-900 focus:ring-amber-500 border-amber-300"
                          />
                          <span className="text-amber-900" style={{ fontFamily: 'serif' }}>{slot}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flexible Availability Notes */}
                {guestForm.generalAvailability === "I'm flexible" && (
                  <div>
                    <label htmlFor="flexibleAvailabilityNotes" className="block text-amber-900 font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                      Tell us a little more about your availability <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="flexibleAvailabilityNotes"
                      value={guestForm.flexibleAvailabilityNotes}
                      onChange={(e) => setGuestForm({ ...guestForm, flexibleAvailabilityNotes: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 resize-y"
                      style={{ fontFamily: 'serif' }}
                    />
                  </div>
                )}

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

