import { RolesBuilder } from 'nest-access-control';

export const roles: RolesBuilder = new RolesBuilder();

export enum AppRoles {
  ROL_ADMIN = 'ROL_ADMIN',
  ROL_USUARIO = 'ROL_USUARIO',
}

export enum AppResources {
  USER = 'user',
  CATEGORY = 'category',
  QUESTIONARY = 'questionary',
  QUESTIONS = 'questions',
  ALTERNATIVE = 'alternative',
}

roles
  // USUARIO ROLES
  .grant(AppRoles.ROL_USUARIO)
  .updateOwn([AppResources.USER])
  .deleteOwn([AppResources.USER])

  // ADMIN ROLES
  .grant(AppRoles.ROL_ADMIN)
  .extend(AppRoles.ROL_USUARIO)
  .createAny([
    AppResources.USER,
    AppResources.CATEGORY,
    AppResources.QUESTIONARY,
    AppResources.QUESTIONS,
    AppResources.ALTERNATIVE,
  ])
  .updateAny([
    AppResources.USER,
    AppResources.CATEGORY,
    AppResources.QUESTIONARY,
    AppResources.QUESTIONS,
    AppResources.ALTERNATIVE,
  ])
  .deleteAny([
    AppResources.USER,
    AppResources.CATEGORY,
    AppResources.QUESTIONARY,
    AppResources.QUESTIONS,
    AppResources.ALTERNATIVE,
  ]);
