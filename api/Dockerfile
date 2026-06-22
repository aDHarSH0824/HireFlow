FROM php:8.2-apache

# Install PDO MySQL extensions for database communication
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite for custom route rewrites
RUN a2enmod rewrite

# Copy local PHP files into the container web root
COPY . /var/www/html/

# Create and grant full permissions to the resume uploads directory
RUN mkdir -p /var/www/html/uploads && chmod -R 777 /var/www/html/uploads

# Expose HTTP port
EXPOSE 80
