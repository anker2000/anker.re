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
		<script src="js/site.js?422"></script>
		<script src="js/jquery.textfill.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/style.css?52">
		<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHh4oobxVPkxm0NuPSpusns3QNe9ZdJHU&libraries=places&callback=locationHandler.Init">
    </script>
	</head>

	<body><div id="map"></div>
		<div class="setup_commute">
			<header class="controls">
				<span class="burger"><img src="img/bg-burger.svg" width="80" height="55"></span>
			</header>
			<div class="container-fluid outer">
				<div class="splash screen">
					<div class="flex">
						<img src="img/logo.svg" width="70%" class="logo opacityZero">
						<img src="img/gfx_splash.svg" width="75%" class="bump opacityZero">
					</div>
				</div>
				<div class="from station_info screen">
					<div class="date opacityZero">Today</div>
					<br style="clear:both;"><div class="station">From Farringdon</div><br style="clear:both;">
					<button class="opacityZero choose_destination no_delay_button">Choose Destination</button>
				</div>
				<div class="locating screen">
					<!-- <div class="message opacityZero">
						<h1>Working out route</h1>
						<p>Finding routes from your location to Milford on Sea</p>
					</div>
					<div class="radar opacityZero"></div>
					<div class="route">
						<img src="img/gfx_route.svg" width="1190">
					</div> -->
					<div class="route_vertical">
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
								<li class="first_station"><strong>London Waterloo</strong></li>
								<li class="change_station">1 change</li>
								<li class="last_station"><strong>Lymington Town</strong><br><small>closest station</small></li>
								<li class="destination">Milford on Sea</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="screen search_station">
					<div class="where_to">Where to?</div>
					<div class="help">Place, street or post code</div>
					<input type="search" class="station" name="search" placeholder="Search">
					<div class="results">
						<div class="title">Suggested locations:</div>
						<ul class="list">
							<li>No results</li>
						</ul>
					</div>
				</div>
				<div class="home screen">
					<div class="top">
						<div class="date opacityZero">Today</div>
						<br style="clear:both;"><div class="station opacityZero">From London Waterloo</div>
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
						<div class="info depart">
							<span class="platform"></span>
							<span class="delay"></span>
						</div>
					</div>
					<div class="changes">
						<div class="expand">1 change</div>
					</div>
					<div class="bottom">
							<div class="station opacityZero">To Lymington Town</div>
						<div class="clock_slider bottomslider opacityZero">
							<div class="options">	
								<?php
								$date=new DateTime();
								$datestr = $date->format('Y-m-d');
								$datetime=new DateTime($datestr . " 07:05:00");
								for ($i=0;$i<33;$i++) {
									echo('<span>');
									$datetime->modify('+105 minutes');
									echo('<time class="bucket" datetime="'.$datetime->format("H:i:s").'"><span class="time">'.$datetime->format("H:i").'</span></time>');
									echo('</span>');
								}?>
							</div>
						</div>
						<div class="info arrive">
							<span class="platform"></span>
							<span class="delay"></span>
						</div>
					</div>
					<div class="get_tickets opacityZero">
						<button>Tickets from £41.99</button>
					</div>
					<div class="cards clickaction">
						<div class="card">
							<img src="img/gfx_hand-green.svg" width="75">
							<div class="message_1 message">
								<h3>Right now</h3>
								<p>Trains are running on time.<br>You're 5 min from the station.</p>
							</div>
							<div class="message_2 message">
								<h3>Right now</h3>
								<p>A 22 minute delay expected<br>on your train.</p>
								<hr>
								<span class="icon-twitter"></span><h3>Reason</h3>
								<p><span class="hashtag">#ClaphamJunction</span> A signal box has malfunctioned at Clapham Junction. A team is working to fix the problem.</p>
								<hr>
								<h3>Alternative route</h3>
								<p>No faster route available right now.</p>
								<hr>
								<h3>Refund</h3>
								<span class="info"></span><p>Available in 14 minutes</p>
								<button disabled>Claim a refund</button>
								<hr>
								<h3>Customer service</h3>
								<p>Operatives available.</p>
								<button>Contact us</button>
							</div>

						</div>
						<div class="card"></div>
						<div class="card"></div>
					</div>
				</div>
				<div class="journey screen">
					
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
				<div class="planning screen">
					<div class="container">
						<div class="row">
							<div class="col-md-offset-1 col-md-10">
								<h1>Get tickets</h1>
								<label for="from">Departing from</label>
								<input type="search" id="from" value="London Waterloo" class="station_search">
								<div class="choices from"></div>
								<input type="hidden" id="from_geo" required>
								
								<a href="#" class="swap">Swap</a>
								<label for="to">Arriving at</label>
								<input type="search" id="to" value="Lymington Town" class="station_search">
								<div class="choices to"></div>
								<input type="hidden" id="to_geo" required>
								
							</div>
						</div>
						<div class="row ticket-type">
							<div class="col-md-offset-1 col-md-10">
								<label>Ticket type</label>
								<radiogroup>
									<input type="radio" name="ticket_type" value="single" data-label="Single" checked>
									<input type="radio" name="ticket_type" value="return" data-label="Return">
									<input type="radio" name="ticket_type" value="open-return" data-label="Open return">
								</radiogroup>
								<div class="dates">
									<div class="single">
										<label for="outbound">Leaving</label>
										<input type="datetime-local" id="outbound">
										<input type="text">
									</div>
									<div class="return">
										<label for="return">Returning</label>
										<input type="datetime-local" id="return">
										<input type="text">
									</div>	
								</div>
							</div>

						</div>
						<div class="row travellers">
							<input type="hidden" name="adults" id="adults" value="0">
							<input type="hidden" name="children" id="children" value="0">
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
						</div>
						<!-- <div class="row railcards">
							<div class="col-md-offset-1 col-md-10">
								<label>Railcards</label>
								<a href="#" class="add">Add a railcard/season ticket</a>
								<div class="choices railcard">
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
								</ul>
							</div>
						</div> -->
					</div>
					<button class="no_delay_button next">See ticket options</button>
				</div>
				<div class="schedule screen">
					<div class="schedule_container">
						<header>
							<div class="stations"><a href="#">WAT<span class="arrow return"></span>LYT</a></div>
							<div class="passengers">3 adults, 1 child</div>
							<div class="itinerary">
								<div class="travel_list">
									<h3 class="outbound_train">Outbound train</h3>
									<datetime class="label outbound">OCT 13 2015</datetime>
									<div class="li outbound"><datetime>10:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>11:55</datetime></div>
									<h3 class="returning_train">Returning train</h3>
									<datetime class="label returning">OCT 23 2015</datetime>
									<div class="li returning"><datetime>10:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>11:55</datetime></div>
									
									<div class="price"></div><h3 class="ticket"></h3>
									<div class="last-choices">
										<div class="inset">
											<h3 class="opacityZero">Request seat</h3>
											<radiogroup class="opacityZero">
												<input type="radio" name="request_seat" value="no" data-label="No" checked>
												<input type="radio" name="request_seat" value="yes" data-label="Yes">
											</radiogroup>
										</div>
										<h3 class="opacityZero">Request assisted travel <a href="#" class="information"></a></h3>
										<radiogroup class="opacityZero">
											<input type="radio" name="request_assisted_travel" value="no" data-label="No" checked>
											<input type="radio" name="request_assisted_travel" value="yes" data-label="Yes">
										</radiogroup>
										<div class="opacityZero"><button class="no_delay_button">Pay by card</button><button class="no_delay_button">Pay with PayPal</button></div>
									</div>
									<div class="ticket_information">
										<div class="collect">
											Collect at the station
											<strong>VH150613LDN</strong>
										</div>
										<button>Download PDF</button><button>Add to Wallet</button>
									</div>
								</div>
							</div>
						</header>
						<div class="results">
							<div class="outbound">
								<header>
									<h3>Outbound train</h3>
									<datetime>OCT 13 2015</datetime><span class="label">Cheapest price</span>
								</header>
								<ul class="travel_list">
									<li>
										<div class="price">£76</div>
										<datetime>10:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>12:40</datetime><br>
										<span class="delay">15 min delay</span><span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£76</div>
										<datetime>11:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>13:40</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£76</div>
										<datetime>12:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>14:40</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£76</div>
										<datetime>13:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>15:40</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£76</div>
										<datetime>14:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>16:40</datetime><br>
										<span class="delay">15 min delay</span><span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£76</div>
										<datetime>15:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>17:40</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£86</div>
										<datetime>16:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>18:40</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
								</ul>
							</div>
							<div class="returning">
								<header>
									<h3>Returning train</h3>
									<datetime>OCT 23 2015</datetime><span class="label">Cheapest price</span>
								</header>
								<ul class="travel_list">
									<li>
										<div class="price">£5</div>
										<datetime>11:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>12:55</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£5</div>
										<datetime>12:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>13:55</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£5</div>
										<datetime>13:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>14:55</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£5</div>
										<datetime>14:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>15:55</datetime><br>
										<span class="delay">15 min delay</span><span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£5</div>
										<datetime>15:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>16:55</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£6</div>
										<datetime>16:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>17:55</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
									<li>
										<div class="price">£6</div>
										<datetime>17:55</datetime><span class="arrow"></span><a href="#" class="changes">1</a><span class="arrow"></span><datetime>18:55</datetime><br>
										<span class="platform">Platform 1</span><span class="duration">1h 45m</span>
									</li>
								</ul>
							</div>
							<div class="ticket_options">
								<header><span class="label">Ticket option</span><span class="label">Price</span></header>
								<ul class="travel_list">
									<li>
										<div class="price">£82</div>
										<div class="name">Anytime Day Return</div>
										<div class="description"><small>Valid at all hours</small></div>
									</li>
									<li class="upgrade">
										<div class="price">£92</div>
										<div>Upgrade to First</div>
										<div class="description"><small>Increased chance of a seat: roughly <strong>45 %</strong></small></div>
									</li>
									<li>
										<div class="price">£72</div>
										<div class="name">Off-peak Day Return</div>
										<div class="description"><small>Valid at all hours except from 7:35 to 9:30 and from 16:00 our 17:30 on weekdays.</small></div>
									</li>
									<li class="upgrade">
										<div class="price">£86</div>
										<div>Upgrade to First</div>
										<div class="description"><small>Increased chance of a seat: roughly <strong>45 %</strong></small></div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="cards clickaction">
						<div class="card">
							<img src="img/gfx_notification.svg" width="75">
							<div class="message_1 message">
								<h3>Get the best experience</h3>
								<p>Get heads up messages<br>when necessary.</p>
							</div>
							
								
							<radiogroup>
								<input type="radio" name="request_notifications" value="no" data-label="No" checked>
								<input type="radio" name="request_notifications" value="yes" data-label="Yes">
							</radiogroup>
							<img src="img/gfx_notification_big.svg">
					

						</div>
						<div class="card"></div>
						<div class="card"></div>
					</div>
				</div>
			</div>
			<div class="bg-container intro">
				<div class="gfx background"></div>
				<div class="gfx people"></div>
			</div>
			<div class="bg-container search_1">
				<div class="gfx background"></div>
				<div class="gfx people"></div>
			</div>
		</div>
		<script>
		if (location.host.indexOf("test.somethingyoulove.com")<0) {
			document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
		}</script>
	</body>

	</html>