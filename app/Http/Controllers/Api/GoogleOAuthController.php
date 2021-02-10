<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Google_Client;
use Google_Service_Drive;

class GoogleOAuthController extends Controller
{
  public function obtainOAuthToken()
  {
    $path = public_path('../storage/oauth/client_secret_767535375148-3cnbell1pem1asshronmi1ct27hck4e7.apps.googleusercontent.com.json');

    // Set auth params.
    $client = new Google_Client();

    $client->setAuthConfig($path);
    $client->addScope(Google_Service_Drive::DRIVE_METADATA_READONLY);
    $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php');
    
    // offline access will give you both an access and refresh token so that
    // your app can refresh the access token without user interaction.
    $client->setAccessType('offline');
    
    // Using "consent" ensures that your application always receives a refresh token.
    // If you are not using offline access, you can omit this.
    $client->setApprovalPrompt("consent");
    
    $client->setIncludeGrantedScopes(true);   // incremental auth

    // Redirect to Google's OAuth server.
    $auth_url = $client->createAuthUrl();
    
    header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
  }
}
