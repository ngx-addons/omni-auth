import { NgDocPage } from '@ng-doc/core';
import DemoCategory from '../demo.category';
import {
  CognitoWithMaterialAdditionalFieldsComponent
} from '../../../demos/cognito-with-material-additional-fields/cognito-with-material-additional-fields.component';

const CognitoWithMaterialPage: NgDocPage = {
  title: `Additional Fields`,
  mdFile: ['./index.md'],
  category: DemoCategory,
  playgrounds: {

    CognitoWithMaterialAdditionalFields: {
      target: CognitoWithMaterialAdditionalFieldsComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
  },
};

export default CognitoWithMaterialPage;
