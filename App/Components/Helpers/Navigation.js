import { NavigationActions } from "react-navigation";

export const navigateToObject = (rn, ...data) => {
  NavigationActions.navigate({
    routeName: String(rn),
    action: NavigationActions.navigate({ routeName: String(rn) }),
    params: data
  });
};
