import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, ViewEncapsulation, } from '@angular/core';
import { AuthComponent } from '@ngx-addons/omni-auth-ui-material';
import { NgDocThemeService } from '@ng-doc/app/services/theme';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconRegistry } from '@angular/material/icon';
import { configureAuth } from '@ngx-addons/omni-auth-core';
import { AuthSupabaseService, configureAuthSupabaseConnector } from '@ngx-addons/omni-auth-supabase';
import { environment } from '../../environments/environment';

@Component({
    selector: 'demo-supabase-with-material',
    imports: [AuthComponent],
    template: `
    <div
      class="material-demo mat-typography"
      [class]="[theme(), currentTheme()]"
    >
      <omni-auth-ui-mat></omni-auth-ui-mat>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [
        configureAuth({
            authService: AuthSupabaseService,
        }),
        configureAuthSupabaseConnector({
            url: environment.supabase.url,
            publishableKey: environment.supabase.publishableKey,
        }),
    ]
})
export class SupabaseWithMaterialComponent implements OnInit {
    protected readonly themeService = inject(NgDocThemeService);
    protected readonly iconRegistry = inject(MatIconRegistry);

    readonly theme = input<'blue' | 'azure' | 'green' | 'orange' | 'magenta'>(
        'azure',
    );
    readonly change = toSignal(this.themeService.themeChanges());
    readonly currentTheme = computed(() => {
        this.change();

        if (!this.themeService.currentTheme) {
            return 'light';
        }

        return this.themeService.currentTheme as 'auto' | 'dark';
    });

    ngOnInit(): void {
        this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    }
}
