import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const {
      fullName,
      email,
      phoneNumber,
      preferredContactMethod,
      testimonyDescription,
      generalAvailability,
      timeSlot,
      flexibleAvailabilityNotes,
      consentRecording,
      consentAge,
    } = formData;

    // Validate required fields
    if (!fullName || !email || !preferredContactMethod || !testimonyDescription || !generalAvailability || !consentRecording || !consentAge) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate time slot or flexible availability notes
    if (generalAvailability === "I'm flexible") {
      if (!flexibleAvailabilityNotes || flexibleAvailabilityNotes.trim() === '') {
        return NextResponse.json(
          { error: 'Please provide availability details' },
          { status: 400 }
        );
      }
    } else {
      if (!timeSlot || timeSlot.trim() === '') {
        return NextResponse.json(
          { error: 'Please select a preferred time slot' },
          { status: 400 }
        );
      }
    }

    // Format the email body
    const emailBody = `
New Guest Application - Rooted & Radiant Podcast

CONTACT INFORMATION:
Full Name: ${fullName}
Email: ${email}
Phone: ${phoneNumber || 'Not provided'}
Preferred Contact Method: ${preferredContactMethod}

AVAILABILITY:
General Availability: ${generalAvailability}
${generalAvailability === "I'm flexible" 
  ? `Additional Notes: ${flexibleAvailabilityNotes}` 
  : `Selected Time Slot: ${timeSlot}`}

TESTIMONY:
${testimonyDescription}

CONSENT:
- Recording/Sharing Consent: ${consentRecording ? 'Yes' : 'No'}
- Age/Parental Consent: ${consentAge ? 'Yes' : 'No'}

---
Submitted on: ${new Date().toLocaleString()}
    `.trim();

    // Send email using a simple service
    // Option 1: Using Resend (requires RESEND_API_KEY environment variable)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      // Using Resend API
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Rooted & Radiant <noreply@rooted-and-radiant.wyatt-works.com>',
          to: 'rooted.radiant.lydia@gmail.com',
          replyTo: email,
          subject: `New Guest Application from ${fullName}`,
          text: emailBody,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json();
        console.error('Resend API error:', errorData);
        throw new Error('Failed to send email via Resend');
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for sharing your story! We will reach out soon.',
        },
        { status: 200 }
      );
    }

    // Option 2: Fallback to FormSubmit (simple but limited)
    // This is a simple fallback if Resend is not configured
    const formSubmitResponse = await fetch('https://formsubmit.co/ajax/rooted.radiant.lydia@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: fullName,
        email: email,
        phone: phoneNumber || '',
        message: emailBody,
        _subject: `New Guest Application from ${fullName}`,
        _captcha: false,
      }),
    });

    if (!formSubmitResponse.ok) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for sharing your story! We will reach out soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Guest application error:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}

