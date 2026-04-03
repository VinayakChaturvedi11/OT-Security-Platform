import { Request, Response, NextFunction } from 'express';

export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.body?.src_role;

    if (!role) {
      return res.status(400).json({ error: 'Role missing' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
}