Import-Module $PSScriptRoot\..\PSModule\DeviceInventory.psm1 -Force

$script:Name = "unittest123"
$script:Username = "Tester123"

Describe 'Create Read' {
    It 'Creates new device' -Tag "Create" {
        $query = @{"Name"=$Name}
        $device = Set-Device -Device $query
        $device.Name | Should -Be $script:Name
    }

    It 'Reserves a device' -Tag "Reserve" {
        $query = @{"Name"=$Name; "Username"=$Username}
        $device = Lock-Device -Device $query
        $device.Name | Should -Be $Name
    }

    It 'Releases a device' -Tag "Release" {
        $devices = Get-DeviceByName -DeviceName $Name
        foreach($d in $devices)
        {
            $releaseQuery = @{"d_ID" = $d.d_ID}
            $response = Unlock-Device -Device $releaseQuery
            Write-Host $response
        }
    }
}