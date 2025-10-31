# Email Setup for Newsletter Subscription

The subscribe button sends emails to `rooted.radiant.lydia@gmail.com` when someone subscribes.

## Option 1: Using Resend (Recommended for Production)

1. Sign up for a free account at [Resend](https://resend.com)
2. Create an API key
3. Add it to Vercel environment variables:
   - Go to your Vercel project → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = your API key
   - Redeploy the site

## Option 2: Using Nodemailer with Gmail (Free)

If you prefer using Gmail directly, we can update the API route to use nodemailer with Gmail SMTP. This requires:
- A Gmail App Password (not your regular password)
- Environment variables for Gmail credentials

Would you like me to set this up?

## Current Setup

The API route is at `/api/subscribe` and:
- Validates the email address
- Sends a notification email to `rooted.radiant.lydia@gmail.com`
- Shows success/error messages to the user
- Works even without Resend configured (logs to console)

## Testing

To test the subscription form:
1. Enter an email address
2. Click Subscribe
3. You should see a success message
4. Check `rooted.radiant.lydia@gmail.com` for the notification email

Note: Without Resend configured, subscriptions will be logged to the console. For production, add the Resend API key.

