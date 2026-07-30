# Client Admin Guide — Blog Lead Gate & Leads Dashboard

Welcome to your **Core Communications Client Admin Guide**. This document explains how the newly added **Blog Lead Capture Gate**, **Downloadable Guides**, **Automated Email Notifications**, and **Admin Leads Dashboard** work, and how you can view and export reader leads.

---

## 🌟 Overview of New Features

1. **Gated Blog Lead Form (`Name`, `Email`, `Phone`)**:
   - Readers browsing your blog posts (`/blogs/[slug]`) can preview the introductory article text.
   - To read the full blog article or access downloadable resources, readers submit their **Full Name**, **Business Email**, and **Phone Number**.
   - Readers' unlock state is automatically saved in their browser (`localStorage`), so returning readers do not have to re-enter details repeatedly.

2. **Downloadable PDFs & Curated Links**:
   - Blog posts can include downloadable whitepapers/PDFs and curated external reading links.
   - Downloadable resources are revealed to readers after unlocking the blog lead gate.

3. **Auto-Hyperlinking for URLs & Emails**:
   - Any website URL (e.g. `www.corecommunication.biz`, `https://...`) or email address (e.g. `contact@corecommunication.biz`) typed inside blog articles or bullet points automatically converts into a prominent, green-styled clickable link.

4. **Real-time Email Notifications (Resend API)**:
   - Whenever a reader submits the lead form, an instant notification email containing their Name, Email, Phone Number, and Article Title is delivered straight to your inbox.

5. **Secure Admin Leads Dashboard (`/admin`)**:
   - A dedicated, password-protected portal to search, filter, view, and export all captured lead records.

---

## 🔑 How to Access the Admin Leads Dashboard

### Step 1: Open the Admin URL
In your web browser, navigate to either of the following URLs:
- **`https://www.corecommunication.biz/admin`**
- **`https://www.corecommunication.biz/admin/leads`**

*(For local development: `http://localhost:3000/admin`)*

---

### Step 2: Enter the Security Passcode
When you open the page, you will be greeted by the **Admin Security Access** lock screen.

1. In the **Security Passcode** input field, enter the default passcode:
   ```text
   core2026
   ```
2. Click the green **"ACCESS LEAD DASHBOARD →"** button.

> 💡 **Customizing Your Security Passcode:**
> The passcode is controlled by the environment variable `ADMIN_PASSCODE` in your website configuration (`.env.local`). You can update this passcode anytime to any custom password you prefer.

---

## 📊 Features inside the Admin Dashboard

Once authenticated, your dashboard presents all captured reader leads with real-time statistics:

### 1. Summary Cards
- **Total Leads**: Total number of leads captured across all blog posts.
- **Unique Readers**: Verified count of unique email addresses.
- **Latest Activity**: Timestamp of the most recent lead submission.

### 2. Live Search & Filtering
- Use the search bar at the top of the table to instantly filter leads by:
  - Reader Full Name
  - Email Address
  - Phone Number
  - Blog Article Title

### 3. One-Click CSV Export
- Click the **"Export CSV"** button in the top-right header.
- Your browser will automatically download a `.csv` file (e.g. `blog_leads_2026-07-26.csv`) containing all lead records, perfect for importing into Microsoft Excel, Google Sheets, or your CRM system (HubSpot, Salesforce, Mailchimp).

### 4. Direct Follow-Up Actions
- Click **Email Lead** next to any record to open your email client pre-filled with the reader's email address and article subject line.
- Click any reader phone number to trigger click-to-call on mobile or computer dialers.

### 5. Lock Dashboard (Logout)
- When you are finished reviewing leads, click the red **"Lock"** button in the top right header to instantly clear credentials and lock access.

---

## 📝 How to Add Downloadable Guides & Links in Sanity Studio

To attach downloadable PDFs or reading links to blog posts:

1. Log into your **Sanity Studio** at **`https://www.corecommunication.biz/studio`** (or `http://localhost:3333`).
2. Go to **Blog Posts** and open any post.
3. Scroll down to the **Downloadable Resources & Guides** section and click **Add Item**:
   - **Upload File Directly**: Click **Select / Drop file** under `Upload File Directly` to upload any PDF, Whitepaper, Word Doc, or ZIP file straight from your computer.
   - **Or External Link / Google Drive URL**: Alternatively, paste any direct URL or Google Drive share link (e.g. `drive.google.com/file/d/.../view`). The website automatically formats Google Drive links into instant direct downloads for your readers.
   - **Resource Title**: Enter the name of the guide (e.g. *"Crisis Communications Playbook"*).
   - **File Size / Format Label**: Optional (e.g. `"PDF • 2.4 MB"`). If left blank, the website automatically detects and displays the file format and size for you!
4. Scroll down to **Useful Links & Further Reading**:
   - Click **Add Item** to add external reading links with a label, URL, and brief description.
5. Click **Publish**.

---

## 🛡️ Troubleshooting & Maintenance

### Sanity Studio Network Errors (`isNetworkError: true`)
If you or a client encounter a network error when uploading images or publishing blog posts in Sanity Studio:

1. **CORS Origins**: Ensure all custom domains (`https://www.corecommunication.biz`, `https://corecommunication.biz`, `https://core-communications-studio.vercel.app`) are listed in Sanity's CORS Whitelist (`npx sanity cors list`). *(We have pre-authorized all primary production and studio domains with credentials).*
2. **Optimize High-Res Image Uploads**: Large infographic PNGs (over 10-15 MB) can time out on slower internet connections. Try compressing high-res infographics to WebP or optimized PNG before uploading.
3. **Ad-Blockers / Privacy Extensions**: Disable ad-blockers (e.g. uBlock Origin, Brave Shields) for the Sanity Studio domain, as security tools can occasionally block API mutation tags (`?tag=sanity.studio.document.commit`).
4. **Refresh Session**: Log out of Sanity Studio and log back in to renew session security credentials.

---

## 🛡️ Data Backup & Security Notice

- **Persistent Backup**: Lead records are stored securely in both server storage (`data/leads.json`) and emailed via Resend, ensuring zero loss of lead records even during server updates or offline periods.
- **Privacy & Compliance**: Lead data is accessible exclusively to authorized team members possessing the security passcode.

---

*Core Communications Admin Documentation — Updated July 2026*
