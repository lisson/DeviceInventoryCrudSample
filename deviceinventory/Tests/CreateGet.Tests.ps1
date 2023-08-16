Describe 'Create Read' {
    It 'Creates new device' -Tag "Create" {
        $query = @{"Name"="testdevice123"}
        Invoke-RestMethod http://localhost:3000/SetDevice -Method POST -Body $query
    }

    It 'Reserves a device' -Tag "Reserve" {
        $query = @{"Name"="BARBATOSSS"; "Username"="Tester"}
        Invoke-RestMethod http://localhost:3000/ReserveDevice -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
    }

    It 'Reserves a device' -Tag "ReserveId" {
        $query = @{"d_ID"="1"; "Username"="Tester"}
        Invoke-RestMethod http://localhost:3000/ReserveDevice -Method POST -Body $($query | ConvertTo-Json) -ContentType "Application/Json"
    }
}