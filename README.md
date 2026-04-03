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

