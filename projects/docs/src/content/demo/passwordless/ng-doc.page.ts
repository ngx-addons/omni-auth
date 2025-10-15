import { NgDocPage } from '@ng-doc/core';
import DemoCategory from '../demo.category';
import {
  CognitoWithMaterialPasswordlessComponent
} from '../../../demos/cognito-with-material-passwordless/cognito-with-material-passwordless.component';

const CognitoWithMaterialPage: NgDocPage = {
  title: `Passwordless`,
  mdFile: ['./index.md'],
  category: DemoCategory,
  playgrounds: {

    CognitoWithMaterialPasswordless: {
      target: CognitoWithMaterialPasswordlessComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
  },
};

export default CognitoWithMaterialPage;
