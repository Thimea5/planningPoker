<?php 
   $matters = getMatters();
?>

<h1 class="title">MySpace</h1> 

<script>
    let matters = <?php echo json_encode($matters); ?> 
    let myMatterWidget = new MatterWidget(matters);
</script>