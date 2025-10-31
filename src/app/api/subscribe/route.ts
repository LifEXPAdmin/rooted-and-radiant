import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send email notification
    const recipientEmail = 'rooted.radiant.lydia@gmail.com';
    const subject = 'New Newsletter Subscription';
    const message = `
      New subscription to Rooted & Radiant newsletter:
      
      Email: ${email}
      Date: ${new Date().toLocaleString()}
    `;

    // Use Resend API to send email
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      // Fallback: If Resend is not configured, log the subscription
      console.log('New subscription:', email);
      console.log('To enable email sending, add RESEND_API_KEY to environment variables');
      
      // Still return success so the user sees a confirmation
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for subscribing! Your email has been recorded.' 
        },
        { status: 200 }
      );
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Rooted & Radiant <newsletter@rooted-and-radiant.wyatt-works.com>',
        to: [recipientEmail],
        subject: subject,
        text: message,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for subscribing! You will receive updates via email.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

