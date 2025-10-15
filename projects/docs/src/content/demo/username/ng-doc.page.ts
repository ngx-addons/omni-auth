import { NgDocPage } from '@ng-doc/core';
import DemoCategory from '../demo.category';
import {
  CognitoWithMaterialUsernameComponent
} from '../../../demos/cognito-with-material-username/cognito-with-material-username.component';

const CMUsername: NgDocPage = {
  title: `Username And Password`,
  mdFile: ['./index.md'],
  order: 2,
  category: DemoCategory,
  playgrounds: {
    CognitoWithMaterialUsername: {
      target: CognitoWithMaterialUsernameComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
  },
};

export default CMUsername;
