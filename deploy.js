const ghPages = require('gh-pages')

ghPages.publish(
  '.',
  {
    src: [
      'index.html',
      'assets/**',
      'dist/**',
    ]
  }
)
