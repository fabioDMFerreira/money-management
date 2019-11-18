import { GuideTourStep } from "../../containers/GuideTour/GuideTour";
import { DASHBOARD_LOAD_SAMPLE_PRESENTATION, DASHBOARD_STATISTICS_PRESENTATION, DASHBOARD_ONBOARDING_PRESENTATION, DASHBOARD_WALLETS_PRESENTATION, DASHBOARD_TRANSACTIONS_PRESENTATION, DASHBOARD_FORECAST_PRESENTATION, DASHBOARD_TAGS_PRESENTATION, DASHBOARD_QUICK_ACTIONS_PRESENTATION } from "locale/consts";

const tourGuideSteps: GuideTourStep[] = [
  {
    selector: "#load-data-sample",
    intro: DASHBOARD_LOAD_SAMPLE_PRESENTATION,
  }, {
    selector: "#statistics",
    intro: DASHBOARD_STATISTICS_PRESENTATION,
  }, {
    selector: "#onboarding",
    intro: DASHBOARD_ONBOARDING_PRESENTATION,
  }, {
    selector: "#wallets-link",
    intro: DASHBOARD_WALLETS_PRESENTATION,
  }, {
    selector: "#transactions-link",
    intro: DASHBOARD_TRANSACTIONS_PRESENTATION,
  }, {
    selector: "#forecast-link",
    intro: DASHBOARD_FORECAST_PRESENTATION,
  }, {
    selector: "#tags-link",
    intro: DASHBOARD_TAGS_PRESENTATION,
  }, {
    selector: "#quick-actions",
    intro: DASHBOARD_QUICK_ACTIONS_PRESENTATION,
  }
];

export default tourGuideSteps;
