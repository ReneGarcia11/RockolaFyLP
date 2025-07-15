const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Añade esta configuración para ignorar el error de API routes
  skipTrailingSlashRedirect: true,
  experimental: {
    appDir: true,
  }
};