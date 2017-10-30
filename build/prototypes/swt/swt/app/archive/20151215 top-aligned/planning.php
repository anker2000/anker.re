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

	<body class="planning">
		<header class="meta">
			<div class="price"><span class="amount">£6.00</span>Cheapest total</div>
			<!-- <button class="buy" onclick="document.location.href='schedule.php'">Buy tickets</button> -->
		</header>
		<header class="controls">
			<?php include 'back.php' ?>
			<?php include 'burger.php' ?>
		</header>
		<!-- <div class="sticky_info">
			<div class="price"><span class="amount">£6.00</span><br><small>Cheapest total</small></div>
		</div> -->
		<h2>Where do you want to go?</h2>
		<div class="container">
			<div class="row stations">
				<div class="col-custom">
					<span class="input_container">
						<input type="search" id="from" value="" tabindex="1" class="station_search">
						<label for="from">Departing from</label>
						<div class="choices from"></div>
						<input type="hidden" id="from_geo" required>
					</span>
					<span class="input_container">
						<a href="#" class="swap">Swap</a>
						<input type="search" id="to" value="" tabindex="2" class="station_search">
						<label for="to">Arriving at</label>
						<div class="choices to"></div>
						<input type="hidden" id="to_geo" required>
					</span>
				</div>
				<a href="planning.php" class="touch_test"></a>
				<script>if ($(".touch_test").css("display")!="inline") {
					$("#from").val("London Waterloo");
					$("#to").val("Clapham Junction");
					}</script>
			</div>
			<div class="inset">
			
				<div class="ticket-types">	
					<radiogroup>
						<input type="radio" name="ticket_type" value="single" data-label="Single" checked>
						<input type="radio" name="ticket_type" value="return" data-label="Return">
					</radiogroup>
					<label>Ticket type</label>
				</div>
			</div>
			<div class="inset">
				<div class="dates">
					<div class="single">
						<input type="date" id="outbound" value="2015-10-30" tabindex="3">
						<label for="outbound">Leaving</label>
						<input type="text" class="locked" value="TODAY" >
					</div>
					<div class="return">
						<input type="date" id="return" disabled="true" tabindex="4">
						<label for="return">Returning</label>
						<input type="text" class="locked" disabled="true">
					</div>
					<br style="clear:both;"/>
				</div>
			</div>
			<div class="travellers_button">
				<label>Adults/children:</label>
				<button class="square" tabindex="5">
					<span class="adults">1</span>
					<img src="img/icon_picto_adult.svg" width="11" height="35">
					<img src="img/icon_picto_child.svg" width="11" height="35">
					<span class="children">0</span>
				</button>
			</div>
			<div class="row travellers">
				<div class="close-modal"></div>
				<div class="traveller_wrapper">
					<div class="col-md-offset-1 col-md-10">
						<label>Travellers</label>
						<div class="travellers_info">0 travellers</div>
						<div class="stage"></div>
					</div>
					<div class="controls">
						<div class="adults">
							<a href="#">–</a>
							<div class="info">Adults<br>(16+)</div>
							<a href="#">+</a>
						</div>
						<div class="children">
							<a href="#">–</a>
							<div class="info">Children<br>(5-15)</div>
							<a href="#">+</a>
						</div>
					</div>
					<input type="hidden" name="adults" id="adults" value="0">
					<input type="hidden" name="children" id="children" value="0">
				</div>
			</div>

			
			<div class="row railcards">
				<div class="col-md-offset-1 col-md-10">
					<label>Railcards</label>
					<a href="javascript:void();" class="add">Add a railcard/season ticket</a>
					<!-- <div class="choices railcard">
						<ul>
							<li><a href="#">16-25 Railcard</a></li>
							<li><a href="#">Annual Gold Card</a></li>
							<li><a href="#">Two Together Railcard</a></li>
							<li><a href="#">Disabled Adult Railcard</a></li>
							<li><a href="#">Disabled Child Railcard</a></li>
							<li><a href="#">Family and Friends Railcard</a></li>
							<li><a href="#">Groupsave</a></li>
							<li><a href="#">HM Forces Railcard</a></li>
							<li><a href="#">JobCentrePlus Discount Card</li>
							<li><a href="#">Network Railcard</a></li>
							<li><a href="#">Senior Railcard</a></li>
							<li><a href="#">Cambrian Railcard</a></li>
							<li><a href="#">Cotswold Line Railcard</a></li>
							<li><a href="#">Dales Railcard</a></li>
							<li><a href="#">Devon And Cornwall Railcard</a></li>
							<li><a href="#">Esk Valley Railcard</a></li>
							<li><a href="#">Heart Of Wales Railcard</a></li>
							<li><a href="#">Highland Railcard</a></li>
							<li><a href="#">Pembroke Railcard</a></li>
							<li><a href="#">Scottish Youth Railcard</a></li>
							<li><a href="#">Valley Lines Senior Railcard</a></li>
							<li><a href="#">Valley Student Railcard</a></li>
						</ul>

					</div>
					 <ul>
						<li>Senior Railcard <a href="#" class="delete">+</a></li>
						<li>Disabled Child Railcard <a href="#" class="delete">+</a></li> 
					</ul> -->
				</div>
			</div> 
			<button class="no_delay_button next buy" onclick="document.location.href='schedule.php'">Tickets from <span class="amount">£6</span></button>
		</div>
		<br style="clear:both"/>
		<?php include 'helper.php' ?>
		<div class="desktop">

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

	        <table width="100%">
	            <tr>
	                <th>About us</th>
	                <th>SWT for business</th>
	            </tr>
	            <tr>
	                <td width="(100/3)%">
	                    Our network
	                </td>
	                <td width="(100/3)%">
	                    Open corporate account
	                </td>
	                <td width="(100/3)%">
	                    FAQs
	                </td>
	            </tr>
	            <tr>
	                <td width="(100/3)%">
	                    Our Timetables
	                </td>
	                <td width="(100/3)%">
	                    Book corporate travel
	                </td>
	                <td width="(100/3)%">
	                    Island line
	                </td>
	            </tr>
	            <tr>
	                <td width="(100/3)%">
	                    Carbon calculator
	                </td>
	                <td width="(100/3)%">
	                    Media center
	                </td>
	                <td width="(100/3)%">
	                    Careers
	                </td>
	            </tr>
	            <tr>
	                <td width="(100/3)%">
	                    Social responsibility
	                </td>
	                <td width="(100/3)%">
	                    Advertise with us
	                </td>
	            </tr>
	        </table>
	        <div class="sitemap">Sitemap - Terms &amp; Conditions</div>
	    </footer>

		</div>
	<script>
	if (location.host.indexOf("test.somethingyoulove.com")<0) {
		document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
	}</script>
	</body>

	</html>