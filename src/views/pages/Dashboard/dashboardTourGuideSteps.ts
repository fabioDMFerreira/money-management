import { GuideTourStep } from "../../containers/GuideTour/GuideTour";
import {
  DASHBOARD_LOAD_SAMPLE_PRESENTATION,
  DASHBOARD_STATISTICS_PRESENTATION,
  DASHBOARD_ONBOARDING_PRESENTATION,
  WALLETS_PRESENTATION,
  TRANSACTIONS_PRESENTATION,
  FORECAST_PRESENTATION,
  TAGS_PRESENTATION,
  DASHBOARD_QUICK_ACTIONS_PRESENTATION,
  GUIDE_TOUR_PRESENTATION,
  DASHBOARD_PRESENTATION
} from "locale/consts";

const tourGuideSteps: GuideTourStep[] = [
  {
    selector: '#guide-tour-button',
    intro: GUIDE_TOUR_PRESENTATION
  },
  {
    selector: "#dashboard-link",
    intro: DASHBOARD_PRESENTATION,
  },
  {
    selector: "#wallets-link",
    intro: WALLETS_PRESENTATION,
  }, {
    selector: "#transactions-link",
    intro: TRANSACTIONS_PRESENTATION,
  }, {
    selector: "#forecast-link",
    intro: FORECAST_PRESENTATION,
  }, {
    selector: "#tags-link",
    intro: TAGS_PRESENTATION,
  },
  {
    selector: "#statistics",
    intro: DASHBOARD_STATISTICS_PRESENTATION,
  }, {
    selector: "#onboarding",
    intro: DASHBOARD_ONBOARDING_PRESENTATION,
  },
  {
    selector: "#load-data-sample",
    intro: DASHBOARD_LOAD_SAMPLE_PRESENTATION,
  },
  {
    selector: "#quick-actions",
    intro: DASHBOARD_QUICK_ACTIONS_PRESENTATION,
  }
];

export default tourGuideSteps;
