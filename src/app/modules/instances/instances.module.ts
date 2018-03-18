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

import { PapaParseModule } from 'ngx-papaparse'

import { SharedModule } from '../../shared/shared.module'

/* Declarations ############################################################# */
import { InstancesOverviewComponent } from './components/instancesOverview.component'
import { InstancesListComponent } from './components/instancesList.component'
import { InstanceDetailsComponent, DeleteInstanceDialogComponent } from './components/instanceDetails.component'
import { InstanceFormComponent } from './components/instanceForm.component'
import { InstanceFeaturesTableComponent } from './components/instanceFeaturesTable.component'

/* Providers ################################################################ */
import { InstanceService } from  './instance.service'

/**
 * Instances module, everything you need to handle instances.
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
		PapaParseModule,
		SharedModule
	],
	declarations: [
		InstancesOverviewComponent,
		InstancesListComponent,
		InstanceDetailsComponent,
		DeleteInstanceDialogComponent,
		InstanceFormComponent,
		InstanceFeaturesTableComponent
	],
	entryComponents: [
		DeleteInstanceDialogComponent
	],
	providers: [
		InstanceService,
		{
			provide: 'InstanceService',
			useExisting: InstanceService
		}
	]
})
export class InstancesModule { }
