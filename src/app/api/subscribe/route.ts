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
    // Note: With onboarding@resend.dev (unverified domain), emails can only be sent to the account owner
    // Once domain is verified, you can send to any email. For now, sending to account owner who can forward
    // Change back to 'rooted.radiant.lydia@gmail.com' after domain verification
    const recipientEmail = process.env.RESEND_TO_EMAIL || 'mcdrew169@yahoo.com';
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
    // Using onboarding@resend.dev as fallback if domain not verified
    // Update to your verified domain once it's set up in Resend
    const fromEmail = 'Rooted & Radiant <onboarding@resend.dev>';
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: 'rooted.radiant.lydia@gmail.com',
        // Include the subscriber email in the subject so it's visible in notifications
        subject: `New Newsletter Subscription: ${email}`,
        text: message,
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Unknown error';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || 'Failed to send email';
      }
      console.error('Resend API error:', errorMessage);
      
      // Return more specific error message
      return NextResponse.json(
        { 
          error: `Failed to send email: ${errorMessage}` 
        },
        { status: 500 }
      );
    }

    const responseData = await response.json();
    console.log('Email sent successfully:', responseData);

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

