<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
        }

        .main-wrapper {
            display: flex;
            height: 100vh;
            width: 100%;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 30px;
        }

        .main-links {
            margin: 0;
            list-style-type: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: -16px;
        }

        .main-links li {
            margin-right: 15px;
            margin-left: 15px;
            margin-bottom: 16px;
        }

        .main-links li:last-of-type {
            margin-right: 0;
        }

        .main-links a {
            text-decoration: none;
            font-size: 20px;
        }
    </style>
    <title>Pages</title>
</head>

<?php $home = "http://" . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']; ?>

<body>
    <div class="main-wrapper">
        <ul class="main-links">
            <li><a href="<?php echo $home; ?>main.html">Главная</a></li>
            <li><a href="<?php echo $home; ?>catalog.html">Каталог</a></li>
            <li><a href="<?php echo $home; ?>product.html">Карточка товара</a></li>
            <li><a href="<?php echo $home; ?>buy-successs.html">Корзина</a></li>
            <li><a href="<?php echo $home; ?>account.html">Личный кабинет</a></li>
            <li><a href="<?php echo $home; ?>blog.html">Блог</a></li>
            <li><a href="<?php echo $home; ?>blog-item.html">Статья блога</a></li>
            <li><a href="<?php echo $home; ?>about.html">О нас</a></li>
            <li><a href="<?php echo $home; ?>faq.html">Вопросы и ответы</a></li>
            <li><a href="<?php echo $home; ?>delivery.html">Доставка и оплата</a></li>
            <!--li-->
            <!--  a(href="/reviews.html") Отзывы-->
            <!--li-->
            <!--  a(href="/contacts.html") Контакты-->
            <!--li-->
            <!--  a(href="/error.html") 404-->
        </ul>
    </div>
</body>

</html>