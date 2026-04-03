## RBAC Implementation

### Overview
Added Role-Based Access Control (RBAC) to secure critical OT simulation endpoints.

### Protected Endpoints
- POST /simulate/modbus-write-drum
- POST /simulate/modbus-write-load

### Roles
- BOILER-HMI → Allowed for drum control
- TCS-HMI → Allowed for turbine load
- Others → Denied

### Example Test

 Allowed:
{
  "src_role": "BOILER-HMI"
}

 Denied:
{
  "src_role": "UNAUTHORIZED"
}

### Result
- Authorized → 200 OK
- Unauthorized → 403 Forbidden
### Unauthorized Request (403 Forbidden)

![403 Denied](https://github.com/user-attachments/assets/3570a45c-2fd5-4000-96fb-0d68a85af447) 
### Authorized Request (200 OK)

![200 OK](https://github.com/user-attachments/assets/f0d3913d-8e73-4d42-894e-b2ab1ba188ff) 

**RBAC middleware correctly allows authorized roles and blocks unauthorized access.**
