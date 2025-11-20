# Email Setup

The subscribe form adds contacts to your MailerLite account.

## Environment variables

Create a `.env.local` file (already added locally) with:

```
MAILERLITE_API_KEY=your-mailerlite-api-key
MAILERLITE_GROUP_ID=your-mailerlite-group-id
```

> In production (Vercel), add the same variables under Project → Settings → Environment Variables.

## MailerLite configuration steps

1. **Create a group** – In MailerLite go to **Subscribers → Groups → Add new group**. The API adds subscribers to this group.
2. **Generate an API token** – Account settings → Integrations → Developer API → “Generate new token”. Copy this key; you’ll only see it once.
3. **Find the Group ID** – Run the following command in a terminal, replacing `YOUR_API_KEY` with the token from step 2. The JSON response contains your group’s `id`:

   ```bash
   curl -X GET \
     https://api.mailerlite.com/api/v2/groups \
     -H "X-MailerLite-ApiKey: YOUR_API_KEY"
   ```

4. **Update environment variables** – Put the API key and group id into `.env.local` (development) and Vercel project settings (production).
5. **Redeploy** – Once the variables are set, redeploy the site so the new values take effect.

## API behaviour

- Successful subscription returns a success message.
- If an email address is already on the list, MailerLite returns `409 Conflict`; the API treats this as success and tells the user they’re already subscribed.
- Any other MailerLite API error is logged and returned as a friendly message to the user.

The subscribe form now posts to `/api/subscribe`, which forwards the request to MailerLite using the values above.

