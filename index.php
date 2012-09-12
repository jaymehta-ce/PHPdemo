<?
require('lib/PHP-OAuth2/Client.php');

require('lib/PHP-OAuth2/GrantType/IGrantType.php');
require('lib/PHP-OAuth2/GrantType/AuthorizationCode.php');

// These are your Singly client ID and secret from here:
// https://singly.com/apps
const CLIENT_ID = '';
const CLIENT_SECRET = '';

// Set his is the URL of this file (http://yourdomain.com/index.php, for example)
const REDIRECT_URI = '';

// The service you want the user to authenticate with
const SERVICE = 'facebook';

const AUTHORIZATION_ENDPOINT = 'https://api.singly.com/oauth/authorize';
const TOKEN_ENDPOINT = 'https://api.singly.com/oauth/access_token';

$client = new OAuth2\Client(CLIENT_ID, CLIENT_SECRET);

if (!isset($_GET['code'])) {
   $auth_url = $client->getAuthenticationUrl(AUTHORIZATION_ENDPOINT, REDIRECT_URI) ."&service=". SERVICE;

   header('Location: '. $auth_url);

   die('Redirect');
} else {
   $params = array('code' => $_GET['code'], 'redirect_uri' => REDIRECT_URI);

   $response = $client->getAccessToken(TOKEN_ENDPOINT, 'authorization_code', $params);

   // You should also store this in the user's session
   $client->setAccessToken($response['result']['access_token']);

   // From here on you can access Singly API URLs using $client->fetch
   $response = $client->fetch('https://api.singly.com/profiles');
}
