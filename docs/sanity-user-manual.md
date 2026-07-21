# Core Communications — Content Management & Analytics Manual

Welcome to the Content Management and Analytics Manual for the **Core Communications** website. This guide is designed specifically for non-technical users to help you edit content, manage assets, and understand website traffic using **Sanity Studio**, **Vercel**, and **Google Analytics**.

---

## 🚀 Quick Access Directory

These are the primary links to access your digital properties:

| Platform | Key Purpose | Direct Web Link | Login Requirements |
| :--- | :--- | :--- | :--- |
| **Sanity Studio** | Add, edit, or delete website pages and content. | [vnioiwzw.sanity.studio](https://vnioiwzw.sanity.studio) | Use your registered Google, GitHub, or email account. |
| **Vercel** | Monitor website health, speed, and active updates. | [vercel.com](https://vercel.com) | Access using your connected site owner account. |
| **Google Analytics** | View real-time visitor traffic and reports. | [analytics.google.com](https://analytics.google.com) | Access using your company Google account. |

---

## 🎨 1. Managing Content in Sanity Studio

Sanity Studio is your visual control panel. On the left sidebar of the screen, you will see the following three main content types that can be created, updated, or hidden:

### 🏷️ A. Client Logos
*Controls the scrolling brand logos on the homepage ticker.*

* **Client Name**: The brand name (e.g., *CyberCorp*).
* **Logo**: The image upload field.
  > [!TIP]
  > For the best visual results, upload a transparent SVG or high-resolution PNG file with even padding around the logo.
* **Website URL**: Web link to the client’s official homepage.
* **Category**: (Optional) Grouping category (e.g., *Fintech*, *Cybersecurity*, *Infrastructure*).
* **Display Order**: Numbers representing sorting sequence (e.g., `100` displays before `200`).
* **Show in Logo Showcase** (Featured Toggle):
  * **ON (True)**: Appears in the scrolling homepage ticker.
  * **OFF (False)**: Hidden from the website, but remains saved in your dashboard for future use.

---

### 📝 B. Case Studies
*Highlight APAC campaign success stories, metrics, and placements.*

* **Title**: The headline of the campaign or study.
* **Slug**: The unique web link suffix (e.g., `/work/fintech-pr-campaign`). 
  > [!NOTE]
  > Click the **Generate** button next to the field to automatically create a clean web-safe link from your title.
* **Client / Sector / Tag**: Client name, business area, and a short label (e.g., *B2B PR*) for preview cards.
* **Description**: A short summary (2 to 3 lines) explaining what the study is about.
* **Case Number**: (Optional) Display order number (e.g., `01`, `02`).
* **Kicker**: Context line displayed above the headline in small uppercase text (e.g., *CASE STUDY*).
* **Intro Line**: A prominent italicized overview sentence shown at the top of the page.
* **Detail Blocks**: Layout columns highlighting specific outcomes:
  * **Title**: Section header (e.g., *The Challenge*).
  * **Body**: Context paragraphs.
  * **Bullets**: Bulleted key highlights.
* **Milestone Blocks**: Chronological numbered cards showing sequence progress.
* **Key Outcome**: The primary result highlights and success metrics.
* **Short Result Note**: A concise italicized result summary block.
* **Media Placements**: Outlets where press coverage was achieved (e.g., `["AFR", "ABC", "TechDay"]`).
* **Stats**: Highlights key figures in visual grids:
  * **Value**: Big number (e.g., *45M+*).
  * **Label**: Description (e.g., *Audience Reach*).
* **Body Content (Simple)**: A visual text editor for standard page content paragraphs.
* **Cover Image**: The main visual banner for page headers and search previews.
* **Featured Toggle**: Turn **ON** to feature this case study prominently on the website homepage.
* **SEO Panel**: Fields for **Meta Title** and **Meta Description** to optimize search engine listings on Google.

---

### ✍️ C. Blog Posts
*Share news, media guides, and strategic B2B PR insights.*

* **Title**: The title of the article.
* **Slug**: The web address path (e.g., `/blog/b2b-pr-best-practices`). Click **Generate** to build it from the title.
* **Category**: Dropdown selector (Strategy, Media Relations, B2B PR, Digital Visibility, AI & Search, Market Insight).
* **Excerpt**: A 2-line preview card summary.
* **Author / Author Role**: Author’s name (e.g., *Bharat Joshi*) and designation.
* **Read Time**: Estimated read length (e.g., *5 min read*).
* **Story Lead**: A styled italic paragraph highlighting the narrative hook of the article.
* **Key Takeaways**: Up to 5 bullet points summarizing the main lessons.
* **Body Content**: The main article writer layout for text paragraphs, links, and inline images.
* **Cover Image**: The top banner graphic.
* **Featured Toggle**: Turn **ON** to pin this post to the top of your blog page.
* **SEO Panel**: Custom title and description properties for search engine results.

---

## ⚡ 2. Step-by-Step Publishing Workflow

Managing the lifecycle of your articles, logos, and case studies is simple:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│  Write/Edit     │ ───>  │  Saved as Draft │ ───>  │  Click Publish  │
│  Fill in fields │       │  (Only you see) │       │  (Live in secs) │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Auto-Saving**: Any change you make is saved instantly as a **Draft** in the cloud. No public visitor can see your drafts.
2. **Making it Live (Publishing)**:
   * Complete all required fields.
   * Click the green **Publish** button in the bottom-right corner.
   * The page will build and go live on your website within seconds.
3. **Hiding Content (Unpublishing)**:
   * Click the dropup arrow next to the **Publish** button.
   * Select **Unpublish**.
   * The page will be taken offline immediately (visitors will see a "Page Not Found" screen), but the draft remains safely saved in your dashboard for future edits.
4. **Permanent Removal (Deleting)**:
   * Click the dropup arrow next to the **Publish** button.
   * Select **Delete** to discard the document permanently.

---

## 🖥️ 3. Checking Website Status (Vercel)

**Vercel** is the platform hosting your website code. You do not need to log in to Vercel for daily operations, but it is useful for the following situations:

* **Site Updates**: Whenever you click **Publish** in Sanity, Vercel initiates a build. You can log in to check if the status indicator is green (**Ready**) or red (**Failed**).
* **Speed Monitoring**: Vercel monitors how quickly your site loads for visitors across Sydney, Mumbai, New Delhi, and globally.
* **Site Downtime**: If the website ever stops loading, check the Vercel dashboard to see error logs or deployment issues.

---

## 📊 4. Monitoring Traffic (Google Analytics)

**Google Analytics** tracks website activity. Log in at [analytics.google.com](https://analytics.google.com) using your associated Google account to check traffic:

* **Realtime**: View who is active on the website at this exact moment, their active page views, and geographic map locations.
* **Traffic Acquisition**: Analyze how users discover your website (e.g., organic search, direct typing, social links, or referral media articles).
* **Engagement & Pages**: Identify which case studies, blog posts, and sections receive the highest traffic and how long visitors stay on them.
* **Demographics**: Monitor which countries and cities (e.g., Sydney, Mumbai, New Delhi) your primary audience is based in.

---

## 💡 5. Guidelines for Content Editors

Follow these best practices to ensure your website remains fast, clean, and highly ranked on search engines:

> [!IMPORTANT]
> **1. Use Headings Hierarchically**
> Format headings within your text as **Heading 2** or **Heading 3**. The main article or page title is automatically formatted as Heading 1 (h1) by the system. Avoid creating duplicate Heading 1 formats inside body text, as this hurts search engine optimization (SEO).

> [!TIP]
> **2. Fill Out Alt Text for Images**
> When uploading images, always fill in the **Alt text** field with a short, descriptive sentence (e.g., *"Team photo at the Sydney office launch"*). This is crucial for accessibility tools (screen readers) and helps your images index correctly in Google Images search.

> [!NOTE]
> **3. Link Formatting**
> * For linking to pages inside your website, use relative links: `/work` or `/contact` (do not type the full domain).
> * For linking to external websites, always use the complete URL starting with `https://` (e.g., `https://www.linkedin.com`).
