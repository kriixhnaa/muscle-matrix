$body = @{
    name = "John Member"
    phone = "9876543210"
    plan_type = "1 month"
    plan_price = 1000
    payment_status = "paid"
} | ConvertTo-Json

$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJneW1faWQiOiI2OTljYzliN2UyNmRmMzUyMzBiZTMwYzAiLCJpYXQiOjE3NzE4ODI5MzUsImV4cCI6MTc3MjQ4NzczNX0.s0q7Zhl1Zl_22_3FZngvD_Ocw42Coti2r4muHoHcFUE"

Invoke-RestMethod -Uri 'http://localhost:5000/api/members' -Method Post -Body $body -ContentType 'application/json' -Headers @{'Authorization'="Bearer $token"}
