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
		<script src="js/taffy-min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/style.css?<?php echo filemtime('css/style.css'); ?>">
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
    </script>
	</head>

	<body class="schedule step1"><a href="planning.php" class="touch_test"></a>
			
			<a href="#" class="burger"><span></span></a>
			<header class="controls">
				<div class="price"><span class="amount"></span><br><small>Cheapest total</small></div>
				<div class="confirmation-header">Booking confirmation</div>
				<?php include 'burger.php' ?>
			</header>
			<div class="itinerary_background"></div>
			<header class="itinerary_container">
				<div class="stations"><a href="#">WAT<span class="arrow return"></span>SAN</a></div>
				<div class="passengers">3 adults, 1 child</div>
				<div class="itinerary">
					<div class="travel_list">
						<div class="outbound_wrapper">
							<h3 class="outbound_train">Outbound train</h3>
							<div class="li outbound"><datetime>10:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>11:55</datetime></div>
							<datetime class="label outbound">OCT 13 2015</datetime>
						</div>
						<div class="returning_wrapper">
							<h3 class="returning_train">Returning train</h3>
							<div class="li returning"><datetime>10:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>11:55</datetime></div>
							<datetime class="label returning">OCT 23 2015</datetime>
						</div>
						<div class="price"></div><h3 class="ticket_total">Ticket option</h3><p class="ticket"></p><br style="clear:both">
						<div class="last-choices">
						 	<div class="final_wrapper">
								<div class="inset">
									<div class="seat_wrapper">
										<span class="pricetag">free</span><h3 class="opacityZero">Request seat</h3>
										<radiogroup class="opacityZero">
											<input type="radio" name="request_seat" value="no" data-label="No" checked>
											<input type="radio" name="request_seat" value="yes" data-label="Yes">
										</radiogroup>
									</div>
									<div class="assisted_wrapper">
										<span class="pricetag">free</span><h3 class="opacityZero">Request assisted travel <a href="#" class="information"></a></h3>
										<radiogroup class="opacityZero">
											<input type="radio" name="request_assisted_travel" value="no" data-label="No" checked>
											<input type="radio" name="request_assisted_travel" value="yes" data-label="Yes">
										</radiogroup>
									</div>
								</div>
								<br style="clear:both;">
								<div class="carpark_wrapper">
									<span class="pricetag car">£0.00</span><h3 class="opacityZero">Book car park ticket </h3>
									<radiogroup class="opacityZero carpark">
										<input type="radio" name="carpark" value="no" data-label="No" checked>
										<input type="radio" name="carpark" value="yes" data-label="Yes">
									</radiogroup>
								</div>
								<span class="pricetag promotion">-£0.00</span><h3 class="opacityZero">Add a promotion or <br>voucher code?</h3>
								<input type="text" class="promotion" placeholder="Enter your code">
								<div class="inset last">
									<span class="pricetag total"></span><h3>Total cost</h3>
									<div class="opacityZero center"><button class="no_delay_button buy">Pay by card</button><button class="no_delay_button buy">Pay with PayPal</button></div>
									<hr>
									<div class="ticket_summary">
										<h3>Ticket summary</h3>
										<p><strong>Outbound ticket - ON-PEAK</strong><br>
										Can be used at any time up until 4:29am the next day.</p>
										<p><strong>Inbound ticket - OFF-PEAK</strong><br>
										Can only be used on trains leaving between 9am on the day of travel, and 4:29am the next day.</p>
									</div>
								</div>
							</div>								

							<div class="ticket_information">
								<div class="inset">
									<h3>Stay up to date on your journey? <a href="#" class="information"></a></h3>
									<p>Get free live alerts.</p>
									<button class="journey-alerts-button buy">Get journey alerts via text</button>
								</div>
								<div class="e-ticket">
									<h3>Get your ticket</h3>
									<button class="smartcard buy">Add to Smartcard</button><button class="save buy">Save to phone</button>
								</div>
								<div class="collect">
									Collect at the station
									<strong>VH150613LDN</strong>
								</div>
								<div class="inset calendar">
									Add journey to your calendar <button>Add</button>
								</div>
								<div class="ticket_summary">
									<h3>Ticket summary</h3>
									<p><strong>Outbound ticket - ON-PEAK</strong><br>
									Can be used at any time up until 4:29am the next day.</p>
									<p><strong>Inbound ticket - OFF-PEAK</strong><br>
									Can only be used on trains leaving between 9am on the day of travel, and 4:29am the next day.</p>
									<hr>
									<p><strong>CANCELLING AND RE-BOOKING</strong><br>
									You can do this at any time from <a href="#" style="color:#18aff5;">your profile</a>.</p>
									<button onclick="document.location.href='index.php'">Plan another journey</button>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</header>
			<header class="outbound table">
				<h3>Outbound train</h3>
				<datetime data-date="OCT 13 2015"><!-- <span class="peakvalue"></span>  -->OCT 13 2015</datetime><span class="label">Addition to total</span><a href="#" class="filters"><img src="img/icon-filter.svg" width="16"></a>
			</header>
			<header class="returning table">
				<h3>Returning train</h3>
				<datetime data-date="OCT 13 2015"><!-- <span class="peakvalue"></span>  -->OCT 23 2015</span></datetime><span class="label">Addition to total</span><a href="#" class="filters"><img src="img/icon-filter.svg" width="16"></a>
			</header>
			<header class="ticket_options table"><span class="label">Ticket option</span><span class="label">Price</span></header>
		
						
			<div class="results">
				<div class="outbound">
					<ul class="travel_list">
						
					</ul>
				</div>
				<div class="returning">
					<ul class="travel_list">
						
					</ul>
				</div>
				<div class="ticket_options">
					<ul class="travel_list">
						<li>
							<div class="price">£82</div>
							<div class="name">Standard class</div>
							<div class="description"><small>Valid at all hours</small></div>
						</li>
						<li>
							<div class="price">£86</div>
							<div class="name">First class</div>
							<div class="description"><small>Increases your chance of getting a seat<br>by roughly <strong>45 %</strong></small></div>
							<div class="discount"><small>Our weekend discount means upgrades<br>are only <strong>£5 extra per ticket</strong>.</small></div>
						</li>
					</ul>
				</div>
			</div><script>if ($(".touch_test").css("display")=="inline") $("button.save.buy").html("Save as PDF"); </script>
			<div class="swt_modal">
				<div class="train_message"></div>
				<div class="departure_controls">
					<h3>Sort by</h3>
					<radiogroup>
						<input type="radio" class="sort_by" name="sort_by" value="departure_ms" data-label="Time" checked>
						<input type="radio" class="sort_by" name="sort_by" value="duration, departure_ms" data-label="Duration">
						<input type="radio" class="sort_by" name="sort_by" value="cheapest_single, departure_ms" data-label="Cost">
					</radiogroup>
					<hr>
					<h3 class="arrow">Filter by <select><option>Departure time</option><option>Arrival time</option></select></h3>
					<div class="range_info">00:00 - 24:00</div>
					<div class="range_slider"></div>
					<div class="price_stat">
						<div class="ticks">
							<div class="tick"></div>
							<div class="tick"></div>
							<div class="tick"></div>
							<div class="tick"></div>
							<div class="tick"></div>
						</div>
						<ol>
							<li><span class="hour">0</span><span class="bar"></span></li>
							<li><span class="hour">2</span><span class="bar"></span></li>
							<li><span class="hour">4</span><span class="bar"></span></li>
							<li><span class="hour">6</span><span class="bar"></span></li>
							<li><span class="hour">8</span><span class="bar"></span></li>
							<li><span class="hour">10</span><span class="bar"></span></li>
							<li><span class="hour">12</span><span class="bar"></span></li>
							<li><span class="hour">14</span><span class="bar"></span></li>
							<li><span class="hour">16</span><span class="bar"></span></li>
							<li><span class="hour">18</span><span class="bar"></span></li>
							<li><span class="hour">20</span><span class="bar"></span></li>
							<li><span class="hour">22</span><span class="bar"></span></li>
						</ol>
					</div>
					<small>Average £ per hour (single adult ticket)</small>
				</div>
			</div>
			<?php include 'helper.php' ?>
		<script>
		if (location.host.indexOf("test.somethingyoulove.com")<0) {
			document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
		}</script>
	</body>

	</html>