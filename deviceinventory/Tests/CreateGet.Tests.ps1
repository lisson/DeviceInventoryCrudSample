$script:Name = "unittest123"
$script:Username = "Tester123"

Describe 'Create Read' {
    It 'Creates new device' -Tag "Create" {
        $query = @{"Name"=$Name}
        Invoke-RestMethod http://localhost:3000/SetDevice -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
    }

    It 'Reserves a device' -Tag "Reserve" {
        $query = @{"Name"=$Name; "Username"=$Username}
        $device = Invoke-RestMethod http://localhost:3000/ReserveDevice -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
        $device.Name | Should -Be $script:Name
    }

    It 'Reserves a device' -Tag "ReserveId" {
        $query = @{"d_ID"="1"; "Username"="Tester"}
        Invoke-RestMethod http://localhost:3000/ReserveDevice -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
    }
}