# Test Register Endpoint
$body = @{
    gym_name = "Test Gym"
    owner_name = "John Doe"
    email = "test@example.com"
    password = "password123"
    phone = "1234567890"
} | ConvertTo-Json

Write-Host "Testing Register Endpoint..."
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
Write-Host "Status: $($response.StatusCode)"
Write-Host "Response: $($response.Content)"

# Extract token from response
$json = $response.Content | ConvertFrom-Json
$token = $json.token
Write-Host "Token: $token"
