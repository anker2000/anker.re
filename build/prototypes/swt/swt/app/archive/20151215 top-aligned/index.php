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

	<body class="home pre">
			<header class="controls">
				<a class="back_nav react inactive"><span></span></a>
				<?php include 'burger.php' ?>
			</header>
	
			<div class="top">
				<div class="date opacityZero">Now</div>
				<br style="clear:both;"><div class="station"><span class="lbl">From</span><span class="location">&nbsp;</span></div>
				<div class="clock_slider topslider">
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
				<div class="info depart">
					<span class="platform"></span>
					<span class="delay"></span>
				</div>
			</div>
			<div class="changes">
				<button class="expand secondary">No changes</button><a href="#" class="swap"></a>
			</div>
			<div class="bottom">
					<div class="station"><span class="lbl">To</span><span class="location">&nbsp;</span></div>
				<div class="clock_slider bottomslider ">
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
			<div class="get_tickets">
				<button onclick="document.location.href='planning.php';" class="buy" disabled="true"><span>Book tickets</span><span>Tickets from £6.4</button><button onclick="$('body').toggleClass('pre');$(window).scrollTop(0);" disabled="true">See departures</button>
			</div>


			<div class="journey">
					
					<div class="plan">
						<img src="img/gfx_train-journey.svg" class="journey_map">
					</div>
			</div>
			<?php include 'helper.php' ?>
<div class="mobile ">

				<div class="updateContainer">
		        <div class="wrapper">
		            
		            <div class="column-2">
		                <h1>Service Updates</h1>
		                <div class="box">
		                    <div class="redAlert">Cancellations</div>
		                    <h4><span>Surbiton/</span> Cobham</h4>
		                    <p>All trains cancelled until further notice. There are bus replacement services</p>
		                </div>
		                <div class="box">

		                    <div class="yellowAlert">MINOR DELAYS</div>
		                    <h4><span>Kingston/</span> Shepperton</h4>
		                    <p>This line is experiencing some problems due to a signal failure in Waterloo</p>
		                </div>
		                <div class="box">
		                    <h4><span>Chessington/</span> Epsom</h4>
		                    <p>This line is experiencing some problems due to a signal failure in Waterloo</p>
		                </div>
		                <button>Show all updates</button>
		            </div>
		            <div class="column-3">
		                <div class="box">
		                    <h2>On Twitter</h2>
		                    <button>Follow us</button>
		                    <div class="title">South West Trains <a href="">@SW_Trains</a></div>
		                    <div class="time">16 minutes ago</div>
		                    <p>10:46 Lymington Pier to Brockenhurst due 10:56 is being delayed at Lymington Town. This is due to a fallen tree blocking the track.
		                    </p>
		                </div>
		            </div>
		        </div>
		    </div>
		    <div class="wrapper">
		        <div class="offerContainer">
		            <h1>Special offers</h1>
		            <ul class="tiles">
		                <li>
		                    <div class="alignBottom">
		                        <h3>2-for-1 travel this summer</h3>
		                        <p>Get fantastic 2-for-1 offers every week on fantastic locations across the UK.</p>
		                    </div>
		                </li>
		                <li>
		                    <div class="alignBottom">
		                        <h3>Don’t miss kick-off</h3>
		                        <p>As part of the celebrations we are offering cheap train journeys and the chance to win tickets to Twickenham.</p>
		                    </div>
		                </li>
		                <li>
		                    <h3>Upgrade to 1st class 
		and get a little extra 
		shoe room</h3>
		                </li>
		                <li>
		                    <h3>Lulworth cove</h3>
		                    <p>Return this weekend from only <strong>£20</strong> per adult and <strong>£8</strong> per child</p>
		                </li>
		            </ul>
		        </div>
		    </div>
		    <footer>
		        <div class="copyright">
		            <h6>© South West Trains 2015. Part of the Stagecoach Group plc</h6>
		            <div class="twitter"><img src="img/twitter.svg" width="16px" height="12px"></div>
		            <div class="facebook"><img src="img/facebook.svg" width="7px" height="13px"></div>
		            <div class="instagram"><img src="img/instagram.svg" width="13px" height="13px"></div>
		        </div>
		    </footer>
		</div>
		<div class="station_screen">
			<header>
				<h2>From</h2>
				<ul>
					<li class="active">Your stations</li>
					<li>Nearest stations</li>
					<li>Search stations</li>
				</ul>
			</header>
			<div class="station_list">
				<ul>
					<header>Recent stations</header>
					<li class="bookmark">Home</li>
					<li class="bookmark">Clapham Junction</li>
					<li>Blackfriars</li>
					<li>London Cannon Street</li>
				</ul>
				<ul>
					<header>Saved stations</header>
					<li class="add">Add another station</li>
					<li class="bookmark">Home (Aldgate)</li>
					<li class="bookmark">London Waterloo</li>
				</ul>
			</div>
		</div>
		<script>
		if (location.host.indexOf("test.somethingyoulove.com")<0) {
			document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
		}</script>
	</body>

	</html>