import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CHeaderComponent } from './components/c-header/c-header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [CHeaderComponent, LoaderComponent, DateAgoPipe],
  imports: [CommonModule],
  exports: [CHeaderComponent, LoaderComponent, DateAgoPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
