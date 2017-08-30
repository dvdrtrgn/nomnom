<?php
/**
 * Search & Filter Pro 
 *
 * Sample Results Template
 * 
 * @package   Search_Filter
 * @author    Ross Morsali
 * @link      http://www.designsandcode.com/
 * @copyright 2015 Designs & Code
 * 
 * Note: these templates are not full page templates, rather 
 * just an encaspulation of the your results loop which should
 * be inserted in to other pages by using a shortcode - think 
 * of it as a template part
 * 
 * This template is an absolute base example showing you what
 * you can do, for more customisation see the WordPress docs 
 * and using template tags - 
 * 
 * http://codex.wordpress.org/Template_Tags
 *
 */

if ( $query->have_posts() )
{
	?>
		
	<div class="possible-card-wrapper">
	<?php
	while ($query->have_posts())
	{
		$query->the_post();
		
		?>
		<div class="possible-card">
            <img src="<?php the_field('photo'); ?>" />
<?php

/*
*  Displaying a single value's Label
*/

$field = get_field_object('field_57acb9988c6f1');
$value = get_field('area_of_interest');
$label = $field['choices'][ $value ];

?>
<div class="p-card-meta">
<p style="margin: 5px 0;"><?php echo $label; ?></p>
	<div class="p-card-actions">
		<?php echo do_shortcode('[rating-system-posts-disable-dislike]'); ?>

		<?php
		$card_description = get_field('description');
		$button_link = '<a class="share_button" href="mailto:gareth.lewis-pitt@wellsfargo.com'
			. '?subject=Inappropriate%20content%20in%20post:%20Community%20Support%20Campaign'
			. '&body=I%20consider%20content%20in%20this%20post%20to%20be%20inappropriate:%0A%0ACommunity%20Support%20Campaign:%0A' . esc_attr($card_description) . '%0A%0A[ADD%20REASON%20HERE]' . '">Report</a>';

		?>

		<?php echo $button_link; ?>

	</div><!--p-card-actions-->
</div><!--p-card-meta-->
		</div><!--possible-card-->
		
		<?php
	}
	?>
    </div><!--possible-card-wrapper-->
	
	<?php
}
else
{
	echo "No Results Found";
}
?>