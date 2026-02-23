$body = @{
    name = "John Member Updated"
    plan_type = "3 month"
    plan_price = 2500
    payment_status = "paid"
} | ConvertTo-Json

$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJneW1faWQiOiI2OTljYzliN2UyNmRmMzUyMzBiZTMwYzAiLCJpYXQiOjE3NzE4ODI5MzUsImV4cCI6MTc3MjQ4NzczNX0.s0q7Zhl1Zl_22_3FZngvD_Ocw42Coti2r4muHoHcFUE"

Invoke-RestMethod -Uri 'http://localhost:5000/api/members/699cca04e26df35230be30c7' -Method Put -Body $body -ContentType 'application/json' -Headers @{'Authorization'="Bearer $token"}
