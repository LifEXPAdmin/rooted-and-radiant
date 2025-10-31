# Domain Setup: rooted-and-radiant.wyatt-works.com

## Steps to Configure the Custom Domain

### 1. Add Domain in Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `rooted-and-radiant` project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `rooted-and-radiant.wyatt-works.com`
6. Click **Add**

Vercel will show you the DNS configuration you need.

### 2. Configure DNS in Squarespace

Since `wyatt-works.com` is managed through Squarespace, you'll need to add a CNAME record:

**In Squarespace:**
1. Go to **Settings** → **Domains** → **wyatt-works.com**
2. Click **DNS Settings** (or **Advanced DNS**)
3. Add a new CNAME record:
   - **Type:** CNAME
   - **Host:** `rooted-and-radiant` (or `rooted-and-radiant.wyatt-works.com` depending on Squarespace's format)
   - **Points to:** `cname.vercel-dns.com` (Vercel will provide the exact value)
   - **TTL:** 3600 (or default)

**OR** if Squarespace doesn't allow CNAME for subdomains, you may need to:
- Add an A record pointing to Vercel's IP addresses (Vercel will provide these)
- Or contact Squarespace support to set up the subdomain

### 3. SSL Certificate

Vercel automatically provisions SSL certificates for your domain. This usually takes a few minutes after DNS propagation.

### 4. Verify Domain

After adding the domain in Vercel, you'll see:
- **Pending:** Waiting for DNS verification
- **Valid:** Domain is connected and SSL is active
- **Invalid:** DNS records need to be corrected

### 5. Propagation Time

DNS changes can take:
- **Immediate to 1 hour:** Most cases
- **Up to 48 hours:** In rare cases

You can check DNS propagation at: https://www.whatsmydns.net/

### Important Notes

- The domain `rooted-and-radiant.wyatt-works.com` is already configured in the Next.js metadata
- Once DNS is set up, Vercel will automatically handle SSL certificates
- Your site will be accessible at both:
  - `rooted-and-radiant.wyatt-works.com`
  - The default Vercel domain (e.g., `rooted-and-radiant.vercel.app`)

## Troubleshooting

If the domain doesn't work after 24 hours:
1. Verify DNS records match what Vercel shows in the dashboard
2. Check DNS propagation status
3. Ensure no conflicting records exist in Squarespace
4. Contact Squarespace support if you need help with subdomain configuration

