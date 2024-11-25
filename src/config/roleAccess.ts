export class RoleAccess {
  public static ADMIN = [
    { method: 'POST', path: 'api/users/sign-in' },
    { method: 'POST', path: 'api/users/sign-up' },
    { method: 'POST', path: 'api/doctors/sign-up' },
    { method: 'GET', path: 'api/patients/:id' },
    { method: 'POST', path: 'api/patients/update/:id' },
    { method: 'POST', path: 'api/patients/delete/:id' },
    { method: 'POST', path: 'api/appointment/create' },
    { method: 'POST', path: 'api/appointment/update/:id' },
    { method: 'POST', path: 'api/appointment/delete/:id' },
    { method: 'GET', path: 'api/appointment/:id' },
  ];

  public static DOCTOR = [
    { method: 'POST', path: 'api/doctors/sign-in' },
    { method: 'POST', path: 'api/doctors/sign-up' },
    { method: 'GET', path: 'api/patients/:id' },
    { method: 'POST', path: 'api/patients/update/:id' },
    { method: 'POST', path: 'api/appointment/update/:id' },
    { method: 'GET', path: 'api/appointment/:id' },
  ];

  public static PATIENT = [
    { method: 'POST', path: 'api/patients/sign-in' },
    { method: 'GET', path: 'api/patients/:id' },
    { method: 'POST', path: 'api/appointment/create' },
    { method: 'POST', path: 'api/appointment/update/:id' },
    { method: 'POST', path: 'api/appointment/delete/:id' },
    { method: 'GET', path: 'api/appointment/:id' },
  ];
}
