import { NgDocPage } from '@ng-doc/core';
import DemoCategory from '../demo.category';
import {
    SupabaseWithMaterialComponent
} from '../../../demos/supabase-with-material/supabase-with-material.component';

const SupabaseDemo: NgDocPage = {
    title: `Supabase`,
    mdFile: ['./index.md'],
    order: 7,
    category: DemoCategory,
    playgrounds: {
        SupabaseWithMaterial: {
            target: SupabaseWithMaterialComponent,
            template: `<ng-doc-selector>The code is available in github repo.</ng-doc-selector>`,
        },
    },
};

export default SupabaseDemo;
