$default_url = "http://localhost:3000"

function Get-DeviceByName($Url=$default_url, $DeviceName)
{
    $query = @{"Name"=$DeviceName}
    $get_url = Join-Url $Url "/get-devices-by-name"
    $Devices = Invoke-RestMethod $get_url -Method GET -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
    return @($Devices)
}

function Set-Device($Url=$default_url, $Device)
{
    $set_url = Join-Url $Url "/set-device"
    return Invoke-RestMethod $set_url -Method POST -Body $($Device | ConvertTo-Json) -ContentType "Application/Json"
}

function Unlock-Device($Url=$default_url, $Device)
{
    $releaseQuery = @{"d_ID" = $Device.d_ID}
    $unlock_url = Join-Url $Url "/release-device"
    return Invoke-RestMethod $unlock_url -Method POST -Body $($releaseQuery | ConvertTo-Json) -ContentType "Application/Json"
}

function Lock-Device($Url=$default_url, $Device)
{
    $query = @{"Name"=$Device.Name; "Username"=$Device.Username}
    $lock_url = Join-Url $Url "/reserve-device"
    return Invoke-RestMethod $lock_url -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
}

function Join-Url($Url=$default_url, $directory)
{
    if(-not $directory.StartsWith("/"))
    {
        $directory = "/" + $directory
    }
    return $Url.trim("/") + $directory
}
