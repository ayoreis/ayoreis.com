<?php
    $version = wp_get_theme()->get('Version');

    function ayoreis_register_styles(){
        wp_enqueue_style('styles', get_template_directory_uri() . '/styles.css', array(), $version, 'all');
    }

    add_action('wp_enqueue_scripts', 'ayoreis_register_styles');



    function ayoreis_register_scripts(){
        $version = wp_get_theme()->get('Version');

        wp_enqueue_script('scripts', get_template_directory_uri() . '/filter.js', array(), $version, 'all');
    }

    add_action('wp_enqueue_scripts', 'ayoreis_register_scripts');



    function add_defer_attribute($tag, $handle) {
        $scripts_to_defer = array('scripts');

        foreach($scripts_to_defer as $defer_script) {
          if ($defer_script === $handle) {
             return str_replace(' src', ' defer src', $tag);
          }
        }
        return $tag;
    }

    add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);
?>
