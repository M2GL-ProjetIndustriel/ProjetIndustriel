/**
 * Interface describing a basic experiment.
 */
export interface BasicExperiment {
	_id: string
	experimentName: string
	experimentDate: string
	experimentResult: object
	__v: number
}

/**
 * Interface describing a experiment. Extends {@link BasicExperiment}
 * and provide more informations.
 */
export interface Experiment extends BasicExperiment {
}
