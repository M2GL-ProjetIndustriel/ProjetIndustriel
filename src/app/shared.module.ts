/* Imports ################################################################## */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
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
import { SidenavComponent } from './shared/components/sidenav.component'
import { HeaderComponent } from './shared/components/header.component'
import { CardComponent } from './shared/components/card.component'
import { UnluckyRouteComponent } from './shared/components/unluckyRoute.component'
import { TestGraphComponent } from './shared/components/testGraph.component'

/**
 * Shared module, contains everything that is global/shared between the
 * differents modules of the app.
 */
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
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
		TestGraphComponent
	],
	exports: [
		SidenavComponent,
		HeaderComponent,
		UnluckyRouteComponent,
		CardComponent,
		TestGraphComponent
	]
})
export class SharedModule { }
