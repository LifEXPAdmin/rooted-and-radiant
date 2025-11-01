import { NextRequest, NextResponse } from 'next/server';

const MAILERLITE_API_URL = 'https://api.mailerlite.com/api/v2';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID;

    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      console.error('MailerLite environment variables are missing.');
      return NextResponse.json(
        {
          error:
            'Subscription service is not configured. Please try again later.',
        },
        { status: 500 }
      );
    }

    const mailerLiteResponse = await fetch(
      `${MAILERLITE_API_URL}/groups/${MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
        },
        body: JSON.stringify({
          email,
          resubscribe: true,
          type: 'active',
        }),
      }
    );

    if (mailerLiteResponse.status === 409) {
      return NextResponse.json(
        {
          success: true,
          message: 'You are already subscribed. Thank you!',
        },
        { status: 200 }
      );
    }

    if (!mailerLiteResponse.ok) {
      let errorMessage = 'Unknown error';
      try {
        const errorData = await mailerLiteResponse.json();
        errorMessage =
          errorData?.error?.message || errorData?.message || JSON.stringify(errorData);
      } catch {
        const errorText = await mailerLiteResponse.text();
        errorMessage = errorText || 'Failed to subscribe';
      }

      console.error('MailerLite API error:', errorMessage);

      return NextResponse.json(
        {
          error: `Failed to subscribe: ${errorMessage}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing! Please check your email for updates soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}
