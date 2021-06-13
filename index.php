<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ayo</title>

        <?php
            wp_head();

            wp_footer();
        ?>
    </head>
     <body class="main">

        <main class="main">
            <header class="main">
                <img src="./wp-content/themes/theme/images/ayo.jpg" alt="Picture of Ayo.">
                <div class="spacing">
                    <h1>Hello world.<br>I am <a href="./about.html"></a>Ayo, I make stuff</h1>
                    <a class="arrow" href="#stuff">|<br>|<br>V</a>
                </div>
            </header>

            <section id="stuff" class="stuff">
                <nav class="filter">
                    <h2>Stuff</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis provident ipsum similique libero obcaecati deserunt nihil assumenda tempore voluptatibus repudiandae!</p>

                    <div class="order">
                        <label for="order">Order:</label>
                        <select id="order">
                            <option>My choise</option>
                            <option>A - Z</option>
                            <option>Z - A</option>
                            <option>Newest - Oldest</option>
                            <option>Oldest - Newest</option>
                        </select>
                    </div>

                    <nav class="category">

                        <button data-category="all">🌈 All</button>

                        <?php
                            $categories = get_categories(array('hide_empty' => FALSE));
                            foreach($categories as $category):
                        ?>
                        <button data-category="<?= $category->slug; ?>"><?= $category->name; ?></button>
                        <?php
                            endforeach;
                        ?>

                    </nav>

                </nav>

                <div class="container">

                    <?php
                        if(have_posts()):

                            while(have_posts()):
                                the_post();
                    ?>

                    <article class="stuff" data-category="<?php
                                $categories = get_the_category();
                                $last = end($categories);
                                foreach($categories as $category) {
                                    if ($category !== $last) {
                                        echo $category->slug . " ";
                                    } else {
                                        echo $category->slug;
                                    }
                                }; ?>" class="stuff">
                        <h2><?= get_the_title(); ?></h2>
                        <time><?= get_the_date(); ?></time>
                        <hr>
                        <p><?= get_the_excerpt(); ?></p>
                    </article>

                    <?php
                            endwhile;
                        endif;
                    ?>

                </div>
            </section>
        </main>

        <aside>
            <button>+</button>
            <div class="scrollbar">
                ^<br>
                |<br>
                |<br>
                |<br>
                |<br>
                V
            </div>
            <button>V</button>
        </aside>

        <?php
            get_footer();
        ?>

    </body>
</html>
