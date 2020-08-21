
import { Label, MultiDataSet, Color } from 'ng2-charts';


export interface CharDoughnut{
    title?: string,
    doughnutChartLabels?: Label[],
    doughnutChartData?: MultiDataSet,
    colors?: Color[]
}