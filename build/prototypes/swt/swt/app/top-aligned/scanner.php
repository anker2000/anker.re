	<!DOCTYPE html>
	<html>
	<head>
		<title>SWTrains</title>
		<meta charset="UTF-8">
		<link href='http://fonts.googleapis.com/css?family=Roboto:700,500,400,300,100' rel='stylesheet' type='text/css'>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<link rel="apple-touch-icon" href="img/icon-swtrains.png?v=1">
		<script src="js/jquery.min.js"></script>
		<script src="js/TweenMax.min.js"></script>
		<script src="js/site.js?<?php echo filemtime('js/site.js'); ?>"></script>
		<script src="js/jquery.textfill.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/style.css?<?php echo filemtime('css/style.css'); ?>">
		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHh4oobxVPkxm0NuPSpusns3QNe9ZdJHU&libraries=places&callback=locationHandler.Init">
    </script>
	</head>

	<body class="home">
			<header class="controls">
				<?php include 'back.php' ?>
				<?php include 'burger.php' ?>
			</header>
	
			<div class="top">
				<div class="date opacityZero">Now</div>
				<br style="clear:both;"><div class="station opacityZero">From <a href="#" class="location">London Euston</a></div>
				<div class="clock_slider topslider opacityZero">
					<div class="options">	
						<?php
						$date=new DateTime();
						$datestr = $date->format('Y-m-d');
						$datetime=new DateTime($datestr . " 05:20:00");
						$nowdatetime=new DateTime();
						$nowdatetime->modify('-60 minutes');
						for ($i=0;$i<33;$i++) {
							echo('<span>');
							$datetime->modify('+105 minutes');
							$delay=rand( 0, 3 );
							$delayinfo="";
							if ($delay == -1) {
								$datetime->modify('+7 minutes');
								$delayinfo=$datetime->format("H:i");
								$datetime->modify('-7 minutes');
							}
							if ($datetime>=$nowdatetime) {
								$message = "2";
							} else {
								$message = "3";
							}
							echo('<time class="bucket" datetime="'.$datetime->format("Y-m-d H:i:s").'" data-message="'.$message.'"><span class="time">'.$datetime->format("H:i").'</span>');
							
							echo('<div class="message"></div>');
							echo('</time></span>');
						}?>
					</div>
				</div>
				<div class="info depart opacityZero">
					<span class="platform"></span>
					<span class="delay"></span>
				</div>
			</div>
			<div class="changes opacityZero">
				<button class="expand secondary">1 change</button>
			</div>
			<div class="bottom">
					<div class="station opacityZero">To <a href="#" class="location">Birmingham New St</a></div>
				<div class="clock_slider bottomslider opacityZero">
					<div class="options">	
						<?php
						$date=new DateTime();
						$datestr = $date->format('Y-m-d');
						$datetime=new DateTime($datestr . " 07:25:00");
						for ($i=0;$i<33;$i++) {
							echo('<span>');
							$datetime->modify('+105 minutes');
							echo('<time class="bucket" datetime="'.$datetime->format("H:i:s").'"><span class="time">'.$datetime->format("H:i").'</span></time>');
							echo('</span>');
						}?>
					</div>
				</div>
				
			</div>
			<div class="get_tickets opacityZero">
				<button onclick="document.location.href='planning.php';">Tickets from £3.2</button>
				<a href="#" class="journey-trigger">Set up journey alert</a>
			</div>
		<!-- 	<img src="img/icon-button_action-blue.svg" width="7"  class="scroll-indicator">		 -->	

			<div class="journey">
					
					<div class="plan">
						<!-- <div class="date">
							<div class="top_item opacityZero link_arrow closed">Close</div>
						</div> -->
						<!-- <ul>
							<li class="passed" data-distance="0"><div class="station"><strong class="time">10:30</strong>London Waterloo</div></li>
							<li class="passed" data-distance="3"><div class="station"><strong class="time">10:33</strong>Claygate</div></li>
							<li class="passed" data-distance="6"><div class="station"><strong class="time">10:36</strong>Hinchley Wood</div></li>
							<li class="passed" data-distance="11"><div class="station"><strong class="time">10:41</strong>Surbiton</div></li>
							<li data-distance="20"><div class="station"><strong class="time">10:50</strong>Wimbledon Station</div></li>
							<li data-distance="24"><div class="station"><strong class="time">10:54</strong>Earlsfield</div></li>
							<li data-distance="28"><div class="station"><strong class="time">10:58</strong>Clapham Junction</div></li>
							<li data-distance="33"><div class="station"><strong class="time">11:03</strong>Vauxhall</div></li>
							<div class="current_status">here</div>
						</ul> -->
						<img src="img/gfx_train-journey.svg" class="journey_map">
					</div>
			</div>
			<?php include 'helper.php' ?>
			<?php include 'footer.php' ?>
		<script>
		if (location.host.indexOf("test.somethingyoulove.com")<0) {
			document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
		}</script>
	</body>

	</html>