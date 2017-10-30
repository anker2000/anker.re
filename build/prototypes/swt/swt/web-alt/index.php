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
		 </script>
	</head>

	<body class="search_station"><a href="planning.php" class="touch_test"></a>
			<script>if ($(".touch_test").css("display")=="inline") document.location.href="planning.php";</script>
		<a href="#" class="burger"><span></span></a>
		<header class="controls">
			<?php include 'burger.php' ?>
		</header>
		<footer>There is a <a href="#">cheaper route</a> that takes 20min longer.</footer>
		
			<div class="container-fluid outer">
			
			<div class="screen route_vertical">
				<h1>Finding quickest route</h1>
				<div class="route_container">
					<div class="route_progress">
						<div class="first-line"></div>
						<div class="blue-circle"></div>
						<div class="second-line"></div>
						<div class="change-stop"></div>
						<div class="third-line"></div>
						<div class="blue-circle"></div>
						<div class="fourth-line"></div>
					</div>
					<ul>
						<li class="your_location">Your location</li>
						<li class="first_station"><strong><a href="javascript:void()">London Waterloo</a></strong></li>
						<li class="change_station">3 possible changes</li>
						<li class="last_station"><strong><a href="javascript:void()">Sandown</a></strong><br><small>closest station</small></li>
						<li class="destination">Culver Parade</li>
					</ul>
				</div>
				<p>Door to door: <strong>calculating</strong></p>
				<button class="secondary">Back</button><button class="next">Next</button>
			</div>
			<div class="search_station">
				<img src="img/logo.svg" width="190" class="logo">
				<div class="where_to">Where do you want to go <a href="#">Now?</a></div>
				<input type="text" class="station" name="search" placeholder="Station or location">
				<div class="search_results">
					<div class="title">Suggestions:</div>
					<ul class="list">
						<li class="priority"><a href="#">Home</a> | <a href="#">Work</a></li>
						<li><a href="#">Bournemouth Beach</a></li>
					</ul>
				</div>
			</div>

		</div>

		<?php include 'helper.php' ?>
		<div class="mobile">

				<div class="updateContainer">
		        <div class="wrapper">
		            <div class="column-1">
		               <div class="box">
		                <h2>Travel updates</h2>
		                <h5>Southwest live update</h5>
		                <h5>Underground update</h5>
		                <h5>Engineering works plans</h5>
		                </div>
		            </div>
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
		        <div class="sitemap_wrapper">
			        <ul>
			        	<li><strong>About us</strong></li>
			        	<li>Our network</li>
			        	<li>Our Timetables</li>
			        	<li>Carbon calculator</li>
			        	<li>Social responsibility</li>
			        </ul>
			        <ul>
			        	<li><strong>SWT for business</strong></li>
			        	<li>Open corporate account</li>
			        	<li>Book corporate travel</li>
			        	<li>Media center</li>
			        	<li>Advertise with us</li>
			        </ul>
			        <ul>
			        	<li>FAQs</li>
			        	<li>Island Line</li>
			        	<li>Careers</li>
			        </ul>
			    </div>
		        <div class="sitemap">Sitemap - Terms & Conditions</div>
		    </footer>
</div>
		
		<script>
		if (location.host.indexOf("test.somethingyoulove.com")<0) {
			document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
		}</script>
	</body>

	</html>