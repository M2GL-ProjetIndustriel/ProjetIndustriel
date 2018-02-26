/* Imports ################################################################## */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout'
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

import { SharedModule } from '../../shared/shared.module'

/* Declarations ############################################################# */
import { ExperimentsOverviewComponent } from './components/experimentsOverview.component'
import { ExperimentsListComponent } from './components/experimentsList.component'
import { ExperimentDetailsComponent } from './components/experimentDetails.component'

/* Providers ################################################################ */
import { ExperimentService } from './experiment.service'

/**
 * Experiment module, everything you need to handle experiments.
 */
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		HttpClientJsonpModule,
		FlexLayoutModule,
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
		SharedModule
	],
	declarations: [
		ExperimentsOverviewComponent,
		ExperimentsListComponent,
		ExperimentDetailsComponent
	],
	providers: [
		ExperimentService
	]
})
export class ExperimentsModule { }
