import { NgDocPage } from '@ng-doc/core';
import DemoCategory from '../demo.category';
import {
  CognitoWithMaterialProvidersComponent
} from '../../../demos/cognito-with-material-providers/cognito-with-material-providers.component';

const CMSocialProviders: NgDocPage = {
  title: `Social Providers`,
  order: 3,
  mdFile: ['./index.md'],
  category: DemoCategory,
  playgrounds: {
    CognitoWithMaterialProviders: {
      target: CognitoWithMaterialProvidersComponent,
      template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
    },
  },
};

export default CMSocialProviders;
