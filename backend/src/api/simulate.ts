import { Router } from 'express';
import { authorize } from "./middleware/rbacMiddleware";

// Thermal resources
const DRUM_LVL_SP = 'reg:41010';
const TURB_LOAD_SP = 'reg:42001';

export function simulateRouter() {
  const r = Router();

  // ✅ Drum Level (Only BOILER-HMI allowed)
  r.post('/modbus-write-drum', authorize(['BOILER-HMI']), async (req, res) => {
    const {
      site_id = 'plant-thermal-demo',
      src_ip = '10.10.1.25',
      dst_ip = '10.10.1.50',
      value = 55.0,
      src_role = 'BOILER-HMI',
      resource = DRUM_LVL_SP
    } = req.body || {};

    const evt = {
      ts: new Date().toISOString(),
      site_id,
      src: { ip: src_ip, role: src_role },
      dst: { ip: dst_ip },
      protocol: 'modbus',
      verb: 'write_register',
      resource,
      value
    };

    res.json({ ok: true, event: evt });
  });

  // ✅ Turbine Load (Only TCS-HMI allowed)
  r.post('/modbus-write-load', authorize(['TCS-HMI']), async (req, res) => {
    const {
      site_id = 'plant-thermal-demo',
      src_ip = '10.10.1.26',
      dst_ip = '10.10.1.60',
      value = 210.0,
      src_role = 'TCS-HMI',
      resource = TURB_LOAD_SP
    } = req.body || {};

    const evt = {
      ts: new Date().toISOString(),
      site_id,
      src: { ip: src_ip, role: src_role },
      dst: { ip: dst_ip },
      protocol: 'modbus',
      verb: 'write_register',
      resource,
      value
    };

    res.json({ ok: true, event: evt });
  });

  return r;
}