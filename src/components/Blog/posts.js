// Central registry of blog posts.
// Add a new entry here whenever a new post is created so it shows up on /blog.

const posts = [
  {
    slug: 'gutiska-llama',
    title: 'Gutiska-LLaMA: Teaching an Open LLM to Speak a Dead Language',
    excerpt:
      "Kannada-LLaMA taught a base model a living language spoken by 44 million people. I'm attempting something with almost the opposite constraints — adapting an open LLM for Gothic, a language with zero living speakers and a corpus smaller than a single novel.",
    date: '2026-08-16',
    status: 'Work in progress',
    coverImage: '/Gothic_image.png',
    tags: ['LLMs', 'NLP', 'Historical Linguistics', 'Open Source'],
  },
];

export default posts;
