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

	<body class="planning profile">
			<a href="#" class="burger"><span></span></a>
			<header class="controls">
				<div class="price"><span class="amount">£44.2</span><br><small>Cheapest total</small></div>
				<?php include 'burger.php' ?>
			</header>
			<div class="profile">
			</div>
			<br style="clear:both"/>
			<?php include 'helper.php' ?>
			<div class="desktop">

				
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
		        <div class="sitemap">Sitemap - Terms & Conditions</div>
		    </footer>

			</div>
		<script>
		if (location.host.indexOf("test.somethingyoulove.com")<0) {
			document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
		}</script>
	</body>

	</html>