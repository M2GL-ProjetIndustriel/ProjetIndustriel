/* Imports ################################################################## */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
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
import { SolversOverviewComponent } from './components/solversOverview.component'
import { SolverFormComponent } from './components/solverForm.component'
import { SolversListComponent } from './components/solversList.component'
import { SolverDetailsComponent, DeleteSolverDialogComponent } from './components/solverDetails.component'

/* Providers ################################################################ */
import { SolverService } from './solver.service'

/**
 * Solvers module, everything you need to handle solvers.
 */
@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
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
		SolversOverviewComponent,
		SolverFormComponent,
		SolversListComponent,
		SolverDetailsComponent,
		DeleteSolverDialogComponent
	],
	entryComponents: [
		DeleteSolverDialogComponent
	],
	providers: [
		SolverService,
		{
			provide: 'SolverService',
			useExisting: SolverService
		}
	]
})
export class SolversModule {}
