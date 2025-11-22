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
      selectedDateTimes,
      otherTimes,
      consentRecording,
      consentAge,
    } = formData;

    // Validate required fields
    // Check if generalAvailability exists (could be array or string)
    const hasGeneralAvailability = Array.isArray(generalAvailability) 
      ? generalAvailability.length > 0 
      : (generalAvailability && generalAvailability.trim() !== '');
    
    if (!fullName || !email || !preferredContactMethod || !testimonyDescription || !hasGeneralAvailability || !consentRecording || !consentAge) {
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

    // Validate that generalAvailability is not empty (could be string or array)
    const generalAvailStr = Array.isArray(generalAvailability) 
      ? generalAvailability.join(', ') 
      : (generalAvailability || '');
    
    if (!generalAvailStr || generalAvailStr.trim() === '') {
      return NextResponse.json(
        { error: 'Please select at least one general availability option' },
        { status: 400 }
      );
    }

    // Validate date/time selections (check if we have at least one valid date/time or other times)
    const dateTimes = Array.isArray(selectedDateTimes) ? selectedDateTimes : [];
    const validDateTimes = dateTimes.filter((dt: any) => dt && dt.date && dt.time);
    
    const otherTimesStr = otherTimes || '';
    if (validDateTimes.length === 0 && (!otherTimesStr || otherTimesStr.trim() === '')) {
      return NextResponse.json(
        { error: 'Please select at least one date and time, or provide other availability options' },
        { status: 400 }
      );
    }

    // Format date/time slots for email
    let dateTimeSlotsText = '';
    if (validDateTimes.length > 0) {
      dateTimeSlotsText = '\nSelected Dates & Times:\n';
      validDateTimes.forEach((dt: { date: string; time: string }, index: number) => {
        try {
          const date = new Date(dt.date + 'T' + dt.time);
          const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          const timeParts = dt.time.split(':');
          const hours = parseInt(timeParts[0]);
          const minutes = timeParts[1];
          const ampm = hours >= 12 ? 'pm' : 'am';
          const displayHours = hours % 12 || 12;
          const formattedTime = `${displayHours}:${minutes} ${ampm}`;
          dateTimeSlotsText += `  ${index + 1}. ${formattedDate} at ${formattedTime}\n`;
        } catch (e) {
          // Fallback if date parsing fails
          dateTimeSlotsText += `  ${index + 1}. ${dt.date} at ${dt.time}\n`;
        }
      });
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
General Availability: ${generalAvailStr}
${dateTimeSlotsText}${otherTimes ? `\nOther Availability Times:\n${otherTimes}` : ''}

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

