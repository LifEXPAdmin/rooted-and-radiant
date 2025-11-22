'use client';

import AudioPlayer from "@/components/AudioPlayer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const episodesRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const guestFormRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
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

  // Handle smooth scroll to guest form
  const scrollToGuestForm = () => {
    guestFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  return (
    <>
      {/* Navigation Bar - Fixed at Top */}
      <nav className="fixed top-0 left-0 right-0 z-[90] backdrop-blur-md bg-white/30 border-b border-amber-200/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              Rooted & Radiant
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-amber-900 hover:text-amber-700 transition-colors font-medium">Home</a>
              <a href="#about" className="text-amber-900 hover:text-amber-700 transition-colors font-medium">About</a>
              <a href="#contact" className="text-amber-900 hover:text-amber-700 transition-colors font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        {/* Background with soft radiant light rays */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50/30 to-ivory-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(212,175,55,0.15),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,240,220,0.2),transparent_70%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:px-8 text-center">
          {/* Tagline */}
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              Rooted & Radiant
            </h1>
            <p className="text-2xl sm:text-3xl text-amber-900 font-semibold mb-4" style={{ fontFamily: 'serif' }}>
              with Lydia McCuen
            </p>
            <p className="text-xl sm:text-2xl text-amber-800 font-medium mb-12" style={{ fontFamily: 'serif' }}>
              Where faith meets everyday life.
            </p>
          </div>

          {/* Listen On Buttons */}
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000 delay-200 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://open.spotify.com/show/1Q8RFKLaFxfergWhsHlMa0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 shadow-lg"
            >
              Listen on Spotify
            </a>
            <a
              href="https://podcasts.apple.com/podcast/YOUR_PODCAST_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 shadow-lg"
            >
              Listen on Apple Podcasts
            </a>
            <a
              href="https://www.youtube.com/@RootedandRadiantwithLydia"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all hover:scale-105 shadow-lg"
            >
              Watch on YouTube
            </a>
          </div>
          
          {/* Guest Application Button */}
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000 delay-300 mt-6">
            <button
              onClick={scrollToGuestForm}
              className="px-6 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-600 transition-all hover:scale-105 shadow-lg"
              style={{ fontFamily: 'serif' }}
            >
              Share Your Testimony – Be a Guest on the Podcast
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 sm:py-32 bg-white/50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              About
            </h2>
            <div className="space-y-6 text-lg leading-8 text-amber-900" style={{ fontFamily: 'serif' }}>
              <p>
                <strong className="text-amber-900">Rooted & Radiant</strong> is a Christian podcast 
                hosted by <strong className="text-amber-900">Lydia McCuen</strong>, created to help 
                people grow in faith, find peace in the present, and live with confidence in God who created them.
              </p>
              <p>
                Each episode explores how to stay rooted in biblical truth while becoming radiant 
                through grace, learning to walk with Jesus in the middle of real-life struggles, 
                transformation, and renewal.
              </p>
              <p>
                Lydia shares personal stories, scripture-based encouragement, and practical 
                conversations about topics like <strong className="text-amber-900">faith, transformation, 
                grace, and growth</strong>. It's a space for honest reflection, gentle guidance, and 
                powerful reminders that you don't have to be perfect to live a life that shines.
              </p>
              <p className="text-xl font-semibold text-amber-900 italic mt-8">
                So grab your coffee, take a breath, and join Lydia as she helps you grow deeper roots 
                in faith and a brighter light in spirit, one episode at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Application Form Section */}
      <section id="guest-form-section" ref={guestFormRef} className="py-24 sm:py-32 bg-gradient-to-b from-white/50 to-amber-50/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              Share Your Story on Rooted & Radiant
            </h2>
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

      {/* Latest Episode Section */}
      <section id="episodes" ref={episodesRef} className="py-24 sm:py-32 bg-gradient-to-b from-white/50 to-amber-50/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              Latest Episode
            </h2>
            
            {/* YouTube Video Embed */}
            <div className="bg-white/80 rounded-lg shadow-xl p-8 mb-12 backdrop-blur-sm border border-amber-200/50">
              <YouTubeEmbed 
                videoId="JXDSXsJ_aZc" 
                title="Rooted & Radiant - Latest Episode"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Episode List Grid - Hidden for now */}
      {/* <section className="py-24 sm:py-32 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              All Episodes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((ep) => (
                <div
                  key={ep}
                  className="bg-white/80 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 border border-amber-200/50"
                >
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-50"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-2" style={{ fontFamily: 'serif' }}>
                      Episode {ep}
                    </h3>
                    <p className="text-amber-800 mb-4" style={{ fontFamily: 'serif' }}>
                      Episode description will go here...
                    </p>
                    <a
                      href="#"
                      className="text-amber-900 font-semibold hover:text-amber-700 transition-colors"
                      style={{ fontFamily: 'serif' }}
                    >
                      Listen Now →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Newsletter/Join Section */}
      <section id="newsletter" ref={newsletterRef} className="py-24 sm:py-32 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-ivory-50">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
              Stay Rooted in Faith
            </h2>
            <p className="text-xl text-amber-900 mb-8" style={{ fontFamily: 'serif' }}>
              Get new episodes & encouragement weekly
            </p>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email || !email.includes('@')) {
                  setStatus('error');
                  setMessage('Please enter a valid email address');
                  return;
                }

                setStatus('loading');
                setMessage('');

                try {
                  const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    setStatus('success');
                    setMessage(data.message || 'Thank you for subscribing!');
                    setEmail('');
                  } else {
                    setStatus('error');
                    setMessage(data.error || 'Something went wrong. Please try again.');
                  }
                } catch (error) {
                  setStatus('error');
                  setMessage('Something went wrong. Please try again later.');
                }
              }}
              className="flex flex-col gap-4 max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                  style={{ fontFamily: 'serif' }}
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-3 bg-amber-900 text-white rounded-lg font-semibold hover:bg-amber-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'serif' }}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <p 
                  className={`text-sm px-4 py-2 rounded-lg ${
                    status === 'success' 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-red-800 bg-red-100'
                  }`}
                  style={{ fontFamily: 'serif' }}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white/80 border-t border-amber-200/50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xl font-bold mb-1" style={{ color: '#D4AF37', fontFamily: 'serif' }}>
                Rooted & Radiant
              </p>
              <p className="text-sm text-amber-800" style={{ fontFamily: 'serif' }}>
                with Lydia McCuen
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com/lydia.yoko.3" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://x.com/LydiaMcCuen" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors" aria-label="X (Twitter)">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@RootedandRadiantwithLydia" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-amber-200/50 text-center">
            <p className="text-sm text-amber-800" style={{ fontFamily: 'serif' }}>
              &copy; {new Date().getFullYear()} Rooted & Radiant. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-amber-700 flex items-center justify-center gap-1.5" style={{ fontFamily: 'serif' }}>
              Built with 
              <svg width="8" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                <rect x="13" y="2" width="6" height="28" rx="1.5" fill="#78350F" stroke="#451A03" strokeWidth="0.8"/>
                <rect x="4" y="9" width="24" height="5" rx="1.5" fill="#78350F" stroke="#451A03" strokeWidth="0.8"/>
              </svg>
              by Wyatt Works
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed Audio Player at Bottom */}
      <AudioPlayer src="/theme.mp3" title="Rooted & Radiant Theme" />
    </>
  );
}
