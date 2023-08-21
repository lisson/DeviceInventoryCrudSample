$script:Name = "unittest123"
$script:Username = "Tester123"

Describe 'Create Read' {
    It 'Creates new device' -Tag "Create" {
        $query = @{"Name"=$Name}
        Invoke-RestMethod http://localhost:3000/set-device -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
    }

    It 'Reserves a device' -Tag "Reserve" {
        $query = @{"Name"=$Name; "Username"=$Username}
        $device = Invoke-RestMethod http://localhost:3000/reserve-device -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
        $device.Name | Should -Be $script:Name
    }

    It 'Releases a device' -Tag "Release" {
        $query = @{"Name"=$Name}
        $devices = Invoke-RestMethod http://localhost:3000/get-devices-by-name -Method GET -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
        $devices = @($devices)
        foreach($d in $devices)
        {
            $releaseQuery = @{"d_ID" = $d.d_ID}
            Invoke-RestMethod http://localhost:3000/release-device -Method POST -Body $($releaseQuery | ConvertTo-Json) -ContentType "Application/Json"
        }
    }
}