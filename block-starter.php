<?php

/**
 * Plugin Name:       block-starter
 * Description:       Starter project for building WordPress blocks.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      8.1
 * Author:            Kevin Batdorf
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-starter
 *
 * @package kevinbatdorf
 */

defined('ABSPATH') or die;

add_action('init', function () {
	register_block_type(__DIR__ . '/build');
	wp_set_script_translations('kevinbatdorf/block-starter', 'block-starter');
});
