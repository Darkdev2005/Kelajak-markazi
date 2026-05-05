# Kelajak Markazi

Kelajak Markazi - qo'shimcha ta'lim markazlari uchun Laravel platforma. Loyiha to'garaklar katalogi, dars jadvali, arizalar, portfolio, tadbirlar, e'lonlar, kontakt murojaatlari va admin boshqaruv panelini o'z ichiga oladi.

## Imkoniyatlar

- Ochiq sahifa: to'garaklar, dars jadvali, tadbirlar, yangiliklar va kontakt forma
- Dashboard: o'quvchi progressi, ariza yuborish, portfolio qo'shish, yaqin jadval
- Admin panel: dastur, tadbir, e'lon, dars jadvali, ariza statusi va murojaatlar boshqaruvi
- MySQL/MariaDB asosida migration va demo seed ma'lumotlar

## MySQL sozlash

MariaDB/MySQL ichida:

```sql
CREATE DATABASE IF NOT EXISTS kelajak_markazi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'kelajak_user'@'localhost' IDENTIFIED BY 'kelajak12345';
GRANT ALL PRIVILEGES ON kelajak_markazi.* TO 'kelajak_user'@'localhost';
FLUSH PRIVILEGES;
```

## Ishga tushirish

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve --host=127.0.0.1 --port=8001
```

Brauzerda: `http://127.0.0.1:8001/#/home`

Demo admin:

- Email: `admin@kelajak.uz`
- Parol: `admin12345`

Demo mentor:

- Email: `mentor@kelajak.uz`
- Parol: `mentor12345`
