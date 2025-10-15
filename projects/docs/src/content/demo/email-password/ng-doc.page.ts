import { NgDocPage } from '@ng-doc/core';
import DemoCategory from '../demo.category';
import {
  CognitoWithMaterialEmailComponent
} from '../../../demos/cognito-with-material-email/cognito-with-material-email.component';

const CMEmailPassword: NgDocPage = {
  title: `Email And Password`,
  mdFile: ['./index.md'],
  order: 1,
  category: DemoCategory,
  playgrounds: {
    CognitoWithMaterialEmail: {
      target: CognitoWithMaterialEmailComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
  },
};

export default CMEmailPassword;
