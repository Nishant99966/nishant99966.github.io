/*
  BLOG POST REGISTRY
  ==================
  Add a new object to this array for every new post.
  Then create the matching HTML file inside /blog/posts/ using
  /blog/post-template.html as your starting point.

  Fields:
    slug     - filename (without .html) of your post inside /blog/posts/
    title    - post title shown on the card
    category - short label shown above the title (e.g. "Combustion", "Emissions", "Calibration")
    excerpt  - 1-2 sentence summary shown on the card
    date     - "YYYY-MM-DD" (used for sorting, newest first)
    readTime - e.g. "6 min read"
    tags     - array of strings, used for the filter buttons at the top of the blog page
*/

const BLOG_POSTS = [
  {
    slug: "volumetric-efficiency-fundamentals",
    title: "Volumetric Efficiency in IC Engines: What It Actually Tells You",
    category: "Combustion & Performance",
    excerpt: "Why volumetric efficiency is the first number I check during any calibration sweep, and how intake/exhaust tuning moves it.",
    date: "2026-07-15",
    readTime: "7 min read",
    tags: ["Combustion", "Calibration", "Performance"]
  }
  // Add your next post here, e.g.:
  // {
  //   slug: "afr-mapping-basics",
  //   title: "Air-Fuel Ratio Mapping: A Practical Walkthrough",
  //   category: "Calibration",
  //   excerpt: "...",
  //   date: "2026-08-01",
  //   readTime: "5 min read",
  //   tags: ["Calibration", "Emissions"]
  // },
];
