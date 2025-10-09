import { NgDocPage } from '@ng-doc/core';
import DemoCategory from '../ng-doc.category';
import {
  CognitoWithMaterialEmailComponent
} from '../../../demos/cognito-with-material-email/cognito-with-material-email.component';
import {
  CognitoWithMaterialUsernameComponent
} from '../../../demos/cognito-with-material-username/cognito-with-material-username.component';
import {
  CognitoWithMaterialProvidersComponent
} from '../../../demos/cognito-with-material-providers/cognito-with-material-providers.component';
import {
  CognitoWithMaterialAdditionalFieldsComponent
} from '../../../demos/cognito-with-material-additional-fields/cognito-with-material-additional-fields.component';

const CognitoWithMaterialPage: NgDocPage = {
  title: `Cognito with Material`,
  mdFile: ['./index.md'],
  category: DemoCategory,
  playgrounds: {
    CognitoWithMaterialEmail: {
      target: CognitoWithMaterialEmailComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
    CognitoWithMaterialUsername: {
      target: CognitoWithMaterialUsernameComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
    CognitoWithMaterialProviders: {
      target: CognitoWithMaterialProvidersComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
    CognitoWithMaterialAdditionalFields: {
      target: CognitoWithMaterialAdditionalFieldsComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
  },
};

export default CognitoWithMaterialPage;
