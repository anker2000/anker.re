<?
$currentPage = str_replace("/swt/app/top-aligned/","",$_SERVER['REQUEST_URI']);
if ($currentPage=="" || $currentPage == "index.php") {
	$footerClass="scanner";
}
if ($currentPage=="planning.php") {
	$footerClass = "tickets";
}
if ($currentPage=="schedule.php") {
	$footerClass = "tickets";
}
if ($currentPage=="helper-page.php") {
	$footerClass = "helper";
}
if ($currentPage=="profile.php") {
	$footerClass="profile";
}
?><footer class="bottom_nav">
	<ul class="<?php echo($footerClass); ?>">
		<li><a href="index.php">Scanner</a></li>
		<li><a href="planning.php">Tickets</a></li>
		<li><a href="profile.php">My account</a></li>
		<li><a href="helper-page.php">Helper</a></li>
	</ul>
</footer>