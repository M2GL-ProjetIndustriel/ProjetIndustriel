/* Imports ################################################################## */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
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
import { ExperimentDetailsComponent, DeleteExperimentDialogComponent } from './components/experimentDetails.component'
import { ExperimentFormComponent } from './components/experimentForm.component'
import { ExperimentResultsComponent } from './components/experimentResults.component'
import { ExperimentResultsStatsComponent } from './components/experimentResultsStats.component'
import { ExperimentResultsGraphDialogComponent } from './components/experimentResultsGraphDialog.component'

/* Providers ################################################################ */
import { ExperimentService } from './experiment.service'

/**
 * Experiment module, everything you need to handle experiments.
 */
@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
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
		ExperimentDetailsComponent,
		DeleteExperimentDialogComponent,
		ExperimentFormComponent,
		ExperimentResultsComponent,
		ExperimentResultsStatsComponent,
		ExperimentResultsGraphDialogComponent
	],
	entryComponents: [
		DeleteExperimentDialogComponent,
		ExperimentResultsGraphDialogComponent
	],
	providers: [
		ExperimentService,
		{
			provide: 'ExperimentService',
			useExisting: ExperimentService
		}
	]
})
export class ExperimentsModule {}
