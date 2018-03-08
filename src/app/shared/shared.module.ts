/* Imports ################################################################## */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
} from '@angular/material'

/* Declarations ############################################################# */
import { SidenavComponent } from './components/sidenav.component'
import { HeaderComponent } from './components/header.component'
import { CardComponent } from './components/card.component'
import { UnluckyRouteComponent } from './components/unluckyRoute.component'
import { TestGraphComponent } from './components/testGraph.component'
import { FileUploadComponent } from './components/fileUpload.component'
import { TableComponent } from './components/table.component'
import { ErrorDirective } from './error.directive'

/* Providers ################################################################ */
import { ErrorService } from './error.service'
import { ApiMessageService } from './apiMessage.service'

/**
 * Shared module, contains everything that is global/shared between the
 * differents modules of the app.
 */
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule
	],
	declarations: [
		SidenavComponent,
		HeaderComponent,
		UnluckyRouteComponent,
		CardComponent,
		TestGraphComponent,
		FileUploadComponent,
		TableComponent,
		ErrorDirective
	],
	exports: [
		SidenavComponent,
		HeaderComponent,
		UnluckyRouteComponent,
		CardComponent,
		TestGraphComponent,
		FileUploadComponent,
		TableComponent,
		ErrorDirective
	],
	providers: [
		ErrorService,
		ApiMessageService
	]
})
export class SharedModule { }
