import {SITE_URL} from '@/lib/site'

export default function robots() {
  return {
    rules: [
      // Allow all major Googlebots
      {
        userAgent: 'Googlebot',
        allow: [
          '/posts/',
          '/pages/',
          '/sitemap.xml',
          '/page-sitemap.xml',
          '/post-sitemap.xml',
          '/sitemap-misc.xml',
          '/llms.txt',
          '/wp-content/uploads/',
        ],
        disallow: ['/*?utm_*'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/wp-content/uploads/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/posts/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/'],
      },
      {
        userAgent: 'Google-CloudVertexBot',
        allow: ['/'],
      },
      {
        userAgent: 'Googlebot-Video',
        allow: ['/posts/', '/wp-content/uploads/'],
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: ['/posts/', '/pages/'],
      },
      {
        userAgent: 'Googlebot-Local',
        allow: ['/posts/', '/pages/'],
      },
      {
        userAgent: 'Googlebot-Smartphone',
        allow: [
          '/posts/',
          '/pages/',
          '/wp-content/uploads/',
          '/sitemap.xml',
        ],
      },

      // Allow other major search engines
      {
        userAgent: 'Bingbot',
        allow: ['/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: ['/'],
      },
      {
        userAgent: 'Slurp',
        allow: ['/'],
      },
      {
        userAgent: 'Screaming Frog SEO Spider',
        allow: ['/'],
      },

      // Allow known AI, scraping, spam & unused bots
      {
        userAgent: 'GPTBot',
        allow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/'],
      },
      {
        userAgent: 'ChatGPTBot',
        allow: ['/'],
      },
      {
        userAgent: 'Claude',
        allow: ['/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: ['/'],
      },
      {
        userAgent: 'ByteSpider',
        allow: ['/'],
      },
      {
        userAgent: 'Sogou',
        allow: ['/'],
      },
      {
        userAgent: 'AhrefsBot',
        allow: ['/'],
      },
      {
        userAgent: 'MJ12bot',
        allow: ['/'],
      },
      {
        userAgent: 'SemrushBot',
        allow: ['/'],
      },
      {
        userAgent: 'PetalBot',
        allow: ['/'],
      },
      {
        userAgent: 'DotBot',
        allow: ['/'],
      },
      {
        userAgent: 'MauiBot',
        allow: ['/'],
      },
      {
        userAgent: 'DataForSeoBot',
        allow: ['/'],
      },
      {
        userAgent: 'SEOkicks',
        allow: ['/'],
      },
      {
        userAgent: 'BLEXBot',
        allow: ['/'],
      },
      {
        userAgent: 'Twitterbot',
        allow: ['/'],
      },
      {
        userAgent: 'Discordbot',
        allow: ['/'],
      },
      {
        userAgent: 'Slackbot',
        allow: ['/'],
      },

      // Block spammy paths, admin, and injection vectors
      // Allow safe & indexable areas
      {
        userAgent: '*',
        allow: [
          '/posts/',
          '/pages/',
          '/wp-content/uploads/',
          '/robots.txt',
          '/sitemap.xml',
        ],
        disallow: [
          '/wp-admin/',
          '/wp-login.php',
          '/wp-config.php',
          '/wp-cron.php',
          '/wp-comments-post.php',
          '/wp-trackback.php',
          '/xmlrpc.php',
          '/cgi-bin/',
          '/error_logs/',
          '/logs/',
          '/scripts/',
          '/private/',
          '/backup/',
          '/wp-content/debug.log',
          '/wp-json/wp/v2/',
          '/wp-json/oembed/',
          '/wp-content/ai-generated/',
          '/wp-content/mu-plugins/',
          '/wp-content/languages/',
          '/wp-content/cache/',
          '/wp-content/upgrade/',
          '/wp-content/uploads/wpcf7_captcha/',
          '/wp-content/uploads/wpcf7_uploads/',
          '/?s=',
          '/?p=',
          '/?attachment_id=',
          '/search/',
          '/404/',
          '/author/',
          '/category/',
          '/tag/',
          '/archive/',
          '/archives/',
          '/feed/',
          '/comments/',
          '/admin/',
          '/error/',
          '/trash/',
          '/__trashed/',
          '/__trashed-*',
          '/*__trashed-*/',
          '/dev/',
          '/beta/',
          '/debug/',
          '/sandbox/',
          '/maintenance/',
          '/*?utm_source',
          '/*?utm_campaign=',
          '/*?utm_medium=',
          '/*?pk_campaign=',
          '/*?ref=',
          '/*?source=',
          '/*?tracking=',
          '/*?q=',
          '/*?preview=',
          '/*?attachment_id=',
          '/amp/',
          '/*/amp/',
          '/*/feed/',
          '/*.php$',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
